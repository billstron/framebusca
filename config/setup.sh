#!/bin/bash

WORKING=$HOME
LOGS=/var/log/framebusca-app

# deploying the nginx config
echo "Deploying the nginx configs."
sudo rm /etc/nginx/conf.d/*

sudo ln -s $WORKING/framebusca/config/nginx/* /etc/nginx/conf.d/
sudo service nginx restart

# prepare the log directories
sudo mkdir -p $LOGS
sudo chmod 777 $LOGS

# restart hooker
echo "Restarting the github webhook handler"
sudo killall hooker
nohup hooker $WORKING/framebusca/config/hook-config.json &> $LOGS/hooker.log &

echo "Finished."
exit