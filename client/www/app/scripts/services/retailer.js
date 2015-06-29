define(['modules/AyesapModule'] , function (AyesapModule) {
	AyesapModule
  	.service('Retailer', function($resource, $http,$location,$q){

  		this.requestForRegister = function(retailerData){
	  		var deferred = $q.defer();
			
			$http.post(base_url+'retailer/requestForRegister', retailerData)
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});

			return deferred.promise;
		}

		this.login = function(retailerData){
	  		var deferred = $q.defer();
			
			$http.post(base_url+'retailer/login', retailerData)
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});

			return deferred.promise;
		}
  	})
})