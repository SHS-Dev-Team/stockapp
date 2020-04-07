#!/usr/bin/env bash


#Step 1:
#set Docker ID/path
dockerpath=beartuchman/stockapp

#Step 2:
#Run the docker container with kubernetes
kubectl run thing  --image=${dockerpath}:thing --port=8000

#Step 3:
#List the pods
kubectl get pods

#Step 4:
#Port forward the conatin port to the open port
kubectl port-forward deployment/thing 5000:80
