#!/usr/bin/bash

if ! [ -x "$(command -v deno)" ]; then
    curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.4.2
fi

if ! [ -x "$(command -v file_server)" ]; then
    deno install --allow-net --allow-read -f https://deno.land/std@0.71.0/http/file_server.ts 
fi

