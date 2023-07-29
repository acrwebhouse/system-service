# auth-service

build docker
docker build . -t acrwebdev/auth-service

docker push
docker push acrwebdev/auth-service

docker pull
docker pull acrwebdev/auth-service:latest

run docker
docker run -p 3000:3000 --env USER_BASIC_LOCATION=http://10.140.0.2:13000 --env SMTP_BASIC_LOCATION=http://10.140.0.2:16000 --env EMPLOYEES_BASIC_LOCATION=http://10.140.0.2:21000 --env AUTH_BASIC_LOCATION=http://10.140.0.2:23000 --env SERVER_IP=35.234.42.100 --env WEB_LOCATION=https://matchrentdev.com --env SERVER_PORT=3000 --env SWAGGER_IP=35.234.42.100 --env TZ=Asia/Taipei --restart=always --name=auth-service -d acrwebdev/auth-service
