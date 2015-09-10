var Redis		= require("redis");
var Config		= require("../config.json");

var rclient = Redis.createClient(Config.redis.port, Config.redis.host);

// ========================================================================
// GETTER
// ========================================================================
exports.getUserLevel = function(user, callback) {

	// return an obsurd value (aka: 10) if Master User
	if (user.id === Config.commands.masterUser) { return callback(null, 10); }

	// otherwise, connect to redis and find the stored user level
	rclient.get("auth_level:" + user.id, function(err, reply) {

		if (err) { return callback(err, -1); } // error handle
		if (reply) {
			return callback(null, reply); // return reply
		} else {
			callback(null, 0); // return 0 if no reply without error
		}
	});
}

// ========================================================================
// SETTER
// ========================================================================
exports.setUserLevel = function(user, level, callback) {

	// connect to redis and set user level
	rclient.set("auth_level:" + user.id, parseInt(level), function(err, reply) {
		if (err) { callback(err, -1); } // error handle
		if (reply) {
			callback(null, parseInt(level)); // return new level if sucessful
		} else {
			return callback(null, 0); // return 0 if fail without error
		}
	});
}
