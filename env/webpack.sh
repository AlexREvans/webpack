#!/bin/bash

## INSTALL NODE JS
curl -sL https://deb.nodesource.com/setup_8.x | -E bash -


## INSTALL YARN
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list


apt-get update -y 
apt-get install -y nodejs
apt-get install -y yarn
apt-get install -y npm
