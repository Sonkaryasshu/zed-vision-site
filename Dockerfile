FROM node:14.12.0-buster-slim as depts

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

WORKDIR /app/.certs
RUN npx devcert-cli generate localhost

WORKDIR /app

ENV DENO_INSTALL="/home/node/.deno" 
ENV PATH="$DENO_INSTALL/bin:$PATH"
# RUN sh /tmp/debts.sh

ARG GITBASE=https://raw.githubusercontent.com/zed-vision/zed-vision-site/master
ADD --chown=node ${GITBASE}/package.json ${GITBASE}/yarn.lock ./

RUN yarn --frozen-lockfile --ignore-scripts && rm -rf node_modules

FROM depts 

ADD package.json yarn.lock ./
RUN yarn install --check-files --frozen-lockfile

ADD packages ./packages/

RUN yarn build && \
    rm -rf /app/node_modules && \
    mv /app /tmp/app && \
    chown node:node /tmp/app -R

EXPOSE 8000
EXPOSE 4507
EXPOSE 45739

CMD ["tail", "-f", "/dev/null"]