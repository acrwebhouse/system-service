# system-service

build docker
docker build . -t acrwebdev/system-service:0.0.1

docker push
docker push acrwebdev/system-service:0.0.1

docker pull
docker pull acrwebdev/system-service:0.0.1

run docker
docker run -p 8000:8000 --env SERVER_IP=34.80.78.75 --env X_TOKEN= --env SERVER_PORT=8000 --env SWAGGER_IP=34.80.78.75 --env TZ=Asia/Taipei --restart=always --name=system-service -d acrwebdev/system-service:0.0.1
