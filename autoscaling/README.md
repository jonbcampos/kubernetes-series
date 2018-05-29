# Kubernetes - Autoscaling
This is the first part in a multipart series about Kubernetes and some of the finer points 
I've learned along the way when using [Kubernetes](https://kubernetes.io/) with 
[Google Cloud Platform](https://cloud.google.com/).

You can read the accompanying post for this folder here: 
[Kubernetes - Autoscaling](https://medium.com/@jonbcampos/).

To run this code here are the quick steps.

### To startup and deploy with autoscaling:
```bash
git clone https://github.com/jonbcampos/kubernetes-series.git
cd kubernetes-series/autoscalin/scripts
sh startup.sh
sh deploy.sh
sh check-endpoint.sh
```

### To startup and deploy withOUT autoscaling:
```bash
git clone https://github.com/jonbcampos/kubernetes-series.git
cd kubernetes-series/autoscalin/scripts
sh startup_wo_autoscaling.sh
sh deploy.sh
sh check-endpoint.sh
```

### To Teardown:
```bash
cd kubernetes-series/autoscalin/scripts # if necessary
sh teardown.sh
```