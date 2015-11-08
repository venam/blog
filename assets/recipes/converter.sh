#!/bin/bash

for f in *.jpg
do
	echo "[*] resizing $f"
	$(./smartresize "$f" 300 "small") || { echo "Can't resize"; exit 1; }
	echo "[*] done resizing $f"
done
