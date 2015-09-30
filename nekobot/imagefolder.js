var NodeDir		= require("node-dir");

// ========================================================================
// Get Image
// ========================================================================

exports.getImage = function(bot, message, folder, errorCallback) {

	NodeDir.files(__dirname + "/../images/" + folder, function(err, files) {

		if (err) { return errorCallback(err); } // error handle
		if (files) {

			// remove .gitignore from files list
			for (file in files) {
				if (files[file].slice(-10) === ".gitignore") { files.splice(file, 1); }
			}

			// send a random file
			if (files.length > 0) {
				bot.sendFile(message, files[Math.floor(Math.random() * files.length)]).catch(errorCallback);
			} else {
				bot.sendMessage(message, "The **" + folder + "** folder is emtpy! ;w; (Please tell my master.)").catch(errorCallback);
			}
		}
	});
}
