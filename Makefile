VENV = .venv
ACTIVATE = source $(VENV)/bin/activate
REQUIREMENTS = requirements.txt
DOCKER_COMPOSE = docker-compose
ENV_FILE = apps/cocm-registry/.env
AKHELLO_SCRIPT = scripts/akello.py

.PHONY: all run-setup run-local

all: run-setup run-local

run-setup: create_venv install_requirements kill_processes start_services copy_env setup_akello

create_venv:
	python3 -m venv $(VENV)

install_requirements:
	$(ACTIVATE) && pip install -r $(REQUIREMENTS)

kill_processes:
	kill -9 $(shell lsof -t -i:8000)

start_services:
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) up -d

copy_env:
	cp scripts/.template.env $(ENV_FILE)

setup_akello:
	$(ACTIVATE) && python $(AKHELLO_SCRIPT) setup

run-local: create_venv install_requirements local_server local_cocm

local_server:
	$(ACTIVATE) && python $(AKHELLO_SCRIPT) start server &

local_cocm:
	$(ACTIVATE) && python $(AKHELLO_SCRIPT) start cocm && fg
