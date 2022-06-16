FROM node:14-alpine AS builder

LABEL maintainer="Ghalmas Shanditya Putra Agung <ghalmasshandityaaa@gmail.com>"

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY src ./src
COPY tsconfig*.json ./
RUN npm run build

FROM node:14-alpine
# Copy node modules and build directory
COPY --from=base ./node_modules ./node_modules
COPY --from=base /dist /dist

EXPOSE 3000
CMD ["dist/src/server.js"]