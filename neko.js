var Discord		= require("discord.js");

var Config		= require("./config.json");
var Logger		= require('./nekobot/logger').Logger;
var Commands	= require('./nekobot/commands').Commands;
var Permissions	= require('./nekobot/permissions');

var NekoBot = new Discord.Client();

// ========================================================================
// Init / Ready
// ========================================================================

function init() {
	Logger.info("Initializing...");
//	NekoBot.joinServer(Config.server);
}

NekoBot.on("ready", function() {
	Logger.info("Ready!");
});

// ========================================================================
// Command Reciever
// ========================================================================

NekoBot.on("message", function(msg) {

	// prevent NekoBot from gaining sentience
	if(msg.author === NekoBot.user) { return }

	// check for command prefix so we know it's a command
	if(msg.content.charAt(0) === Config.commands.prefix) {

		// remove the command prefix from the message
		msg.content = msg.content.substr(1);

		// split message into command and params
		var chunks = msg.content.split(" ");
		var command = chunks[0];
		var params = chunks.slice(1);

		// search for a matching command
		if (Commands[command]) {

			// make sure the user has permission
			Permissions.getUserLevel(msg.author, function(err, level) {

				if (err) { error(err); } // error handle
				if (level >= Commands[command].authLevel) {
					Commands[command].fn(NekoBot, msg, params, error);
				} else {
					var msgArray = [];
					msgArray.push("you don't have access to the **" + Config.commands.prefix + command + "** command.");
					msgArray.push("_(current permissions level: **" + level + "**, required permissions level: **" + Commands[command].authLevel + "**)_");
					NekoBot.reply(msg, msgArray).catch(error);
				}
			});

		// no matching command
		} else {
			NekoBot.reply(msg, "there is no **" + Config.commands.prefix + command + "** command.").catch(error);
		}
	}
});

// ========================================================================
// Error / Disconnect Handle
// ========================================================================

function error(err){
	Logger.error(err);
	process.exit(1);
}

NekoBot.on("disconnected", function() {
	error("Disconnected! :(");
});

// After all funcs, do Bot login! (This is the program entry point)
NekoBot.login(Config.email, Config.password).then(init).catch(error);
