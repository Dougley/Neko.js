/*
	initial NekoBot test
*/

var Discord		= require("discord.js");
var Config		= require("./config.json");

var NekoBot = new Discord.Client();

function init() { // init nekobot
	console.log("Initializing...");
	NekoBot.joinServer(Config.server);
}

function error(err){
	console.log("Error! Reason:", err);
	process.exit(1);
}

NekoBot.on("ready", function() {
	console.log("Ready!");
});

NekoBot.on("message", function(msg) {
	if(msg.content === "!ping") {
		NekoBot.sendMessage(msg.channel, "Pong!").catch(error);
	}
	if(msg.content === "!trash") {
		NekoBot.sendFile(msg.channel, "./test/test.png").catch(error);
	}
});

NekoBot.on("disconnected", function() {
	error("Disconnected! :(");
});

NekoBot.login(Config.email, Config.password).then(init).catch(error);
