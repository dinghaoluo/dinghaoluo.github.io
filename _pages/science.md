---
layout: single
author_profile: true
permalink: /science/
title: "science"
toc: true
toc_label: "on this page"
toc_icon: ""
---

*Studying how the hippocampus turns movement through space into a timed decision.*

---

## current project

**Rapid locus coeruleus dopamine shapes CA1 dynamics for time/distance estimation**

Manuscript in preparation.

A mouse running through a cue-free virtual corridor has to estimate when the hidden reward zone is near. There are no landmarks to lean on, so the animal has to integrate self-motion: how long it has been running, how far it has travelled, and when a reward-seeking lick should begin.

My PhD asks how the brain puts that computation into the right state. The project points to a compact answer: phasic activity in the locus coeruleus (LC) produces a fast, local dopamine signal in hippocampal CA1, and that signal biases CA1 population dynamics toward a run-onset **PyrUp** state.

## what we found

**LC activity marks the start of estimation.** A major subset of catecholaminergic LC neurons bursts at trial-start run onset. The response is not explained by running speed alone, predicts first-lick timing, and optogenetic amplification delays reward-seeking without reducing running or reward rate.

**The LC signal reaches CA1 as dopamine.** Local CA1 pharmacology points to D1-like dopamine receptors rather than alpha-1 or beta adrenergic receptors as the relevant pathway for task performance. Two-photon dLight imaging shows that LC activation and natural run onset both produce fast dopamine signals in CA1.

**The dopamine signal is local and short-lived.** Around LC axons in CA1, dLight responses are strongest near the axon pixels, fade over micrometre distances, and decay over the next one to two seconds. That is the surprising scale of the result: not a millisecond synapse, and not a slow global bath.

<figure class="writing-insert writing-insert--right">
  <img src="/assets/images/science/lc-ca1-local-dopamine-figure3f.webp" alt="Example LC axon pixels in CA1 with dLight response heatmaps and a response index decay trace." width="1296" height="620" loading="lazy">
  <figcaption>dLight signals concentrate around LC axons in CA1 and decay within seconds after stimulation.</figcaption>
</figure>

**Local dopamine is linked to CA1 population state.** CA1 neurons with run-onset dLight signals are enriched for PyrUp dynamics, and D1-like receptor blockade reduces PyrUp recruitment. The behavioural shift, dopamine signal, and CA1 population change all meet on the same timescale.

**A compact model reproduces the selectivity.** The model uses three inputs to a synthetic CA1 principal-neuron population: run-related input, reward-related input, and a phasic LC signal transformed into dopamine drive. The run and reward terms follow Raphael Heldman's Nature Communications and bioRxiv models of CA1 principal-neuron dynamics; the new term is the LC-to-dopamine drive.

<figure class="writing-insert writing-insert--right">
  <img src="/assets/images/science/lc-ca1-model-schematic-figure6ab.webp" alt="Schematic of LC axon dopamine near a CA1 PyrUp neuron and a three-input CA1 model with run, reward, and dopamine drives." width="1400" height="1016" loading="lazy">
  <figcaption>The model adds a phasic LC-to-dopamine drive to run- and reward-related inputs, then reproduces selective PyrUp enhancement.</figcaption>
</figure>

## why it matters

The interesting part is the scale. Classical neuromodulation is often treated as diffuse, global, and slow. This project shows an intermediate mode: seconds-timescale, micrometre-scale dopamine that prepares a hippocampal computation at the moment a decision begins to unfold.

For computational neuroscience, that gives models of memory-guided behaviour a plausible control signal. A circuit can change state quickly without rewriting the whole network.

## methods and tools

The project combines head-fixed virtual-reality navigation, LC and CA1 electrophysiology, optogenetics, local CA1 pharmacology, two-photon dopamine and calcium imaging, Python analysis, and compact computational modelling.

---

## outputs

**Manuscript in preparation**

Luo D, Cao J, Heldman R, Tian L, Wang Y. *Rapid locus coeruleus dopamine shapes CA1 dynamics for time/distance estimation.*

**Selected presentations**

- *Locus coeruleus dopamine rapidly modulates CA1 dynamics to sharpen goal-directed navigation.* COSYNE 2026, selected poster.
- *Locus coeruleus dopaminergic modulation of CA1 shapes behavioural timescale dynamics for time integration.* Lake Conference, Seattle, 2025.
- *An LC-CA1 circuit for initiating path integration.* Sunposium, West Palm Beach, 2025.
- *Locus coeruleus regulates hippocampus-dependent integration at single-trial level.* Memory Formation Forum, Max Planck Florida Institute for Neuroscience, 2024.

---

## previous research

**Paulsen Lab, University of Cambridge**

*Undergraduate researcher* · July 2019-April 2020

Undergraduate thesis on dopamine modulation of CA3-CA1 behavioural time-scale plasticity. I used whole-cell patch-clamp electrophysiology to test how dopamine changes CA1 long-term potentiation rules, and found that dopamine reduced the stimulation intensity required for LTP induction. Awarded the Bundy Scholarship.

<figure class="half">
  <img src="/assets/images/science/paulsen-patch-clamp-rig-2019.webp" alt="Patch-clamp electrophysiology rig under a microscope objective in the Paulsen Lab." width="1200" height="900" loading="lazy">
  <img src="/assets/images/science/paulsen-ltp-traces-2019.webp" alt="Computer screen showing long-term potentiation traces from a Paulsen Lab electrophysiology experiment." width="1200" height="900" loading="lazy">
  <figcaption>Patch-clamp rig and LTP traces from the Paulsen Lab period, 2019.</figcaption>
</figure>

**Fisher Lab, Queen Square Institute of Neurology, UCL**

*Summer intern* · July 2018-August 2018

Genetics Society Genes and Development Summer Studentship. I studied cathepsin B activity deficits in mouse models of Down syndrome-associated Alzheimer's disease pathology, using western blotting and protein activity assays to quantify active cathepsin B, pro-cathepsin B, and S100B.

---

## publications and code

Wu Y, Mumford P, Noy S, Cleverley K, Mrzyglod A, **Luo D** et al. Cathepsin B abundance, activity and microglial localisation in Alzheimer's disease-Down syndrome and early onset Alzheimer's disease: the role of elevated cystatin B. *Acta Neuropathologica Communications* 11, 132 (2023). [doi:10.1186/s40478-023-01632-8](https://doi.org/10.1186/s40478-023-01632-8)

Research code and cleaned analysis material will be linked through [GitHub](https://github.com/dinghaoluo) and [ORCID](https://orcid.org/0000-0002-3036-1187) as the manuscript moves toward publication.
