---
title: "Writing A Slim PNG Decoder In Scala"
date: 2026-02-23
author: sdh
---

# Writing a Slim PNG Decoder In Scala

I was working on the [Component Model](https://github.com/spice-labs-inc/rodeo-components) for [Goat Rodeo](https://github.com/spice-labs-inc/goatrodeo) and needed to write a test for the artifact handling API. This kind of task is always a challenge in code that can handle many different file types in that you want a file type that the current code _doesn't_ handle and won't be likely to handle and you want a file that type that has features that you can use and yet won't be a pain to work with. I chose PNG because it's easy to find example files and it's a relatively simple file format to parse because it is incredibly uniform. These characteristics are also important in writing sample code where you don't want the target of the sample to take away from the process of the sample.

A PNG file starts with an 8 byte header: `0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a` then it is followed by a series of "chunks". A chunk consists of a length field: a 4 byte integer stored big endian, a tag stored as 4 characters, then n data bytes (where n is from the length field), and finally another a 32 bit CRC also stored as a 4 byte big endian integer.

If you look at [the specification](https://www.w3.org/TR/png-3/), there is a definite order to chunks. If you are generating PNG files, it's important to pay attention to this, but if you're consuming them you can be cavalier about the ordering unless you are writing a tool to determine if a PNG file is correct. I would argue that this is the right approach in that you should be strict in what you generate and generous in what you accept.

The PNG format is also designed to be streamed so that the you need very little buffered information to decode them. This is largely because when it was created, you needed to be more careful about memory usage. If you aren't concerned about either of these characteristics, there are two other ways you can write a PNG decoder:

- read all of the chunks in the order presented and aggregate them
- collect information about where all of the chunks are along with their tags so the data can be read later

I opted for the former. The resulting code can read all of the PNG chunks in one go and is under 75 lines. Short enough that I can put the entire code into this blog article and not worry that I'm going to lose you.

To start, I defined a data structure for a chunk:

```scala
case class PngChunk(name: String, data: Array[Byte])
```

The next step is to get past the header before reading in the chunks:

```scala
  def pngChunks(stm: InputStream): Vector[PngChunk] = {
    val header = stm.readNBytes(8)
    if (!header.sameElements(pngHeader)) {
      Vector()
    } else {
      pngChunksTail(stm, Vector())
    }
  }
```

This code simply reads in 8 bytes and checks to see if they match the header. It then calls a tail-recursive function to read in the actual chunks:

```scala
@tailrec
  private def pngChunksTail(
      stm: InputStream,
      result: Vector[PngChunk]
  ): Vector[PngChunk] = {
    val chunkOpt = chunkFromStm(stm)
    chunkOpt match {
      case Some(chunk) => pngChunksTail(stm, result :+ chunk)
      case None        => result
    }
  }
```

Essentially, we recurse with an accumulating result for each chunk that we read. If we get no chunk, we return the accumulation. This is a straight-forward functional approach.

Before we look at `chunkFromStm`, here are a couple of helper functions that will make our job easier:

```scala
  private def intFromStmBigEndian(stm: InputStream): Option[Int] = {
    val buffer = stm.readNBytes(4)
    buffer.length match {
      case 4 => Some(intFromArrayBigEndian(buffer))
      case _ => None
    }
  }

  private def intFromArrayBigEndian(arr: Array[Byte]): Int = {
    (arr(0).toInt << 24) |
      ((arr(1).toInt & 0xff) << 16) |
      ((arr(2).toInt & 0xff) << 8) |
      (arr(3).toInt & 0xff)
  }
```

The first reads 4 bytes and on success, calls the second to turn it into an Int. They didn't have to be factored this way - I just thought it was prettier.

With that, `chunkFromStm` writes itself:

```scala
  def chunkFromStm(stm: InputStream): Option[PngChunk] = {
    val lenOpt = intFromStmBigEndian(stm)
    lenOpt match {
      case Some(len) => chunkOpt(stm, len)
      case _         => None
    }
  }
```

The last piece is `chunkOpt` which is a function that reads the remains of the chunk and returns an `Option` of `PngChunk`. This is, by far, the most complicated bit of code and that has everything to do with CRC checking, something that we don't really _have_ to do and the extra size has to do primarily with the way that the Java CRC code is designed. If it were a fluent interface where each method returns a (possibly) modified CRC calculator, then the CRC calculation could look like this:

```scala
val calculatedCRC = CRC32().update(fourCCData).update(data).getValue()
```

That aside, here's `chunkOpt`:

```scala
  private def chunkOpt(stm: InputStream, len: Int): Option[PngChunk] = {
    val fourCCData = stm.readNBytes(4)
    if (fourCCData.length != 4)
      return None
    val data = stm.readNBytes(len)
    if (data.length != len)
      return None
    val expectedCRCOpt = intFromStmBigEndian(stm)
    expectedCRCOpt match {
      case Some(expectedCrc) => {
        val longCRC = expectedCrc.toLong & 0xffffffffL
        val crcCalc = CRC32()
        crcCalc.update(fourCCData)
        crcCalc.update(data)
        val calculatedCrc = crcCalc.getValue()
        val fourCC = String(fourCCData, latinCharset) // latinCharset is a cached Charset object
        if calculatedCrc == longCRC then Some(PngChunk(fourCC, data)) else None
      }
      case None => None
    }
  }
```

We read in 4 bytes for the tag, n bytes for the data and 4 bytes for the CRC, then verify the CRC and if everything works, return a PngChunk, otherwise return None.

Now, is this a PNG decoder? Yes and no. Yes in that you get everything you need to look at the contents of a PNG. No in that there is no actual image decoding nor is there strong typing of the data content. I suppose it would be more precise to call it a "PNG Chunk Aggregator". And that is exactly what I needed for writing a test. It would also be ideal for writing sample code too. While it's good enough for my needs, it's missing a number of things that I would add if it were to be used in a professional setting.

First, I depend on `Option[PngChunk]` and that's not really sufficient. If something goes wrong, it would be nice to have more in the way of information. Instead I would use a union of PngChunk, an error, and an empty type. This way the empty type become the sentinel for "no more chunks" and the error type gives you information about what happened. This lets us do things like continue to aggregate chunks on anything but a non-fatal error. Second, there is no exception handling and there needs to be. Third, in my case, I only care about a certain set of tags and memory and time performance would be better if there were a chunk filter function passed in from the top that could be used in `chunkOpt` to skip a chunk that we don't care about. Finally, a `Vector` of chunks is good enough for my needs, but it would be better to have this return a `Map[String, Vector[PngChunk]]` or `Map[String, Array[Byte]]`

Still, deficiencies aside, this is a nice chunk of code.
