//libraries or packages I need for my project
require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var moment = require("moment");
moment().format();
var fs = require("fs");
var axios = require("axios");
var spotify = require("node-spotify-api");
var spotify = new spotify(keys.spotify);

inquirer
.prompt([
   {  type: "list",
      message: "Please select one of the following choices: Concerts, Spotify Songs or Movies",
      choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
      name: "choice"
   },
])
.then(function(res){
   if(res.choice === "concert-this"){
    inquirer
    .prompt([
       {  type: "input",
          message: "What is your favorit artist",
          name: "artist"
       },
    ])
    .then(function(artist_result){
        var artist = artist_result.artist;
       // console.log(artist)
        
        if (artist == ""){
            console.log("Select an Artist")
        }else{
           
            concertThis(artist )
        }
        
        
    })
   }else if(res.choice === "spotify-this-song"){
    inquirer
    .prompt([
       {  type: "input",
          message: "Select a track",
          name: "track"
       },
    ])
    .then(function(track_result){
        var track = track_result.track;
       // console.log(artist)
        
        if (track == ""){
            console.log("Please select a track")
        }else{
           
            spotifyThisSong(track )
        }
        
        
    })
   }else if(res.choice === "movie-this"){
    inquirer
    .prompt([
       {  type: "input",
          message: "Select a Movie",
          name: "movie"
       },
    ])
    .then(function(movie_result){
        var movie = movie_result.movie;
       
        
        if (movie == ""){
            console.log("Please select a movie")
        }else{
           
            movieThis(movie)
        }
        
        
    })
   }else if(res.choice === "do-what-it-says"){
    inquirer
    .prompt([
       {  type: "input",
          message: "Get songs from random file",
          name: "doThis"
       },
    ])
    .then(function(doThis){
        var fromFile = doThis.doThis;
        
          readTrackFromFile(fromFile)
      
        
        
    })
   }

});

function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < response.data.length; i++) {

            var datetime = moment(response.data[i].datetime).format('MM/DD/YYYY'); 
           

            var concertResults = 
                "=====================================================================" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + datetime
            console.log(concertResults);
        }

        fs.appendFile("log.txt", `\nArtist Name: ${value}`, function(err){
            if (err){
                console.log(err);
            }else{
                console.log(`Artist Name ${value} added to log.txt file!` )
            }
        })
    })
    .catch(function (error) {
        console.log(error);
    });
        

}

function spotifyThisSong(value) {
  
    spotify
    .search({ type: 'track', query: value })
    .then(function(response) {
        for (var i = 0; i < 5; i++) {
            var spotifyResults = 
                "=========================================================================" +
                    "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;
                    
            console.log(spotifyResults);
        }

        fs.appendFile("log.txt", `\nSong Name: ${value}`, function(err){
            if (err){
                console.log(err);
            }else{
                console.log(`Song Name ${value} added to log.txt file!` )
            }
        })
    })
    .catch(function(err) {
        console.log(err);
    });
}

function movieThis(value) {
  
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
            var movieResults = 
                "--------------------------------------------------------------------" +
                    "\nMovie Title: " + response.data.Title + 
                    "\nYear of Release: " + response.data.Year +
                    "\nIMDB Rating: " + response.data.imdbRating +
                    "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                    "\nCountry Produced: " + response.data.Country +
                    "\nLanguage: " + response.data.Language +
                    "\nPlot: " + response.data.Plot +
                    "\nActors/Actresses: " + response.data.Actors;
            console.log(movieResults);
            fs.appendFile("log.txt", `\nMovie Name: ${value}`, function(err){
                if (err){
                    console.log(err);
                }else{
                    console.log(`Movie Name ${value} added to log.txt file!` )
                }
            })    
    })
    .catch(function (error) {
        console.log(error);
    });
    
}

function readTrackFromFile(fromFile) {
    
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(',');
        spotifyThisSong(dataArr[1]);
    })
}
