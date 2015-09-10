/*
	initial NekoBot test
*/

var Discord		= require("discord.js");
var Redis		= require("redis");
var Logger		= require("winston");

var Config		= require("./config.json");
var Commands	= require('./nekobot/commands').Commands;
var Permissions	= require('./nekobot/permissions');

var NekoBot = new Discord.Client();
var rclient = Redis.createClient(Config.redis.port, Config.redis.host);

function init() { // init nekobot
	console.log("Initializing...");
	NekoBot.joinServer(Config.server);
}

function error(err){
	Logger.log("error", err);
	process.exit(1);
}

NekoBot.on("ready", function() {
	console.log("Ready!");
});

NekoBot.on("message", function(msg) {

	if(msg.author === NekoBot.user) { return }
	//console.log(msg.author);

	if(msg.content.charAt(0) === Config.commands.prefix) {

		// Remove the command symbol
		msg.content = msg.content.substr(1);

		// Split commands and params
		var chunks = msg.content.split(" ");
		var command = chunks[0];
		var params = chunks.slice(1);

		// Parse commands
		if (Commands[command]) {
			var user = msg.author;
			if (Permissions.canUseCommand(msg, user, command)) {
				Commands[command].fn(NekoBot, msg, params, error);
			} else {
				NekoBot.reply(msg, "You don't have access to " + command);
			}
		}
	}
});

NekoBot.on("disconnected", function() {
	error("Disconnected! :(");
});

NekoBot.login(Config.email, Config.password).then(init).catch(error);
