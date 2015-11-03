#!/usr/bin/env bash

# Update Repositories
sudo apt-get update

# Add Node v4.x Repo & Install/Update Node
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install/Update npm
cd /usr/local/lib/node_modules
sudo npm install npm@latest

# Install Nekobot
cd /var/www/public
sudo npm install --no-optional --no-bin-links

# Create Nekobot Service
sudo echo "
description 'Nekobot'
author 'TehSeph'

#start on runlevel [2345]
#start on vagrant-mounted
start on (local-filesystems and net-device-up IFACE=eth0)
#stop on runlevel [06]
stop on shutdown

pre-start script
	test -d /var/www/public
end script

respawn
respawn limit unlimited

#exec start-stop-daemon --start --make-pidfile --pidfile /var/run/nekobot.pid --exec /usr/bin/node -- /var/www/public/neko.js
exec sudo -u www-data NODE_PATH=/usr/local/lib/node_modules /usr/bin/node /var/www/public/neko.js
" >> /etc/init/nekobot.conf

# Start Nekobot Service
sudo service nekobot start

# Browse to Working Directory on SSH
sudo echo "cd /var/www/public" >> /home/vagrant/.bash_profile

# Customize Bash Prompt ( host[/current/directory] » )
sudo echo "PS1='\[\033[38;5;10m\]\h\[$(tput sgr0)\][\[\033[38;5;11m\]\w\[$(tput sgr0)\]]\[\033[38;5;9m\] » \[$(tput sgr0)\]'" >> /home/vagrant/.bash_profile
