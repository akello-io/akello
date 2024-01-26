#!/bin/bash

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

docker-compose down
docker-compose up -d

cp scripts/.template.env apps/cocm-registry/.env

python scripts/akello.py setup