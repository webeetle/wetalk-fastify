FROM node:12

WORKDIR /usr/src/app

COPY package*.json .
RUN npm install --production

COPY . /usr/src/app

EXPOSE 3001

RUN npm -g install create-fastify-app
CMD [ "npm", "run", "dev" ]