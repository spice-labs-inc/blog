---
title: "Lessons Learned in Replicating Source Repositories"
date: 2025-12-12
author: sdh
---

# Lessons Learned in Replicating Source Repositories

At Spice Labs we've been working to add in support for .NET. This involves several things - the first was being able to comprehend .NET assemblies. This is so that when a customer runs [Goat Rodeo](https://github.com/spice-labs-inc/goatrodeo) via the [Surveyor CLI](https://github.com/spice-labs-inc/spice-labs-cli) on their machines, when the code encounters a .NET library or executable, we can identify the assembly and extract metadata from the assembly. The second was to be able to build a database of existing .NET assemblies. In order to do that efficiently, it's important for us to have a copy of the [nuget](https://www.nuget.org/), the main .NET code repository.

I had already done the first step, but the second step needed to be done. I'm going to go through the process of how I did this and what is important to know about the process.

### Lesson 1: Understand the Scope of Your Problem

Knowing the scope of your problem will help you make decisions in designing your solution. For this it's helpful to start with back-of-the envelope calculations. For example, nuget.org itself says that it has 485,658 packages and that there are 10,678,530 package versions. So we can look at the latter number as use that as a starting point for how much storage we'll need. So if we assume that there a typical package is about 10 megabytes, we'll need about 100G of storage.

From this same number we can make decisions about how we want to store these. Using the file system is fine, but you don't want to put them in one directory. I opted for using the structure:

```
nuget->first-character-of-publisher->publisher->packages
```

This fans out the directories to a certain degree, but if I started it again, I would have inserted at least one more level in the directory structure.

The 100G number can also be used to estimate how long it will take to replicate the repository. Hint: this number will be big and it's important to keep that in mind because you can't expect this to succeed in a short period of time.

### Lesson 2: Look for the Best API

At this point, there are several APIs that are available for nuget but the most current one has the best options for our task. In fact, one of the use cases listed is exactly our use case: [mirroring nuget.org](https://learn.microsoft.com/en-us/nuget/guides/api/query-for-all-published-packages). Lucky.

### Lesson 3: Apply the Fundamental Theorem of Software Engineering

"[We can solve any problem by introducing an extra level of indirection.](https://en.wikipedia.org/wiki/Fundamental_theorem_of_software_engineering)"

In this case, dividing the process into two phases:

- Gathering the collection of work to do
- Performing that work

In this case, decoupling the process of finding out what needs to be done and actually doing it allows us to make a tool which is resilient. When (and not if) the tool quits unexpectedly, you can pick up from where you left off.

As part of this, it's important to serialize the work to do before you start working on it and it's also important to make sure that it's easy to serialize, deserialize and the file should be human readable.

You can use a separate tool for generating the work and performing the work. I chose not to do this, but I considered making the work to do be essentially a list of `curl` commands

### Lesson 4: Plan for Errors

You're going to have errors. Trust me. In my case, I saw a wide variety of http errors. Some were expected (404 errors for packages that were removed), but some were not.

To solve this, for every failure I appended to a file of failures. And because I'm an engineer, I used a compatible format for the error file as for the work-to-do file. This means that I can pick out all the non-404 errors from the file with sed and write a new work-to-do file. This is a very low-cost way to get retries.

While nuget is very kind in terms of apps hitting it hard to download everything, you can't count on every server having such a lenient policy. In other words, be prepared for the server to treat your app as malicious.

### Lesson 5: Include I/O Coverup and Logging

You will introduce bugs in your code. Trust me. To track down what went wrong, it's important to know what happened and when. Logging will help.

Some aspects of the code will take a long time. Put in some I/O coverup so you can see that's making progress. For example, fetching all the pages from the catalog of nuget takes minutes. As such, it's helpful to know how far along your are in that process.

When I'm downloading packages, I pop up a message after every 1000.

### Lesson 6: Write Your Code Like an API

This is my general approach to every piece of coding, not just one-off tools - if you structure your code as if it were an API instead of slapping everything into `main`, your life will be better on a number of fronts:

- It's easier to write tests (you are writing tests, yes?)
- It's easier to debug
- It's easier to refactor
- it's easier to modify
- it's easier to understand when you come back to it in a year

To be perfectly clear, I'm **not** saying that you need to be an [architecture astronaut](https://en.wikipedia.org/wiki/Architecture_astronaut). I'm saying that by breaking your code into more logical, separate functional blocks that all of the work I listed is easier and it will save you time.

### Lesson 7: Measure and Parallelize

Initially, I wrote the code single-threaded with individual operations with very clean boundaries (see lesson 3). When I measured throughput, it wasn't even close to what I should be able to get in theory. My goal was to bring the network interface on the machine running the app to saturation. The solution to this is to parallelize. Since I opted for writing this as an app, it was straightforward to make a method that calls the original API but instead run it on as many threads as we want.

### Conclusions

The task of crawling a repository and replicating it is a fascinating engineering problem with a number of in-built challenges. If you keep in mind that it requires an engineered solution instead, then you will end up with a solid tool that will last instead of a hack that requires constant care and feeding.
