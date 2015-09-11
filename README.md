# Neko.js
Port of [NekoBot](https://github.com/Kusoneko/Nekobot) by [Kusoneko](https://github.com/Kusoneko), using [discord.js](https://github.com/hydrabolt/discord.js) by [hydrabolt](https://github.com/hydrabolt).

Version: 0.0.1

### Installation
Installing the bot is simple, you'll just need to have [Node](https://nodejs.org/) installed and do `npm install` to install the dependencies. Also the bot requires [Redis](http://redis.io/) to run, so you'll need to install that to.

### Configuration
You'll find a `config.example` file in the project root. Inside that file are all the expected configs: Email, Password, Servers, etc. Edit the settings with your bot's information and rename it to `config.json`. The only thing worth note here is the `server` value is the string of characters at the end of an invite link.

For example, the `server` for https://discord.gg/0Lv5NLFEoz3P07Aq would be `0Lv5NLFEoz3P07Aq`.

### Usage
Using the bot is just as simple as the installation, just `node nekobot.js`. You'll need to have Redis running before you run it though.

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
