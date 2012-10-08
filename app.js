var express = require('express')
;

var app = module.exports = express.createServer();
app.configure(function(){
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express["static"](__dirname + "/public"));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Routes

app.get("/", function (req, res, next) {
    res.redirect("index.html");
});

app.all("/delred", function (req, res, next) {
    if (req.method === "DELETE") res.send({ ok: true });
    else res.send({ error: "Method was " + req.method });
    
});

app.listen(3000, function(){
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
