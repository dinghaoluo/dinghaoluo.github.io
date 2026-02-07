---
layout: single
author_profile: true
classes: home
---
*Hi, Dinghao here :)*

I'm a PhD student at the Max Planck Florida Institute for Neuroscience, studying how a tiny brainstem nucleus uses dopamine to rapidly tune memory accuracy in the hippocampus. I'm finishing my fourth year and starting to think about what comes next.

Reach out: [dinghao.luo@outlook.com](mailto:dinghao.luo@outlook.com)<br>Find me: [GitHub](https://github.com/dinghaoluo) · [Reddit](https://www.reddit.com/user/amoxdl24/) · [Instagram](https://www.instagram.com/amoxitoxin) · [CV](https://dinghaoluo.github.io/cv/)

---

<h2 id="writing"><a href="/writing/">writing :)</a></h2>

I have been writing since I was fifteen, mostly in Chinese under the pen-name `amoxitoxin`, and mostly on a WeChat blog called 阿莫東森的無聊生活 that I started in secondary school. Some of these pieces, along with newer English ones, are now on the [writing](/writing/) page.

Since my undergraduate years at Cambridge, and now through my PhD, I have also written about science. I was one of the earliest members of Neu-Reality (神經現實), a Chinese-language neuroscience science communication platform, and spent three years as science editor and translator there. After that were seven months at *Scientific American* China, where I wrote weekly news on their digital platform, edited translations of each month's *SciAm* magazine, and finished a print feature on the Accelerating Research on Consciousness initiative.

My longest writing project was translating Merlin Sheldrake's ***Entangled Life*** (2020) into Chinese ([《菌絡萬象》](https://www.amazon.com/dp/7559677754)), taking almost 3 years as I was juggling my PhD experiments and analyses on the side. The Chinese edition won the 2025 Pingshan Natural History Museum Book Award.

<a href="/writing/" class="site-nav-link">→ writing</a>

---

<h2 id="music"><a href="/music/">music :)</a></h2>

I also make music, under the same name: a one-person prog-rock project with some singles, an EP, and one full-length album. You can find me on [Bandcamp](https://amoxitoxin.bandcamp.com/).

I listen to far more than I make, which is probably healthy. Prog used to be at the centre of everything: I grew up on Dream Theater, King Crimson, Genesis and Yes. But I have moved through Canterbury, jazz fusion, electronic etc., and now spend most of my listening time on a diverse roster of bands like Haken, Bent Knee, Sungazer, Keor, Alabama Shakes... Metal, post-rock, classical, and whatever else pulls me in on a given week fill the gaps. Here are a few favourites:

- If you like semi-heavy, mathy, intricate prog metal: ***The Mountain*** (2013) by Haken
- For classic prog from the olden days: Genesis's ***Foxtrot*** (1972), or Gentle Giant's ***Octopus*** (1972); despite both being prog and blowing my young mind as a kid, these great musicians went in completely different directions
- For jazz fusion: Snarky Puppy's new album ***Somni*** (2025) is where I would start right now, or Herbie Hancock's ***Head Hunters*** (1973) if one fancies the genre's foundational crossover into funk
- And if none of that works, try Keor's ***Petrichor*** (2018): this album carried through the early days of the pandemic back in 2021

<div class="home-album-covers" aria-hidden="true">
  <img src="/assets/images/albums/the-mountain.jpg" alt="The Mountain by Haken" loading="lazy">
  <img src="/assets/images/albums/foxtrot.jpg" alt="Foxtrot by Genesis" loading="lazy">
  <img src="/assets/images/albums/octopus.jpg" alt="Octopus by Gentle Giant" loading="lazy">
  <img src="/assets/images/albums/somni.jpg" alt="Somni by Snarky Puppy" loading="lazy">
  <img src="/assets/images/albums/head-hunters.png" alt="Head Hunters by Herbie Hancock" loading="lazy">
  <img src="/assets/images/albums/petrichor.jpg" alt="Petrichor by Keor" loading="lazy">
</div>

<a href="/music/" class="site-nav-link">→ music</a>

---

<h2 id="thoughts"><a href="/thoughts/">thoughts :)</a></h2>

{% assign all_thoughts = site.data.thoughts | sort: 'posted' | reverse %}
{% assign book_thoughts = all_thoughts | where: 'type', 'book' %}
{% assign game_thoughts = all_thoughts | where: 'type', 'game' %}

<div class="home-thoughts-block home-thoughts-block--books" markdown="1">
<div class="home-covers home-covers--books" aria-hidden="true" data-count="12" data-mobile-count="15">
  {% for t in book_thoughts %}{% if t.image %}<a href="/thoughts/#{{ t.title | slugify }}" class="home-covers__link" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

My mom says I used to devour all the books that I could get my hands on as a kid, and reading was probably my favourite pastime from childhood through to my college years. The early years of my PhD interrupted the habit for a while, and it was Paul Auster's [***Moon Palace***](/thoughts/#moon-palace) (1989) that pulled me back in. Since then I have been making up for lost time. The writers I return to most, for now, are Thomas Pynchon and Roberto Bolaño. If you are looking for inspiration and haven't read any of these, I promise you won't regret your time:

- Thomas Pynchon's [***Vineland*** (1990)](/thoughts/#vineland) if you want a weird, sad, and very American novel about the death of the 1960s
- [***Capitalist Realism*** (2009)](/thoughts/#capitalist-realism-is-there-no-alternative) by Mark Fisher was a 3-hour read that sharpened my politics
- [***When We Cease to Understand the World*** (2020)](/thoughts/#when-we-cease-to-understand-the-world) by Benjamín Labatut was part physics history, part fever dream, and shook my physics-uninitiated heart

<p class="home-thoughts-links"><a href="/thoughts/?type=book">→ books</a></p>
</div>

<div class="home-thoughts-block home-thoughts-block--screen" markdown="1">
<div class="home-covers home-covers--screen" aria-hidden="true" data-count="12" data-tablet-count="9" data-mobile-count="15">
  {% for t in all_thoughts %}{% if t.image and t.type == 'film' %}<a href="/thoughts/#{% if t.title_en %}{{ t.title_en | slugify }}{% else %}{{ t.title | slugify }}{% endif %}" class="home-covers__link" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% if t.image and t.type == 'tv' %}<a href="/thoughts/#{% if t.title_en %}{{ t.title_en | slugify }}{% else %}{{ t.title | slugify }}{% endif %}" class="home-covers__link" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

I came to film late. I write about films and TV shows when their scenes keep coming back afterwards, and here are some:

- Lee Chang-dong's [***Poetry*** (2010)](/thoughts/#poetry) takes on the almost impossible task of seeing the world clearly and still finding beauty in it
- [***Aftersun*** (2022)](/thoughts/#aftersun) by Charlotte Wells made me tear up with a remix of Queen and Bowie's 'Under Pressure' (1981)
- Emir Kusturica's [***Underground*** (1995)](/thoughts/#underground) if you want Yugoslav history as a three-hour brass-band epic that ends *Solaris* (1972)-style

<p class="home-thoughts-links"><a href="/thoughts/?type=film">→ films</a> · <a href="/thoughts/?type=tv">→ tv</a></p>
</div>

<div class="home-thoughts-block home-thoughts-block--games" markdown="1">
<div class="home-covers home-covers--games" aria-hidden="true" data-count="12" data-tablet-count="9" data-mobile-count="15">
  {% for t in game_thoughts %}{% if t.image %}<a href="/thoughts/#{% if t.title_en %}{{ t.title_en | slugify }}{% else %}{{ t.title | slugify }}{% endif %}" class="home-covers__link" style="display:none"><img src="{{ t.image }}" alt="{{ t.title }}" loading="lazy"></a>{% endif %}{% endfor %}
</div>

I've played games casually since I was a kid, until *Dark Souls* (2011) made me take them seriously. It taught me that games could demand the same depth of attention to their worlds and characters that novels do, and I got hooked on that: the challenge, the exploration, and the stories that long outlast the play sessions. These are some of the games that drew me in most:

- [***Outer Wilds*** (2019)](/thoughts/#outer-wilds) (Mobius Digital) is a love letter to the beautiful ephemerality of organic civilisations
- Remedy Entertainment's [***Alan Wake 2*** (2023)](/thoughts/#alan-wake-2) blends cosmic horror with a philosophical unravelling of authorship
- [***Elden Ring*** (2022)](/thoughts/#elden-ring) by FromSoftware demonstrates how a game can tell a thousand wordless stories with hand-crafted environments

<p class="home-thoughts-links"><a href="/thoughts/?type=game">→ games</a></p>
</div>

---

<h2 id="photos"><a href="/photos/">photos :)</a></h2>

I have photographed things compulsively since middle school, mostly out of an anxiety about losing the texture of precious moments. My dad gave me his Nikon D90 when I was old enough to care about framing, and that was when it became a practice rather than a reflex. I take long camera walks through cities, and places like Cambridge, London, Amman, and New York always surprise me with how alive our world is. On those walks, things keep making me stop: a window, a surface, a pattern of light that will dissipate in a few seconds and never to be seen again...

<div class="home-photo-strip" aria-label="photo preview">
  <a href="/photos/#london" class="home-photo-strip__link"><img src="/assets/images/photos/atlas-london-tower-cloud-2018-b80bff72.webp" alt="The Tower of London under heavy cloud." loading="lazy"></a>
  <a href="/photos/#georgia" class="home-photo-strip__link"><img src="/assets/images/photos/atlas-tbilisi-cable-street-2026-4336ced0.webp" alt="A Tbilisi street with cable lines overhead." loading="lazy"></a>
  <a href="/photos/#beijing" class="home-photo-strip__link"><img src="/assets/images/photos/atlas-beijing-ginkgo-street-2020-f5c0d401.webp" alt="A Beijing street lined with golden ginkgo trees." loading="lazy"></a>
  <a href="/photos/#lisbon" class="home-photo-strip__link"><img src="/assets/images/photos/atlas-lisbon-street-tram-2026-48c18cc4.webp" alt="A Lisbon street opening to a small tram and bright buildings." loading="lazy"></a>
  <a href="/photos/#singapore" class="home-photo-strip__link"><img src="/assets/images/photos/atlas-singapore-macaque-family-2021-704730f0.webp" alt="A macaque family grooming with a dark infant between them." loading="lazy"></a>
  <a href="/photos/#death-valley" class="home-photo-strip__link"><img src="/assets/images/photos/atlas-death-valley-salt-walker-2023-002317b0.webp" alt="A tiny walker on the Death Valley salt flats beneath dark mountains." loading="lazy"></a>
</div>

<a href="/photos/" class="site-nav-link">→ photos</a>
