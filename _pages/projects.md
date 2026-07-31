---
layout: single
author_profile: true
permalink: /projects/
title: "projects"
classes: projects-page
last_updated: 2026-07-28
---

<h1 class="screen-reader-text">projects</h1>

<p class="projects-page__contents-label">on this page...</p>

<nav class="home-project-index projects-page__index" aria-label="projects on this page">
  <a href="#fibre-sight">
    <strong>FibreSight</strong>
    <span>U-Net workbench for segmentation of neural fibres in two-photon images</span>
  </a>
  <a href="#kairos">
    <strong>Kairos</strong>
    <span><i>Do field states predict scientific breakthroughs?</i></span>
  </a>
  <a href="#lc-ca1">
    <strong>LC–CA1</strong>
    <span>multimodal neural data analysis pipelines for ephys and imaging data</span>
  </a>
  <a href="#the-zone">
    <strong>The Zone</strong>
    <span>a computational analysis of <em>Gravity's Rainbow</em> (1973)</span>
  </a>
</nav>

---

<h2 id="fibre-sight"><a href="https://github.com/dinghaoluo/fibre-sight">FibreSight</a></h2>

As the saying goes, 'if necessity is the mother of invention then laziness is the father', I abhorred the nights when I spent tens of hours toiling over two-photon images trying to segment locus coeruleus axons for analysis, and in my desperate attempt to escape that dullness I *had to* automate it. Even with the help of the [MSER algorithm](https://en.wikipedia.org/wiki/Maximally_stable_extremal_regions), each session still required upwards of an hour of work to segment, and different people also have different judgements (which is the polite way of saying that my own segmentation on a Friday evening was not quite my segmentation on a Tuesday morning), making standardisation impossible. That was why I decided to use a convolutional neural network-based method to accelerate this process.

<figure class="writing-insert project-story__figure project-story__figure--fibre">
  <div class="project-story__media-row">
    <img src="/assets/images/projects/fibre-sight-workbench.png" alt="" width="1280" height="820" loading="lazy">
    <img src="/assets/images/projects/fibre-sight-predict-curate.gif" alt="" width="1280" height="820" loading="lazy">
  </div>
  <figcaption>demo of the workbench; coloured areas are locus coeruleus axons predicted by the checkpoint model</figcaption>
</figure>

I trained a small PyTorch U-Net on the tens of `segmented axon: coordinates` dictionaries and images, and built a Qt GUI around it. The model is tuned to over-propose (prefer false positives over false negatives), since removing a falsely identified axon is easy work whereas adding one in by hand is much more difficult, which is why on nine held-out sessions it reaches 0.93 recall against 0.60 precision, with a 0.83 F<sub>2</sub>.

This workbench has helped reduce the time it takes for me and my colleagues to segment neural fibres from hours or days to mere minutes, and has proven reproducible in images using fluorescent markers other than the original tdTomato.

<nav class="project-links" aria-label="FibreSight repository">
  <a href="https://github.com/dinghaoluo/fibre-sight" class="site-nav-link">→ repository</a>
</nav>

<h2 id="kairos"><a href="https://github.com/dinghaoluo/kairos">Kairos</a></h2>

Thomas Kuhn, in <em>The Structure of Scientific Revolutions</em> (1962), wrote that paradigm shifts in science arrive when a field is ready for them. Gregor Mendel published his pea experiments in 1866 and was not properly read until 1900, sixteen years after his own death; Alfred Wegener proposed continental drift in 1912 and had to wait for the seafloor-spreading and magnetic-anomaly evidence of the 1960s before anyone found him persuasive. Unfortunately, at the time when Kuhn observed this, he did not have the information architecture that we have nowadays to quantify this 'readiness'. I wanted to ask whether we could now measure this readiness for a breakthrough. In <b>Kairos</b> (borrowed from ancient Greek, roughly 'the critical time for action'), I explore whether machine learning can estimate this readiness and predict, with careful constraints that prevent temporal leakage, whether a breakthrough would happen at each timepoint. I am currently taking as the first case study the field of neural networks.

<figure class="writing-insert writing-insert--left project-story__figure project-story__figure--kairos">
  <img src="/assets/images/projects/kairos-ap-comparison.png" alt="" width="1800" height="1040" loading="lazy">
  <figcaption>selected average-precision comparisons on reviewed gap years; orange line marks outcome prevalence (= positives / all)</figcaption>
</figure>

The bibliographic data used in this project mostly come from [OpenAlex](https://openalex.org), which (in a good way) does not label 'breakthrough papers', so I had to review and curate hundreds of unique works across the past century by hand. The temporal constraints, however, turned out to be unexpectedly difficult to deal with: everyone can identify breakthroughs in hindsight, but since I wanted to ask about a field's *readiness* for breakthrough, this hindsight is out of bounds for us 'at prediction time', borrowing a term from machine learning. For this reason, I built the field-state features with lags such that each year only sees its own past, and ran expanding-window validation with detrending and event-year exclusions.

However, I am currently running into some issues, the biggest of which being that because the targets are 'breakthrough year' (say, 1933 would be 1, and 1934 would be 0), the publication volume in each year and the years shortly prior would provide a lot of information about how likely a breakthrough occurs. This turns the model into a volume-predicting device. That is mostly the reason why currently, against baseline, my full 'field-state' vector does not give much better predictions. A flexible spline on the year alone reaches 0.866 average precision, adding the whole field-state vector to it reaches 0.869, and publication volume + the same year spline reaches 0.871, so *counting* the papers does as well as *characterising* them...

<figure class="writing-insert writing-insert--right project-story__figure project-story__figure--kairos">
  <img src="/assets/images/projects/kairos-score-timeline.png" alt="" width="2200" height="1280" loading="lazy">
  <figcaption>out-of-sample scores across 'breakthrough years', which are marked by black ticks on top</figcaption>
</figure>

But of course frustration was always going to be a given in a project with any ambition at all, and I have thought of some potential solutions that I am going to try out next. I will separate 'an important paper appears' from 'the field changes direction', rebuilding the target labels around human-reviewed field-reorienting papers and field-reorienting episode onsets. This will also need to normalise for the volume of papers coming out in each year, so that quantity no longer confounds our analysis. The neural-network history currently contains only about nine independent burst episodes, so I may have to carry the question across several fields before the sample can support a serious answer.

<nav class="project-links" aria-label="Kairos repository">
  <a href="https://github.com/dinghaoluo/kairos" class="site-nav-link">→ repository</a>
</nav>

<h2 id="lc-ca1"><a href="https://github.com/dinghaoluo/lc-ca1-project">LC–CA1</a></h2>

You can read more about my PhD work [here](/science/#current-project), but in short, I spent most of my PhD on one question: whether a brief burst of dopamine from the locus coeruleus (a tiny brainstem nucleus) improves an animal's performance during goal-directed behaviour.

<figure class="writing-insert writing-insert--right project-story__figure project-story__figure--lc-ca1">
  <img src="/assets/images/science/lc-ca1-model-schematic-figure6ab.webp" alt="" width="1400" height="1016" loading="lazy">
  <figcaption>example schematic of the LC–CA1 circuit for the modulation of goal-directed behaviour; bottom shows my computational model</figcaption>
</figure>

Answering it took hundreds of animal recording sessions and nearly a hundred terabytes of behaviour, electrophysiology and dual-colour two-photon imaging, plus optogenetic and pharmacological interventions. The public repository stores my analysis pipelines, reorganised into reproducible code with CLI support. The manuscript, <i>Locus coeruleus dopaminergic control of prospective dynamics in the hippocampus</i>, has been submitted to <i>Cell</i>.

<nav class="project-links" aria-label="LC–CA1 repository">
  <a href="https://github.com/dinghaoluo/lc-ca1-project" class="site-nav-link">→ repository</a>
</nav>

<h2 id="the-zone"><a href="https://dinghaoluo.github.io/the-zone-site/">The Zone</a></h2>

Thomas Pynchon's <i>Gravity's Rainbow</i> (1973) is my second favourite book, and weeks after finishing it a second time I thought to myself: the hundreds of characters move around Europe and form such a vast and complicated network... why don't we build some analyses on it? It turned out that <i>Gravity's Rainbow</i> is not only a good book, but also a terrible dataset, where characters blend into aliases and shorthands that took me a while to disentangle, and geographic locations are mentioned in an incredibly scattered way, not to mention the infinitely complex plotlines. That was why, for instance, initially named-entity recognition (NER) trained on ordinary fiction invented a long tail of characters who do not exist, so I had to curate the aliases against the text by hand.

<figure class="writing-insert writing-insert--left project-story__figure project-story__figure--zone">
  <img src="/assets/images/projects/the-zone-glossary.png" alt="" width="3022" height="1674" loading="lazy">
  <figcaption>the live site's Glossary page</figcaption>
</figure>

But after a lot of preprocessing I was finally able to ask what I wanted to ask: who is present with whom, how the different narratives braid into each other, where the languages and the geography intersect, and the age-old question of 'is <i>Gravity's Rainbow</i> a misogynistic book?' Right now, two of the 7 planned sections are live, including a detailed Glossary of the critical terms in the novel as well as a list of strong references for intrigued readers who want extra insight.

Only the public-safe exports are deployed; the source text and the analytical pipelines are kept in a private repository.

<nav class="project-links" aria-label="The Zone site">
  <a href="https://dinghaoluo.github.io/the-zone-site/" class="site-nav-link">→ site</a>
</nav>

<p class="projects-updated">Last updated {{ page.last_updated | date: "%B %Y" }}</p>
