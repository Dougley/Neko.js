var Request		= require('request');

var Permissions	= require('./permissions');
var Help		= require('./help');
var ImageChan	= require('./imagechan');
var Lewdsx		= require('./lewdsx');

Commands = [];

// ========================================================================
// User Commands
// ========================================================================

Commands["ping"] = {
	name: "ping",
	description: "I'll say 'Pong!'",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.reply(message, "Pong!").catch(errorCallback);
	}
}

Commands["commands"] =
Commands["help"] = {
	name: "help",
	params: "[command]",
	aliases: ['commands'],
	description: "I can tell you about any *command*. (Leave params empty for a list of all commands.)",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		// check for a param and only send info for that command
		if (params[0]) {
			Help.getCommandInfo(bot, message, params[0], errorCallback);
		// no param given, send a PM with all commands
		} else {
			Help.getAllCommands(bot, message, errorCallback);
		}
	}
}

Commands["nya"] = {
	name: "nya",
	description: "I'll say 'Nyaa~'",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.sendMessage(message, "Nyaa~").catch(errorCallback);
	}
}

Commands["poi"] = {
	name: "poi",
	description: "I'll say 'Poi!'",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.sendMessage(message, "Poi!").catch(errorCallback);
	}
}

Commands["icri"] =
Commands["sadhorn"] =
Commands["aicraievritaim"] =
Commands["aicraievritiem"] =
Commands["aicrai"] = {
	name: "aicrai",
	aliases: ['icri', 'sadhorn', 'aicraievritaim', 'aicraievritiem'],
	description: "When sad things happen...",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.sendMessage(message, "https://www.youtube.com/watch?v=0JAn8eShOo8").catch(errorCallback);
	}
}

Commands["rinpls"] =
Commands["notnow"] = {
	name: "notnow",
	aliases: ['rinpls'],
	description: "How to Rekt: Rin 101",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.sendMessage(message, "https://www.youtube.com/watch?v=2BZUzJfKFwM").catch(errorCallback);
	}
}

Commands["uninstall"] = {
	name: "uninstall",
	description: "A great advice in any situation.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.sendMessage(message, "https://www.youtube.com/watch?v=iNCXiMt1bR4").catch(errorCallback);
	}
}

Commands["kys"] =
Commands["killyourself"] = {
	name: "killyourself",
	aliases: ['kys'],
	description: "Another good advice.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.sendMessage(message, "https://www.youtube.com/watch?v=2dbR2JZmlWo").catch(errorCallback);
	}
}

Commands["say"] = {
	name: "say",
	description: "I'll repeat what you said.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.sendMessage(message, params.join(" ")).catch(errorCallback);
	}
}

Commands["reverse"] = {
	name: "reverse",
	description: "I'll repeat what you said, in reverse!",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// build a RegEx for mentions and channels
		var mentionRegEx = (/<@(\d{17})>/);
		var channelRegEx = (/<#(\d{17})>/);

		// cycle params for mentions and channels
		for (var i = 0; i < params.length; i++) {
			if (params[i].match(mentionRegEx)) {

				// grab username and convert param into a string
				var userId = mentionRegEx.exec(params[i])[1];
				params[i] = "@" + (bot.getUser("id", userId)).username;
			}
			if (params[i].match(channelRegEx)) {

				// grab channel name and convert param into a string
				var channelId = channelRegEx.exec(params[i])[1];
				params[i] = "#" + (bot.getChannel("id", channelId)).name;
			}
		}

		// build a string to reverse
		params = params.join(" ");

		// reverse it and send it.
		bot.sendMessage(message, params.split("").reverse().join("")).catch(errorCallback);
	}
}

Commands["safebooru"] = {
	name: "safebooru",
	params: "[tag ...]",
	description: "I'll find a random image from Safebooru with the tag(s) you request.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (typeof message.channel.server !== "undefined") { // PMs don't have servers, they have PMChannel

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "off") {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
					return;
				}
			});
		}

		// we're in a PM, or the channel allows NSFW... let's get lewd
		ImageChan.getImageByTags(bot, message, "safebooru", params, errorCallback);
	}
}

Commands["gelbooru"] = {
	name: "gelbooru",
	params: "[tag ...]",
	description: "I'll find a random image from Gelbooru with the tag(s) you request.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (typeof message.channel.server !== "undefined") { // PMs don't have servers, they have PMChannel

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "off") {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
					return;
				}
			});
		}

		// we're in a PM, or the channel allows NSFW... let's get lewd
		ImageChan.getImageByTags(bot, message, "gelbooru", params, errorCallback);
	}
}

Commands["rule34"] = {
	name: "rule34",
	params: "[tag ...]",
	description: "I'll find a random image from Rule34 with the tag(s) you request.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (typeof message.channel.server !== "undefined") { // PMs don't have servers, they have PMChannel

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "off") {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
					return;
				}
			});
		}

		// we're in a PM, or the channel allows NSFW... let's get lewd
		ImageChan.getImageByTags(bot, message, "rule34", params, errorCallback);
	}
}

Commands["konachan"] =
Commands["kona"] = {
	name: "kona",
	params: "[tag ...]",
	aliases: ['konachan'],
	description: "I'll find a random image from Konachan with the tag(s) you request.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (typeof message.channel.server !== "undefined") { // PMs don't have servers, they have PMChannel

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "off") {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
					return;
				}
			});
		}

		// we're in a PM, or the channel allows NSFW... let's get lewd
		ImageChan.getImageByTags(bot, message, "konachan", params, errorCallback);
	}
}

Commands["yandere"] = {
	name: "yandere",
	params: "[tag ...]",
	description: "I'll find a random image from Yandere with the tag(s) you request.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (typeof message.channel.server !== "undefined") { // PMs don't have servers, they have PMChannel

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "off") {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
					return;
				}
			});
		}

		// we're in a PM, or the channel allows NSFW... let's get lewd
		ImageChan.getImageByTags(bot, message, "yandere", params, errorCallback);
	}
}

Commands["quote"] = {
	name: "quote",
	description: "I'll give you a random inspirational quote.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// make an Http request to recieve quote
		Request("https://julxzs.website/api/quote", function (error, response, body) {

			if (error) { return errorCallback(error); } // error handle

			if (response.statusCode == 200) {

				// parse response body as JSON
				var quote = JSON.parse(body);

				// build a nicely formated string
				var quoteString = "\"" + quote.quote.quote + "\" - " + quote.quote.author + " " + quote.quote.date;

				// reply with an inspirational quote :)
				bot.sendMessage(message, quoteString).catch(errorCallback);

			} else { // some other response code... #blamejulxzs
				return errorCallback(["inspirational quote failed:", { response: response.statusCode }]);
			}
		});

	}
}

Commands["neko"] = {
	name: "neko",
	description: "I'll find a random Nekomimi from lewd.sx",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (typeof message.channel.server !== "undefined") { // PMs don't have servers, they have PMChannel

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "off") {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
					return;
				}
			});
		}

		// we're in a PM, or the channel allows NSFW... let's get lewd
		Lewdsx.getImage("neko", function(err, image) {
			if (err) { return errorCallback(err); } // error handle
			if (image) { bot.sendMessage(message, image).catch(errorCallback); }
		});
	}
}

Commands["kitsune"] = {
	name: "kitsune",
	description: "I'll find a random Kitsunemimi from lewd.sx",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (typeof message.channel.server !== "undefined") { // PMs don't have servers, they have PMChannel

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "off") {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
					return;
				}
			});
		}

		// we're in a PM, or the channel allows NSFW... let's get lewd
		Lewdsx.getImage("kitsune", function(err, image) {
			if (err) { return errorCallback(err); } // error handle
			if (image) { bot.sendMessage(message, image).catch(errorCallback); }
		});
	}
}

Commands["lewd"] = {
	name: "lewd",
	description: "I'll find a random Lewd image from lewd.sx",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (typeof message.channel.server !== "undefined") { // PMs don't have servers, they have PMChannel

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "off") {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
					return;
				}
			});
		}

		// we're in a PM, or the channel allows NSFW... let's get lewd
		Lewdsx.getImage("lewd", function(err, image) {
			if (err) { return errorCallback(err); } // error handle
			if (image) { bot.sendMessage(message, image).catch(errorCallback); }
		});
	}
}

Commands["qt"] = {
	name: "qt",
	description: "I'll find a random 2Dqt from lewd.sx",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (typeof message.channel.server !== "undefined") { // PMs don't have servers, they have PMChannel

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "off") {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
					return;
				}
			});
		}

		// we're in a PM, or the channel allows NSFW... let's get lewd
		Lewdsx.getImage("qt", function(err, image) {
			if (err) { return errorCallback(err); } // error handle
			if (image) { bot.sendMessage(message, image).catch(errorCallback); }
		});
	}
}

Commands["whereami"] = {
	name: "whereami",
	description: "I'll tell you information about the channel and server you're asking me this.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		if(message.channel.server != undefined){
			bot.sendMessage(message, "You are currently in *" + message.channel.name + "*(" + message.channel.id + ") on server **" + message.channel.server.name + "**(" + message.channel.server.id + ") owned by <@" + message.channel.server.ownerID + ">." ).catch(errorCallback);
		}
		else{
			bot.sendMessage(message, "You're in a private message with me, baka.").catch(errorCallback);
		}
	}
}

Commands["avatar"] = {
	name: "avatar",
	params: "[@user ...]",
	description: "I'll give you a link to the avatar of each *@user*, so you can see a larger version of the images.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback){
		// @mention doesn't work in PMs, so neither can this command
		if(message.channel.server === undefined){ // PMs don't have servers, they have PMChannel
			bot.sendMessage(message, "I can't do that in a PM! (I'm sorry ;w;)").catch(errorCallback);
			return;
		}

		// can't get the avatar of nobody!
		if (message.mentions.length === 0) {
			bot.reply(message, "please mention the user(s) you want to get the avatar of.").catch(errorCallback);
			return;
		}

		// build an array so all messages get sent at once
		var msgArray = [];

		// cycle mentions and add a message with the avatar of each user
		message.mentions.forEach(function(user) {
			if(user.avatar == null){
				msgArray.push(user.username + " has no avatar.");
			}
			else{
				msgArray.push(user.username + "'s avatar is: https://discordapp.com/api/users/" + user.id + "/avatars/" + user.avatar + ".jpg");
			}
		});

		// send messages
		bot.sendMessage(message, msgArray).catch(errorCallback);
	}
}

// ========================================================================
// Moderator Commands
// ========================================================================

Commands["whois"] = {
	name: "whois",
	params: "[@user ...]",
	description: "I'll tell you information about each *@user*.",
	authLevel: 1,
	fn: function(bot, message, params, errorCallback){
		// @mention doesn't work in PMs, so neither can this command
		if(message.channel.server === undefined){ // PMs don't have servers, they have PMChannel
			bot.sendMessage(message, "I can't do that in a PM! (I'm sorry ;w;)").catch(errorCallback);
			return;
		}

		// can't get the id of nobody!
		if (message.mentions.length === 0) {
			bot.reply(message, "please mention the user(s) you want to get the id of.").catch(errorCallback);
			return;
		}

		// build an array so all messages get sent at once
		var msgArray = [];

		// cycle mentions and add a message with the id of each user
		message.mentions.forEach(function(user) {
			msgArray.push(user.username + "'s id is " + user.id + ".");
		});

		// send messages
		bot.sendMessage(message, msgArray).catch(errorCallback);
	}
}

Commands["getauth"] =
Commands["getperms"] = {
	name: "getperms",
	params: "[@user ...]",
	aliases: ['getauth'],
	description: "I'll tell you the permissions level of each *@user*.",
	authLevel: 1,
	fn: function(bot, message, params, errorCallback) {

		// @mention doesn't work in PMs, so neither can this command
		if (typeof message.channel.server === "undefined") { // PMs don't have servers, they have PMChannel
			bot.sendMessage(message, "I can't do that in a PM! (I'm sorry ;w;)").catch(errorCallback);
			return;
		}

		// can't get the perm level of nobody!
		if (message.mentions.length === 0) {
			bot.reply(message, "please mention the user(s) you want to get the permission level of.").catch(errorCallback);
			return;
		}

		// build an array so all messages get sent at once
		var msgArray = [];

		// cycle mentions and add a message with the level of each user
		message.mentions.forEach(function(user) {
			Permissions.getUserLevel(user, function(err, level) {
				if (err) { return errorCallback(err); } // error handle
				msgArray.push(user.username + "'s Permissions level is: " + level);
			});
		});

		// send messages
		bot.sendMessage(message, msgArray).catch(errorCallback);
	}
}

Commands["canlewd"] =
Commands["nsfw"] = {
	name: "nsfw",
	params: "[on/off]",
	aliases: ['canlewd'],
	description: "I'll set the NSFW flag for the channel this command was issued in. (Leave params empty for status.)",
	authLevel: 1,
	fn: function(bot, message, params, errorCallback) {

		// PMs are always NSFW enabled
		if (typeof message.channel.server === "undefined") { // PMs don't have servers, they have PMChannel
			bot.sendMessage(message, "I can't do that in a PM! (l-lewd)").catch(errorCallback);
			return;
		}

		// check for (on/off) param to set
		if (params[0] === "on" || params[0] === "off") {
			Permissions.setAllowNSFW(message.channel, params[0], function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "on") {
					bot.sendMessage(message, "I've set NSFW to **ALLOWED** for " + message.channel).catch(errorCallback);
				}
				else if (allow === "off") {
					bot.sendMessage(message, "I've set NSFW to **DISABLED** for " + message.channel).catch(errorCallback);
				}
				else {
					bot.reply(message, "I've failed to set NSFW flag! ;w; (Please tell my master.)").catch(errorCallback);
				}
			});
		}

		// no (on/off) param was found, return the NSFW status instead
		else {
			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "on") {
					bot.sendMessage(message, "NSFW is **ALLOWED** in " + message.channel).catch(errorCallback);
				} else {
					bot.sendMessage(message, "NSFW is **DISABLED** in " + message.channel).catch(errorCallback);
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
	name: "trash",
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
	name: "setperms",
	params: "[level] [@user ...]",
	aliases: ['setauth'],
	description: "I'll set the permissions level of each *@user* to *level*.",
	authLevel: 3,
	fn: function(bot, message, params, errorCallback) {

		// @mention doesn't work in PMs, so neither can this command
		if (typeof message.channel.server === "undefined") { // PMs don't have servers, they have PMChannel
			bot.sendMessage(message, "I can't do that in a PM! (I'm sorry ;w;)").catch(errorCallback);
			return;
		}

		// make sure first param is a level
		if (isNaN(params[0])) {
			bot.reply(message, "your first param is not a number!").catch(errorCallback);
			return;
		}

		// can't set the perm level of nobody!
		if (message.mentions.length === 0) {
			bot.reply(message, "please mention the user(s) you want to set the permission level of.").catch(errorCallback);
			return;
		}

		// prevent users from setting a user's perms higher than their own (or hacking their level up)
		Permissions.getUserLevel(user, function(err, level) {
			if (err) { return errorCallback(err); }
			if (params[0] > level) {
				bot.reply(message, "you can't set a user's permissions higher than your own!").catch(errorCallback);
				return;
			}
		});

		// cycle mentions and set the perm level of each user
		message.mentions.forEach(function(user) {
			Permissions.setUserLevel(user, params[0], function(err, level) {
				if (err) { return errorCallback(err); }
			});
		});

		// let the user know we've set the levels
		bot.sendMessage(message, "Okay! I'll remember the new permissions levels. :)").catch(errorCallback);
	}
}

// ========================================================================
// Testing Command (Master only. Does nothing... mostly)
// ========================================================================

Commands["test"] = {
	name: "test",
	description: "Test Command",
	authLevel: 10,
	fn: function(bot, message, params, errorCallback) {

		// TEST CODE HERE

		// TEST FUNCTION
		bot.sendMessage(message, "Test complete. Check console.").catch(errorCallback);
	}
}

// Export Commands[command]
exports.Commands = Commands;
