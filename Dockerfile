ARG parent=d10fc5cc7570dfc4e868caaf222955ba40a19e84
ARG BASE=https://raw.githubusercontent.com/zed-vision/zed-vision-site/${parent}
ARG NODE_VERSION=14.5.0

FROM node:${NODE_VERSION}-alpine as Base
WORKDIR /app

ADD ${BASE}/package.json ${BASE}/yarn.lock ./
RUN yarn 

FROM Base as Dev

ADD yarn.lock package.json ./
RUN yarn

ADD . . 

EXPOSE 8000
CMD [ "yarn", "develop" ]
