/* audio-player.js — custom waveform audio player */
(function () {
  'use strict';

  var BAR_W  = 2;
  var GAP    = 1;
  var STEP   = BAR_W + GAP;
  var BARS   = 200;
  var DPR    = window.devicePixelRatio || 1;

  function formatTime(s) {
    if (!s || !isFinite(s)) return '0:00';
    var m = Math.floor(s / 60);
    var sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  function getColors() {
    var html = document.documentElement;
    var saved = html.getAttribute('data-theme');
    var dark = saved === 'dark' ||
      (saved !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    return {
      bar:     dark ? '#5a524c' : '#ddd3c8',
      played:  dark ? '#c49a85' : '#8d6959',
      hover:   dark ? '#7f766f' : '#b78e79',
      bg:      dark ? '#1c1917' : '#faf7f2'
    };
  }

  function generatePlaceholder(n) {
    var data = [];
    for (var i = 0; i < n; i++) {
      data.push(0.08 + Math.random() * 0.15);
    }
    return data;
  }

  function drawWaveform(canvas, data, progress, hoverPos) {
    var ctx = canvas.getContext('2d');
    var w = canvas.width / DPR;
    var h = canvas.height / DPR;
    var colors = getColors();
    var numBars = Math.floor(w / STEP);
    var barData = data;

    if (barData.length !== numBars) {
      var resampled = [];
      for (var r = 0; r < numBars; r++) {
        var idx = (r / numBars) * barData.length;
        var lo = Math.floor(idx);
        var hi = Math.min(lo + 1, barData.length - 1);
        var frac = idx - lo;
        resampled.push(barData[lo] * (1 - frac) + barData[hi] * frac);
      }
      barData = resampled;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var minH = 2 * DPR;

    for (var i = 0; i < numBars; i++) {
      var x = i * STEP * DPR;
      var barH = Math.max(minH, barData[i] * h * DPR * 0.92);
      var y = canvas.height - barH;
      var barProgress = (i + 1) / numBars;

      if (barProgress <= progress) {
        ctx.fillStyle = colors.played;
      } else if (hoverPos >= 0 && barProgress <= hoverPos) {
        ctx.fillStyle = colors.hover;
      } else {
        ctx.fillStyle = colors.bar;
      }

      ctx.fillRect(x, y, BAR_W * DPR, barH);
    }
  }

  function initPlayer(el) {
    var src = el.getAttribute('data-src');
    var waveformUrl = el.getAttribute('data-waveform');
    var playBtn = el.querySelector('.wv-player__play');
    var playIcon = el.querySelector('.wv-player__icon--play');
    var pauseIcon = el.querySelector('.wv-player__icon--pause');
    var canvas = el.querySelector('.wv-player__canvas');
    var waveWrap = el.querySelector('.wv-player__wave');
    var currentEl = el.querySelector('.wv-player__current');
    var durationEl = el.querySelector('.wv-player__duration');
    var volBtn = el.querySelector('.wv-player__vol-btn');
    var volSlider = el.querySelector('.wv-player__vol-slider');
    var volWrap = el.querySelector('.wv-player__vol-wrap');
    var volIcon = el.querySelector('.wv-player__vol-icon');
    var volMuteIcon = el.querySelector('.wv-player__vol-icon--mute');

    var audio = new Audio();
    audio.preload = 'none';
    audio.crossOrigin = 'anonymous';

    var waveData = generatePlaceholder(BARS);
    var ready = false;
    var sourceLoaded = false;
    var hoverPos = -1;
    var animFrame = null;
    var lastVolume = 1;
    var pendingSeek = null;

    function sizeCanvas() {
      var rect = waveWrap.getBoundingClientRect();
      canvas.width = rect.width * DPR;
      canvas.height = rect.height * DPR;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      render();
    }

    function render() {
      var progress = audio.duration ? audio.currentTime / audio.duration : 0;
      drawWaveform(canvas, waveData, progress, hoverPos);
    }

    function tick() {
      currentEl.textContent = formatTime(audio.currentTime);
      render();
      if (!audio.paused) {
        animFrame = requestAnimationFrame(tick);
      }
    }

    function setPlaying(playing) {
      playIcon.style.display = playing ? 'none' : '';
      pauseIcon.style.display = playing ? 'block' : 'none';
      playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
      el.classList.toggle('is-playing', playing);
    }

    function updateVolIcons() {
      var muted = audio.muted || audio.volume === 0;
      volIcon.style.display = muted ? 'none' : '';
      volMuteIcon.style.display = muted ? 'block' : 'none';
    }

    function attachSource() {
      if (sourceLoaded || !src) return;
      sourceLoaded = true;
      audio.src = src;
      audio.load();
    }

    function pauseOtherPlayers() {
      document.querySelectorAll('.wv-player.is-playing').forEach(function (other) {
        if (other !== el) {
          var otherAudio = other._audio;
          if (otherAudio && !otherAudio.paused) {
            otherAudio.pause();
            other.classList.remove('is-playing');
            var opi = other.querySelector('.wv-player__icon--play');
            var opai = other.querySelector('.wv-player__icon--pause');
            var obtn = other.querySelector('.wv-player__play');
            if (opi) opi.style.display = '';
            if (opai) opai.style.display = 'none';
            if (obtn) obtn.setAttribute('aria-label', 'Play');
          }
        }
      });
    }

    function playCurrent() {
      if (!src) return;
      pauseOtherPlayers();
      attachSource();

      var playPromise = audio.play();
      setPlaying(true);
      tick();

      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {
          setPlaying(false);
          cancelAnimationFrame(animFrame);
          render();
        });
      }
    }

    if (waveformUrl) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', waveformUrl);
      xhr.onload = function () {
        if (xhr.status === 200) {
          try {
            waveData = JSON.parse(xhr.responseText);
            render();
          } catch (e) { /* keep placeholder */ }
        }
      };
      xhr.send();
    }

    if (src) {
      audio.addEventListener('loadedmetadata', function () {
        ready = true;
        el.classList.add('is-ready');
        durationEl.textContent = formatTime(audio.duration);
        if (pendingSeek !== null && audio.duration) {
          audio.currentTime = pendingSeek * audio.duration;
          pendingSeek = null;
        }
        render();
      });

      audio.addEventListener('canplay', function () {
        if (!ready) {
          ready = true;
          el.classList.add('is-ready');
          durationEl.textContent = formatTime(audio.duration);
        }
      });

      audio.addEventListener('error', function () {
        el.classList.add('is-error');
      });

      audio.addEventListener('ended', function () {
        setPlaying(false);
        cancelAnimationFrame(animFrame);
        render();
      });
    }

    playBtn.addEventListener('click', function () {
      if (audio.paused) {
        playCurrent();
      } else {
        audio.pause();
        setPlaying(false);
        cancelAnimationFrame(animFrame);
        render();
      }
    });

    waveWrap.addEventListener('click', function (e) {
      var rect = waveWrap.getBoundingClientRect();
      var pct = (e.clientX - rect.left) / rect.width;
      pct = Math.max(0, Math.min(1, pct));
      if (!ready) {
        pendingSeek = pct;
        playCurrent();
        return;
      }
      audio.currentTime = pct * audio.duration;
      currentEl.textContent = formatTime(audio.currentTime);
      render();
    });

    waveWrap.addEventListener('mousemove', function (e) {
      var rect = waveWrap.getBoundingClientRect();
      hoverPos = (e.clientX - rect.left) / rect.width;
      render();
    });

    waveWrap.addEventListener('mouseleave', function () {
      hoverPos = -1;
      render();
    });

    if (volBtn) {
      volBtn.addEventListener('click', function () {
        if (audio.muted || audio.volume === 0) {
          audio.muted = false;
          audio.volume = lastVolume || 1;
          volSlider.value = audio.volume;
        } else {
          lastVolume = audio.volume;
          audio.muted = true;
        }
        updateVolIcons();
      });
    }

    if (volSlider) {
      volSlider.addEventListener('input', function () {
        audio.volume = parseFloat(volSlider.value);
        audio.muted = audio.volume === 0;
        lastVolume = audio.volume || lastVolume;
        updateVolIcons();
      });
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(sizeCanvas, 100);
    });

    var observer = new MutationObserver(function () { render(); });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      render();
    });

    el._audio = audio;
    sizeCanvas();
    render();
  }

  function init() {
    var players = document.querySelectorAll('.wv-player');
    for (var i = 0; i < players.length; i++) {
      initPlayer(players[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
