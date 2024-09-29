#!/bin/sh

SERVICE_NAME=$1
SERVICE_ID=$2
SERVICE_PORT=$3
CONSUL_ADDR=$4

curl -X PUT --data '{
  "ID": "'"$SERVICE_ID"'",
  "Name": "'"$SERVICE_NAME"'",
  "Port": '"$SERVICE_PORT"',
  "Check": {
    "HTTP": "http://localhost:'"$SERVICE_PORT"'/health",
    "Interval": "10s"
  }
}' $CONSUL_ADDR/v1/agent/service/register