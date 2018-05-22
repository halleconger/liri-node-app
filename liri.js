// ADDING CODE TO READ AND SET ANY ENVIRONMENT VARIABLES WITHIN DOTENV PACKAGE
require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var keys = require("./keys");

// CODE REQUIRED TO IMPORT KEYS.JS FILE
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// VARIABLE TO TAKE IN USER INFORMATION ON COMMAND LINE 
var command = process.argv[2];
var userChoice = process.argv[3];

// FUNCTION FOR TWITTER
function myTweets() {
    var params = { screen_name: 'hreidclass', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
            }
        }
    });
}
// END FUNCTION FOR TWITTER

// FUNCTION FOR SPOTIFY
function spotifyThisSong() {
    if (userChoice === undefined) {
        userChoice = "The Sign";
    }

    console.log("User choice entered: " + userChoice);
    spotify.search({ type: 'track', query: userChoice }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            var songChoice = data.tracks.items[0];
            // console.log(data.tracks.items[0]);

            console.log("Artist: " + songChoice.artists[0].name);
            console.log("Song Name: " + songChoice.name);
            console.log("Preview Link: " + songChoice.preview_url);
            console.log("Album: " + songChoice.album.name);
        }
    });
}
// END FUNCTION FOR SPOTIFY

// FUNCTION FOR MOVIES
function movieThis() {
    if (userChoice === undefined) {
        userChoice = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + userChoice + "&y=&plot=short&apikey=trilogy";
    
    request(queryUrl, function (error, response, body) {
        if (error) {
            console.log(error);
        }
        if (!error && response.statusCode === 200) {
            var musicChoice = JSON.parse(body);
            // console.log(JSON.parse(body));

            console.log("Movie Title: " + musicChoice.Title);
            console.log("Year Movie Released: " + musicChoice.Year);
            console.log("IMDB Rating: " + musicChoice.imdbRating);
            console.log("Rotten Tomatoes Rating: " + musicChoice.Ratings[1].Value);
            console.log("Country Produced In: " + musicChoice.Country);
            console.log("Language: " + musicChoice.Language);
            console.log("Plot: " + musicChoice.Plot);
            console.log("Actors: " + musicChoice.Actors);
        }
    });
}
// END FUNCTION FOR MOVIES

// FUNCTION FOR DO WHAT IT SAYS
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var spliter = data.split(",");
        userChoice = spliter[1];
        parseInput(spliter[0]);
    });
}
// END OF FUNCTION FOR DO WHAT IT SAYS

// SWITCH STATEMENT FOR BLOCKS OF CODE BEING EXECUTED
function parseInput(command) {
    switch (command) {
        case "my-tweets":
            myTweets();
            break;
        case "spotify-this-song":
            spotifyThisSong();
            break;
        case "movie-this":
            movieThis();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("Please enter another command");
    }
}
parseInput(command);
// END OF SWITCH STATEMENT FOR BLOCKS OF CODE BEING EXECUTED