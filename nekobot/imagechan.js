var Request		= require("request");
var XmlParser	= require("xml2js");

var Logger		= require("./logger").Logger;

// ========================================================================
// Chan Specific Links
// ========================================================================

const SAFEBOORU	= ["http://safebooru.org/index.php?page=dapi&s=post&q=index&limit=1&tags=", "&pid="];
const GELBOORU	= ["http://gelbooru.com/index.php?page=dapi&s=post&q=index&limit=1&tags=", "&pid="];
const RULE34	= ["http://rule34.xxx/index.php?page=dapi&s=post&q=index&limit=1&tags=", "&pid="];
const KONACHAN	= ["http://konachan.com/post.xml?limit=1&tags=", "&page="];
const YANDERE	= ["https://yande.re/post.xml?limit=1&tags=", "&page="];
const LOLIBOORU	= ["http://lolibooru.moe/post/index.xml?limit=1&tags=", "&page="];

// ========================================================================
// Get Post Count From Tag
// ========================================================================

exports.getPostCount = function(chan, tags, callback) {

	// get the appropriate api link
	if (chan === "safebooru")	{ chan = SAFEBOORU; }
	if (chan === "gelbooru")	{ chan = GELBOORU; }
	if (chan === "rule34")		{ chan = RULE34; }
	if (chan === "konachan")	{ chan = KONACHAN; }
	if (chan === "yandere")		{ chan = YANDERE; }
	if (chan === "lolibooru")	{ chan = LOLIBOORU; }

	// make an Http request to recieve Xml
	Request(chan[0] + tags, function (error, response, body) {

		if (error) { return callback(error, null); } // error handle

		if (response.statusCode == 200) {

			// convert response body XML to JSON and extract count
			XmlParser.parseString(body, function(error, result) {
				if (error) { return callback(error, null); } // error handle
				if (result) { return callback(null, result.posts.$.count); } // return count
			});
		} else { // some other response code... for now, we'll just log the response code and data, then pretend we received a 0 count!
			Logger.warn("imagechan.js failed:", { tags: tags, chan: chan, response: response.statusCode });
			return callback(null, 0);
		}
	});
}

// ========================================================================
// Get Random Post / Image
// ========================================================================

exports.getRandomPost = function(chan, tags, count, callback) {

	// get the appropriate api link
	if (chan === "safebooru")	{ chan = SAFEBOORU; }
	if (chan === "gelbooru")	{ chan = GELBOORU; }
	if (chan === "rule34")		{ chan = RULE34; }
	if (chan === "konachan")	{ chan = KONACHAN; }
	if (chan === "yandere")		{ chan = YANDERE; }
	if (chan === "lolibooru")	{ chan = LOLIBOORU; }

	// get a random page number between 1 and count, so we never request page 0
	var random = Math.floor((Math.random() * (count - 1)) + 1);

	// make an Http request to recieve Xml
	Request(chan[0] + tags + chan[1] + random, function (error, response, body) {

		if (error) { return callback(error, null); } // error handle

		if (response.statusCode == 200) {

			// convert response body XML to JSON and extract count
			XmlParser.parseString(body, function(error, result){
				if (error) { return callback(error, null); } // error handle
				if (result) { return callback(null, result.posts.post[0].$.file_url); } // return image url
			});
		} else { // some other response code... shouldn't ever happen O_O; let's error with the response code & data!
			var wtf = { tags: tags, chan: chan, count: count, random: random, response: response.statusCode };
			return callback(wtf, null);
		}
	});
}

// ========================================================================
// Get Image By Tag(s)
// ========================================================================

exports.getImageByTags = function(bot, message, chan, params, errorCallback) {

	// function nesting hack
	var that = this;

	// make sure at least one tag is provided
	if (!(params.length > 0)) {
		bot.reply(message, "I need at least one tag to lookup!").catch(errorCallback);
		return;
	}

	// combine tags into a single string to lookup
	var tags = params.join("+");

	// find the number of posts with all the provided tags
	that.getPostCount(chan, tags, function(err, count) {

		if (err) { return errorCallback(err); } // error handle
		if (count > 0) {

			// now select a random post and grab it's image
			that.getRandomPost(chan, tags, count, function(err, imageUrl){

				if (err) { return errorCallback(err); } // error handle
				if (imageUrl) {
					// send a message with the image
					bot.sendMessage(message, imageUrl.split(" ").join("%20")).catch(errorCallback);
					return;
				}
			});

		// no posts with the provided tags was found
		} else {

			// change the string of tags to be comma-separated
			tags = params.join(", ");

			// build an array so all messages get sent at once
			var msgArray = [];

			msgArray.push("I couldn't find a post with the following tags:");
			msgArray.push("**" + tags + "**");
			msgArray.push("Please make sure these are the right tags.");

			// send messages
			bot.sendMessage(message, msgArray).catch(errorCallback);
		}
	});
}
