var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var config = require("./config.json");

var app = express();

app.set("config", config);

// Standard express setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, "www")));
app.use('/api', require("./route/api"));

app.use(function(req, res, next) {
    res.status(404).end();
});

app.set('port', 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});