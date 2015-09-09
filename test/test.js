/*
	initial NekoBot test
*/

var Discord		= require("discord.js");
var Config		= require("../config.json");

var NekoBot = new Discord.Client();
var server, channel, message;

function init() { // init nekobot
	console.log("Initializing...");
}

function test1() { // make server
	NekoBot.createServer("NekoBot Test Server", "us-west").then(test2).catch(error);
}

function test2(_server) { // make channel
	console.log("Test 1: Successful");
	server = _server;

	NekoBot.createChannel(server, "test").then(test3).catch(error);
}

function test3(_channel) { // send message
	console.log("Test 2: Successful");
	channel = _channel;

	NekoBot.sendMessage(channel, "test message").then(test4).catch(error);
}

function test4(_message) { // delete message
	console.log("Test 3: Successful");
	message = _message;

	NekoBot.deleteMessage(message).then(test5).catch(error);
}

function test5() { // send ping
	console.log("Test 4: Successful");

	NekoBot.sendMessage(channel, "!ping").catch(error);
}

function test6(_message) { // send pong (edit message)
	console.log("Test 5: Successful");
	message = _message;

	NekoBot.updateMessage(message, "Pong!").then(test7).catch(error);
}

function test7() { // send file
	console.log("Test 6: Successful");
	testSent = true;

	NekoBot.sendFile(channel, "./test.png").then(done).catch(error);
}

function done() {
	console.log("Test 7: Successful");
	console.log("All tests completed succesfully! Exiting :)");
	process.exit(0);
}

function error(err){
	console.log("Error! Reason:", err);
	process.exit(1);
}

NekoBot.on("ready", function() {
	console.log("Ready! Begining tests...");
	test1();
});

NekoBot.on("message", function(msg) {
	if(msg.content === "!ping") {
		test6(msg);
	}
});

NekoBot.on("disconnected", function() {
	error("Disconnected! :(");
});

NekoBot.login(Config.email, Config.password).then(init).catch(error);
