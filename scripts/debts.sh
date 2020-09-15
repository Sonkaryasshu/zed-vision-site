#!/usr/bin/bash

if ! [ -x "$(command -v deno)" ]; then
    curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.4.0
fi

if ! [ -x "$(command -v file_server)" ]; then
    deno install --allow-net --allow-read https://deno.land/std@0.69.0/http/file_server.ts 
fi

