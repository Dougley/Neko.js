var Discord		= require("discord.js");
//var Redis		= require("redis");
var Winston		= require("winston");

var Config		= require("./config.json");
var Commands	= require('./nekobot/commands').Commands;
var Permissions	= require('./nekobot/permissions');

var NekoBot = new Discord.Client();

// ========================================================================
// Logger
// ========================================================================

var Logger = new Winston.Logger({
	colors: {
		verbose: 'cyan',
		debug: 'blue',
		info: 'green',
		warn: 'yellow',
		error: 'red'
	},
	transports: [
		new Winston.transports.File({
			humanReadableUnhandledException: true,
			handleExceptions: true,
			name: 'file-logger',
			filename: __dirname + '/logs/nekobot-winston.json',
			level: 'info',
			json: true
		}),
		new Winston.transports.Console({
			handleExceptions: false,
			name: 'console-logger',
			level: 'verbose',
			colorize: true,
			json: false
		})
	],
	exitOnError: false
});

// ========================================================================
// Init / Ready
// ========================================================================

function init() {
	Logger.info("Initializing...");
	NekoBot.joinServer(Config.server);
}

NekoBot.on("ready", function() {
	Logger.info("Ready!");
});

// ========================================================================
// Command Reciever
// ========================================================================

NekoBot.on("message", function(msg) {

	// prevent NekoBot from gaining sentience
	if(msg.author === NekoBot.user) { return }

	// check for command prefix so we know it's a command
	if(msg.content.charAt(0) === Config.commands.prefix) {

		// remove the command prefix from the message
		msg.content = msg.content.substr(1);

		// split message into command and params
		var chunks = msg.content.split(" ");
		var command = chunks[0];
		var params = chunks.slice(1);

		// search for a matching command
		if (Commands[command]) {

			// make sure the user has permission
			Permissions.getUserLevel(msg.author, function(err, level) {

				if (err) { error(err); } // error handle
				if (level >= Commands[command].authLevel) {
					Commands[command].fn(NekoBot, msg, params, error);
				} else {
					NekoBot.reply(msg, "you don't have access to the **" + Config.commands.prefix + command + "** command.").catch(error);
				}
			});

		// no matching command
		} else {
			NekoBot.reply(msg, "there is no **" + Config.commands.prefix + command + "** command.").catch(error);
		}
	}
});

// ========================================================================
// Error / Disconnect Handle
// ========================================================================

function error(err){
	Logger.error(err);
	process.exit(1);
}

NekoBot.on("disconnected", function() {
	error("Disconnected! :(");
});

// After all funcs, do Bot login! (This is the program entry point)
NekoBot.login(Config.email, Config.password).then(init).catch(error);
