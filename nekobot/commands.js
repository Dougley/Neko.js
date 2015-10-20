var Request			= require("request");

var Fortunes		= require("./fortunes").Fortunes;
var Help			= require("./help");
var ImageChan		= require("./imagechan");
var ImageFolder		= require("./imagefolder");
var Lewdsx			= require("./lewdsx");
var Logger			= require("./logger").Logger;
var Permissions		= require("./permissions");
var VersionChecker	= require("./versioncheck");

Commands = [];

// ========================================================================
// C# Bot Commands -- Suppress the "No command" message for the C# bot's unported commands
// ========================================================================

Commands["color"] = {
    name: "color",
    params: "[rolename] [red] [green] [blue]",
    description: "I'll change a role's color.",
    authLevel: 2,
    fn: function(bot, message, params, errorCallback) {
        return;
    }
}

Commands["leave"] = {
	name: "leave",
	description: "I'll leave the server, as requested. ;w;",
	authLevel: 2,
	fn: function(bot, message, params, errorCallback) {
		return;
	}
}

Commands["die"] = {
	name: "die",
	description: "I'll leave all servers and stop my program. ;w;'",
	authLevel: 3,
	fn: function(bot, message, params, errorCallback) {
		return;
	}
}

Commands["playerpost"] = {
	name: "playerpost",
	params: "[postid]",
	description: "I'll tell you the contents of the post with the given *postid*.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		return;
	}
}

Commands["playercomment"] = {
	name: "playercomment",
	params: "[postid] [commentid]",
	description: "I'll tell you the contents of the comment with the given *postid* and *commentid*.'",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		return;
	}
}

Commands["playerbio"] = {
	name: "playerbio",
	params: "[username]",
	description: "I'll tell you the short bio of the player with the given *username*.'",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		return;
	}
}

Commands["playerlongbio"] = {
	name: "playerlongbio",
	params: "[username]",
	description: "I'll tell you the long bio of the player with the given *username*.'",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		return;
	}
}

Commands["playeravatar"] = {
	name: "playeravatar",
	params: "[username]",
	description: "I'll link the avatar of the player with the given *username*.'",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		return;
	}
}

Commands["invite"] = {
	name: "invite",
	params: "[invitecode]",
	description: "Invites me to join a server via *invitecode*! (links not supported yet)",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		return;
	}
}

Commands["music"] = {
	name: "music",
	params: "[on/off] [channelid]",
	description: "Enables/Disables music streaming in the voice channel with the given *channelid*.",
	authLevel: 3,
	fn: function(bot, message, params, errorCallback) {
		return;
	}
}

Commands["cid"] = {
	name: "cid",
	params: "[channelname]",
	description: "I'll tell you the ID of the channel with the given *channelname*.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		return;
	}
}

Commands["skip"] = {
	name: "skip",
	description: "Vote to skip the current song. Skipping requires > 50% of the users in the channel to vote.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		return;
	}
}

Commands["forceskip"] = {
	name: "forceskip",
	description: "Moderator level skip for the current song. Forces skip, reguardless of votes.",
	authLevel: 1,
	fn: function(bot, message, params, errorCallback) {
		return;
	}
}

Commands["song"] = {
	name: "song",
	description: "I'll read you the ID3 tags of the current song. If I can't find them, I'll tell you the filename instead.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		return;
	}
}

Commands["encore"] =
Commands["ankouru"] =
Commands["replay"] = {
	name: "replay",
	aliases: ['encore', 'ankouru'],
	description: "Vote to replay the current song. Replay requires > 50% of the users in the channel to vote.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		return;
	}
}

Commands["request"] = {
	name: "request",
	params: "[filename]",
	description: "Request a song to be added to the queue.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		return;
	}
}

Commands["playlist"] = {
	name: "playlist",
	description: "I'll tell you the current playlist, aka the currently playing song and the 10 next songs I currently plan to play next, as well as their origin (Encore, Request or Playlist).",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		return;
	}
}

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

Commands["command"] =
Commands["commands"] =
Commands["help"] = {
	name: "help",
	params: "[command]",
	aliases: ['command','commands'],
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

Commands["version"] = {
	name: "version",
	description: "I'll check for updates and tell you my version status.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		// get version update status
		VersionChecker.getStatus(function(err, status) {

			if (err) { return errorCallback(err); } // error handle

			// versioncheck failed
			if (status === "failed") {
				bot.reply(message, "I've failed to check for updates! ;w; (Please tell my master.)").catch(errorCallback);
			}

			// versioncheck passed, reply with status
			else {
				bot.sendMessage(message, status).catch(errorCallback);
			}
		});
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

Commands["grats"] =
Commands["congrats"] =
Commands["congratulations"] = {
	name: "congratulations",
	aliases: ['grats', 'congrats'],
	description: "Congratulate someone for whatever reason.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.sendMessage(message, "https://www.youtube.com/watch?v=oyFQVZ2h0V8").catch(errorCallback);
	}
}

Commands["forward"] =
Commands["say"] = {
	name: "say",
	params: "[text ...]",
	aliases: ['forward'],
	description: "I'll repeat what you said.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.sendMessage(message, params.join(" ")).catch(errorCallback);
	}
}

Commands["reverse"] = {
	name: "reverse",
	params: "[text ...]",
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
		if (!message.isPrivate) {

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "on") {
					ImageChan.getImageByTags(bot, message, "safebooru", params, errorCallback);
				} else {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
				}
			});
		}

		else { // we're in a PM, or the channel allows NSFW... let's get lewd
			ImageChan.getImageByTags(bot, message, "safebooru", params, errorCallback);
		}
	}
}

/*Commands["gelbooru"] = {
	name: "gelbooru",
	params: "[tag ...]",
	description: "I'll find a random image from Gelbooru with the tag(s) you request.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (!message.isPrivate) {

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "on") {
					ImageChan.getImageByTags(bot, message, "gelbooru", params, errorCallback);
				} else {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
				}
			});
		}

		else { // we're in a PM, or the channel allows NSFW... let's get lewd
			ImageChan.getImageByTags(bot, message, "gelbooru", params, errorCallback);
		}
	}
}*/

Commands["rule34"] = {
	name: "rule34",
	params: "[tag ...]",
	description: "I'll find a random image from Rule34 with the tag(s) you request.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (!message.isPrivate) {

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "on") {
					ImageChan.getImageByTags(bot, message, "rule34", params, errorCallback);
				} else {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
				}
			});
		}

		else { // we're in a PM, or the channel allows NSFW... let's get lewd
			ImageChan.getImageByTags(bot, message, "rule34", params, errorCallback);
		}
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
		if (!message.isPrivate) {

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "on") {
					ImageChan.getImageByTags(bot, message, "konachan", params, errorCallback);
				} else {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
				}
			});
		}

		else { // we're in a PM, or the channel allows NSFW... let's get lewd
			ImageChan.getImageByTags(bot, message, "konachan", params, errorCallback);
		}
	}
}

Commands["yandere"] = {
	name: "yandere",
	params: "[tag ...]",
	description: "I'll find a random image from Yandere with the tag(s) you request.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (!message.isPrivate) {

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "on") {
					ImageChan.getImageByTags(bot, message, "yandere", params, errorCallback);
				} else {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
				}
			});
		}

		else { // we're in a PM, or the channel allows NSFW... let's get lewd
			ImageChan.getImageByTags(bot, message, "yandere", params, errorCallback);
		}
	}
}

Commands["lolibooru"] = {
	name: "lolibooru",
	params: "[tag ...]",
	description: "I'll find a random image from Lolibooru with the tag(s) you request.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (!message.isPrivate) {

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "on") {
					ImageChan.getImageByTags(bot, message, "lolibooru", params, errorCallback);
				} else {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
				}
			});
		}

		else { // we're in a PM, or the channel allows NSFW... let's get lewd
			ImageChan.getImageByTags(bot, message, "lolibooru", params, errorCallback);
		}
	}
}

Commands["quote"] = {
	name: "quote",
	description: "I'll give you a random inspirational quote.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// make an Http request to recieve quote
		Request("https://inspiration.julxzs.website/api/quote", function (error, response, body) {

			if (error) { return errorCallback(error); } // error handle

			if (response.statusCode == 200) {

				// parse response body as JSON
				var quote = JSON.parse(body).quote;

				// build a nicely formated string
				var quoteString = "\"" + quote.quote + "\" - " + quote.author + " " + quote.date;

				// reply with an inspirational quote :)
				bot.sendMessage(message, quoteString).catch(errorCallback);

			} else { // some other response code... #blamejulxzs
				return errorCallback(["inspirational quote failed:", { response: response.statusCode }]);
			}
		});

	}
}
/*
Commands["waifu"] = {
	name: "waifu",
	description: "I'll give you a random Waifu.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// make an Http request to recieve quote
		Request("https://julxzs.website/api/random-waifu", function (error, response, body) {

			if (error) { return errorCallback(error); } // error handle

			if (response.statusCode == 200) {

				// reply with waifu :)
				bot.sendMessage(message, JSON.parse(body).waifu).catch(errorCallback);

			} else { // some other response code... #blamejulxzs
				return errorCallback(["random waifu failed:", { response: response.statusCode }]);
			}
		});

	}
}
*/
Commands["neko"] = {
	name: "neko",
	description: "I'll find a random Nekomimi from lewd.sx",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (!message.isPrivate) {

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "on") {
					Lewdsx.getImage(bot, message, "neko", errorCallback);
				} else {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
				}
			});
		}

		else { // we're in a PM, or the channel allows NSFW... let's get lewd
			Lewdsx.getImage(bot, message, "neko", errorCallback);
		}
	}
}

Commands["kitsune"] = {
	name: "kitsune",
	description: "I'll find a random Kitsunemimi from lewd.sx",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (!message.isPrivate) {

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "on") {
					Lewdsx.getImage(bot, message, "kitsune", errorCallback);
				} else {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
				}
			});
		}

		else { // we're in a PM, or the channel allows NSFW... let's get lewd
			Lewdsx.getImage(bot, message, "kitsune", errorCallback);
		}
	}
}

Commands["lewd"] = {
	name: "lewd",
	description: "I'll find a random Lewd image from lewd.sx",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (!message.isPrivate) {

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "on") {
					Lewdsx.getImage(bot, message, "lewd", errorCallback);
				} else {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
				}
			});
		}

		else { // we're in a PM, or the channel allows NSFW... let's get lewd
			Lewdsx.getImage(bot, message, "lewd", errorCallback);
		}
	}
}

Commands["qt"] = {
	name: "qt",
	description: "I'll find a random 2Dqt from lewd.sx",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (!message.isPrivate) {

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "on") {
					Lewdsx.getImage(bot, message, "qt", errorCallback);
				} else {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
				}
			});
		}

		else { // we're in a PM, or the channel allows NSFW... let's get lewd
			Lewdsx.getImage(bot, message, "qt", errorCallback);
		}
	}
}

Commands["location"] =
Commands["channelinfo"] =
Commands["whereami"] = {
	name: "whereami",
	aliases: ['location', 'channelinfo'],
	description: "I'll tell you information about the channel and server you're asking me this from.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, return some info about the channel
		if (!message.isPrivate) {

			// build an array so all messages get sent at once
			var msgArray = [];

			msgArray.push("You are currently in " + message.channel + " (id: " + message.channel.id + ")");
			msgArray.push("on server **" + message.channel.server.name + "** (id: " + message.channel.server.id + ") (region: " + message.channel.server.region + ")");
			msgArray.push("owned by " + message.channel.server.owner + " (id: " + message.channel.server.owner.id + ")");
			if (message.channel.topic) { msgArray.push("The current topic is: " + message.channel.topic); }

			// send messages
			bot.sendMessage(message, msgArray).catch(errorCallback);
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
	fn: function(bot, message, params, errorCallback) {
		// @mention doesn't work in PMs, so neither can this command
		if (message.isPrivate) {
			bot.sendMessage(message, "I can't do that in a PM! (I'm sorry ;w;\\)").catch(errorCallback);
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
		for (index in message.mentions) {
			var user = message.mentions[index];
			if(user.avatar == null){
				msgArray.push(user.username + " has no avatar.");
			}
			else{
				msgArray.push(user.username + "'s avatar is: https://discordapp.com/api/users/" + user.id + "/avatars/" + user.avatar + ".jpg");
			}
		}

		// send messages
		bot.sendMessage(message, msgArray).catch(errorCallback);
	}
}

Commands["cosplay"] = {
	name: "cosplay",
	description: "I'll upload a random Cosplay, provided by Salvy.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (!message.isPrivate) {

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "on") {
					ImageFolder.getImage(bot, message, "cosplay", errorCallback);
				} else {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
				}
			});
		}

		else { // we're in a PM, or the channel allows NSFW... let's get lewd
			ImageFolder.getImage(bot, message, "cosplay", errorCallback);
		}
	}
}

Commands["pitur"] = {
	name: "pitur",
	description: "I'll upload a random Lewd, provided by Pitur.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (!message.isPrivate) {

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "on") {
					ImageFolder.getImage(bot, message, "pitur", errorCallback);
				} else {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
				}
			});
		}

		else { // we're in a PM, or the channel allows NSFW... let's get lewd
			ImageFolder.getImage(bot, message, "pitur", errorCallback);
		}
	}
}

Commands["gold"] = {
	name: "gold",
	description: "I'll upload a random Boat, provided by Au-chan.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// if we're not in a PM, then check NSFW flag before executing the command!
		if (!message.isPrivate) {

			Permissions.getAllowNSFW(message.channel, function(err, allow) {
				if (err) { return errorCallback(err); } // error handle
				if (allow === "on") {
					ImageFolder.getImage(bot, message, "gold", errorCallback);
				} else {
					bot.sendMessage(message, "NSFW commands are **DISABLED** in " + message.channel).catch(errorCallback);
				}
			});
		}

		else { // we're in a PM, or the channel allows NSFW... let's get lewd
			ImageFolder.getImage(bot, message, "gold", errorCallback);
		}
	}
}

Commands["rand"] = {
	name: "rand",
	params: "[min] [max]",
	description: "I'll give you a random number between *min* and *max*. Both params are optional. If only one number is given, it is the *max*. (defaults: 0-100)",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		// default min and max
		var min = 0;
		var max = 100;

		// make sure params are numbers
		for (param in params) {
			if (isNaN(params[param])) {
				bot.reply(message, "'" + params[param] + "' is not a number!").catch(errorCallback);
				return;
			}
		}

		// check for both min and max params
		if (params[0] && params[1]) {

			// some smaratass made both numbers the same
			if (params[0] === params[1]) {
				bot.reply(message, "you're joking right? It's " + params[0]).catch(errorCallback);
				return;
			}

			// make sure they're in the right order
			if (parseInt(params[0]) < parseInt(params[1])) {
				min = parseInt(params[0]);
				max = parseInt(params[1]);
			} else {
				min = parseInt(params[1]);
				max = parseInt(params[0]);
			}
		}

		// only one param, set max
		else if(params[0]) { max = parseInt(params[0]); }

		// get random [min to max]
		var rand = Math.floor(Math.random() * ((max - min) + 1) + min);

		// give the user their random number
		bot.reply(message, "your number is **" + rand + "**").catch(errorCallback);
	}
}

Commands["roll"] = {
	name: "roll",
	params: "[dice] [sides] [times]",
	description: "I'll roll a few sided dice for a given number of times. All params are optional. (defaults: 1 *dice*, 6 *sides*, 1 *times*)",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		// default dice, sides, and times
		var dice	= 1;
		var sides	= 6;
		var times	= 1;

		// make sure params are numbers... or "rick" :P
		for (param in params) {
			if (params[param] === "rick") {
				bot.sendMessage(message, "https://www.youtube.com/watch?v=dQw4w9WgXcQ").catch(errorCallback);
				return;
			}
			if (isNaN(params[param])) {
				bot.reply(message, "'" + params[param] + "' is not a number!").catch(errorCallback);
				return;
			}
		}

		// make sure params are greater than 0
		if (parseInt(params[0]) <= 0 || parseInt(params[1]) <= 0 || parseInt(params[2]) <= 0) {
			bot.reply(message, "all params must be greater than 0!").catch(errorCallback);
			return;
		}

		// set dice, sides, and times
		if (params[0]) { dice	= parseInt(params[0]); }
		if (params[1]) { sides	= parseInt(params[1]); }
		if (params[2]) { times	= parseInt(params[2]); }

		// roll'em
		var roll = 0;
		for (i = times; i > 0; i--) {
			for (j = dice; j > 0; j--) {
				roll += Math.floor(Math.random() * (sides + 1));
			}
		}

		// tell'em
		bot.reply(message, "you rolled " + dice + " different " + sides + "-sided dice " + times + " times... Result: **" + roll + "**").catch(errorCallback);
	}
}

Commands["lotto"] = {
	name: "lotto",
	description: "I'll give you a set of 6 lucky numbers!",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		// create an array to store lucky numbers
		var lotto = [];

		// generate lucky numbers
		while (lotto.length < 6) {

			// generate a number [1 to 59]
			var number = Math.floor((Math.random() * 59) + 1);

			// make sure the number doesn't already exist (and remove it if it does)
			for (index in lotto) {
				if (lotto[index] === number) { lotto.splice(index, 1); }
			}

			// add number to lucky numbers
			lotto.push(number);
		}

		// give the user their lucky numbers
		bot.reply(message, "your lucky numbers are **" + lotto.join("**, **") + "**").catch(errorCallback);
	}
}

Commands["fortune"] = {
	name: "fortune",
	description: "Wise words, from wise neko.",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		var rand = Math.floor(Math.random() * Fortunes.length);
		bot.sendMessage(message, "*" + Fortunes[rand] + "*").catch(errorCallback);
	}
}

Commands["pets"] =
Commands["pet"] = {
	name: "pet",
	params: "[@user ...]",
	aliases: ['pets'],
	description: "Everyone loves being pet, right!?! Pets each *@user*. Leave emtpy (or mention me too) to pet me!",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {

		// build an array to store pets
		var pets = [];

		// if everyone is mentioned, skip all other mentions. if nobody is mentioned, nekobot just purrs
		// TODO: message.everyoneMentioned is broken so for now we're using indexOf()
		if (message.mentions.length === 0 || params.indexOf("@everyone") !== -1) {
			if (params.indexOf("@everyone") !== -1) { pets.push(message.author + " pets @everyone "); }
			bot.sendMessage(message, pets + "*purrs*").catch(errorCallback);
			return;
		}

		// otherwise, cycle mentions and add each user to pets
		for (index in message.mentions) {
			var user = message.mentions[index];
			pets.push(user);
		}

		// if nekobot is on the list, purr
		if (message.isMentioned(bot.user)) { pets.push("*purrs*"); }

		// send message
		bot.sendMessage(message, message.author + " pets " + pets.join(" ")).catch(errorCallback);
	}
}

Commands["onodera"] =
Commands["worstgirl"] =
Commands["trash"] = {
	name: "trash",
	aliases: ['onodera', 'worstgirl'],
	description: "I'll upload an image of 'worst girl'. (WARNING: May cause nausea!)",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.sendFile(message, __dirname + "/../images/trash.png").catch(errorCallback);
	}
}

Commands["shia"] =
Commands["justdoit"] =
Commands["doit"] = {
	name: "doit",
	aliases: ['justdoit', 'shia'],
	description: "DON'T LET YOUR DREAMS JUST BE DREAMS!",
	authLevel: 0,
	fn: function(bot, message, params, errorCallback) {
		bot.sendFile(message, __dirname + "/../images/shia.jpg").catch(errorCallback);
	}
}

// ========================================================================
// Moderator Commands
// ========================================================================

Commands["getinfo"] =
Commands["whois"] = {
	name: "whois",
	params: "[@user ...]",
	aliases: ['getinfo'],
	description: "I'll tell you information about each *@user*.",
	authLevel: 1,
	fn: function(bot, message, params, errorCallback) {
		// @mention doesn't work in PMs, so neither can this command
		if (message.isPrivate) {
			bot.sendMessage(message, "I can't do that in a PM! (I'm sorry ;w;\\)").catch(errorCallback);
			return;
		}

		// can't get the id of nobody!
		if (message.mentions.length === 0) {
			bot.reply(message, "please mention the user(s) you want to get the information of.").catch(errorCallback);
			return;
		}

		// cycle mentions and send a message with the id and permissions of each user
		for (index in message.mentions) {
			var user = message.mentions[index];
			Permissions.getUserLevel(user, function(err, level){
				if (err) { return errorCallback(err); }
				bot.sendMessage(message, user + "'s id is **" + user.id + "** and their permissions level is **" + level + "**.");
			});
		}
	}
}

// ========================================================================
// Admin Commands
// ========================================================================

Commands["canlewd"] =
Commands["nsfw"] = {
	name: "nsfw",
	params: "[on/off]",
	aliases: ['canlewd'],
	description: "I'll set the NSFW flag for the channel this command was issued in. (Leave params empty for status.)",
	authLevel: 2,
	fn: function(bot, message, params, errorCallback) {

		// PMs are always NSFW enabled
		if (message.isPrivate) {
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
		if (message.isPrivate) {
			bot.sendMessage(message, "I can't do that in a PM! (I'm sorry ;w;\\)").catch(errorCallback);
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
		Permissions.getUserLevel(message.author, function(err, level) {
			if (err) { return errorCallback(err); }
			if (params[0] > level) {
				bot.reply(message, "you can't set a user's permissions higher than your own!").catch(errorCallback);
				return;
			}
		});

		// cycle mentions and set the perm level of each user
		for (index in message.mentions) {
			var user = message.mentions[index];
			Permissions.setUserLevel(user, params[0], function(err, level) {
				if (err) { return errorCallback(err); }
			});
		}

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
		Logger.info("Logger Test (Info)");
		Logger.warn("Logger Test (Warn)");
		Logger.error("Logger Test (Error)");
		bot.sendMessage(message, "Test complete. Check console and logs.").catch(errorCallback);
		throw new Error('Logger Test (Exception)');
	}
}

// Export Commands[command]
exports.Commands = Commands;
