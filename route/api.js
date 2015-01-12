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
            var isMore = true;
            if(ebayResults.length == 0 && amazonResults.length == 0){
                isMore = false;
            }
			var size = ebayResults.length > amazonResults.length ? ebayResults.length : amazonResults.length;
			for(var k = 0; k < size; k++){
				if(typeof ebayResults[k] !== "undefined"){
					out.push(ebayResults[k])
				}
				if(typeof amazonResults[k] !== "undefined"){
					out.push(amazonResults[k])
				}
			}
						
			res.json({isMore : isMore, items: out});
		});
	});
});

module.exports = app;