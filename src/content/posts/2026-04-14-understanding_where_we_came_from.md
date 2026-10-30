---
title: "Understanding Where We Came From"
date: 2026-04-14
author: sdh
---

## Understanding Where We Came From

As we move forward into an era of Post Quantum Computing (PQC), I think it’s helpful to look back at where we came from to help us understand where we’re going. For this, I’m going to look at the first computer with a stored program: The Manchester Baby. I initially encountered the specification for this machine, erroneously presented as the Manchester Mark I - that machine was the successor to the Manchester Baby. The Manchester Baby ran its first program on June 21st, 1948. The first program run was to find the largest factor of 262,144, which took 52 minutes. In comparison, I wrote a program using the same algorithm in C on a modern computer and it finished in 1.17 milliseconds. That’s roughly 2.6 million times faster. I had my colleague Aria run it on her machine and it took .11 milliseconds, another 10x. We’ve come a very long way.

Over the years, I’ve thought in depth about what computers can do and how to best explain it to someone without a computer science degree and it comes down to this:

A computer has a set of instructions that it can perform. These instructions are read from memory.
The instructions can do the following:

- Read a value from a location in memory
- Write a value into a location in memory
- Perform simulated arithmetic
- Change where in memory the next instruction will be read. This change may be conditional based on the results of other instructions
- Trigger external devices
- Respond to external devices

That’s a depressingly short list. And if you’re paying close attention, you noticed that I won’t even go as far as saying that computers can perform arithmetic but can only simulate it. Not even taking into consideration [the infamous Pentium math error](https://en.wikipedia.org/wiki/Pentium_FDIV_bug), this assertion is true. Here’s why - if you work with an 8-bit microprocessor and perform 255 + 1, the result will not be 256. It will be 0. The catch is that it will also have a little piece of information to let you know that the addition had a one to carry over. Now, for one of these machines you could handle that carry and use more memory to build larger numbers, but memory runs out, and that’s why it’s a simulation.

Three years before the Manchester Baby ran its first program, John von Neumann published a paper on how a digital computer should work and the influence on the Baby is clear. When I first had the Manchester Baby presented to me, it was at a time when Reduced Instruction Set Computers were the hot new thing. The professor described the Manchester Baby as “the ultimate RISC machine”. He wasn’t far off. The machine had 7 instructions. Computers as we know them have built-in special purpose memory called registers. A typical computer today may have between 16 and 32 registers. The Baby had 3 registers:

- An instruction pointer, which is where in memory the next instruction would come from
- An accumulator, a register for reading from memory, writing to memory and performing arithmetic
- A condition code register, which wasn’t even a full register as it only had two bits in it

Now let’s go through the entire instruction set:

- **JMP** _address_ - “jump” to the address. This is akin to taking “address” and putting it into the instruction pointer
- **JRP** _offset_ - “jump” to the offset given. This is akin to taking the current instruction pointer and adding “offset” to it
- **LDN** _address_ - read the memory at the given address and put the NEGATIVE value of it into the accumulator register
- **STO** _address_ - store the value in the accumulator into the memory address
- **SUB** _address_ - subtract the value at the address from the accumulator register
- **CMP** - if the result of the last instruction was negative, skip the next instruction
- **STOP** - halts the computer

Critically speaking, they could have eliminated the **JRP** instruction and the computer design would have been a whole lot simpler.

The reason being that there is underlying hardware to do an add by 1 on the instruction pointer. That’s pretty simple. When you do the relative jump instruction, you need either hardware to do full addition, or the relative computation is actually subtraction being done through the same hardware that does the subtract instruction.

The oddest instruction is **STOP**. It makes sense, but it doesn’t do what you think it does. In the condition code register, there is a bit that gets set when you execute the **STOP** instruction and that is all the **STOP** instruction does. The actual computer will only run if that bit is clear. This is a convenient level of indirection because when the computer is first turned on, this bit is set which gives the operator the opportunity to load in a program, alter the instruction pointer, alter the accumulator, and look at memory. The program won’t start until the operator pushes a button that clears that bit.

The next oddest instruction is **LDN** because you can’t actually read a value from memory and have that actual value at hand, except for zero. But it actually makes sense. Instead of having a separate instruction to do negation, they built it into the instruction to read memory and that pairs reasonably well with the fact that the machine couldn’t perform addition, only subtraction.

As it turns out, the third program run on the Baby was one to do division, written by Alan Turing.

When my class learned about this machine, we were given an assignment to write the shortest possible program to correctly calculate factorial. As an incentive, the professor offered a prize of one US dollar. Several of the students, myself included, really threw themselves at the task to get the shortest program. Just that experience alone was worth it.

To me, it’s interesting to see how all theoretical and physical computing machinery and history is so intertwined. Turing worked at Bletchley Park in World War II on computing machinery to break messages encoded by the Enigma machine. Turing also created a theoretical model of computation which encompasses most of the capabilities I listed earlier with the exception that it had infinite memory because yay, math. Now flash forward half a century and Peter Shor has published a paper describing a quantum computing algorithm for factoring which can be applied to breaking conventional encryption algorithms. Shor’s paper is an impressive wall of math, but the first few pages are littered with references to Alan Turing’s work as applied to quantum computing. Similarly, modern computers don’t differ a great deal from the Manchester Baby. Most of the work in the past 50 years has been creating instructions that map closer to extremely common tasks in software such as accessing structured data, operating on stacks and arrays; improving the efficiency of code running on the computer via pipelined instructions, caching, and branch prediction; increasing the clock rate; reducing the power consumed by the machine; and increasing the number of CPU cores that in the machine for more parallel processing capabilities. Yet, none of these improvements change the fundamental capabilities of the machine. It’s gilding the lily, really.

Looking at Shor’s work, which was done well in advance of a physical quantum computer, he is approaching the problem from a pure math point of view. I love things like this - one of the first programs run on the Manchester Mark I, the follower to the Baby, was a program to calculate Mersenne primes, which are prime numbers that can be expressed as 2<sup>n</sup> - 1. Interestingly, people are still searching for Mersenne primes and as of 2024, one was found that contains over 41 million digits. And to tie it all together, there is a paper by José Latorre and German Sierra that proposes a quantum algorithm for searching for Mersenne primes which references Shor’s algorithm. The close relationship between mathematics and computing is and always will be a constant.
