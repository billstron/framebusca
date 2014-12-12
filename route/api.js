var request = require("request");
var async = require("async");

var model = require("../model");

var app = require("express")();

app.post("/combined", function(req, res){
	
	var dims = req.body.dims;
	
	model.ebay(dims, function(err, results){
		results.forEach(function(item){
			console.log(item.title);
		})
		res.json(results);
	});

});

module.exports = app;