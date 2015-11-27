# Neko.js
[![Version](https://img.shields.io/badge/version-0.8.7-brightgreen.svg?style=flat-square)]()
[![Status](https://img.shields.io/badge/status-in--dev-yellow.svg?style=flat-square)]()
[![Node](https://img.shields.io/badge/node-5.1.0-green.svg?style=flat-square)](https://nodejs.org/)
[![NPM](https://img.shields.io/badge/npm-3.5.0-green.svg?style=flat-square)](https://www.npmjs.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://mit-license.org/)
[![Tested](https://img.shields.io/badge/tested-Windows 7/10 | Ubuntu 14.04.3-lightgrey.svg?style=flat-square)]()

Port of [Nekobot](https://github.com/Kusoneko/Nekobot) (by [Kusoneko](https://github.com/Kusoneko)) to [Node](https://nodejs.org/), using [discord.js](https://github.com/hydrabolt/discord.js) (by [hydrabolt](https://github.com/hydrabolt)).

### Installation
You'll need the following programs to use Neko.js:
- [Node](https://nodejs.org/) and [npm](https://www.npmjs.com/) (Node's installer will install both)
- [Redis](http://redis.io/) (for storing user permissions & nsfw flags)

Installing the bot is simple. Open terminal/cmd in the Neko.js folder and `npm install` to install.

### Configuration
You'll find a `config.example` file in the Neko.js root. Edit the file with your own settings and rename the file to `config.json`. Hopefully most of the config values are self-explanatory, but we plan to document them in the future.

### Usage
Using the bot is just as simple as the install. Make sure your [Redis](http://redis.io/) server is running ([Redis Guide](http://redis.io/topics/quickstart)) then open terminal/cmd in the Neko.js folder and `node neko.js`.

### What's with the Vagrantfile?
Neko.js comes with a [Vagrant](https://www.vagrantup.com/) VM (powered by [ScotchBox](https://github.com/scotch-io/scotch-box)) for those who wish to use Neko.js without the hassle of installing [Node](https://nodejs.org/) or [Redis](http://redis.io/), or simply just want to run Neko.js in the same envioriment we've developed it in!

The VM comes with a provisioner script that automatically takes care of installing and running the bot. Once you've started the VM ([Vagrant Guide](https://docs.vagrantup.com/v2/getting-started/)) you may SSH in and use `service nekobot start`, `service nekobot stop`, `service nekobot restart`, and `service nekobot status` to manage the bot.

Additionally, [ScotchBox](https://github.com/scotch-io/scotch-box) comes with a webserver ([Apache](https://httpd.apache.org/)) which we've taken advatage of to provide a local control panel for viewing chat logs and easily starting/stopping the bot without the need to SSH into the VM. You can find this control panel by visiting http://192.168.33.20/ in a web browser on the same machine hosting the VM.

### Want to add features or help contribute?
We'll gladly let you do our work for us! If you have skills in javascript and want to add your own features or bugfixes to Neko.js you may absolutely feel free to send us a pull request. Likewise, if you don't exactly have the skills to add your own features you may leave us a request by submitting a new [issue](https://github.com/TehSeph/Neko.js/issues) on github with the `suggestion` tag or PM the idea to [TehSeph](https://github.com/TehSeph) or [Kusoneko](https://github.com/Kusoneko) on [Discord](https://discordapp.com/). :)
