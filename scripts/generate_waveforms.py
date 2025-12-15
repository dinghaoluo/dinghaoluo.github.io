'''
Created on Sun Oct 2024

generate waveform JSON from MP3s for the custom audio player

@author: Dinghao Luo
'''

#%% imports
import json
import shutil
import subprocess
import sys
from pathlib import Path

try:
    import numpy as np
except ImportError:
    print('install dependency: pip install numpy')
    sys.exit(1)

try:
    from pydub import AudioSegment
except ImportError:
    AudioSegment = None


#%% constants
BARS = 200
AUDIO_DIR = Path(__file__).resolve().parent.parent / 'assets' / 'audio'
WAVE_DIR  = AUDIO_DIR / 'waveforms'
FFMPEG    = shutil.which('ffmpeg')


#%% helpers
def load_samples(path: Path) -> np.ndarray:
    '''load mono samples; uses pydub if available, otherwise raw ffmpeg'''
    if AudioSegment is not None:
        audio = AudioSegment.from_file(str(path)).set_channels(1)
        return np.array(audio.get_array_of_samples(), dtype=np.float64)

    if FFMPEG is not None:
        # decode to raw signed 16-bit PCM, mono
        raw = subprocess.check_output(
            [
                FFMPEG,
                '-v', 'error',
                '-i', str(path),
                '-ac', '1',
                '-f', 's16le',
                '-acodec', 'pcm_s16le',
                '-',
            ],
            stderr=subprocess.PIPE,
        )
        return np.frombuffer(raw, dtype='<i2').astype(np.float64)

    raise RuntimeError('install pydub or ensure ffmpeg is on PATH')


def extract_waveform(path: Path) -> list[float]:
    '''split samples into BARS blocks, take mean amplitude, normalise to [0, 1]'''
    samples = np.abs(load_samples(path))
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


#%% main
def main():
    WAVE_DIR.mkdir(parents=True, exist_ok=True)
    mp3s = sorted(AUDIO_DIR.glob('*.mp3'))
    if not mp3s:
        print(f'no .mp3 files found in {AUDIO_DIR}')
        return
    for mp3 in mp3s:
        print(f'processing {mp3.name}...', end=' ')
        data = extract_waveform(mp3)
        out = WAVE_DIR / (mp3.stem + '.json')
        out.write_text(json.dumps(data), encoding='utf-8')
        print(f'-> {out.name} ({len(data)} bars)')
    print('done.')


if __name__ == '__main__':
    main()
