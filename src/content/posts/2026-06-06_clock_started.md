---
title: "Executive Order"
date: 2026-06-26
author: "dpp"
---

# The PQC Clock Started on June 22

*A note to the federal agency leads who just took on post-quantum cryptography migration.*

On June 22, 2026, the President signed an executive order, [*Securing the Nation Against Advanced Cryptographic Attacks*](https://www.whitehouse.gov/presidential-actions/2026/06/securing-the-nation-against-advanced-cryptographic-attacks/). It sets a clear national timeline for moving every federal agency to post-quantum cryptography (PQC) — and the clock is already running.

Maybe you've just been named your agency's PQC migration lead. If so, this one's for you: the first move is yours, and there's a way to make it a fast one.

Here's the clock, in plain terms:

- **30 days** to name a migration lead. (If you're reading this, that's probably you.)  
- **120 days** to submit your PQC Migration Plan. The Office of Management and Budget's implementing memo — [M-26-15](https://www.whitehouse.gov/wp-content/uploads/2026/06/M-26-15-Execution-of-the-Migration-to-Post-Quantum-Cryptography.pdf), issued June 24, two days after the order — sets the deadline at late October. The plan has to prioritize your high-value and high-impact systems and name the automated tools you'll use to inventory their cryptography.  
- **270 days** until the Cybersecurity and Infrastructure Security Agency (CISA) publishes the minimum elements of a Cryptographic Bill of Materials — a CBOM, the machine-readable list of every piece of cryptography inside your software.  
- **2030, then 2031** — the deadlines to move key establishment, and then digital signatures, to quantum-resistant algorithms.

Look at the shape of it. The near-term work is inventory and prioritization — building a clear picture of the cryptography you have and where it lives, then ranking it for migration. OMB calls this the first phase; the remediation deadlines come after it.

So your near-term focus is that plan, and a strong plan starts with a strong inventory. Assemble it the traditional way, booking time with system owners, PKI administrators, and infrastructure teams — talented people carrying their own roadmaps and deadlines — and the calendars fill up fast.

Here's the good news: that inventory is the part Spice Labs can take off your plate this week.

Point Spice Labs Surveyor at your artifact repository — Artifactory, Docker Hub, wherever your built software lives — and it inventories the cryptographic libraries and materials inside every artifact and sorts them red, yellow, green, so you can prioritize the work. No source code, no agents, running on a machine inside your own boundary — fully air-gapped. While you're still booking those meetings, Spice Labs has already finished the inventory. You get ground truth without scheduling a single meeting.

The order also draws a clear line between two layers of cryptography and sets a deadline for each: the key establishment behind your network handshakes by 2030, and the digital signatures applied inside your applications by 2031\. That second layer is where forgery lives — a forged signature can produce an authoritative-looking software update, payment instruction, or UAV command that was never real. The network and certificate tools you already run secure the handshakes. The signatures are applied in your compiled applications: in the artifact.

Today, Surveyor goes deepest on the Java Virtual Machine (JVM) — Java, Scala, Kotlin — resolving cryptography down to the call site, including where each signature is applied. That's the depth the remediation phase will call for. .NET is close behind, with more languages arriving through the year. By the time you move from inventory to remediation, Surveyor will be ready for it.

Don't take my word for any of it. Watch five minutes: we point Surveyor at a repository, pull the full package list, choose our targets, and generate CBOMs with the cryptographic call sites identified and rated red, yellow, green — then show a couple already built.

[**Discover Post-Quantum Crypto Risks With CBOMs →**](https://www.loom.com/share/e511ee55a22f4002b3566ce37a178043)

It's a real body of work on a short clock, and the agencies that start now will set the pace instead of chasing it. We built Surveyor to make the first step — a clear inventory of your cryptography — the easy one. It's ready for you today.


