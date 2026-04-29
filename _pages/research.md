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

A mouse running down a cue-free virtual corridor has to know when the hidden reward zone is near. There are no landmarks to lean on, so the animal has to integrate self-motion: how long it has been running, how far it has travelled, and when a reward-seeking lick should begin. This is the behavioural problem at the centre of my PhD.

The hippocampal CA1 area contains population dynamics suited to this problem. Some cells, which we call **PyrUp** neurons, fire strongly at the start of the run and then ramp down over the next few seconds; **PyrDown** neurons show the opposite pattern. These dynamics can track elapsed time or distance from the start of movement. My project asks what tunes them at the moment behaviour actually depends on them.

The answer points to the locus coeruleus (LC), a small brainstem nucleus usually described as a diffuse norepinephrine or noradrenaline system for arousal and attention. In this task, the LC behaves more precisely. Brief LC activity at run onset is followed by dopamine transients in hippocampal CA1 that last seconds, remain spatially confined to micrometre scales around LC axons, and selectively bias CA1 dynamics toward the PyrUp state.

## what the work shows

- **LC activity marks the start of estimation.** A major subset of catecholaminergic LC neurons burst at trial-start run onset, when the animal begins estimating time or distance. The response is not explained by running speed alone, predicts first-lick timing, and optogenetic amplification delays reward-seeking without reducing running or reward rate.
- **The LC signal reaches CA1 as dopamine.** Local CA1 pharmacology points to D1-like dopamine receptors rather than alpha-1 or beta adrenergic receptors as the relevant pathway for task performance. Two-photon dLight imaging shows that LC activation and natural run onset both produce fast dopamine signals in CA1.
- **The signal is local, not merely broadcast.** These dopamine transients are concentrated near LC axon segments, decay within seconds, and fall off over only a few micrometres. That challenges the simplest volume-transmission picture of neuromodulation as a slow, region-wide bath.
- **Local dopamine is linked to CA1 population state.** CA1 neurons with run-onset dLight signals are enriched for PyrUp dynamics, and D1-like receptor blockade reduces PyrUp recruitment. The behavioural shift, dopamine signal, and CA1 population change all meet at the same timescale.
- **A compact model reproduces the selectivity.** I built a phenomenological LC-DA-CA1 model in which a phasic LC signal is transformed into a delayed dopamine drive acting on a synthetic CA1 population. With state-dependent dopamine sensitivity, the model reproduces selective PyrUp enhancement without requiring a hard-wired molecular cell type for PyrUp neurons.

## methods and tools

The project sits between systems neuroscience and quantitative analysis. It combines:

- head-fixed virtual-reality navigation in a cue-free corridor;
- extracellular recordings and opto-tagging of LC and CA1 neurons;
- optogenetic activation of LC cell bodies and LC-CA1 axon terminals;
- local CA1 pharmacology for dopamine and adrenergic receptors;
- two-photon imaging with dopamine and calcium sensors, including dLight, GCaMP, and jRGECO;
- Python analysis pipelines for behaviour, electrophysiology, imaging, statistics, and figure generation;
- computational modelling of LC-DA-CA1 population dynamics.

## why it matters

Classical neuromodulation often sits at the wrong temporal scale for ongoing behaviour: too slow, too diffuse, too global. The manuscript argues for an intermediate mode. LC dopamine can act neither like a millisecond synapse nor like a minutes-long arousal bath, but as a seconds-timescale, micrometre-scale signal that prepares a hippocampal computation at the moment a decision begins to unfold.

For computational neuroscience, that matters because models of memory-guided behaviour often need a mechanism that changes circuit state quickly without rewriting the whole network. Fast local neuromodulation is one candidate for that missing control signal.

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

**Fisher Lab, Queen Square Institute of Neurology, UCL**

*Summer intern* · July 2018-August 2018

Genetics Society Genes and Development Summer Studentship. I studied cathepsin B activity deficits in mouse models of Down syndrome-associated Alzheimer's disease pathology, using western blotting and protein activity assays to quantify active cathepsin B, pro-cathepsin B, and S100B.

---

## publications and code

Wu Y, Mumford P, Noy S, Cleverley K, Mrzyglod A, **Luo D** et al. Cathepsin B abundance, activity and microglial localisation in Alzheimer's disease-Down syndrome and early onset Alzheimer's disease: the role of elevated cystatin B. *Acta Neuropathologica Communications* 11, 132 (2023). [doi:10.1186/s40478-023-01632-8](https://doi.org/10.1186/s40478-023-01632-8)

Research code and cleaned analysis material will be linked through [GitHub](https://github.com/dinghaoluo) and [ORCID](https://orcid.org/0000-0002-3036-1187) as the manuscript moves toward publication.
