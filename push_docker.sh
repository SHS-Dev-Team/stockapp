

docker build --tag=stockapp .

dockerpath=beartuchman/stockapp

docker tag stockapp ${dockerpath}:thing

docker push ${dockerpath}:thing
