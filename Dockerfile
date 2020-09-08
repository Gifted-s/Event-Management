FROM node:12-alpine
WORKDIR /event-management-service
COPY package.json /event-management-service
RUN  npm install
COPY . /event-management-service
EXPOSE 3000
CMD ["node", "./src/index.js"]
