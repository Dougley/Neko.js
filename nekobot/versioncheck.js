var Request		= require("request");

var Logger		= require("./logger").Logger;

// ========================================================================
// Version Fetching
// ========================================================================

var version = require("../package.json").version.split(".");

exports.getCurrentVersion	= function() { return version.join("."); }
exports.getCurrentMajor		= function() { return version[0]; }
exports.getCurrentMinor		= function() { return version[1]; }
exports.getCurrentRevision	= function() { return version[2]; }

exports.getLatestVersion = function(callback) {

	// fetch latest version number from GitHub
	Request("https://raw.githubusercontent.com/TehSeph/Neko.js/master/package.json", function (error, response, body) {

		if (error) { return callback(error, null); } // error handle

		if (response.statusCode == 200) {

			var latest = JSON.parse(body).version.split(".");
			return callback(null, JSON.parse(body).version); // return version

		} else { // some other response code...
			Logger.warn("versioncheck failed:", { response: response.statusCode });
			return callback(null, "failed");
		}
	});
}

exports.getLatestMajor = function(callback) {
	this.getLatest(function(err, latest) {
		if (err) { return callback(err, null); } // error handle
		return callback(null, parseInt(latest.split(".")[0]));
	});
}

exports.getLatestMinor = function(callback) {
	this.getLatest(function(err, latest) {
		if (err) { return callback(err, null); } // error handle
		return callback(null, parseInt(latest.split(".")[1]));
	});
}

exports.getLatestRevision = function(callback) {
	this.getLatest(function(err, latest) {
		if (err) { return callback(err, null); } // error handle
		return callback(null, parseInt(latest.split(".")[2]));
	});
}

// ========================================================================
// Version Checking
// ========================================================================

exports.getStatus = function(callback) {

	// fetch latest version number from GitHub
	this.getLatestVersion(function(err, latest) {

		if (err) { return callback(err, null); } // error handle
		if (latest === "versioncheck failed") { return callback(null, latest); } // failure handle

		// split result into an array
		latest = latest.split(".");

		// check for major updates
		if (parseInt(version[0]) < parseInt(latest[0])) {
			var behind = (parseInt(latest[0]) - parseInt(version[0]));
			return callback(null, "Bot is " + behind + " major versions behind. (current: " + version.join(".") + ", latest: " + latest.join(".") + ")");
		}

		// check for minor updates
		if (parseInt(version[1]) < parseInt(latest[1])) {
			var behind = (parseInt(latest[1]) - parseInt(version[1]));
			return callback(null, "Bot is " + behind + " minor versions behind. (current: " + version.join(".") + ", latest: " + latest.join(".") + ")");
		}

		// check for revison updates
		if (parseInt(version[2]) < parseInt(latest[2])) {
			var behind = (parseInt(latest[2]) - parseInt(version[2]));
			return callback(null, "Bot is " + behind + " revision versions behind. (current: " + version.join(".") + ", latest: " + latest.join(".") + ")");
		}

		// up to date :)
		return callback(null, "Bot is fully up to date. (version: " + version.join(".") + ")");
	});
}
