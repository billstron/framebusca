var ebay = require("ebay-api");
var config = require("../config.json");

module.exports = function(dims){
	
	return function(callback){
		var search = dims.join("-");
		var params = {};
		params.keywords = [ "eyeglasses", search];
		params['paginationInput.entriesPerPage'] = 10;
	
		ebay.ebayApiGetRequest({
			serviceName: 'FindingService',
			opType: 'findItemsByKeywords',
			appId: config.ebayApp,
			params: params,
			// filters: filters,
			parser: ebay.parseItemsFromResponse
			}, callback
		);
	};
};