#!/usr/bin/env bash

echo "preparing..."
export GCLOUD_PROJECT=$(gcloud config get-value project)
export INSTANCE_REGION=us-central1
export INSTANCE_ZONE=us-central1-a
export PROJECT_NAME=autoscaling
export CLUSTER_NAME=${PROJECT_NAME}-cluster
export CONTAINER_NAME=${PROJECT_NAME}-container

echo "setup"
gcloud config set compute/zone ${INSTANCE_ZONE}

echo "enable services"
gcloud services enable compute.googleapis.com
gcloud services enable container.googleapis.com

echo "adding autoscaling node pool"
gcloud container node-pools create ${CLUSTER_NAME}-pool \
    --cluster ${CLUSTER_NAME} \
    --enable-autoscaling --min-nodes 3 --max-nodes 10 \
    --zone ${INSTANCE_ZONE}