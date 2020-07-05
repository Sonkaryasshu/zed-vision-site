ARG parent=a7095a846116746590b3fdb612128b3b997f9ed3
ARG BASE=https://raw.githubusercontent.com/zed-vision/zed-vision-site/${parent}
ARG NODE_VERSION=14.5.0

FROM node:${NODE_VERSION}-alpine as dev-base
WORKDIR /app

ENV GITBASE=${BASE}

ADD ${GITBASE}/package.json ${GITBASE}/yarn.lock ./
RUN yarn 

FROM dev-base as Dev

ADD yarn.lock package.json ./
RUN yarn

ADD . . 

RUN apk update && apk add bash
EXPOSE 8000
CMD [ "yarn", "develop" ]
