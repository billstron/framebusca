var request = require("request");
var async = require("async");

var model = require("../model");

var app = require("express")();

app.post("/combined", function(req, res){
	
	var dims = req.body.dims;
	var page = req.body.page;
	
	model.ebay(dims, page, function(err, ebayResults){
		
		model.amazon(dims, page, function(err, amazonResults){
			
			var out = [];
			var size = ebayResults.length > amazonResults.length ? ebayResults.length : amazonResults.length;
			for(var k = 0; k < size; k++){
				if(typeof ebayResults[k] !== "undefind"){
					out.push(ebayResults[k])
				}
				if(typeof amazonResults[k] !== "undefind"){
					out.push(amazonResults[k])
				}
			}
						
			res.json(out);
		});
	});
});

module.exports = app;