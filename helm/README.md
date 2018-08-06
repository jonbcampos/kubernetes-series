# Kubernetes - Part One
This is the first part in a multipart series about Kubernetes and some of the finer points 
I've learned along the way when using [Kubernetes](https://kubernetes.io/) with 
[Google Cloud Platform](https://cloud.google.com/).

You can read the accompanying post for this folder here: 
[Kubernetes - Day One](https://medium.com/@jonbcampos/kubernetes-day-one-30a80b5dcb29).

and

[Kubernetes - Liveness Checks](https://medium.com/@jonbcampos/kubernetes-liveness-checks-4e73c631661f)
[Kubernetes - Readiness Probe](https://itnext.io/kubernetes-readiness-probe-83f8a06d33d3)

To run this code here are the quick steps.

### To startup and deploy:
```bash
git clone https://github.com/jonbcampos/kubernetes-series.git
cd kubernetes-series/partone/scripts
sh startup.sh
sh deploy.sh
sh check-endpoint.sh
```

### To Teardown:
```bash
cd kubernetes-series/partone/scripts # if necessary
sh teardown.sh
```