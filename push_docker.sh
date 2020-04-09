

docker build --tag=stockapp .

dockerpath=beartuchman/stockapp

docker tag stockapp ${dockerpath}:thin2

docker push ${dockerpath}:thin2
