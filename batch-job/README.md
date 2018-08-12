# Kubernetes - Batch Job
This is the batch-job segment in a multipart series about Kubernetes and some of the finer points 
I've learned along the way when using [Kubernetes](https://kubernetes.io/) with 
[Google Cloud Platform](https://cloud.google.com/).

You can read the accompanying post for this folder here: 
[Kubernetes - Running Background Tasks With Batch-Jobs](https://medium.com/@jonbcampos/kubernetes-running-background-tasks-with-batch-jobs-56482fbc853).

To run this code here are the quick steps.

### To startup and deploy:
```bash
git clone https://github.com/jonbcampos/kubernetes-series.git
cd ~/kubernetes-series/batch-job/scripts
sh startup.sh
sh deploy.sh
sh check-endpoint.sh
sh run_single_job.sh
sh run-sequential-job.sh
sh run-sequential-job.sh
```

### To Teardown:
```bash
cd kubernetes-series/batch-job/scripts # if necessary
sh teardown.sh
```