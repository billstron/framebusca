(function(){
	
	var app = angular.module("app", ["ngRoute"]);
	
	app.controller("Main", ["$http", "$location", function($http, $location){
			var self = this;
			
			this.dims = [48, 16, 130];
			this.page = 0;
			this.numberPerPage = 20;
			this.results = [];
            this.isMore = false;
      
      this.loading = false;
      
      if($location.search()["dims"]){
        self.dims = $location.search()["dims"];
        self.x = self.dims[0];
        self.y = self.dims[1];
        self.z = self.dims[2];
        load();
      }
      
        function load(){
            console.log("loading...");
            self.loading = true;
            return $http.post("/api/combined", {page : self.page, num : self.numberPerPage, dims: self.dims})
            	.success(function(data){
            		data.items.forEach(function(item){
            			self.results.push(item);
            		});
                    self.isMore = data.isMore;
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