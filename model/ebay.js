var ebay = require("ebay-api");
var request = require("request");
var config = require("../config.json");


function convert(item){
	// title, image, price, link
	var out = {};
	try{
		out.title = item.title[0];
		out.image = item.galleryURL[0];
		out.price = item.sellingStatus[0].currentPrice[0].__value__;
		out.link = item.viewItemURL[0];
	}catch(ex){
		out = null;
    // console.log("ebay error");
	}
	
	return out;
}

module.exports = function(dims, page, callback){
  // console.log("ebay:", dims, page);
	page++;
	var url = "https://svcs.ebay.com/services/search/FindingService/v1?" 
		+ "paginationInput.entriesPerPage=20&" 
		+ "paginationInput.pageNumber=" + page + "&"
		+ "OPERATION-NAME=findItemsByKeywords&" 
		+ "GLOBAL-ID=EBAY-US&"
		+ "RESPONSE-DATA-FORMAT=JSON&"
		+ "REST-PAYLOAD&"
		+ "SECURITY-APPNAME=LensFact-936b-4e2f-bf76-d28c9c6bd411&"
		+ "SERVICE-VERSION=1.11.0&"
		+ "keywords(0)=eyeglasses&keywords(1)=" + dims.join("-");
    // console.log(url);
	
	request.get(url, function(error, response, result) {
		var data;
		var out = [];
		try{
            var dd = JSON.parse(result).findItemsByKeywordsResponse[0]
			data = dd.searchResult[0].item;
            var pages = Number(dd.paginationOutput[0].totalPages[0]);
            // console.log("pages:", page, pages);
            var out = [];
            if(page <= pages){
    			data.forEach(function(item){
    				var x = convert(item);
    				if(x != null){
    					out.push(x);
    				}
    			});
            }
		}catch(ex){
      // console.error("Error parsing Ebay:", ex);
		}
		callback(null, out);
	});
};