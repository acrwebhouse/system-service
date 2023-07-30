# system-service

build docker
docker build . -t acrwebdev/system-service

docker push
docker push acrwebdev/system-service

docker pull
docker pull acrwebdev/system-service:latest

run docker
docker run -p 8000:8000 --env SERVER_IP=35.234.42.100 --env X_TOKEN= --env SERVER_PORT=8000 --env SWAGGER_IP=35.234.42.100 --env TZ=Asia/Taipei --restart=always --name=system-service -d acrwebdev/system-service
