(function(){
	
	var app = angular.module("app", ["ngRoute"]);
	
	app.controller("Main", ["$http", 
		function($http){
			var self = this;
			
			this.dims = [48, 16, 130];
			this.page = 0;
			this.numberPerPage = 20;
			this.results = [];
			
			this.submit = function(){
				self.page = 0;
				self.results = [];
				$http.post("/api/combined", {page : self.page, num : self.numberPerPage, dims: self.dims})
					.success(function(items){
						items.forEach(function(item){
							self.results.push(item);
						});
					})
					.error(function(msg){
						
					});
			};
			
			this.more = function(){
				self.page++;
				$http.post("/api/combined", {page : self.page, num : self.numberPerPage})
					.success(function(items){
						items.forEach(function(item){
							self.results.push(item);
						});
					})
					.error(function(msg){
						
					});
			};
		}
	]);
	
})();