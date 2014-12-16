var util = require('util')
var OperationHelper = require('apac').OperationHelper;

var config = require("../config.json");

var opHelper = new OperationHelper({
    awsId:     config.awsId,
    awsSecret: config.awsSecret,
    assocId:   config.assocId
    // xml2jsOptions: an extra, optional, parameter for if you want to pass additional options for the xml2js module. (see https://github.com/Leonidas-from-XIV/node-xml2js#options)
});

function convert(item){
	// title, image, price, link
	var out = {};
	try{
		out.title = item.ItemAttributes[0].Title[0];
		out.link = item.DetailPageURL[0];
		out.image = item.LargeImage[0].URL[0];
		out.listPrice = Number(item.ItemAttributes[0].ListPrice[0].Amount[0]) / 100
		out.price = Number(item.Offers[0].Offer[0].OfferListing[0].Price[0].Amount[0]) / 100;
	}catch(ex){

	}
	
	return out;
}

module.exports = function(dims, page, callback){
	page++;
	opHelper.execute('ItemSearch', {
		'SearchIndex': 'Blended',
		'Keywords': 'eyeglasses+48+16+130',
		"ItemPage": page,
		'ResponseGroup': 'ItemAttributes,Offers,Images'
	}, function(err, results, raw) { 
		var out = [];
		
		try{
			var data = results.ItemSearchResponse.Items[0].Item;
			data.forEach(function(item){
				var i = convert(item);
				if(Object.keys(i).length > 0){
					out.push(i);
				}
			
			});
			
		}catch(ex){
			console.error("Error parsing Ebay:", ex);
		}
		
	    callback(err, out);
	});
};

// module.exports([14, 16, 130], 1, function(){});