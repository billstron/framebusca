(function(){
	
	var app = angular.module("app", ["ngRoute"]);
	
	app.controller("Main", ["$http", "$location", function($http, $location){
			var self = this;
			
			this.dims = [48, 16, 130];
			this.x = this.dims[0];
			this.y = this.dims[1];
			this.z = this.dims[2];
			this.page = 0;
			this.numberPerPage = 20;
			this.results = [];
      
      this.loading = false;
      
      if($location.search()["dims"]){
        self.dims = $location.search()["dims"];
        load();
      }
      
			function load(){
				console.log("loading...");
        self.loading = true;
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
            self.loading = false;
					});
			}
			
			this.submit = function(x, y, z){
				self.page = 0;
				self.results = [];
				self.dims = [x, y, z];
        $location.search("dims", self.dims);
				load();
			};
			
			this.more = function(){
				if(self.results.length > 0){
					self.page++;
					return load();
				}
				return [];
			};
		}
	]);
	
})();