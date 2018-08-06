#!/usr/bin/env bash

echo "install helm"
curl https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get | bash
kubectl --namespace kube-system create sa tiller
kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller

echo "initialize helm"
#helm init \
#    --tiller-tls \
#    --tiller-tls-cert ../keys/tiller.cert.pem \
#    --tiller-tls-key ../keys/tiller.key.pem \
#    --tiller-tls-verify \
#    --tls-ca-cert ../keys/ca.cert.pem \
#    --service-account tiller
helm init \
    --service-account tiller
helm repo update

echo "move keys"
cp ../keys/ca.cert.pem $(helm home)/ca.pem
cp ../keys/helm.cert.pem $(helm home)/cert.pem
cp ../keys/helm.key.pem $(helm home)/key.pem
#helm ls --tls

echo "verify helm"
kubectl get deploy,svc tiller-deploy -n kube-system

