#!/bin/bash

echo "Europe/London" > /etc/timezone
dpkg-reconfigure --frontend noninteractive tzdata

sed 's/XKBLAYOUT=.*/XKBLAYOUT="gb"/' -i /etc/default/keyboard

add-apt-repository -y ppa:git-core/ppa
apt-get update -y
apt-get install -y git

chown -R vagrant:vagrant /home/vagrant
