FROM node:14-alpine AS builder

LABEL maintainer="Ghalmas Shanditya Putra Agung <ghalmasshandityaaa@gmail.com>"

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 

FROM node:12.17.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=0 /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["npm", "start"]