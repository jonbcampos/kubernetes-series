#!/usr/bin/env bash

echo "install redis"
helm install stable/redis \
    --values values/values-production.yaml \
    --name redis-system