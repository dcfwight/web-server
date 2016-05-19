var express = require('express');
var app = express();
var PORT = 3000; // set variable in UPPERCASE to signify it shouldn't be changed. It's a CONSTANT.

var middleware = {
    requireAuthentication: function(req, res, next) {
        console.log("Private route hit!");
        next(); // this is route level middleware - not sure what the next call does yet.
    },
    logger: function(req, res, next){
        var date = new Date().toString();
        console.log('Request: '+ date + ' ' + req.method + ' ' +req.originalUrl);
        next();
    }
};
// the req.originalUrl will return '/' as this was the root of the site.
// if you navigate to about, it wll return '/about'
// if you hard reload, (ctrl, shift, r), terminal will show GET / favicon.ico. favicon.ico is chrome's small image inside the tab in chrome - the little logo 
// for the website

app.use(middleware.requireAuthentication); // order is important - if you put this below the about /route, it would never run. So it has to be up top.
// when you access these pages on the browser, the console (NOT the browser) will log 'private route hit'
// if you use middleware here, it will run for every page refresh and/or route hit.

app.use(middleware.logger);
// the logger function logs the method that the req(uest) is using - in this case a 'GET' method.

//the express function (app) takes two arguments - the first is the route. Currently set as '/' which is the root URL. The second is the anon function
// the anon function takes two arguments - req is request object, second is the res, which is the response
// req is all the relevant data sent to us, and response is what is sent back.
//app.get('/', function(req, res){
//    res.send('Hello Express!');
//    });

// get is the equivalent to the HTTP request method. When you view a page in your browser it makes a get request.

// Exercise - change the settings to that it searches for and returns the following
// /about
// About us

// What this means is if you open your browser and navigate to localhost:3000/about, you should see the phrase 'About us'


app.get('/about', function(req,res){
    res.send('About us!')
});


//if you wanted to use middleware just for this route, then comment out the main app.use(middleware above, and use the following code):
//app.get('/about', middleware.requireAuthentication, function(req,res){
//    res.send('About us')
//});

// this console log shows how easy it is to find the directory path, as you need to use the full path in app.use
console.log("Directory path ('__dirname') is: "+__dirname);
app.use(express.static(__dirname+'/public')); // this is the way to point the server to an entire file system on your computer
// if you use your browser and go to localhost:3000/index.html, it will find the html file in /public. You could access any document inside that folder.

// NOTE - if you commented out lines 8 - 10, which specify what happens if you enter the route folder, then it will automatically look in the
// public folder and automatically load the index.html file. It is the default file if none is specified.

// specifies which port the app should listen on . 3000 is a good one - not normally reserved by computes for anything.
app.listen(PORT, function(){ 
    console.log('listening at port: '+ PORT);
    console.log('Express server started');
    }); 
