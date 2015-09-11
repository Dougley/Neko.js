var Permissions	= require('./permissions');
var Config		= require("../config.json");

Commands = [];

// ========================================================================
// User Commands
// ========================================================================

Commands["ping"] = {
	usage: Config.commands.prefix + "ping",
	description: "Responds with 'Pong!' if NekoBot is alive.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.reply(message, "Pong!").catch(errorCallback);
	}
}

// ========================================================================
// Moderator Commands
// ========================================================================

Commands["getperms"] = {
	usage: Config.commands.prefix + "getperms [@USER ...]",
	description: "Responds with the permissions level of each @USER.",
	authLevel: 1,
	fn: function(bot, message, params, errorCallback) {
		if (typeof message.channel.server === "undefined") { // PMs don't have servers, they have PMChannel
			bot.reply(message, Config.commands.prefix + "getperms can't be used from a PM.").catch(errorCallback);
			return;
		}
		if (message.mentions.length === 0) {
			bot.reply(message, "Please mention the user you want to get the permission level of.").catch(errorCallback);
			return;
		}

		message.mentions.forEach(function(user) {
			Permissions.getUserLevel(user, function(err, level){
				if (err) { errorCallback(err); }
				bot.reply(message, user.username + "'s Permissions level is: " + level).catch(errorCallback);
			});
		});
	}
}

// ========================================================================
// Admin Commands
// ========================================================================

Commands["trash"] = {
	usage: Config.commands.prefix + "trash",
	description: "Responds with an image of worst girl. WARNING: May cause nausea!",
	authLevel: 2,
	fn: function(bot, message, params, errorCallback) {
		bot.sendFile(message, "./test/test.png").catch(errorCallback);
	}
}

// ========================================================================
// Owner Commands
// ========================================================================

Commands["setperms"] = {
	usage: Config.commands.prefix + "setperms [LEVEL] [@USER ...]",
	description: "Sets the permissions level of each @USER to LEVEL.",
	authLevel: 3,
	fn: function(bot, message, params, errorCallback) {
		if (typeof message.channel.server === "undefined") { // PMs don't have servers, they have PMChannel
			bot.reply(message, Config.commands.prefix + "setperms can't be used from a PM.").catch(errorCallback);
			return;
		}
		if (isNaN(params[0])) {
			bot.reply(message, "First param is not a number!").catch(errorCallback);
			return;
		}
		if (message.mentions.length === 0) {
			bot.reply(message, "Please mention the user you want to set the permission level of.").catch(errorCallback);
			return;
		}

		message.mentions.forEach(function(user) {
			Permissions.setUserLevel(user, params[0], function(err, level){
				if (err) { errorCallback(err); }
			});
		});

		bot.reply(message, "Permissions levels set.").catch(errorCallback);
	}
}

// Export Commands[command]
exports.Commands = Commands;
