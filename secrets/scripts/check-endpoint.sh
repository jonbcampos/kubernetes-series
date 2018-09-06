#!/usr/bin/env bash

# Pass the name of a service to check ie: sh check-endpoint.sh endpoints
# Will run forever...
external_ip=""
while [ -z $external_ip ]; do
  echo "Waiting for end point..."
  external_ip=$(kubectl get svc $1 --template="{{range .status.loadBalancer.ingress}}{{.ip}}{{end}}")
  [ -z "$external_ip" ] && sleep 10
done
echo 'End point ready:' && echo "http://${external_ip}"