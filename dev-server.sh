#!/bin/bash

# Create networks if they don't already exist
docker network inspect temporal-network >/dev/null 2>&1 || \
    docker network create --driver bridge temporal-network

    
docker network inspect app_network >/dev/null 2>&1 || \
    docker network create --driver bridge app_network
    
# Run docker-compose with --build and --force-recreate to rebuild and recreate containers
docker-compose \
    -f environments/dev/networks.yml \
    -f environments/dev/docker-compose-apache-kafka.yml  \
    -f environments/dev/docker-compose-service-mesh.yml  \
    -f environments/dev/docker-compose-temporal.yml  \
    -f environments/dev/docker-compose-supertokens.yml  \
    -f environments/dev/docker-compose-neuro-service.yml  \
    -p akello \
    up --build --force-recreate
