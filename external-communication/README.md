# Kubernetes - External Communication
This is the communication segment in a multipart series about Kubernetes and some of the finer points 
I've learned along the way when using [Kubernetes](https://kubernetes.io/) with 
[Google Cloud Platform](https://cloud.google.com/).

You can read the accompanying post for this folder here: 
[Kubernetes - DNS Proxy With Services](https://medium.com/google-cloud/kubernetes-dns-proxy-with-services-d7d9e800c329).

To run this code here are the quick steps.

### To startup and deploy:
```bash
git clone https://github.com/jonbcampos/kubernetes-series.git
cd ~/kubernetes-series/external-communication/scripts
sh startup.sh
sh deploy.sh
sh check-endpoint.sh
```

### To Teardown:
```bash
cd ~/kubernetes-series/external-communication/scripts # if necessary
sh teardown.sh
```