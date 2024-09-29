#!/bin/bash


docker-compose \
    -f environments/dev/networks.yml \
    -f environments/dev/docker-compose-service-mesh.yml  \
    -f environments/dev/docker-compose-temporal.yml  \
    -f environments/dev/docker-compose-supertokens.yml  \
    up