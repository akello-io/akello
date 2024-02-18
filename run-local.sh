#!/bin/bash

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

python scripts/akello.py start server & python scripts/akello.py start cocm && fg

