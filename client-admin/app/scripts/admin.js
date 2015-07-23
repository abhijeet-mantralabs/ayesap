
// 'use strict';

angular
	.module('admin', ['ngResource'])
	// .config(['$httpProvider', function($httpProvider) {
 //        $httpProvider.defaults.useXDomain = true;
 //        delete $httpProvider.defaults.headers.common['X-Requested-With'];
 //    }
	// ])
	.controller('AdminCtrl', function ($scope, retailerAdmin, $interval, $timeout) {

		

		$scope.retailerRegister = {};
			$scope.showDetails = function(retailerDetails, selectedIndex){
			$scope.error = null;
			$scope.password = null;

			$scope.enterDetails = true;
			$scope.selectedRetailer =  selectedIndex;
			// console.log(this.className);
			// console.log($(this).parent().hasClass('retailer'));
			$('a[href="#add-retailer"]').tab('show');

                $scope.retailerRegister = {
                    name : retailerDetails.name,
                    email : retailerDetails.email,
                    mobile : retailerDetails.mobile,
                    retailerId : retailerDetails.retailerId,
                    retailerType : retailerDetails.retailerType,
                    country : retailerDetails.country,
                    state : retailerDetails.state,
                    city : retailerDetails.city,
                    area : retailerDetails.area,
                    street : retailerDetails.street,
                    address : retailerDetails.address,
                    pincode : retailerDetails.pincode,
                    registrationStatus:retailerDetails.registrationStatus,
                    latitude : retailerDetails.latitude,
                    longitude : retailerDetails.longitude,
                    accountManager : retailerDetails.accountManager,
                    zone : retailerDetails.zone,
                    city : retailerDetails.city,
                    comments : retailerDetails.comments
            }
		}
        var fetchRetailerList = function(){
            retailerAdmin.fetchRetailers().then(function(response){
                // $scope.retailers = response.details.retailerList;

                var sortingOrder = ['pending', 'approved', 'declined','deactivated']
	            $scope.retailers = [];
	            for(var s in sortingOrder){
	               	response.details.retailerList.forEach(function(retailer){
		               	if(retailer.registrationStatus == sortingOrder[s]){
		                  	$scope.retailers.push(retailer)
		                }
              		})
	            }
            }).catch(function(err){
                $scope.error = err.message;
            })
        }
        fetchRetailerList();
        var poll = function() {
            $timeout(function() {
                fetchRetailerList();
                poll();
            }, 300000);
        };
        poll();
        $scope.refreshList = function(){
        	fetchRetailerList();
        }

        var fetchRsourceList = function(){
            retailerAdmin.fetchRsources().then(function(response){
                $scope.resources = response.details.resourceList;
                console.log(response);
                
            }).catch(function(err){
                $scope.error = err.message;
            })
        }
        fetchRsourceList();

        //sorting

        

//		retailerAdmin.fetchRetailers().then(function(response){
//			$scope.retailers = response.details.retailerList;
//			console.log(response);
//		}).catch(function(err){
//			$scope.error = err.message;
//		})
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
//				console.log(response.details.user);
				$scope.password = response.details.user.plainPass;
				fetchRetailerList();
			}).catch(function(err){
				$scope.error = err.message;
			});
		}

		$scope.editRetailer = function(retailerDetails){
			$scope.error='';	
			$scope.message = '';		
			retailerAdmin.updateRetailer(retailerDetails)
			.then(function(response){
//				console.log('after editing',response);
				$scope.message = response.message;
//				console.log($scope.message);
				fetchRetailerList();
			}).catch(function(err){
				$scope.error = err.message;
			});
		}

		$scope.declineRetailer = function(retailerId,mobile){
			$scope.error='';
			$scope.message = '';
			var data = {
				retailerId : retailerId,
				mobile : mobile
			}			
			retailerAdmin.declineRetailer(data)
			.then(function(response){
//				console.log('decline response',response);
				fetchRetailerList();
				$scope.message = response.message;
			}).catch(function(err){
				$scope.error = err.message;
			});
		}
	})
	.service('retailerAdmin', ['$resource','$http','$q', function($resource, $http,$q){

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

	  	this.updateRetailer = function(data){
			var deferred = $q.defer();
			
			$http.put(base_url+'retailer/updateDetails',data)
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});
			
			return deferred.promise;
	  	}

	  	this.declineRetailer = function(data){
			var deferred = $q.defer();
			
			$http.put(base_url+'retailer/declineRetailer',data)
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});
			
			return deferred.promise;
	  	}

	  	this.fetchRsources = function(data){
			var deferred = $q.defer();
			
			$http.get(base_url+'resources/listReqResources ',data)
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});
			
			return deferred.promise;
	  	}
		
	}]);
