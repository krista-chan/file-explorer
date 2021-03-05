FROM node:lts-alpine3.12

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY components/web .
RUN npm install
WORKDIR /usr/src/app/src
CMD ["node", "index.js"]