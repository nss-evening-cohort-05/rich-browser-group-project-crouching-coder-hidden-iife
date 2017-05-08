# NSS RICH BROWSER GROUP PROJECT | MOVIE MAYHEM
Group project incorporating all compiled coding capabilities and knowledge bases

### ASSIGNMENT DETAILS:

Your team will build a new application to keep track of movies that you have seen, and want to see, with your own ratings based on [OMDb API](http://omdbapi.com/).

#### Requirements
1. Must have the ability to
	- register a user in Firebase
	- log in / log out user
	- use Firebase to store movies
	- use Firebase to add / delete movies

1. Each movie must have the following properties
   1. Movie name
   1. Year released
   1. An array of major actors
   1. An integer rating of 1-5
   1. A boolean value that, if true, means that you have watched the movie
   
1. Your user should be able to mark if they have seen the movie
1. Your user should be able to mark a rating for the movie if they have seen it
1. Your project should have a firebase seeder
1. You must be using an automation tool to automate JavaScript linting
1. You must be using an automation tool to automate SASS compilation
1. You should be using the Bootstrap grid system and any bootstrap classes that make sense

### TECHNOLOGIES USED:
1. Javascript
1. JQuery
1. SASS (css) - compiled by Grunt.js
1. HTML

### APIs and Server Storage
1. Firebase - by Google
1. OMDb open source API database

### CONTRIBUTORS:
1. Anessa
1. Andrea
1. Latasha
1. Marcus

#### To Run Project [Node Must Be Installed]:
Global installs: `npm install http-server -g` & `npm install grunt-cli -g`

```
$ git clone https://github.com/morecallan/sass-boilerplate.git
$ cd sass-boilerplate
$ cd lib
$ bower install
$ npm install
$ cd ..
$ hs -c-1 (this will run http-server without caching issues)
This should show in your browser at localhost:8080
```

For developers [to lint the JS files, or update the styles]:
```
Open a new tab from the root project file.
$ cd lib
$ grunt
```