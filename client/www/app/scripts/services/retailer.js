define(['modules/AyesapModule'] , function (AyesapModule) {
	AyesapModule
  	.service('Retailer', function ($resource, $http, $location, $q, $rootScope){

  		this.isLoggedIn = function(){

      	var deferred = $q.defer();
		$http.post(base_url+'retailer/isLoggedIn')
			.success(function(response){
				// response.details.user = response.details.user;
				$rootScope.user = response.details.user;
                $rootScope.fullAddress = response.details.user.address + ' ' + response.details.user.street + ' ' +  response.details.user.area + ' ' + response.details.user.city + ' ' + response.details.user.state + ' ' + response.details.user.pincode + ' ' + response.details.user.country;
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
			$http.post(base_url+'retailer/logout')
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});

			return deferred.promise;
		}

		this.changePassword = function(data){
			console.log('in service data',data);
			var deferred = $q.defer();

			$http.put(base_url+'retailer/changePassword',data)
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});
			return deferred.promise;
		}

		this.sendLocation = function(){

			var deferred = $q.defer();
			$http.post(base_url+'retailer/resources/nearBy')
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});

			return deferred.promise;
		}

		// for server side geocoding
		// this.getLocation = function(address){
		// 	var deferred = $q.defer();
		// 	$http({
		// 	    url: 'https://maps.googleapis.com/maps/api/geocode/json?', 
		// 	    method: "GET",
		// 	    params: {
		// 	    	address: address,
  //   			}
		//  	})
		// 	.success(function(response){
		// 		deferred.resolve(response);
		// 	})
		// 	.error(function(err){
		// 		deferred.reject(err);
		// 	});

		// 	return deferred.promise;
		// }

		this.getNearbyResources = function(zone){
			console.log('service zone',zone);
			var deferred = $q.defer();
			$http.post(base_url+'resource/getAllRiderStatus',zone)
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});

			return deferred.promise;
		}

		this.getdistanceMatrix = function(location){
			var deferred = $q.defer();
			$http({
			    url: 'https://maps.googleapis.com/maps/api/distancematrix/json?', 
			    method: "GET",
			    params: {
			    	origins: location.origins,
	    			destinations : location.destinations
    			}
		 	})
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});

			return deferred.promise;
		}

		this.bookResource = function(data){

			var deferred = $q.defer();
			$http.post(base_url+'order/bookOrder',data)
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
