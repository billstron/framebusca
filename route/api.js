var request = require("request");
var async = require("async");

var app = require("express")();

var config = {};

function getEbay(dims){

	return function(callback){
		var url = "http://svcs.ebay.com/services/search/FindingService/v1?" 
			+ "OPERATION-NAME=findItemsByKeywords" 
			+ "&SERVICE-VERSION=1.0.0" 
			+ "&responseencoding=JSON" 
			+ "&callback=TRUE"
			+ "&SECURITY-APPNAME=" + config.ebayApp 
			+ "&GLOBAL-ID=EBAY-US" 
			+ "&keywords=" + dims.join("+");
		
		console.log("url:", url);
		
		request(url, function(err, res, body){
			console.log("code:", res.statusCode) // 200
			console.log("body:", body);
			callback(null, res.data);
		});
	};
}

function getAmazon(dims){
	
	return function(callback){
		callback(null, []);
	};
}

app.post("/combined", function(req, res){
	
	var dims = req.body.dims;
	config = app.get("config");
	console.log(config);
	
	async.parallel([
		getEbay(dims),
		getAmazon(dims)
	], function(err, results){
		res.send(results);
	});
	
});

module.exports = app;