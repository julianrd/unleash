FROM node:10-alpine

ENV SERVICE_NAME zoopix-unleash

WORKDIR /var/www/$SERVICE_NAME/

COPY package-lock.json /var/www/$SERVICE_NAME/
COPY package.json /var/www/$SERVICE_NAME/

RUN npm i -g nodemon
RUN npm ci

COPY . /var/www/$SERVICE_NAME

RUN ls

EXPOSE 80 9229

CMD nodemon server