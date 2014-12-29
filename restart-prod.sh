#! /bin/bash

WORKING=$HOME/framebusca
LOGS=/var/log/framebusca-app

cd $WORKING

git checkout master
git pull

npm install
bower install

forever stop app

NODE_ENV="production" forever start --uid "app" -a -o $LOGS/app.log -e $LOGS/app.log $WORKING/index.js