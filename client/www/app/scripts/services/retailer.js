define(['modules/AyesapModule'] , function (AyesapModule) {
	AyesapModule
  	.service('Retailer', function($resource, $http,$location,$q){

  		this.isLoggedIn = function(){
      	var deferred = $q.defer();
      
		$http.post(base_url+'retailer/isLoggedIn')
			.success(function(status){
				deferred.resolve();
			})
			.error(function(err){
				console.log('logged out status', err.message);
				deferred.reject(err);
			});
		  
		  return deferred.promise;
		};

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

		this.logout = function(){
	  		var deferred = $q.defer();
			console.log('inside logout service');
			$http.post(base_url+'retailer/logout')
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