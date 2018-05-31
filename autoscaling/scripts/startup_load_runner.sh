#!/usr/bin/env bash

echo "preparing..."
export GCLOUD_PROJECT=$(gcloud config get-value project)
export INSTANCE_REGION=us-central1
export INSTANCE_ZONE=us-central1-b
export PROJECT_NAME=locust-tasks
export CLUSTER_NAME=${PROJECT_NAME}-cluster
export CONTAINER_NAME=${PROJECT_NAME}-container
export CLUSTER_IP=$1

echo "setup"
gcloud config set compute/zone ${INSTANCE_ZONE}

echo "creating container engine cluster"
gcloud container clusters create ${CLUSTER_NAME} \
    --preemptible \
    --zone ${INSTANCE_ZONE} \
    --scopes cloud-platform \
    --enable-autoscaling --min-nodes 3 --max-nodes 50 \
    --num-nodes 3

echo "confirm cluster is running"
gcloud container clusters list

echo "get credentials"
gcloud container clusters get-credentials ${CLUSTER_NAME} --zone ${INSTANCE_ZONE}

echo "confirm connection to cluster"
kubectl cluster-info

echo "create cluster administrator"
kubectl create clusterrolebinding cluster-admin-binding --clusterrole=cluster-admin --user=$(gcloud config get-value account)

echo "confirm the pod is running"
kubectl get pods

echo "list production services"
kubectl get svc

echo "building containers"
gcloud container builds submit -t gcr.io/${GCLOUD_PROJECT}/${CONTAINER_NAME} ../locust/docker-image

echo "deploy locust-master-controller"
sed -i "s/PROJECT_NAME/${GCLOUD_PROJECT}/g" ../locust/k8s/locust-master-controller.yaml
sed -i "s/LOAD_RUNNER_TARGET_HOST/${CLUSTER_IP}/g" ../locust/k8s/locust-master-controller.yaml
kubectl create -f ../locust/k8s/locust-master-controller.yaml

echo "confirm replication controller and pods are created"
kubectl get rc
kubectl get pods -l name=locust,role=master

echo "deploy locust-master-service"
kubectl create -f ../locust/k8s/locust-master-service.yaml

echo "confirm forwarding rule created"
kubectl get svc locust-master

echo "deploy locust-worker-controller"
sed -i "s/PROJECT_NAME/${GCLOUD_PROJECT}/g" ../locust/k8s/locust-worker-controller.yaml
sed -i "s/CONTAINER_NAME/${CONTAINER_NAME}/g" ../locust/k8s/locust-worker-controller.yaml
sed -i "s/LOAD_RUNNER_TARGET_HOST/${CLUSTER_IP}/g" ../locust/k8s/locust-worker-controller.yaml
kubectl create -f ../locust/k8s/locust-worker-controller.yaml

echo "confirm worker controller launched"
kubectl get pods -l name=locust,role=worker

echo "wait for ip address for cluster"
external_ip=""
while [ -z $external_ip ]; do
  echo "Waiting for end point..."
  external_ip=$(kubectl get svc locust --template="{{range .status.loadBalancer.ingress}}{{.ip}}{{end}}")
  [ -z "$external_ip" ] && sleep 10
done

echo "====================================================="
echo "="
echo "= your load balancer is available at ${external_ip}"
echo "="
echo "====================================================="