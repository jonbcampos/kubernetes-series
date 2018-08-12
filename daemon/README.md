# Kubernetes - Daemon
This is the daemon segment in a multipart series about Kubernetes and some of the finer points 
I've learned along the way when using [Kubernetes](https://kubernetes.io/) with 
[Google Cloud Platform](https://cloud.google.com/).

You can read the accompanying post for this folder here: 
[Kubernetes - Run A Pod Per Node With Daemon Sets](https://medium.com/google-cloud/kubernetes-run-a-pod-per-node-with-daemon-sets-f77ce3f36bf1).

To run this code here are the quick steps.

### To startup and deploy:
```bash
git clone https://github.com/jonbcampos/kubernetes-series.git
cd ~/kubernetes-series/daemon/scripts
sh startup.sh
sh deploy.sh
sh check-endpoint.sh endpoints
sh scale.sh 3 # to scale up
```

### To Teardown:
```bash
cd kubernetes-series/daemon/scripts # if necessary
sh teardown.sh
```