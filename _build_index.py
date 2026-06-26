#!/usr/bin/env python3
"""
Kalakshetra — index.html bundle rebuilder.

Replaces the two compressed blobs inside index.html with the current
content of sections.jsx and _ds_bundle.js.

Run manually:   python _build_index.py
Git hook:       called automatically by .git/hooks/pre-commit
"""
import re, base64, gzip, json, sys, os

ROOT = os.path.dirname(os.path.abspath(__file__))
INDEX = os.path.join(ROOT, 'index.html')
SOURCES = {
    '89518be4-c92f-4933-97e7-2a630ab88f30': os.path.join(ROOT, 'ui_kits', 'website', 'sections.jsx'),
    '44e0985e-fb75-4a51-9a10-f3ec2204a870': os.path.join(ROOT, '_ds_bundle.js'),
}

def rebuild():
    content = open(INDEX, 'r', encoding='utf-8').read()
    m = re.search(r'(<script type="__bundler/manifest">)(.*?)(</script>)', content, re.DOTALL)
    if not m:
        print('[build] ERROR: manifest tag not found in index.html')
        sys.exit(1)

    manifest = json.loads(m.group(2))

    changed = False
    for uuid, src_path in SOURCES.items():
        if uuid not in manifest:
            print(f'[build] WARNING: UUID {uuid[:8]} not in manifest, skipping')
            continue
        if not os.path.exists(src_path):
            print(f'[build] WARNING: {src_path} not found, skipping')
            continue

        src = open(src_path, 'r', encoding='utf-8-sig').read()  # utf-8-sig strips BOM
        compressed = gzip.compress(src.encode('utf-8'), compresslevel=9)
        new_data = base64.b64encode(compressed).decode('ascii')

        if manifest[uuid]['data'] != new_data:
            manifest[uuid]['data'] = new_data
            manifest[uuid]['compressed'] = True
            print(f'[build] Updated blob {uuid[:8]} from {os.path.basename(src_path)}')
            changed = True
        else:
            print(f'[build] Blob {uuid[:8]} already up to date ({os.path.basename(src_path)})')

    if changed:
        new_json = json.dumps(manifest, separators=(',', ':'))
        new_content = content[:m.start(2)] + new_json + content[m.end(2):]
        open(INDEX, 'w', encoding='utf-8').write(new_content)
        print('[build] index.html saved.')
    else:
        print('[build] index.html unchanged.')

    return changed

if __name__ == '__main__':
    rebuild()
