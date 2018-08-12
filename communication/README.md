# Kubernetes - Communication
This is the communication segment in a multipart series about Kubernetes and some of the finer points 
I've learned along the way when using [Kubernetes](https://kubernetes.io/) with 
[Google Cloud Platform](https://cloud.google.com/).

You can read the accompanying post for this folder here: 
[Kubernetes - Routing Internal Services Through FQDN](https://medium.com/google-cloud/kubernetes-routing-internal-services-through-fqdn-d98db92b79d3).

To run this code here are the quick steps.

### To startup and deploy:
```bash
git clone https://github.com/jonbcampos/kubernetes-series.git
cd ~/kubernetes-series/communication/scripts
sh startup.sh
sh deploy.sh
sh check-endpoint.sh
```

### To Teardown:
```bash
cd ~/kubernetes-series/communication/scripts # if necessary
sh teardown.sh
```