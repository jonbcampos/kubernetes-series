#!/usr/bin/env bash

echo "install helm"
curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get | bash
kubectl --namespace kube-system create sa tiller
kubectl create clusterrolebinding tiller \
    --clusterrole cluster-admin \
    --serviceaccount=kube-system:tiller

echo "preclean"
rm ca.* tiller.* helm.*

echo "create certs"
openssl genrsa -out ./ca.key.pem 4096
openssl req -key ca.key.pem -batch -new -x509 -days 7300 -sha256 -out ca.cert.pem -extensions v3_ca
openssl genrsa -out ./tiller.key.pem 4096
openssl genrsa -out ./helm.key.pem 4096
openssl req -key tiller.key.pem -batch -new -sha256 -out tiller.csr.pem
openssl req -key helm.key.pem -batch -new -sha256 -out helm.csr.pem
openssl x509 -req -CA ca.cert.pem -CAkey ca.key.pem -CAcreateserial -in tiller.csr.pem -out tiller.cert.pem
openssl x509 -req -CA ca.cert.pem -CAkey ca.key.pem -CAcreateserial -in tiller.csr.pem -out helm.cert.pem

echo "initialize helm"
kubectl create -f values/rbac-config.yaml
helm init \
    --tiller-tls \
    --tiller-tls-cert ./tiller.cert.pem \
    --tiller-tls-key ./tiller.key.pem \
    --tiller-tls-verify \
    --tls-ca-cert ./ca.cert.pem \
    --service-account tiller
helm repo update

echo "verify helm"
kubectl get deploy,svc tiller-deploy -n kube-system