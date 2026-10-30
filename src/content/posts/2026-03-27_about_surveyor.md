---
title: "About Spice Labs Surveyor"
date: 2026-03-27
author: sdh
---

When you're looking at Spice Labs, one of your first questions is likely "Where do I start?" There are several interconnected
technologies and apps that make up the Spice Labs arsenal, but I'm going to start by talking about Spice Labs Surveyor and how
it works under the hood as well as talking about issues of trust and privacy.

## About Surveyor

Spice Labs Surveyor is a gateway script. It is used to perform two related tasks:

- Build an Artifact Dependency Graph (ADG) of your software with Goat Rodeo
- Securely upload the resulting ADG to the Spice Labs repository with Ginger-j

Surveyor has two primary ways of running these tasks, directly through the Surveyor Java app, or indirectly through
a Docker image. This touches on one of the key tenets of Spice Labs: we understand software and tools and we understand
when our clients are reluctant to trust tools. Surveyor will be running on your system and looking at your files. This is
why not only _can_ our tools run from within a Docker image, we _encourage_ you to do that. This way you can control exactly
what can and more importantly what cannot be seen by Surveyor.

When you supply Surveyor with `--input` and `--output` arguments, it will remap them to mounted volumes in the Docker
image at `/mnt/input` and `/mnt/output` ensuring that only those pieces are visible.

By default Surveyor will do both a scan and an upload, but these can be broken into separate tasks if need be.

## Scanning Your Files

Inside the Docker image, Surveyor runs a small Java app that interprets command line arguments to perform the scan and
upload. Scanning is the process of locating files of interest and building the ADG. This is done through Goat Rodeo.
Goat Rodeo builds collections of hashes and associations between nodes in the graph. It also has the ability to look
inside of containers and containers of containers etc. Have a Docker image of a server deployment? No
problem.

## Uploading the ADGs

In order to upload files, you need to [create a Spice Pass](https://docs.spicelabs.io/docs/howtos/dashboard-setup/). This is
your means of authentication for securely uploading your data. Data gets uploaded via Ginger-j and will be accessible from your
dashboard.

## Tag Your Data

How many server deployments do you run? How many versions of the images do you have? How often do your deployments change?
Like most companies, you are no doubt running multiple deployments with several (possibly) different versions and you
keep old images in case you have to roll back changes. You also probably run an agile house with changes happening frequently.
By tagging your ADGs, you can help keep track of them from the Spice Labs dashboard. Tags enable you to do that. There is
a main tag through the required `--tag` argument. Think of your tag as a project name. If you use the same tag multiple
times, the dashboard will differentiate them on date uploaded. But in addition to this, you can add extra JSON to the data
with the `--tag-json` argument which will let add extra metadata to the uploaded data.

## It's Your Data, Not Ours

When you upload your ADGs, your data is encrypted and only you can decrypt it. We don't claim ownership to your data.
We'll help you navigate it and see what issues may exist in your installed code, but only you hold the keys to your data.

## Why Should You Trust Us?

We understand that trust is hard won and easily lost. Spice Labs does a number of important things to earn your trust.
The first is that we aren't just part of the open source community, we have embraced it. This is important because
when we work in the open, you can apply the Zero Trust approach of "never trust, always verify". If you want to see
the script that starts Surveyor, it's right [here](https://github.com/spice-labs-inc/spice-labs-cli). Want to see
the code behind Goat Rodeo? Sure, go [right ahead](https://github.com/spice-labs-inc/goatrodeo). Same with
[Ginger-j](https://github.com/spice-labs-inc/ginger-j).
We want _you_ to be the steward of your data, not us. Security is always a top priority and knowing that your data
is not only safe, it is secure and inaccessible outside of your Spice Pass.

## Conclusion

Spice Labs Surveyor is a straight-forward tool for building ADGs of your installations and deployments and ensuring that
they are securely uploaded for analysis. Whether you're trying to prevent or remediate security issues in your software
or trying to build a roadmap of the work needed to prepare yourself for Post Quantum Cryptography (PQC), Spice Labs has you
covered. To get started, email [sales@spicelabs.io](mailto:sales@spicelabs.io).
