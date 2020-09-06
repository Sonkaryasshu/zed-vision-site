#!/usr/bin/bash

if ! [ -x "$(command -v deno)" ]; then
    curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.3.3
fi

if ! [ -x "$(command -v file_server)" ]; then
    deno install --allow-net --allow-read https://deno.land/std@0.68.0/http/file_server.ts 
fi

if ! [ -x "$(command -v devcert)" ]; then
    sudo npm i -g devcert-cli 
fi

if ! [ -d "./.certs" ]; then
    mkdir .certs && cd .certs && devcert generate localhost
fi

