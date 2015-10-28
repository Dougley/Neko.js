# Neko.js
[![Version](https://img.shields.io/badge/version-0.6.2-brightgreen.svg?style=flat-square)]()
[![Status](https://img.shields.io/badge/status-in--dev-yellow.svg?style=flat-square)]()
[![Node](https://img.shields.io/badge/node-4.2.1-green.svg?style=flat-square)](https://nodejs.org/)
[![NPM](https://img.shields.io/badge/npm-3.3.9-green.svg?style=flat-square)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://mit-license.org/)
[![Tested](https://img.shields.io/badge/tested-Windows 7/10 | Ubuntu 14.04/15.04-lightgrey.svg?style=flat-square)]()

Port of [Nekobot](https://github.com/Kusoneko/Nekobot) (by [Kusoneko](https://github.com/Kusoneko)) to [Node](https://nodejs.org/), using [discord.js](https://github.com/hydrabolt/discord.js) (by [hydrabolt](https://github.com/hydrabolt)).

### Installation
You'll need the following programs to use Neko.js:
- [Node](https://nodejs.org/) and [npm](https://www.npmjs.com/) (Node's installer will install both)
- [Redis](http://redis.io/) (for storing user permissions & nsfw flags)

Installing the bot is simple. Open terminal/cmd in the Neko.js folder and `npm install` to install.

### Configuration
You'll find a `config.example` file in the Neko.js root. Edit the file with your own setting and rename the file to `config.json`. Most of the config values are self-explanatory. The only value worth making a note of is the `server` value, which is the string of characters found at the end of an invite link.

For example, the `server` value for https://discord.gg/0Lv5NLFEoz3P07Aq would be `0Lv5NLFEoz3P07Aq`

### Usage
Using the bot is just as simple as the installation. Make sure your Redis server is running ([Redis Quick Start](http://redis.io/topics/quickstart)), then open terminal/cmd in the Neko.js folder and `node neko.js`.

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
