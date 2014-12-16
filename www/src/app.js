(function(){
	
	var app = angular.module("app", ["ngRoute", "lrInfiniteScroll"]);
	
	app.directive('whenScrolled', ["$document", function($document) {
	    return function(scope, elm, attr) {
	        var raw = elm[0];
        	var inProgress = false
			var lastRemaining = 0;
			var lengthThreshold = 200;
			
	        $document.bind('scroll', function() {
				
                var remaining = raw.scrollHeight - (raw.clientHeight + raw.scrollTop);
                if (remaining < lengthThreshold && (remaining - lastRemaining) < 0) {
					inProgress = true;
					scope.$apply(attr.whenScrolled)
					.then(function(){
						inProgress = false;
					});
	            }
	        });
	    };
	}]);
	
	app.controller("Main", ["$http", 
		function($http){
			var self = this;
			
			this.dims = [48, 16, 130];
			this.x = this.dims[0];
			this.y = this.dims[1];
			this.z = this.dims[2];
			this.page = 0;
			this.numberPerPage = 20;
			this.results = [];
			
			this.submit = function(x, y, z){
				self.page = 0;
				self.results = [];
				self.dims = [x, y, z];
				load();
			};
			
			function load(){
				console.log("loading...");
				return $http.post("/api/combined", {page : self.page, num : self.numberPerPage, dims: self.dims})
					.success(function(items){
						items.forEach(function(item){
							self.results.push(item);
						});
					})
					.error(function(msg){
					
					})
					.finally(function(){
						console.log("done.");
					});
			}
			
			this.loadMore = function(){
				if(self.results.length > 0){
					self.page++;
					return load();
				}
				return [];
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