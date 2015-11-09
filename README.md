# Neko.js
[![Version](https://img.shields.io/badge/version-0.8.3-brightgreen.svg?style=flat-square)]()
[![Status](https://img.shields.io/badge/status-in--dev-yellow.svg?style=flat-square)]()
[![Node](https://img.shields.io/badge/node-5.0.0-green.svg?style=flat-square)](https://nodejs.org/)
[![NPM](https://img.shields.io/badge/npm-3.4.0-green.svg?style=flat-square)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://mit-license.org/)
[![Tested](https://img.shields.io/badge/tested-Windows 7/10 | Ubuntu 14.04.3-lightgrey.svg?style=flat-square)]()

Port of [Nekobot](https://github.com/Kusoneko/Nekobot) (by [Kusoneko](https://github.com/Kusoneko)) to [Node](https://nodejs.org/), using [discord.js](https://github.com/hydrabolt/discord.js) (by [hydrabolt](https://github.com/hydrabolt)).

### Installation
You'll need the following programs to use Neko.js:
- [Node](https://nodejs.org/) and [npm](https://www.npmjs.com/) (Node's installer will install both)
- [Redis](http://redis.io/) (for storing user permissions & nsfw flags)

Installing the bot is simple. Open terminal/cmd in the Neko.js folder and `npm install` to install.

### Configuration
You'll find a `config.example` file in the Neko.js root. Edit the file with your own settings and rename the file to `config.json`. Hopefully most of the config values are self-explanatory, but we will try to document them in the future.

### Usage
Using the bot is just as simple as the installation. Make sure your [Redis](http://redis.io/) server is running ([Redis Guide](http://redis.io/topics/quickstart)), then open terminal/cmd in the Neko.js folder and `node neko.js`.

### What's with the Vagrantfile?
Neko.js comes with a [Vagrant](https://www.vagrantup.com/) VM (powered by [ScotchBox](https://github.com/scotch-io/scotch-box)) for those who wish to use Neko.js without the hassle of installing [Node](https://nodejs.org/) or [Redis](http://redis.io/), or simply just want to run Neko.js in the same envioriment we've developed it in!

The VM comes with a provisioner script that automatically takes care of installing and running the bot. Once you've started the VM ([Vagrant Guide](https://docs.vagrantup.com/v2/getting-started/)) you may SSH in and use `service nekobot start`, `service nekobot stop`, `service nekobot restart`, and `service nekobot status` to manage the bot.

Additionally, [ScotchBox](https://github.com/scotch-io/scotch-box) comes with a webserver ([Apache](https://httpd.apache.org/)) which we have taken advatage of to provide a local control panel for viewing chat logs and easily starting/stopping the bot without the need to SSH into the VM. You can find this control panel by visting http://192.168.33.20/ in your web browser on the same machine hosting the VM.

### Want to add functions or help contribute?
We'll gladly let you do our work for us! If you have skills in javascript and want to add your own features or bugfixes to Neko.js you may absolutely feel free to send us a pull request. Likewise, if you don't exactly have the skills to add your own functions you may leave us a request by submitting a new [issue](https://github.com/TehSeph/Neko.js/issues) with the `suggestion` tag. :)

### License
The MIT License (MIT)

Copyright (c) 2015

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
