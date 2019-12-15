# liriBot
LIRI is a command line node app that takes in on 4 parameters (concert-this", "spotify-this-song", "movie-this", "do-what-it-says") and returns data.

Deployment

    Clone repo
    Run npm install
    At command prompt run node liri.js <option>
    
In order to carry out this task, I had to use several technologies among which we can mention:

    NodeJS
    JavaScript
    Spotify API
    Bands In Town API
    OMDB API
    NPM spotify-web-api-node
    NPM dotenv
    NPM request

If we execute the following command in the terminal:
node liri.js
First the user will see the four options mentioned above. The user will have to select one of them, according to his interest.

Example:
$ node liri.js
this is loaded
? Please select one of the following choices: Concerts, Spotify Songs or Movies (Use arrow keys)
> concert-this
  spotify-this-song
  movie-this
  do-what-it-says

![Image of Liri-bot app](https://github.com/sjosevich/liriBot/tree/master/images/Capture1.png)
  
  
If the user selects concert-this then, he will have to write the name of a musical artist, that is to say a singer and automatically he will be able to observe the places where this artist will have his next concerts. 

Example:
$ node liri.js
this is loaded
? Please select one of the following choices: Concerts, Spotify Songs or Movies concert-this
? What is your favorit artist Madonna
=====================================================================
Venue Name: The Fillmore
Venue Location: Miami Beach
Date of the Event: 12/15/2019
=====================================================================
Venue Name: The Fillmore
Venue Location: Miami Beach
Date of the Event: 12/17/2019  

If the user forgets to write the name of the artist, the app will ask him to write the name of one before showing any results.

The application will behave in the same way with the following two options, "spotify-this-song", "movie-this", where the user will have to write his favorite music or his favorite movie

The fourth option already has the name of a music theme in a file called random.txt, and the app will read from that file and provide information related to this music theme

An example can be seen below

$ node liri.js
this is loaded
? Please select one of the following choices: Concerts, Spotify Songs or Movies do-what-it-says
? Get songs from random file
=========================================================================
Artist(s): Backstreet Boys
Song Name: I Want It That Way
Album Name: The Hits--Chapter One
Preview Link: https://p.scdn.co/mp3-preview/e72a05dc3f69c891e3390c3ceaa77fad02f6b5f6?cid=93c9cebc7ddf456b90ec7c1c64cdcd38

As you can see the user does not have to write anything, just select the last option and get the result


  
