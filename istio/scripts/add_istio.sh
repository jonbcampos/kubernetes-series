#!/usr/bin/env bash

export ISTIO_VERSION=1.0.0

echo "download istio"
curl -L https://git.io/getLatestIstio | sh -
cd istio-${ISTIO_VERSION}

echo "install istio"
helm install install/kubernetes/helm/istio \
    --name istio \
    --namespace istio-system