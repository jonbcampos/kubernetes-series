#!/usr/bin/env bash

export ISTIO_VERSION=1.0.0

echo "download istio"
curl -L https://git.io/getLatestIstio | sh -
cd istio-${ISTIO_VERSION}

echo "add istio to the path"
export PATH=$PWD/bin:$PATH

echo "install istio"
# option 1
# kubectl create -f install/kubernetes/helm/helm-service-account.yaml
# helm init --service-account tiller
# helm install install/kubernetes/helm/istio --name istio --namespace istio-system
# option 2
helm template install/kubernetes/helm/istio --name istio --namespace istio-system > $HOME/istio.yaml
kubectl create namespace istio-system
kubectl create -f $HOME/istio.yaml