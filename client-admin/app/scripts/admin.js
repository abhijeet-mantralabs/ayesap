
// 'use strict';

angular
	.module('admin', [
	'ngResource',
	])
	.controller('AdminCtrl', ['$scope', 'retailerAdmin', function ($scope, retailerAdmin) {
		console.log('inadmin');
		$scope.showDetails = function(){
		console.log('in');
		$('a[href="#add-retailer"]').tab('show');
		}

		retailerAdmin.fetchRetailers().then(function(response){
			$scope.retailers = response;
			console.log(response);
		}).catch(function(err){
			$scope.error = err.message;
		});

	}])
	.service('retailerAdmin', ['$resource','$http','$q', function($resource, $http,$q){
    	
    	var base_url = "http://52.25.176.56:1337/";

		this.fetchRetailers = function(){
			var deferred = $q.defer();
			
			$http.get(base_url+'retailer/allUser')
			.success(function(data){
				deferred.resolve(data);
			})
			.error(function(err){
				deferred.reject(err);
			});
			
			return deferred.promise;
	  	}
		
	}]);
