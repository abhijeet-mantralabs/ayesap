
// 'use strict';

angular
	.module('admin', [
	'ngResource',
	])
	// .config(['$httpProvider', function($httpProvider) {
 //        $httpProvider.defaults.useXDomain = true;
 //        delete $httpProvider.defaults.headers.common['X-Requested-With'];
 //    }
	])
	.controller('AdminCtrl', function ($scope, retailerAdmin, $interval) {
		console.log('inadmin');
		

		$scope.retailerRegister = {};
			$scope.showDetails = function(retailerDetails, selectedIndex){
			$scope.error = null;
			$scope.password = null;

			$scope.enterDetails = true;
			$scope.selectedRetailer =  selectedIndex;
			// console.log(this.className);
			// console.log($(this).parent().hasClass('retailer'));
			$('a[href="#add-retailer"]').tab('show');
			$scope.retailerRegister.name = retailerDetails.name;
			$scope.retailerRegister.email = retailerDetails.email;
			$scope.retailerRegister.mobile = retailerDetails.mobile;
			$scope.retailerRegister.retailerId = retailerDetails.retailerId;
			$scope.retailerRegister.retailerType = retailerDetails.retailerType;
			$scope.retailerRegister.country = retailerDetails.country;
			$scope.retailerRegister.state = retailerDetails.state;
			$scope.retailerRegister.city = retailerDetails.city;
			$scope.retailerRegister.area = retailerDetails.area;
			$scope.retailerRegister.street = retailerDetails.street;
			$scope.retailerRegister.address = retailerDetails.address;
			$scope.retailerRegister.pincode = retailerDetails.pincode;
		}

		retailerAdmin.fetchRetailers().then(function(response){
			$scope.retailers = response.details.retailerList;
			console.log(response);
		}).catch(function(err){
			$scope.error = err.message;
		})
		// $interval(retailerAdmin.fetchRetailers().then(function(response){
		// 	$scope.retailers = response.details.retailerList;
		// 	console.log(response);
		// }).catch(function(err){
		// 	$scope.error = err.message;
		// }),1000)
		

		// $scope.enterDetails = false;	
		$scope.registerRetailer = function(retailerDetails){
			$scope.error='';			
			retailerAdmin.registerRetailer(retailerDetails)
			.then(function(response){
				console.log(response.details.user);
				$scope.password = response.details.user.plainPass;
			}).catch(function(err){
				$scope.error = err.message;
			});
		}
	})
	.service('retailerAdmin', ['$resource','$http','$q', function($resource, $http,$q){
    	
    	// var base_url = "http://52.25.176.56:1337/";
    	var base_url = "www.ayesap.com"
    	// var base_url = "http://localhost:1337/";

		this.fetchRetailers = function(){
			var deferred = $q.defer();
			
			$http.get(base_url+'retailer/listRetailers')
			// $http({
				// url: base_url+'retailer/listRetailers',
				// method: 'get',
				// data:JSON.stringify(),
				// headers: {
				//    'content-type': 'application/x-www-form-urlencoded'
				// }
		  	// })
			.success(function(data){
				deferred.resolve(data);
			})
			.error(function(err){
				deferred.reject(err);
			});
			
			return deferred.promise;
	  	}

	  	this.registerRetailer = function(data){
			var deferred = $q.defer();
			
			$http.put(base_url+'retailer/RegisterByAdmin',data)
			// $http({
			// 	url: base_url+'retailer/RegisterByAdmin',
			// 	method: 'PUT',
			// 	data:JSON.stringify(data),
				// headers: {
				//    'content-type': 'application/x-www-form-urlencoded'
				// },
		  	// })
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});
			
			return deferred.promise;
	  	}
		
	}]);
