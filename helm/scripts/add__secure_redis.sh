#!/usr/bin/env bash

echo "install redis"
helm install stable/redis \
    --tls \
    --values values/values-production.yaml \
    --name redis-system