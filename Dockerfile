FROM node:14-alpine AS builder

LABEL maintainer="Ghalmas Shanditya Putra Agung <ghalmasshandityaaa@gmail.com>"

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY src src
RUN npm run build

FROM node:14-alpine
RUN apk add --no-cache tini
WORKDIR /usr/src/app
RUN chown node:node .
USER node
COPY package*.json ./
RUN npm install
COPY --from=builder /usr/src/app/dist/ dist/

ENTRYPOINT [ "/sbin/tini","--", "node", "dist/index.js" ]
