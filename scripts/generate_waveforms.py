#!/usr/bin/env python3
"""Generate waveform JSON files from MP3s for the custom audio player.

Usage:
    python scripts/generate_waveforms.py

Requires: pip install pydub numpy
(pydub needs ffmpeg on PATH)

Reads all .mp3 files from assets/audio/ and writes corresponding
.json files to assets/audio/waveforms/ — each containing 200 normalised
amplitude values (0.0–1.0).
"""

import json
import sys
from pathlib import Path

try:
    import numpy as np
    from pydub import AudioSegment
except ImportError:
    print('Install dependencies: pip install pydub numpy')
    print('Also ensure ffmpeg is on your PATH.')
    sys.exit(1)

BARS = 200
AUDIO_DIR = Path(__file__).resolve().parent.parent / 'assets' / 'audio'
WAVE_DIR = AUDIO_DIR / 'waveforms'


def extract_waveform(path: Path) -> list[float]:
    audio = AudioSegment.from_file(str(path)).set_channels(1)
    samples = np.array(audio.get_array_of_samples(), dtype=np.float64)
    samples = np.abs(samples)
    block = len(samples) // BARS
    if block == 0:
        return [0.0] * BARS
    bars = []
    for i in range(BARS):
        chunk = samples[i * block:(i + 1) * block]
        bars.append(float(np.mean(chunk)))
    peak = max(bars) if bars else 1.0
    if peak > 0:
        bars = [v / peak for v in bars]
    return [round(v, 4) for v in bars]


def main():
    WAVE_DIR.mkdir(parents=True, exist_ok=True)
    mp3s = sorted(AUDIO_DIR.glob('*.mp3'))
    if not mp3s:
        print(f'No .mp3 files found in {AUDIO_DIR}')
        return
    for mp3 in mp3s:
        print(f'Processing {mp3.name}...', end=' ')
        data = extract_waveform(mp3)
        out = WAVE_DIR / (mp3.stem + '.json')
        out.write_text(json.dumps(data))
        print(f'→ {out.name} ({len(data)} bars)')
    print('Done.')


if __name__ == '__main__':
    main()
