#!/usr/bin/env python3
"""Regenera las extensiones y el paquete completo. Solo usa la biblioteca estándar."""
import argparse
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--output", type=Path, default=root.parent / "mi-estudio.zip")
args = parser.parse_args()
output = args.output.resolve()
output.parent.mkdir(parents=True, exist_ok=True)

for directory, filename in [
    ("extension-chrome", "mi-estudio-extension.zip"),
    ("extension-firefox", "mi-estudio-extension-firefox.zip"),
]:
    with ZipFile(root / filename, "w", ZIP_DEFLATED, compresslevel=9) as archive:
        for file in sorted((root / directory).rglob("*")):
            if file.is_file() and not any(part.startswith(".") or part == "__pycache__" for part in file.relative_to(root / directory).parts):
                archive.write(file, file.relative_to(root / directory))
    print(filename)

with ZipFile(output, "w", ZIP_DEFLATED, compresslevel=9) as archive:
    for file in sorted(root.rglob("*")):
        relative = file.relative_to(root)
        if file.is_file() and file.resolve() != output and not any(part.startswith(".") or part == "__pycache__" for part in relative.parts):
            archive.write(file, relative)
print(output)
