#!/usr/bin/env python3
"""Run once after cloning: python scripts/setup-hooks.py"""
import os, shutil, stat

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src  = os.path.join(root, 'scripts', 'pre-commit')
dst  = os.path.join(root, '.git', 'hooks', 'pre-commit')

shutil.copy2(src, dst)
os.chmod(dst, os.stat(dst).st_mode | stat.S_IEXEC | stat.S_IXGRP | stat.S_IXOTH)
print(f"✓ Hook installed: {dst}")
