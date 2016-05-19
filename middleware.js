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

module.exports = middleware;

