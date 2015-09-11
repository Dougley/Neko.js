var Permissions	= require('./permissions');
var Config		= require("../config.json");

Commands = [];

// ========================================================================
// User Commands
// ========================================================================

Commands["ping"] = {
	usage: Config.commands.prefix + "ping",
	description: "I'll say 'Pong!'",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.reply(message, "Pong!").catch(errorCallback);
	}
}

Commands["nya"] = {
	usage: Config.commands.prefix + "nya",
	description: "I'll say 'Nyaa~'",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.reply(message, "Nyaa~").catch(errorCallback);
	}
}

Commands["poi"] = {
	usage: Config.commands.prefix + "poi",
	description: "I'll say 'Poi!'",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.reply(message, "Poi!").catch(errorCallback);
	}
}

Commands["icri"] =
Commands["sadhorn"] =
Commands["aicraievritaim"] =
Commands["aicraievritiem"] =
Commands["aicrai"] = {
	usage: Config.commands.prefix + "aicrai",
	aliases: ['icri', 'sadhorn', 'aicraievritaim', 'aicraievritiem'],
	description: "When sad things happen...",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.reply(message, "https://www.youtube.com/watch?v=0JAn8eShOo8").catch(errorCallback);
	}
}

Commands["rinpls"] =
Commands["notnow"] = {
	usage: Config.commands.prefix + "notnow",
	aliases: ['rinpls'],
	description: "How to Rekt: Rin 101",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.reply(message, "https://www.youtube.com/watch?v=2BZUzJfKFwM").catch(errorCallback);
	}
}

Commands["uninstall"] = {
	usage: Config.commands.prefix + "uninstall",
	description: "A great advice in any situation.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.reply(message, "https://www.youtube.com/watch?v=iNCXiMt1bR4").catch(errorCallback);
	}
}

Commands["kys"] =
Commands["killyourself"] = {
	usage: Config.commands.prefix + "killyourself",
	aliases: ['kys'],
	description: "Another good advice.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.reply(message, "https://www.youtube.com/watch?v=2dbR2JZmlWo").catch(errorCallback);
	}
}

// ========================================================================
// Moderator Commands
// ========================================================================

Commands["getauth"] =
Commands["getperms"] = {
	usage: Config.commands.prefix + "getperms [@USER ...]",
	aliases: ['getauth'],
	description: "I'll tell you the permissions level of each *@USER*.",
	authLevel: 1,
	fn: function(bot, message, params, errorCallback) {
		if (typeof message.channel.server === "undefined") { // PMs don't have servers, they have PMChannel
			bot.reply(message, "I can't do that in a PM! (I'm sorry ;w;)").catch(errorCallback);
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

Commands["canlewd"] =
Commands["nsfw"] = {
	usage: Config.commands.prefix + "nsfw (on/off)",
	aliases: ['canlewd'],
	description: "I'll set the NSFW flag for the channel this command was issued in. (Leave params empty for status.)",
	authLevel: 1,
	fn: function(bot, message, params, errorCallback) {
		if (typeof message.channel.server === "undefined") { // PMs don't have servers, they have PMChannel
			bot.reply(message, "I can't do that in a PM! (l-lewd)").catch(errorCallback);
			return;
		}
		if (params[0] === "on" || params[0] === "off") {
			Permissions.setAllowNSFW(message.channel, params[0], function(err, allow){
				if (err) { errorCallback(err); }
				if (allow === "on") {
					bot.reply(message, "I've set NSFW to **ALLOWED** for " + message.channel).catch(errorCallback);
				}
				else if (allow === "off") {
					bot.reply(message, "I've set NSFW to **DISABLED** for " + message.channel).catch(errorCallback);
				}
				else {
					bot.reply(message, "Oops! I've failed to set NSFW flag! ;w; (Please tell my master.)").catch(errorCallback);
				}
			});
		}
		else {
			Permissions.getAllowNSFW(message.channel, function(err, allow){
				if (err) { errorCallback(err); }
				if (allow === "on") {
					bot.reply(message, "NSFW is **ALLOWED** in " + message.channel).catch(errorCallback);
				} else {
					bot.reply(message, "NSFW is **DISABLED** in " + message.channel).catch(errorCallback);
				}
			});
		}
	}
}

// ========================================================================
// Admin Commands
// ========================================================================

Commands["onodera"] =
Commands["worstgirl"] =
Commands["trash"] = {
	usage: Config.commands.prefix + "trash",
	aliases: ['onodera', 'worstgirl'],
	description: "I'll upload an image of 'worst girl'. (WARNING: May cause nausea!)",
	authLevel: 2,
	fn: function(bot, message, params, errorCallback) {
		bot.sendFile(message, "./test/test.png").catch(errorCallback);
	}
}

// ========================================================================
// Owner Commands
// ========================================================================

Commands["setauth"] =
Commands["setperms"] = {
	usage: Config.commands.prefix + "setperms [LEVEL] [@USER ...]",
	aliases: ['setauth'],
	description: "I'll set the permissions level of each *@USER* to *LEVEL*.",
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

		bot.reply(message, "Okay! I'll remember the new permissions levels. :)").catch(errorCallback);
	}
}

// Export Commands[command]
exports.Commands = Commands;
