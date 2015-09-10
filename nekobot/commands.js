Commands = [];

Commands["ping"] = {
	usage: "!ping",
	description: "Responds with 'Pong!' if NekoBot is alive.",
	authLevel: 0,
	fn: function(bot, message, params) {
		bot.reply(message, "Pong!").catch(bot.error);
	}
}

Commands["trash"] = {
	usage: "!trash",
	description: "Responds with an image of worst girl. WARNING: May cause nausea!",
	authLevel: 0,
	fn: function(bot, message, params) {
		bot.sendFile(message.channel, "./test/test.png").catch(bot.error);
	}
}

exports.Commands = Commands;
