---
title: "AlphaFold, or how to fold graciously"
type: "feature"
outlet: "Scientific American China"
date: 2020-12-02
image: "/assets/images/writing/alphafold.jpg"
section: "online"
links:
  - label: "Original (Chinese)"
    url: "https://mp.weixin.qq.com/s/un5RPtoRn5mlUEkn2-BA1A"
excerpt: "How DeepMind's AlphaFold solved biology's fifty-year grand challenge, and what it means for structural biology, drug design, and the future of AI in science."
---

*[Figure: AlphaFold's predicted structure of the SARS-CoV-2 ORF8 protein, since confirmed experimentally. Image credit: CASP14]*

<span class="dropcap">O</span>n the evening of 30 November 2020, DeepMind announced that its algorithm AlphaFold had cracked the protein folding problem, the fifty-year-old challenge of predicting a protein's three-dimensional structure from its amino acid sequence alone. Christian Anfinsen had conjectured in his 1972 Nobel lecture that the sequence should fully determine the structure. Half a century of attempts to prove him right computationally had produced little but frustration. AlphaFold, in the space of two competition cycles, did what no laboratory had managed.

DeepMind is best known for AlphaGo, the Go-playing system that defeated Lee Sedol and Ke Jie. AlphaFold may prove the more consequential achievement. Following the announcement, *Nature*, *Science*, and other leading journals published reports on the result, and Sundar Pichai, CEO of Alphabet and Google, wrote on Twitter that the advance would 'help researchers tackle new challenges, from fighting diseases to environmental sustainability'.

## The problem

All known life is built from proteins. These molecules are the elementary components through which organisms interact with the world. The photoreceptors in the human eye, for instance, contain opsins, proteins that detect photons and transduce light into the electrochemical signals the brain can interpret. Rhodopsin, the opsin found in rod cells, comprises a chain of 348 amino acids. Its sequence was determined in the 1980s; its three-dimensional structure was not resolved until 2000. That gap of nearly two decades illustrates the core difficulty. A protein's function depends on its folded shape, and under physiological conditions proteins fold spontaneously into their functional conformations within seconds. Determining a protein's amino acid sequence is comparatively straightforward (one can use mass spectrometry), but determining its three-dimensional structure requires X-ray crystallography or cryo-electron microscopy, techniques that are slow, expensive, and far from universally applicable. A reliable computational method would spare scientists years of structural work and even enable the rational design of proteins with novel functions.

The difficulty of the problem has a name: Levinthal's paradox. In 1969, Cyrus Levinthal, a physicist turned molecular biologist, gave a presentation at Allerton House, University of Illinois, in which he laid out a calculation that would haunt the field for decades. Consider a modest protein of 100 amino acid residues. If each residue can adopt roughly three conformational states, the total number of possible conformations is 3^100, approximately 5 × 10^47. Suppose a protein could sample these conformations at the fastest conceivable rate, one every picosecond, or 10^13 per second. Exhaustive search would still require on the order of 10^27 years. The age of the universe is roughly 1.4 × 10^10 years. The conformational space is so vast that a random search would take roughly a hundred quadrillion times the age of the universe to explore. Yet real proteins fold in microseconds to seconds, reliably, every time. That is the paradox: proteins solve, in fractions of a second, a problem whose brute-force solution exceeds the lifetime of the cosmos by seventeen orders of magnitude. Levinthal published this observation as 'How to Fold Graciously' in *Mossbauer Spectroscopy in Biological Systems*, a title whose understatement belies the severity of what it implies. If proteins do not search randomly, they must be guided. The question is how.

The paradox is not merely a curiosity. It means that any computational method aspiring to predict protein structure must contend with the same staggering combinatorial space. Brute-force simulation is out of the question. The algorithm must learn, as evolution did, to navigate the landscape efficiently, or not at all.

## CASP

Biologists began attacking the problem in the 1960s. The 1980s and 1990s saw a flood of proposed solutions; for a time, prediction seemed within reach. When researchers applied these methods to proteins of interest, however, none proved reliable. In 1994, the computational biologist John Moult and colleagues at the University of Maryland established CASP, the Critical Assessment of protein Structure Prediction, a biennial blind competition. Teams predict the three-dimensional structures of proteins whose structures have been experimentally determined but not yet published; adjudicators score each prediction using GDT, the Global Distance Test, which measures the proportion of amino acids whose predicted positions fall within a close threshold of their true positions. The maximum GDT score is 100; a method must exceed 90 to be considered a solution. After twelve rounds of CASP, spanning more than two decades, the high-water mark stood at roughly 40. The competition had become a graveyard of incremental gains: two points here, three points there, each heralded as a breakthrough, each ultimately insufficient.

AlphaFold debuted at CASP13 in 2018 and scored nearly 60, exceeding the runner-up by 15 per cent. That first incarnation, designated AlphaFold1, used convolutional neural networks to predict inter-residue distance distributions and then refined candidate structures through gradient descent, an indirect approach that predicted distances first and inferred coordinates second. It was already a significant advance, but the architecture imposed a ceiling. Two years later, at CASP14, the second-generation system shattered it.

## The architecture

For CASP14, DeepMind rebuilt AlphaFold from the ground up. The resulting system, AlphaFold2, replaced the indirect distance-prediction approach with an end-to-end architecture that outputs three-dimensional atomic coordinates directly.

The algorithm operates in two stages. In the first, multiple sequence alignment compares the target sequence against existing databases to identify amino acids that tend to co-evolve, a signal that those residues are likely to be in physical proximity in the folded structure. This information is encoded as two representations: an MSA representation, capturing evolutionary relationships across aligned sequences, and a pair representation, encoding estimated spatial relationships between every pair of residues. These two representations are processed jointly by the Evoformer, a stack of 48 transformer blocks that constitutes the architectural core of AlphaFold2. Within each Evoformer block, information flows bidirectionally between the MSA and pair representations through attention mechanisms. Crucially, the pair representation is updated using triangular multiplicative updates, operations that enforce geometric consistency: if residue A is near residue B, and residue B is near residue C, the network enforces that the implied relationship between A and C is geometrically coherent. This triangular logic, inspired by the triangle inequality in metric spaces, is what allows the network to reason about three-dimensional structure while processing one-dimensional sequences.

The second stage, the structure module, takes the refined representations from the Evoformer and generates explicit three-dimensional coordinates. It employs Invariant Point Attention (IPA), an attention mechanism that operates on the three-dimensional positions and orientations of residues while remaining invariant to global rotations and translations. Where earlier approaches treated residues in relative isolation, IPA lets the network weigh long-range dependencies across the entire chain in a manner that respects the geometry of physical space. The full pipeline runs through three recycling iterations, each time feeding the output structure back through the Evoformer and structure module, progressively refining the prediction.

The model was trained on approximately 170,000 known protein structures, supplemented by sequence data from large databases including UniProt, using 128 TPUv3 cores over several weeks. The result is an algorithm that can predict a protein's three-dimensional structure within days and estimate the reliability of each region of that prediction.

## CASP14

During CASP's blind review, 'we already knew it had to be AlphaFold,' said the assessor Andrei Lupas; close to two-thirds of its predictions closely matched the experimental structures. The system achieved a median GDT of approximately 92.4, surpassing the threshold that structural biologists had long considered the benchmark for a solved problem. No other group came close.

Mohammed AlQuraishi, a computational biologist at Columbia University, called the result 'one of the most significant scientific results of my lifetime' and predicted that many researchers would now leave the structure-prediction field entirely. The practical implications were immediate. Sickle-cell anaemia, for instance, is caused by a single amino acid substitution sufficient to deform red blood cells into a dysfunctional sickle shape; with AlphaFold, one can predict the structure of the aberrant protein directly from the altered sequence and proceed to targeted investigation. The same logic extends across disease biology and evolutionary biology: wherever structural data has been the bottleneck, AlphaFold removes it.

The achievement also marks a pivot for DeepMind itself. Earlier in 2020, *Nature* published a DeepMind paper that drew on artificial intelligence to reshape how neuroscientists think about the neurotransmitter dopamine. AlphaFold consolidates the company's transition from game-playing demonstrations to tools with direct scientific utility, a shift from spectacle to substance.

## After CASP14

On 15 July 2021, DeepMind published the full AlphaFold2 method and open-sourced its code in *Nature* (Jumper et al., 'Highly accurate protein structure prediction with AlphaFold'). The paper has since accumulated over 30,000 citations, a figure that reflects not merely interest but active use. In the same month, DeepMind partnered with the European Molecular Biology Laboratory's European Bioinformatics Institute (EMBL-EBI) to launch the AlphaFold Protein Structure Database. The initial release covered the proteomes of twenty-one model organisms, including the entire human proteome. In July 2022, the database expanded to over 200 million predicted structures, covering nearly all catalogued protein sequences. More than three million users in over 190 countries have accessed AlphaFold tools, many of them working on organisms and proteins for which no experimental structure had ever been determined. What had been a bottleneck lasting years, sometimes decades, was reduced to a database query.

In May 2024, DeepMind published AlphaFold3 in *Nature*. The third generation replaced the structure module with a diffusion-based architecture and introduced a unified framework capable of predicting the structures of complexes involving not only proteins but also DNA, RNA, small molecules, and ions. On the PoseBusters benchmark for protein-ligand binding, AlphaFold3 achieved 76 per cent accuracy, against 50 to 60 per cent for traditional docking methods. The expansion from single-chain protein prediction to multi-molecular complex modelling marks a qualitative shift in scope.

AlphaFold3's release was accompanied by controversy. Unlike AlphaFold2, whose code was made freely available, DeepMind did not release AlphaFold3's code alongside the paper. *Nature* drew criticism for publishing a method that could not be independently reproduced. Independent groups responded by building their own implementations, including OpenFold3 and Boltz-1. DeepMind eventually released AlphaFold3 code and model parameters for academic, non-commercial use on 11 November 2024, resolving the immediate dispute but not the underlying tension between scientific openness and commercial interest.

In October 2024, the Nobel Committee awarded the Prize in Chemistry jointly to David Baker, for computational protein design, and to Demis Hassabis and John Jumper, for protein structure prediction. The award was notable for its speed: the interval between the achievement and the prize was roughly four years, unusually short for the Nobel. The committee's citation acknowledged both the practical consequences and the conceptual significance of the work.

## Limitations

AlphaFold's achievements are real, but so are its boundaries. Acknowledging them is not a caveat; it is a condition for understanding what the system actually does.

AlphaFold predicts static structures. It produces a single set of coordinates for a given sequence, the conformation most likely to represent the folded state. It cannot model dynamics: the conformational fluctuations, allosteric transitions, and population shifts that govern how proteins function in living cells. A protein is not a frozen sculpture; it breathes, flexes, and samples an ensemble of states. AlphaFold captures one frame of a film.

> AlphaFold captures one frame of a film.
{: .pullquote .pullquote--compact}

Intrinsically disordered proteins pose a particular challenge. Between 30 and 50 per cent of eukaryotic proteins contain disordered regions, stretches that do not adopt a single stable fold but instead remain flexible, often acquiring structure only upon binding a partner. AlphaFold flags these regions with low confidence scores, which is useful as a diagnostic, but it cannot represent their functional dynamics. Disorder is not noise; it is often the mechanism. AlphaFold has no vocabulary for it.

Post-translational modifications, the chemical alterations that cells apply to proteins after they are synthesised, fall outside the model's scope. Phosphorylation, glycosylation, ubiquitination, and dozens of other modifications regulate protein function, localisation, and degradation. AlphaFold predicts the structure of the unmodified chain.

Novel folds present a further limitation. AlphaFold2 was trained on the Protein Data Bank, which reflects the accumulated output of decades of experimental structural biology. Proteins whose folds bear no detectable homology to anything in that training set, novel topologies, remain challenging. The system's accuracy degrades when it cannot leverage evolutionary information from multiple sequence alignments.

These are not failures of engineering. They are consequences of the problem AlphaFold chose to solve, and did solve. But they circumscribe where the tool can be trusted and where it cannot.

## Scientific impact

The immediate practical consequences have been broad. In structural biology, AlphaFold predictions have accelerated the determination of structures that resisted experimental methods for decades. The nuclear pore complex, the massive protein assembly that regulates traffic between the nucleus and cytoplasm of every eukaryotic cell, had eluded full structural characterisation for years; AlphaFold predictions contributed to determining its complete architecture. In enzyme engineering, researchers have used AlphaFold-predicted structures to guide the design of PET-degrading enzymes, proteins capable of breaking down the plastic polyethylene terephthalate, a line of work with direct relevance to plastic pollution.

In neglected tropical diseases, the impact has been particularly striking. The Drugs for Neglected Diseases initiative (DNDi) has used AlphaFold predictions for virtual screening against parasitic targets in Chagas disease (*Trypanosoma cruzi*), leishmaniasis, and schistosomiasis, diseases that collectively affect hundreds of millions of people but attract comparatively little pharmaceutical investment. AlphaFold predictions for *Plasmodium falciparum* proteins have opened new avenues in malaria drug discovery. In each case, the logic is the same: where experimental structures were absent or incomplete, AlphaFold supplies a starting point that would otherwise have required years of crystallography or cryo-EM work.

## What remains

What lingers is a question the result does not answer, and it is older than the result itself.

Ken Dill, a biophysicist who has worked on protein folding for decades, has observed that three distinct problems have long worn the same name. The first is the prediction problem: given a sequence, what structure will it adopt? AlphaFold has solved this, decisively, for the vast majority of known protein families. The second is the folding problem proper: by what physical mechanism does the polypeptide chain navigate from its unfolded state to its native conformation? This is the question Levinthal posed in 1969. AlphaFold does not address it. The network predicts the destination without modelling the journey.

The resolution of Levinthal's paradox, insofar as one exists, comes not from computation but from thermodynamics. Beginning in the late 1980s, a series of theoretical advances reshaped the field's understanding of how proteins fold. Bryngelson and Wolynes, drawing on spin-glass models from statistical physics, proposed in 1987 that protein energy landscapes are not flat but funnelled: evolution shapes amino acid sequences so that native-like contacts are energetically favourable, creating a biased landscape that guides the chain downhill toward the native state. Leopold, Montal, and Onuchic formalised the funnel description in 1992. Wolynes, Onuchic, and Thirumalai published 'Navigating the folding routes' in *Science* in 1995. Dill and Chan synthesised these ideas in a 1997 review in *Nature Structural Biology*, 'From Levinthal to pathways to funnels'. The picture that emerged is this: proteins do not search randomly among 10^47 conformations. They slide down a funnel-shaped energy landscape, where the gradient of free energy channels the chain toward its native state through many parallel pathways. The paradox dissolves not because proteins are clever but because evolution has sculpted the landscape they traverse.

AlphaFold bypasses the funnel entirely. It learns the statistical correlations between sequence and structure from the Protein Data Bank and predicts the endpoint. It has no representation of the energy landscape, no model of the folding pathway, no physics of the transition state. This is not a criticism; it is a description. The prediction problem and the folding problem are different problems, and solving one does not entail solving the other.

Dill's third problem is the design problem: given a desired structure, can one create a sequence that folds into it? This is the inverse of prediction, and it has its own trajectory. David Baker's laboratory at the University of Washington has pursued computational protein design for over two decades, work recognised by the same Nobel Prize that honoured Hassabis and Jumper. AlphaFold aids design indirectly, by providing rapid structural validation of candidate sequences, but the design problem requires generative methods, not predictive ones. It remains an active and partially open frontier.

The fifty-year problem was always three problems wearing one name. AlphaFold has dispensed with the first, the one that consumed the most labour and the most careers. The second, the physical mechanism of folding, the one that would let biologists not merely predict but comprehend, remains open. The third, design, is advancing on its own terms. What AlphaFold achieved is not diminished by what it did not attempt. But the deeper question, the one Levinthal asked in that room in Illinois, the question of how a chain of amino acids finds its way home through a space larger than the universe, persists. That is the work that comes next.

<div class="source-note" markdown="1">
**References**

1. Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. *Science*, 181(4096), 223-230.
2. Baker, D. (2019). What has de novo protein design taught us about protein folding and biophysics? *Protein Science*, 28(4), 678-683.
3. Bryngelson, J. D. & Wolynes, P. G. (1987). Spin glasses and the statistical mechanics of protein folding. *Proceedings of the National Academy of Sciences*, 84(21), 7524-7528.
4. Dill, K. A. & Chan, H. S. (1997). From Levinthal to pathways to funnels. *Nature Structural Biology*, 4(1), 10-19.
5. Dill, K. A. & MacCallum, J. L. (2012). The protein-folding problem, 50 years on. *Science*, 338(6110), 1042-1046.
6. Jumper, J. et al. (2021). Highly accurate protein structure prediction with AlphaFold. *Nature*, 596(7873), 583-589.
7. Leopold, P. E., Montal, M. & Onuchic, J. N. (1992). Protein folding funnels: A kinetic approach to the sequence-structure relationship. *Proceedings of the National Academy of Sciences*, 89(18), 8721-8725.
8. Levinthal, C. (1969). How to fold graciously. In *Mossbauer Spectroscopy in Biological Systems: Proceedings of a Meeting Held at Allerton House, Monticello, Illinois* (pp. 22-24).
9. Senior, A. W. et al. (2020). Improved protein structure prediction using potentials from deep evolution. *Nature*, 577(7792), 706-710.
10. Wolynes, P. G., Onuchic, J. N. & Thirumalai, D. (1995). Navigating the folding routes. *Science*, 267(5204), 1619-1620.
11. Abramson, J. et al. (2024). Accurate structure prediction of biomolecular interactions with AlphaFold 3. *Nature*, 630(8016), 493-500.
12. Varadi, M. et al. (2022). AlphaFold Protein Structure Database: Massively expanding the structural coverage of protein-sequence space with high-accuracy models. *Nucleic Acids Research*, 50(D1), D439-D444.

*Originally published in Chinese on [Scientific American China](https://mp.weixin.qq.com/s/un5RPtoRn5mlUEkn2-BA1A), December 2020.*
</div>
