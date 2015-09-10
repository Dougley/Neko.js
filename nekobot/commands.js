var Permissions	= require('./permissions');
var Config		= require("../config.json");

Commands = [];

Commands["ping"] = {
	usage: Config.commands.prefix + "ping",
	description: "Responds with 'Pong!' if NekoBot is alive.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.reply(message, "Pong!").catch(errorCallback);
	}
}

Commands["trash"] = {
	usage: Config.commands.prefix + "trash",
	description: "Responds with an image of worst girl. WARNING: May cause nausea!",
	authLevel: 1,
	fn: function(bot, message, params, errorCallback) {
		bot.sendFile(message.channel, "./test/test.png").catch(errorCallback);
	}
}

Commands["getperms"] = {
	usage: Config.commands.prefix + "getperms [@USER ...]",
	description: "Responds with the permissions level of each @USER.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		if (typeof message.channel.server === "undefined") {
			bot.reply(message, Config.commands.prefix + "getperms can't be used from a PM.").catch(errorCallback);
			return;
		}
		if (message.mentions.length === 0) {
			bot.reply(message, "Please mention the user you want to get the permission level of.").catch(errorCallback);
			return;
		}

		message.mentions.forEach(function(user) {
			var level = Permissions.getUserLevel(message, user);
			bot.reply(message, user.username + "'s Permissions level is: " + level).catch(errorCallback);
		});
	}
}

Commands["setperms"] = {
	usage: Config.commands.prefix + "setperms [LEVEL] [@USER ...]",
	description: "Sets the permissions level of each @USER to LEVEL.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		if (typeof message.channel.server === "undefined") {
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
			Permissions.setUserLevel(message, user, +params[0]);
			//console.log("New Perm Level: ", Permissions.getUserLevel(message, user));
		});

		bot.reply(message, "Perm set?").catch(errorCallback);
	}
}

exports.Commands = Commands;
