---
title: "Working memory without the scalpel"
type: "feature"
byline: "Lindsay Li & Dinghao Luo"
outlet: "Neu-Reality"
date: 2021-03-16
image: "/assets/images/writing/working_memory.jpg"
section: "online"
links:
  - label: "Original (Chinese)"
    url: "https://mp.weixin.qq.com/s/5g1V5Mrtwy2rhFLkOj6N4g"
excerpt: "From Miller's magical number seven to alpha-wave perturbation: how working memory became something one can manipulate without opening the skull."
---

<span class="dropcap">W</span>**orking memory** is the cognitive system responsible for the temporary storage and online manipulation of information. In a modern world saturated with stimuli, the execution of complex cognitive tasks depends heavily on working memory. Its capacity is therefore a key index of cognitive ability, and one of the most important open problems in cognitive psychology.

Beyond the perhaps most famous finding in the field, George Miller's 7 plus or minus 2 rule,\* working memory has another striking property: information stored within it can resist the erosion of time. For half a century, researchers have sought to explain how. In the 1970s, Alan Baddeley proposed his classic three-system model, which offered an account of the maintenance mechanism: attention, instantiated as the central executive (CE), is essential for sustaining stored information. Though the three-system model remains contested, the concept of the central executive inspired the theory of attentional refreshing, which holds that during the maintenance phase of working memory, attention continuously refreshes stored representations, keeping them in an active state.

\**Miller proposed that the capacity of immediate memory is approximately 7 chunks (Miller, 1956). More recent work indicates that without mnemonic strategies, working memory capacity is typically 3 to 4 chunks (Cowan, 2001; Luck and Vogel, 1997).*

At the single-neuron level, animals often encode information through spiking activity. As early as 2003, Jung and colleagues at Ajou University in South Korea found that during working memory tasks, some neurons in the prefrontal cortex (PFC) fire persistently throughout the retention stage, producing what is known as 'delay activity' (for a review, see Sreenivasan and D'Esposito, 2019).

This type of delay activity can be observed in various forms across non-human primates and humans. In human participants, for example, functional magnetic resonance imaging (fMRI) detects delay-period activation in the medial temporal lobe, a potential signature of tens or hundreds of millions of neurons cooperating to maintain working memory.

### Attractor models

Computational neuroscience has traditionally modelled this delay activity using attractor models, which originated in the artificial intelligence community in the 1970s with work by Hopfield and others. In an attractor model, the brain encodes memoranda using a low-dimensional 'elevation map' studded with 'peaks' and 'valleys' (see Figure 1). One can imagine the brain occupying some state S, a point on this map. Under the influence of 'gravity', S rolls downhill into a valley; these valleys are the attractors. If the brain maintains this landscape throughout the retention period, then during subsequent recall an external stimulus can rapidly push S into a specific attractor, retrieving the corresponding memory.

This formulation has a limitation, however: it can only encode discrete working memories. To address this, Carlos Brody (then at Cold Spring Harbor Laboratory, now at Princeton) and colleagues proposed a 'continuous attractor model' for working memory in 2003 (see Figure 2). In a continuous attractor model, the attractor is typically ring-shaped, supporting the encoding of continuously varying stimuli such as colour, pointer direction, or object temperature.

In some respects, attractor models account well for experimental data. Delay activity appears to be a population-level phenomenon, consistent with the model's assumption of a population code. Working memory during the retention period is susceptible to internal noise, degrading as the retention interval lengthens; continuous attractor models are similarly susceptible to noise, exhibiting representational drift that impairs task performance.

Yet a problem emerges: continuous attractors are fragile. They are vulnerable not only to internal noise but also to external perturbation. Moreover, they struggle to explain how working memory can simultaneously maintain representations of multiple items. One can replace the continuous attractor with a set of high-precision discrete attractors, but the neural architecture required for such attractors is so specialised and complex that it is unlikely to exist in the human brain.

### Short-term plasticity as an alternative

Some computational neuroscientists have therefore argued that delay activity is not strictly necessary for working memory. Short-term plasticity (STP) offers a mechanism by which recent neural activity is recorded in the synaptic weights between neurons, even in the absence of ongoing spiking. In this framework, the pattern of synaptic strengths forms a 'matched filter': future inputs that resemble earlier inputs elicit stronger neural responses, thereby retrieving the corresponding memory. This is the STP model.

Experimental evidence suggests that STP can store memories for approximately one second without any neural activity. Longer working memory requires periodic consolidation of the matched filter, which is perhaps the function of delay activity: spontaneous random noise within the network may trigger synaptic consolidation.

The STP model and the attractor model are not mutually exclusive. Models that combine both are known as 'hybrid models'. Hybrid models resolve the instability problem of simple attractor models and can continue encoding new information while maintaining existing memories. These two advantages have made hybrid models the most widely used neural models of working memory today.

### Manipulating working memory from outside the skull

A 2021 study, with Li Jiaqi and Huang Qiaoli as co-first authors and Luo Huan and Mi Yuanyuan as corresponding authors, was published in *Progress in Neurobiology*. In this work, the researchers successfully modulated working memory performance by varying the luminance of discs presented during the retention period.

In the experiment, participants were shown two bar stimuli in sequence, each oriented differently, and asked to remember both orientations. After the stimuli disappeared, two flickering discs appeared on screen, their colours matching the two preceding bar stimuli. The discs then disappeared, and participants were cued to use a mouse to rotate a bar to reproduce the orientation of either the first or the second stimulus.

The key manipulation lies in the discs presented during retention. Their colour information is task-irrelevant. Their luminance is drawn from a randomly generated white-noise sequence, and the two discs can flicker either synchronously (synchronous condition) or independently (baseline condition). The researchers hypothesised that manipulating the synchrony of the two discs' flicker would modulate task performance.

Under the baseline condition, participants recalled the first stimulus less accurately than the second, exhibiting the classic recency effect; this matched performance in a control condition with no discs at all. Under the synchronous condition, the recency effect was disrupted. The researchers interpreted this as evidence that disc synchrony during retention modulates memory performance.

To investigate the mechanism further, the researchers asked whether, when the two discs share the same luminance sequence but are temporally offset, the order of offset affects performance. Specifically, they tested whether a 200-millisecond lead of the left disc (same-order condition, matching the presentation order of the memory items) versus a 200-millisecond lead of the right disc (reversed-order condition) would differentially affect recall accuracy. The results confirmed their prediction: in the reversed-order condition, the recency effect was converted into a primacy effect.

The researchers note that this 'dynamic perturbation' paradigm, a non-invasive experimental manipulation, can alter participants' working memory performance below the threshold of their awareness, converting recency effects into primacy effects. Because the paradigm manipulates the relative relationship between two memory items rather than absolute memory strength, they argue that it may probe mechanisms closer to the neural network's substrate.

### Modelling the perturbation

Following the behavioural results, Luo Huan's laboratory collaborated with Mi Yuanyuan at Chongqing University to model the phenomenon. Consistent with the current consensus, they built a hybrid model combining a continuous attractor with STP. Each neuron on the attractor ring maintains reciprocal connections with a shared inhibitory pool, establishing the 'Mexican hat' connectivity profile commonly used in memory research. This connectivity permits only a single 'bump' of activity on the continuous attractor, corresponding to a specific stimulus orientation; external stimuli can push this bump along the ring. STP stabilises the attractor dynamics. The modelling results show that this hybrid model, when subjected to dynamic perturbation, reproduces the behavioural patterns observed in human participants.

The Luo Huan laboratory has thus developed a non-invasive 'dynamic perturbation' paradigm capable of manipulating human working memory through external stimulation, and, in collaboration with Mi Yuanyuan, has elucidated its putative neural basis. The research team likens the paradigm to a behavioural-level analogue of optogenetic control: a way to reach inside the skull without opening it.

> A way to reach inside the skull without opening it.
{: .pullquote .pullquote--compact}

<div class="source-note" markdown="1">
**References**

1. Cowan, N. 'The magical number 4 in short-term memory: a reconsideration of mental storage capacity.' *Behavioral and Brain Sciences*, 2001, 24: 87–185.
2. Miller, G. A. 'The magical number seven, plus or minus two: some limits on our capacity for processing information.' *Psychological Review*, 1956, 63: 81–97.
3. Luck, S. J. and Vogel, E. K. 'The capacity of visual working memory for features and conjunctions.' *Nature*, 1997, 390: 279–281.
4. Sreenivasan, K. K. and D'Esposito, M. 'The what, where and how of delay activity.' *Nature Reviews Neuroscience*, 2019, 20(8): 466–481.
5. Li, J., Huang, Q., Han, Q., Mi, Y., and Luo, H. 'Temporally coherent perturbation of neural dynamics during retention alters human multi-item working memory.' *Progress in Neurobiology*, 2021.

*Originally published in Chinese on [Neu-Reality](https://mp.weixin.qq.com/s/5g1V5Mrtwy2rhFLkOj6N4g), March 2021.*
</div>
