ARG parent=master
ARG BASE=https://raw.githubusercontent.com/zed-vision/zed-vision-site/${parent}
ARG NODE_VERSION=14.9.0
ARG DENO_VERSION=1.3.2

FROM node:${NODE_VERSION}-buster-slim as Dev

RUN apt-get update && apt-get install --yes \
  curl \
  unzip \
  git \
  libnss3-dev \
  sudo && \
  apt-get clean


RUN adduser node sudo \
  && chown ${USER}:${USER} -R /home/${USER} \
  && echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers \
  && echo "Set disable_coredump false" >> /etc/sudo.conf 

USER node

RUN curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.3.2
ENV DENO_INSTALL="/home/node/.deno" 
ENV PATH="$DENO_INSTALL/bin:$PATH"

WORKDIR /app

RUN sudo chown node /app

ENV GITBASE=${BASE}

RUN sudo npm i -g devcert-cli

ADD --chown=node ${GITBASE}/package.json ${GITBASE}/yarn.lock ./
ADD --chown=node ${GITBASE}/packages/gatsby/package.json  ./packages/gatsby/
ADD --chown=node ${GITBASE}/packages/code-editor/package.json ./packages/code-editor/

RUN yarn --frozen-lockfile --ignore-scripts

EXPOSE 8000
EXPOSE 4507

CMD [ "yarn", "start" ] 

FROM Dev as Build
RUN ls -la
CMD ["yarn", "build"]