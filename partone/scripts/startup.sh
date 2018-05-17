#!/usr/bin/env bash

echo "preparing..."
export GCLOUD_PROJECT=[your_project_name]
export INSTANCE_REGION=us-central1
export INSTANCE_ZONE=us-central1-a
export PROJECT_NAME=partone
export CLUSTER_NAME=${PROJECT_NAME}-cluster
export CONTAINER_NAME=${PROJECT_NAME}-container

echo "setup"
gcloud config set core/project ${GCLOUD_PROJECT}
gcloud config set compute/zone ${INSTANCE_ZONE}

echo "update local env"
gcloud components update

echo "login to gcloud"
gcloud auth login

echo "set project id"
gcloud config set project ${GCLOUD_PROJECT}

echo "install kubectl"
gcloud components install kubectl

echo "login to kubectl"
gcloud auth application-default login

echo "login to gcp docker"
gcloud auth configure-docker

echo "enable services"
gcloud services enable compute.googleapis.com
gcloud services enable container.googleapis.com

echo "creating container engine cluster"
gcloud container clusters create ${CLUSTER_NAME} --preemptible --zone ${INSTANCE_ZONE} --scopes cloud-platform --num-nodes 3

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