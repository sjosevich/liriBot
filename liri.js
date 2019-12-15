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
   }
});

function concertThis(value) {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < response.data.length; i++) {

            var datetime = moment(response.data[i].datetime).format('MM/DD/YYYY'); 
           

            var concertResults = 
                "--------------------------------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + datetime
            console.log(concertResults);
        }
    })
    .catch(function (error) {
        console.log(error);
    });
        

}