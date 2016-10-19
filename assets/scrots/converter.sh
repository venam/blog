#!/bin/bash

for f in *.png
do
	echo "[*] blurring $f"
	$(./blurring "$f") || { echo "Can't resize"; exit 1; }
	echo "[*] done blurring $f"
done
