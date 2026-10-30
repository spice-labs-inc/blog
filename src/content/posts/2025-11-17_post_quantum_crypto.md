---
title: "Haystacks and Post-Quantum Crypto"
date: 2025-11-16
author: dpp
---

# Haystacks and Post-Quantum Crypto

Our IT landscape is haystacks as far as the eye can see.

How did those haystacks get there? Maybe it was a series of acquisitions. Maybe it was the "almost complete" cloud migration.

But what's more important... what needles are in which haystacks?

A set of needles we're starting to look for are the right and wrong cryptography libraries.

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/d143225c1b7a4e42a7f440635a8da4bf" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Post Quantum Cryptography

The time is now to begin addressing the eventual arrival of “Q-Day” – the moment when a cryptographically capable quantum computer achieves the capability to crack current encryption algorithms. Although experts estimate that milestone won’t arrive until the early 2030s, others such as Gartner predict existing cryptography will be unsafe by 2029.

Governments have already set deadlines for upgrading systems used by their agencies; and regulators are imposing similar deadlines for at-risk sectors such as financial services and healthcare. Upgrading to post-quantum crypto proof solutions begins by first identifying where at-risk encryption algorithms are present in applications. Spice Labs is an ideal tool for surveying a software stack, pinpointing the issue, and tracking progress towards post-crypto compliance.

Simply use [Spice Labs' Surveyor](https://github.com/spice-labs-inc/spice-labs-cli?tab=readme-ov-file#-quick-start) to build
Artifact Dependency Graphs (ADGs) of docker containers, JAR files, and even VM images. No need to change engineering process.

Securely upload to Spice Labs' Topographer. Click a button and get reports:

![PQC Report Summary](/images/pqc_report_1.png)

![PQC Report Drill-down](/images/pqc_report_2.png)

## The Power of Math

Spice Labs uses to power of math, specifically Merkle Trees, just like [Git](https://git-scm.com/). Spice Labs
can scale to millions of artifacts. In fact, Spice Labs has a database that captures the connections
across Java open source, Debian, and Ubuntu. 55M packages results in a 13B node graph... all served
from a single, commodity box.

Surveyor builds ADGs of post-build artifacts.
No need to change engineering process.
Just point Surveyor at Docker images, JAR files, and even VM images.

If you want to integrate Surveyor into your CI pipeline, there's a [GitHub Action](https://github.com/spice-labs-inc/action-spice-labs-surveyor)
for that.

## Nested Haystacks

The power of math... the power of Artifact Dependency Graphs, extends beyond scalability.

Spice Labs captures nested relationship. This means an [RC2](https://en.wikipedia.org/wiki/RC2) encryption class that an engineer
[vendored](https://gist.github.com/datagrok/8577287#why-is-vendoring-bad) into a JAR will be discovered when
Surveyor does its thing.

Further, Topographer's query function answers the question, "show me all the artifacts that contain class X or package Y."

![PQC Report Drill-down](/images/nested_class.png)

## Make the Next log4shell Boring

There's going to be another [log4shell](https://en.wikipedia.org/wiki/Log4Shell).

Those of us who lived through December 2021 would have loved to have what Spice Labs is delivering today:
a database that can be queried to show every artifact that contains a particular version of a library.

Spice Labs makes the next log4shell a boring database query... well... followed by some remediation.

More importantly, knowing the assets that are vulnerable within minutes of a critical vulnerability
being announced gives security teams a punch-list of what to secure and what to wrap "application firewalls"
around.

## Knowing your Systems

Because Spice Labs gives you a database of what's in all the haystacks across
your enterprise, you have the the situational awareness to chart your course
and make the right decisions.

Start surveying to plan for Post Quantum Crypto today. Those same surveys... that
same database... will have a myriad of positive applications across both
the security and engineering side of your organization.
