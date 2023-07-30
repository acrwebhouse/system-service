FROM node:18
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY . /usr/src/app
RUN npm install 
RUN chmod +x ./dockerCmd.sh
EXPOSE 8000
CMD [ "./dockerCmd.sh"]