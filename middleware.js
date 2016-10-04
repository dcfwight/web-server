var middleware = {
    requireAuthentication: function(req, res, next) {
        console.log("Private route hit!");
        next(); // the next function is the callback function. It allows the next function to be called in a route (see the server.js for how it works)
    },
    logger: function(req, res, next){
        var date = new Date().toString();
        console.log('Req received: '+ date + ' ' + req.method + ' ' +req.originalUrl);
        console.log('Res sent back: ');
        //console.log(res);
        next();
    }
};
// the req.originalUrl will return '/' as this was the root of the site.
// if you navigate to about, it wll return '/about'
// if you hard reload, (ctrl, shift, r), terminal will show GET / favicon.ico. favicon.ico is chrome's small image inside the tab in chrome - the little logo 
// for the website

module.exports = middleware;

