ARG parent=master
ARG BASE=https://raw.githubusercontent.com/zed-vision/zed-vision-site/${parent}
ARG NODE_VERSION=12

FROM node:${NODE_VERSION}-alpine as dev-base
WORKDIR /app

ENV GITBASE=${BASE}

ADD ${GITBASE}/package.json ${GITBASE}/yarn.lock ./
RUN yarn 

FROM dev-base as Dev

ADD yarn.lock package.json ./
RUN yarn

EXPOSE 8000
CMD [ "yarn", "start" ]
