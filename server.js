var express = require('express');
var app = express();
const PORT = process.env.PORT || 3000; // set variable in UPPERCASE to signify it shouldn't be changed. It's a CONSTANT.
// NB - 3000 is the local port to use - not used by many other applications
// process.env.port is given by Heroku. So we use one OR the other. If there is no process.env.port for the local server, it just tries the other.
// so if you still try it locally it will work, as it tries port 3000, after first doesn't work.

var middleware = require('./middleware.js');

app.use(middleware.requireAuthentication); // order is IMPORTANT - if you put this below the app.get('/about'...) route, it would never run.
//So it has to be up top.
// when you access these pages on the browser, the console (NOT the browser) will log 'private route hit'
// This usage 'app.use(middleware...)' is APPLICATION LEVEL MIDDLEWARE because:
// if you use middleware here, it will run for every page refresh and/or route hit.

app.use(middleware.logger);
// the logger function logs the method that the req(uest) is using - in this case a 'GET' method.


//the express function (app) takes two arguments - the first is the route. Currently set as '/' which is the root URL. The second is the anon function
// the anon function takes two arguments - req is request object (usually abbreviated to req), second is the res, which is the response
// req is all the relevant data sent to us, and response is what is sent back.


app.get('/', function(req, res){
    res.send('Hello Express!');
    });

// get is the equivalent to the HTTP request method. When you view a page in your browser it makes a get request.
// note - if you didn't have this .get, it would default to looking in the public folder and returning index.html. See comments below.

// Exercise - change the settings to that it searches for and returns the following
// /about
// About us

// What this means is if you open your browser and navigate to localhost:3000/about, you should see the phrase 'About us'

/*
app.get('/about', function(req,res){
    res.send('About us!')
});

*/
//if you wanted to use middleware just for this route, then comment out the main app.use(middleware above, and use the following code):
app.get('/about', middleware.requireAuthentication, function(req,res){
    res.send('About us')
});
// the next() function in the middleware is the callback, and allows the following function here to work. the second argument is the middleware
// and the third argument is the middleware's callback function.

// this console log shows how easy it is to find the directory path, as you need to use the full path in app.use
console.log("Directory path ('__dirname') is: "+__dirname);
app.use(express.static(__dirname+'/public')); // this is the way to point the server to an entire file system on your computer to look for assets.
// if you use your browser and go to localhost:3000/index.html, it will find the html file in /public. You could access any document inside that folder.
// you need the entire path name - hence using __dirname as a shortcut for getting the filen path.

// NOTE - if you commented out the lines app.get('/, which specify what happens if you enter the route folder, then it will automatically look in the
// public folder and automatically load the index.html file. It is the default file if none is specified.

// specifies which port the app should listen on . 3000 is a good one - not normally reserved by computes for anything.
// the second argument specifies what should happen ONCE the server starts running - in this case just log that it has started.
app.listen(PORT, function(){ 
    console.log('listening at port: '+ PORT);
    console.log('Express server started');
    }); 
