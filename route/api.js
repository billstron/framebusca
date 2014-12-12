var request = require("request");
var async = require("async");

var model = require("../model");

var app = require("express")();

app.post("/combined", function(req, res){
	
	var dims = req.body.dims;
	
	async.parallel([
		model.ebay(dims),
		// getAmazon(dims)
	], function(err, results){
		console.log(results[0]);
		res.json(results[0]);
	});
	
});

module.exports = app;