var Config		= require("../config.json");
var Permissions	= require('./permissions');

// ========================================================================
// Single Command
// ========================================================================

exports.getCommandInfo = function(bot, message, command, errorCallback) {

	// search for an existing command
	if (Commands[command]) {

		// store as var for easier calls
		var cmd = Commands[command];

		// make sure the user has permission
		Permissions.getUserLevel(message.author, function(err, level) {

			if (err) { return errorCallback(err); } // error handle
			if (level >= cmd.authLevel) {

				// build an array so all messages get sent at once
				var msgArray = [];

				msgArray.push("**Command:** " + cmd.name);
				msgArray.push("**Usage:** " + Config.commands.prefix + cmd.name + (cmd.params ? " " + cmd.params : ""));
				if (cmd.aliases) { msgArray.push("**Aliases:** " + cmd.aliases.join(", ")); }
				msgArray.push(cmd.description);

				// send messages
				bot.sendMessage(message, msgArray).catch(errorCallback);

			// user doesn't have permission
			} else {
				bot.reply(message, "you don't have access to the **" + Config.commands.prefix + command + "** command.").catch(errorCallback);
			}
		});

	// no matching command
	} else {
		bot.reply(message, "there is no **" + Config.commands.prefix + command + "** command.").catch(errorCallback);
	}
}

// ========================================================================
// List All Commands
// ========================================================================

exports.getAllCommands = function(bot, message, errorCallback) {

	if (typeof message.channel.server !== "undefined") { // PMs don't have servers, they have PMChannel
		bot.reply(message, "I'm sending you a list of commands via PM. (I don't want to spam...)").catch(errorCallback);
	}

	// create a string of all commands by name
	var commands = (Object.keys(Commands)).join(", ");

	// build an array so all messages get sent at once
	var msgArray = [];

	msgArray.push("**Available Commands:**");
	msgArray.push(commands);
	msgArray.push("Type **" + Config.commands.prefix + "help [command]** for detailed information.");

	// send messages
	bot.sendMessage(message.author, msgArray).catch(errorCallback);
}
