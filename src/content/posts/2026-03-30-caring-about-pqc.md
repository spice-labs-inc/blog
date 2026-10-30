---
title: "Why You Should Care About Post Quantum Cryptography (PQC)"
date: 2026-03-27
author: sdh
---

In this article, I'm going to give a quick survey of "how we got here" to help you understand cryptography and why and how cryptography as we know it is over.

People have always communicated and as long as we have had communication, we have wanted to ensure that some communication
should be only accessible by a select group of people. Restricting access was done in the past by simple means such as substitution ciphers, like the
well-known Caeser cipher or wheel encoders such as the Jefferson cipher, or with "security by obscurity" where you use a different
language, such as the famous Navaho [code talkers](https://en.wikipedia.org/wiki/Code_talker) in World War II who transmitted
secure communications in Navaho.

But there are more applications of cryptography than hiding sensitive communications from prying eyes. Another use is to verify authenticity. This is not
to keep someone from snooping on communication but instead to be able to verify that communication or other digital assets are
exactly as the author(s) intended. For example, if you have ever digitally signed a contract, the document has been
correspondingly signed with encryption tools to ensure that the document wasn't subsequently altered by a malicious agent.

About 1500 years ago, the mathematician Sunzi Suanjing published a theorem about the relationship of remainders in integer
division. This theorem is the basis of most modern encryption systems, which by and large depend on the product of two large
prime numbers. In order to break encryption, you need to be able to find the two large primes by factoring their product.
This was chosen because factoring, while straight-forward, is an exponential algorithm. This means that as the size of the
number increases, the time it takes to do the work grows by an exponent. The simplest way to visualize this is the penny payment
scenario: on the first day of a month you give me a penny and each subsequent day you give me double the number of pennies.
At the end of the month, you will have paid me 2<sup>31</sup> pennies or $21,474,836.

The same notion has been used in encryption: that you can easily pick numbers that would require centuries for
current computers to break.

Quantum Computing changes all this.

In 1994, Peter Shor created an algorithm for quantum computation for finding the prime factors of an integer and the solution
can be found in logarithmic time, which makes it very practical for breaking traditional encryption algorithms, including commonly
used algorithms such as RSA and Elliptic-Curve.

If you receive a digital contract, how will you know that it hasn't be altered? If you receive a signed Java jar file, how will
you know it doesn't carry a Trojan horse injected by someone who cracked the signing? If you keep encrypted customer data,
can you say for sure that it's secure?

These are all problems and moving forward in a PQC world software will need to be updated to use algorithms that aren't subject to
attack by quantum algorithms as well as traditional algorithms. These are algorithms that include ML-KEM, ML-DSA, SLH-DSA and
others.

Using these in new software and in your own code base is straight forward.

Or is it?

Every modern piece of software is built with dependencies on other libraries. And those libraries have dependencies. And so on.
It's [turtles all the way down](https://en.wikipedia.org/wiki/Turtles_all_the_way_down).

And what about your production system that has been running "just fine" for years? What do you even have deployed on it? What
was added and what rollbacks changed things? Is the person who did that "quick patch" even still at your company?

When you start asking the question, "is my organization ready for PQC?" you need to also ask, "what software do I have that
is at risk?" because it's not just the software you wrote in house, it's also everything that comes along with it, and that's
a harder list to generate, especially considering how ubiquitous cryptography and cryptographic signing is.

That's where Spice Labs steps in. To find the PQC issues in your own software, email [sales@spicelabs.io](mailto:sales@spicelabs.io).

Remember, PQC is here and Spice Labs will be your partner for ensuring that your code is ready for a PQC world.
