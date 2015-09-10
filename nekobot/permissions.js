var Redis		= require("redis");
var Logger		= require("winston");

var Config		= require("../config.json");

var rclient = Redis.createClient(Config.redis.port, Config.redis.host);

exports.canUseCommand = function(message, user, command) {
	if (this.getUserLevel(message, user) >= Commands[command].authLevel) { return true; }
	return false;
}

exports.getUserLevel = function(message, user) {
//	Logger.log("info", message);
//	if (user.id === Config.commands.masterUser) { return 10; }

	rclient.get("auth_level:" + user.id, function(error, reply) {
		if (error) { Logger.log("error", error); }
		if (reply) { return +reply; }
	});

	return 0;
}

exports.setUserLevel = function(message, user, level) {
//	Logger.log("info", message);

	rclient.set("auth_level:" + user.id, level, function(error, reply) {
		if (error) { Logger.log("error", error); }
	});
}
