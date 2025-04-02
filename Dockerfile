FROM node:18-alpine3.16

RUN apk upgrade && apk update && apk add curl

WORKDIR /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY server.js /app/server.js

RUN yarn install --frozen-lockfile

CMD [ "node", "server.js" ]
