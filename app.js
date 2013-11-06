var express = require('express')
,   app = express()
;

app.configure(function(){
    app.use(app.router);
    app.use(express["static"](__dirname + "/public"));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

var codes = [301, 302, 303, 307, 308]
,   methods = "GET HEAD POST PUT DELETE".split(" ")
;

function endpoint (code, method) {
    var path = "/" + method + "-" + code
    ,   redirect = path + "-redirect"
    ;
    app.all(path, function (req, res) {
        console.log("Got " + path + " with method " + req.method + " sending " + code);
        res.set("Location", redirect);
        res.send(code, { to: redirect });
    });
    app.all(redirect, function (req, res) {
        console.log("Redirected to " + redirect + " with method " + req.method);
        res.send({
            original:   method
        ,   received:   req.method
        ,   code:       code
        ,   ok:         method === req.method
        });
    });
}

for (var i = 0, n = codes.length; i < n; i++) {
    for (var j = 0, m = methods.length; j < m; j++) {
        endpoint(codes[i], methods[j]);
    }
}

app.listen(3000, function(){
    console.log("Express server listening");
});
