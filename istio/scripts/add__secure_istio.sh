#!/usr/bin/env bash

echo "install istio"
helm install install/kubernetes/helm/istio \
    --tls \
    --name istio \
    --namespace istio-system