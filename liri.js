// LIRI_Bot
// node.js CLI app

require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var argument = process.argv.slice(3).join(" ");

execute(command, argument);

function execute(command, argument) {

	var logMessage = 'executing command {' + command +
		'} on argument {' + argument + '}';

	var dateTimeStamp = moment().format("MMM DD hh:mm:ss");

	console.log(logMessage);

	fs.appendFile('log.txt', dateTimeStamp + ':  '
	  + logMessage + '\r\n', function(err) {

		// If an error was experienced we say it.
		if (err) {
			console.log(err);
		}
	});

	if (command === 'my-tweets') {
		myTweets();

	} else if (command === 'spotify-this-song') {

		if (argument) {
			spotifySong(argument);

		} else {
			spotifySong('The Sign Ace of Base');
		}

	} else if (command === 'movie-this') {

		if (argument) {
			movieThis(argument);

		} else {
			movieThis('Mr. Nobody');
		}

	} else if (command === 'do-what-it-says') {
		fs.readFile("random.txt", "utf8", function(error, data) {

			if (error) {
				return console.log('Error occurred: ' + error);
			}

			var dataArr = data.split(",");

			command = dataArr[0];
			argument = dataArr[1];

			execute(command, argument);
		});

	} else {
		console.log('Error: Invalid command input');
	}
}

function myTweets() {

	var params = {
		screen_name: 'nadevtest',
		count: 20
	};

	console.log('getting tweets from username {' + params.screen_name + '}');

	client.get(
	  'statuses/user_timeline', params, function(error, tweets, response) {

		if (error) {
			return console.log('Error offurred: ' + error);
		}

		var tweetArray = [];

		for (var i = 0; i < tweets.length; i++) {

			tweetArray.push({
				date: tweets[i].created_at,
				text: tweets[i].text,
			});
		}

		console.log('Twitter Results: ')
		console.log(tweetArray);
	});
}

function spotifySong(searchString) {

	console.log('getting song info on {' + searchString + '}');

	var params = {
		type: 'track',
		query: searchString,
		limit: 1
	};

	spotify.search(params, function(error, data) {

		if (error) {
			return console.log('Error occurred: ' + error);
		}

		var topResult = data.tracks.items[0];

		var songInfo = {
			artist: topResult.artists[0].name,
			songName: topResult.name,
			preview_link: topResult.preview_url,
			albumName: topResult.album.name,
		};

		console.log('Top Spotify Result:')
		console.log(songInfo);
	});
}

function movieThis(movieName) {

	console.log('getting movie info on {' + movieName + '}');

	requestURL = 'https://www.omdbapi.com/?apikey=' + keys.omdb.key +
		'&t=' + movieName;

	request(requestURL, function(error, response, body) {

		if (error) {
			return console.log(error);

		} else if (!body) {
			return console.log(response.statusCode, response);
		}

		body = JSON.parse(body);

		// var rottenTomatoesRating = body.Ratings.find(
		// 	obj => obj.Source === "Rotten Tomatoes"
		// );

		// if (rottenTomatoesRating) {
		// 	rottenTomatoesRating = rottenTomatoesRating.Value;
    //
		// } else {
		// 	rottenTomatoesRating = "not available";
		// }

		movieInfo = {
			title: body.Title,
			year: body.Year,
			imdbRating: body.imdbRating,
			rottenTomatoesRating: "NA",// rottenTomatoesRating,
			countryOfOrigin: body.Country,
			language: body.Language,
			plot: body.Plot,
			actors: body.Actors
		}

		console.log(movieInfo);
	});
}
