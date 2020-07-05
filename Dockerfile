ARG parent=d10fc5cc7570dfc4e868caaf222955ba40a19e84
ARG BASE=https://raw.githubusercontent.com/zed-vision/zed-vision-site/${parent}
ARG NODE_VERSION=14.5.0

FROM node:${NODE_VERSION}-alpine as dev-base
WORKDIR /app

ADD ${BASE}/package.json ${BASE}/yarn.lock ./
RUN yarn 

FROM dev-base as Dev

ADD yarn.lock package.json ./
RUN yarn

ADD . . 

## this will create the .cache folder - normal development will start faster
RUN  yarn concurrently --kill-others "yarn develop" "yarn wait-on http://localhost:8080 echo done"

EXPOSE 8000
CMD [ "yarn", "develop" ]
