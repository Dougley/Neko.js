var Config		= require("../config.json");
var Permissions	= require("./permissions");

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

				msgArray.push("**Command:** " + cmd.name + " (**Level:** " + cmd.authLevel + ")");
				msgArray.push("**Usage:** " + Config.commands.prefix + cmd.name + (cmd.params ? " " + cmd.params : ""));
				if (cmd.aliases) { msgArray.push("**Aliases:** " + cmd.aliases.join(", ")); }
				msgArray.push(cmd.description);

				// send messages
				bot.sendMessage(message, msgArray).catch(errorCallback);

			// user doesn't have permission
			} else {
				var msgArray = [];
				msgArray.push("you don't have access to the **" + Config.commands.prefix + command + "** command.");
				msgArray.push("_(current permissions level: **" + level + "**, required permissions level: **" + Commands[command].authLevel + "**)_");
				bot.reply(message, msgArray).catch(errorCallback);
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

	if (!message.isPrivate) {
		bot.reply(message, "I'm sending you a list of commands via PM. (I don't want to spam...)").catch(errorCallback);
	}

	// create an array to store available commands
	var commands = [];

	// check the user's permissions level
	Permissions.getUserLevel(message.author, function(err, level) {

		if (err) { return errorCallback(err); } // error handle

		// cycle all commands and check the user has permissons
		for (index in Commands) {
			if (level >= Commands[index].authLevel) {

				// make sure the command hasn't already been added to the list (because of aliases), then add it
				if (commands[commands.length - 1] !== Commands[index].name) {
					commands.push(Commands[index].name);
				}
			}
		}

		// build an array so all messages get sent at once
		var msgArray = [];

		msgArray.push("**Available Commands:**");
		msgArray.push(commands.join(", "));
		msgArray.push("\nType **" + Config.commands.prefix + "help command** for detailed information.");
		msgArray.push("If you have any suggestions for new commands or features, message Kusoneko or TehSeph with your idea and they *might* add them in.");

		// send messages
		bot.sendMessage(message.author, msgArray).catch(errorCallback);
	});
}
