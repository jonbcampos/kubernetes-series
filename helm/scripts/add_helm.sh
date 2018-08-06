#!/usr/bin/env bash

echo "install helm"
curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get | bash
kubectl --namespace kube-system create sa tiller
kubectl create clusterrolebinding tiller \
    --clusterrole cluster-admin \
    --serviceaccount=kube-system:tiller

echo "initialize helm"
helm init --service-account tiller
helm repo update

echo "verify helm"
kubectl get deploy,svc tiller-deploy -n kube-system