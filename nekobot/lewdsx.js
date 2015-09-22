var Request		= require('request');

// ========================================================================
// Get Image
// ========================================================================

exports.getImage = function(bot, message, chan, errorCallback) {

	Request("https://lewdchan.com/" + chan + "/src/list.php", function (error, response, body) {

		if (error) { return errorCallback(error); } // error handle

		if (response.statusCode == 200) {

			// split response body into an array by newline
			var imgList = body.split(/\n/);

			// clean up blank lines and unsupported filetypes
			for (var i = 0; i < imgList.length; ++i) {
				if (imgList[i] === "") { imgList.splice(i--, 1); } // no blank lines
				if (imgList[i].split(".").pop() === "webm") { imgList.splice(i--, 1); } // no webm
			}

			// get a random image and return it
			var image = imgList[Math.floor(Math.random() * imgList.length)];
			bot.sendMessage(message, "https://lewdchan.com/" + chan + "/src/" + image).catch(errorCallback);

		} else { // some other response code... #blamecron
			return errorCallback(["lewd.sx " + chan + " failed:", { response: response.statusCode }]);
		}
	});
}
