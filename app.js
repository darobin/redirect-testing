var express = require('express')
;

var app = module.exports = express.createServer();
app.configure(function(){
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express["static"](__dirname + "/public"));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.all("/delred", function (req, res, next) {
    console.log("Got request = " + req.method);
    if (req.method === "DELETE") res.redirect("/delred2");
    else res.send({ error: "Method was " + req.method });
});

app.all("/delred2", function (req, res, next) {
    console.log("Got request2 = " + req.method);
    if (req.method === "DELETE") res.send({ ok: true });
    else res.send({ error: "Method was " + req.method + " after redirect" });
});

app.listen(3000, function(){
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
