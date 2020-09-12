FROM node:14.10.1-buster-slim as depts

RUN apt-get update && apt-get install --yes \
      curl \
      unzip \
      git \
      libnss3-dev \
      sudo && \
   apt-get clean

RUN adduser node sudo && \
  echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers && \
  echo "Set disable_coredump false" >> /etc/sudo.conf 

WORKDIR /app

ADD ./scripts/debts.sh /tmp/

ENV DENO_INSTALL="/home/node/.deno" 
ENV PATH="$DENO_INSTALL/bin:$PATH"
RUN sh /tmp/debts.sh

ARG GITBASE=https://raw.githubusercontent.com/zed-vision/zed-vision-site/master
ADD --chown=node ${GITBASE}/package.json ${GITBASE}/yarn.lock ./
ADD --chown=node ${GITBASE}/packages/gatsby/package.json ./packages/gatsby/
ADD --chown=node ${GITBASE}/packages/code-editor/package.json ./packages/code-editor/

RUN yarn --frozen-lockfile --ignore-scripts && rm -rf node_modules

FROM depts 
ADD . .

RUN yarn install --check-files --frozen-lockfile  && \
    yarn ___build && \
    rm -rf node_modules && \
    mv /app /tmp/app && \
    chown node:node /tmp/app -R

EXPOSE 8000
EXPOSE 4507
EXPOSE 45739

CMD ["tail", "-f", "/dev/null"]