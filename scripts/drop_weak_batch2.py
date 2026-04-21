import yaml, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

INPUT = r"C:\code_dinghao_other\dinghaoluo.github.io\_data\music_thoughts.yml"

DROP = {
    ("Insanium", "Whom Gods Destroy"),
    ("Automata I", "Between the Buried and Me"),
    ("Cinder", "Pixyblink"),
    ("Eclipse Chaser", "Mindspeak"),
    ("Eleventh Hour", "PINS"),
    ("Element of Surprise", "Raptured Roots"),
    ("Empty Yard Experiment", "Empty Yard Experiment"),
    ("Dead Club City", "Nothing But Thieves"),
}

with open(INPUT, 'r', encoding='utf-8') as f:
    lines = f.readlines()

entries = []
current_start = None
for i, line in enumerate(lines):
    if line.startswith('- title:'):
        if current_start is not None:
            entries.append((current_start, i))
        current_start = i
if current_start is not None:
    entries.append((current_start, len(lines)))

print(f"Found {len(entries)} total entries")

to_remove = set()
for start, end in entries:
    title_line = lines[start].strip()
    title = title_line.split('"')[1] if '"' in title_line else ""
    creator = ""
    for j in range(start, min(start + 10, end)):
        if lines[j].strip().startswith('creator:'):
            creator = lines[j].strip().split('"')[1] if '"' in lines[j] else ""
            break
    if (title, creator) in DROP:
        to_remove.add((start, end))
        print(f"  DROP: {title} by {creator} (lines {start+1}-{end})")

print(f"\nDropping {len(to_remove)} entries")

new_lines = []
for i, line in enumerate(lines):
    skip = False
    for start, end in to_remove:
        if start <= i < end:
            skip = True
            break
    if not skip:
        new_lines.append(line)

with open(INPUT, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Done. {len(lines)} lines -> {len(new_lines)} lines")
