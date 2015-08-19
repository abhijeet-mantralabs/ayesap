
// 'use strict';

angular
	.module('admin', ['ngResource'])
	// .config(['$httpProvider', function($httpProvider) {
 //        $httpProvider.defaults.useXDomain = true;
 //        delete $httpProvider.defaults.headers.common['X-Requested-With'];
 //    }
	// ])
	.controller('AdminCtrl', function ($scope, retailerAdmin, $interval, $timeout) {

		if(localStorage.getItem("admin") === null){
			$scope.login = true;
			$scope.showPage = false;
		} else {
			$scope.login = false;
			$scope.showPage = true;
		}

		$scope.adminLogin = function(loginDetail){
			console.log('inside $scope.adminLogin',loginDetail);
			$scope.error='';
			$scope.message = '';
			var data = {
				email : loginDetail.email,
				password : loginDetail.password
			}			
			retailerAdmin.adminLogin(data)
			.then(function(response){
				var admin = response.details.admin;
				console.log('admin',admin);
				// $scope.message = response.message;
				$scope.login = false;
				$scope.showPage = true;
				localStorage.setItem('admin',JSON.stringify({name:admin.name,email:admin.email,id:admin.id}));
				fetchRetailerList();
			}).catch(function(err){
				$scope.error = err.message;
			});
		}
		$scope.retailerRegister = {};

		$scope.showDetails = function(retailerDetails, selectedIndex){
			if(localStorage.getItem("admin") != null){
				$scope.error = null;
				$scope.password = null;
				$scope.enterDetails = true;
				$scope.selectedRetailer =  selectedIndex;
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
	    	} else {
	    		$scope.login = true;
				$scope.showPage = false;
	    	}
		}

		$scope.showOrderDetails = function(order, selectedIndex){
			$scope.orderDetails = order;
			console.log('$scope.orderDetails',$scope.orderDetails);
			$scope.selectedOrder =  selectedIndex;
			$('a[href="#order-details"]').tab('show');
		}

        var fetchRetailerList = function(){
        	if(localStorage.getItem("admin") != null){
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
	        } else {
	    		$scope.login = true;
				$scope.showPage = false;
	    	}
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
        	if(localStorage.getItem("admin") != null){
	            retailerAdmin.fetchRsources().then(function(response){
	                $scope.resources = response.details.resourceList;	                
	            }).catch(function(err){
	                $scope.error = err.message;
	            })
	        } else {
	    		$scope.login = true;
				$scope.showPage = false;
	    	}
        }
        fetchRsourceList();

        var fetchCustomerList = function(){
        	if(localStorage.getItem("admin") != null){
	            retailerAdmin.getCustomerList()
	            .then(function(response){
	                $scope.customers = JSON.parse(JSON.stringify(response.details.customersList));
	                angular.forEach($scope.customers, function(customer, idx){
	                	var fn = (function(data){
	                		return function(){
	                			var newAddr = '';
	                			newAddr += data.address+','+data.street+','+data.area+','+data.city+'-'+data.pincode;
	                			data.address = newAddr;
	                		}
	                	})(customer); 
	                	fn();
	                });
	            }).catch(function(err){
	                $scope.error = err.message;
	            })
	        } else {
	    		$scope.login = true;
				$scope.showPage = false;
	    	}
        }
        fetchCustomerList();

        var fetchOrderList = function(){
        	if(localStorage.getItem("admin") != null){
	            retailerAdmin.getOrderList()
	            .then(function(response){
	                $scope.orders = response.details.orderList;
	                console.log('fetchOrderList',response);               
	            }).catch(function(err){
	                $scope.error = err.message;
	            })
	        } else {
	    		$scope.login = true;
				$scope.showPage = false;
	    	}
        }
        fetchOrderList();

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
			if(localStorage.getItem("admin") != null){
				$scope.error='';
	            if(angular.isUndefined(retailerDetails.retailerType)){
	                retailerDetails.retailerType = "";
	            }
				retailerAdmin.registerRetailer(retailerDetails)
				.then(function(response){
					$scope.password = response.details.user.plainPass;
					fetchRetailerList();
				}).catch(function(err){
					$scope.error = err.message;
				});
			} else {
	    		$scope.login = true;
				$scope.showPage = false;
	    	}
		}

		$scope.editRetailer = function(retailerDetails){
			if(localStorage.getItem("admin") != null){
				$scope.error='';	
				$scope.message = '';		
				retailerAdmin.updateRetailer(retailerDetails)
				.then(function(response){
					$scope.message = response.message;
					fetchRetailerList();
				}).catch(function(err){
					$scope.error = err.message;
				});
			} else {
	    		$scope.login = true;
				$scope.showPage = false;
	    	}
		}

		$scope.declineRetailer = function(retailerId,mobile){
			if(localStorage.getItem("admin") != null){
				$scope.error='';
				$scope.message = '';
				var data = {
					retailerId : retailerId,
					mobile : mobile
				}			
				retailerAdmin.declineRetailer(data)
				.then(function(response){
					fetchRetailerList();
					$scope.message = response.message;
				}).catch(function(err){
					$scope.error = err.message;
				});
			} else {
	    		$scope.login = true;
				$scope.showPage = false;
	    	}
		}

		$scope.logout = function(){
			retailerAdmin.adminLogout()
			.then(function(response){
				localStorage.clear();
				$scope.login = true;
				$scope.showPage = false;
				$scope.message = response.message;
			}).catch(function(err){
				$scope.error = err.message;
			});
		}

		var fetchconfig = function(){
        	if(localStorage.getItem("admin") != null){
	            retailerAdmin.getConfig()
	            .then(function(response){
	            	var conifguration = response.details.config[0];
	            	var customconfig= {
		            	email : conifguration.email,
						key : conifguration.key,
						APIurl : conifguration.APIurl,
						riderActiveStatusInUse : conifguration.riderActiveStatusInUse + "",
						taskAutoAssignOptionInUse : conifguration.taskAutoAssignOptionInUse + "",
						lastTimeCheckms : conifguration.lastTimeCheckms + "",
						distanceCheckCircleInMeter : conifguration.distanceCheckCircleInMeter + "",
						bikerLastTimeCheckms : conifguration.bikerLastTimeCheckms + "",
						foodCheckCapacity : conifguration.foodCheckCapacity + "",
						groceryCheckCapacity : conifguration.groceryCheckCapacity + "",
						configType : conifguration.configType
	            	}
	                $scope.customconfig = customconfig;
	            }).catch(function(err){
	                $scope.error = err.message;
	                console.log('fetchconfig err',err);
	            })
	        } else {
	    		$scope.login = true;
				$scope.showPage = false;
	    	}
        }
        fetchconfig();

		$scope.saveConfig = function(customConfig){
			if(localStorage.getItem("admin") != null){
				$scope.error='';	
				$scope.message = '';	
				customConfig.configType = "backendconfig";
				data = {
					email : customConfig.email.replace(/\s/g, ''),
					key : customConfig.key.replace(/\s/g, ''),
					APIurl : customConfig.APIurl.replace(/\s/g, ''),
					riderActiveStatusInUse : customConfig.riderActiveStatusInUse.replace(/\s/g, ''),
					taskAutoAssignOptionInUse : customConfig.taskAutoAssignOptionInUse.replace(/\s/g, ''),
					lastTimeCheckms : customConfig.lastTimeCheckms.replace(/\s/g, ''),
					distanceCheckCircleInMeter : customConfig.distanceCheckCircleInMeter.replace(/\s/g, ''),
					bikerLastTimeCheckms : customConfig.bikerLastTimeCheckms.replace(/\s/g, ''),
					foodCheckCapacity : customConfig.foodCheckCapacity.replace(/\s/g, ''),
					groceryCheckCapacity : customConfig.groceryCheckCapacity.replace(/\s/g, ''),
					configType : customConfig.configType
				}
				retailerAdmin.saveConfig(data)
				.then(function(response){
					$scope.message = response.message;
				}).catch(function(err){
					$scope.error = err.message;
				});
			} else {
	    		$scope.login = true;
				$scope.showPage = false;
	    	}
		}


		$scope.exportExcelFile = function(){
			/* bookType can be 'xlsx' or 'xlsm' or 'xlsb' */
			var wopts = { bookType:'xlsx', bookSST:false, type:'binary' };
			var workbook = {};
			workbook.SheetNames = [];
			workbook.Sheets = {};
			function sheet_from_array_of_arrays(data, opts) {
				var ws = {};
				var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
				for(var R = 0; R != data.length; ++R) {
					for(var C = 0; C != data[R].length; ++C) {
						if(range.s.r > R) range.s.r = R;
						if(range.s.c > C) range.s.c = C;
						if(range.e.r < R) range.e.r = R;
						if(range.e.c < C) range.e.c = C;
						var cell = {v: data[R][C] };
						if(cell.v == null) continue;
						var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
						
						if(typeof cell.v === 'number') cell.t = 'n';
						else if(typeof cell.v === 'boolean') cell.t = 'b';
						else if(cell.v instanceof Date) {
							cell.t = 'n'; cell.z = XLSX.SSF._table[14];
							cell.v = datenum(cell.v);
						}
						else cell.t = 's';
						
						ws[cell_ref] = cell;
					}
				}
				if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
				return ws;
			}
			function exportFile(){
				var fileName = '';
				var data = [];
				var commonFields = [];
				if($('.current-nav-tab-retailers').hasClass('active')){
					fileName = 'list_of_retailers.xlsx';
					commonFields = ['Id', 'Name', 'Email', 'Mobile_No', 'Registration_Status'];
					data.push(commonFields);
					if($scope.retailers && $scope.retailers.length > 0){
						angular.forEach($scope.retailers, function(retailer, idx){
							var infos = [];
							infos.push(retailer.retailerId);
							infos.push(retailer.name);
							infos.push(retailer.email);
							infos.push(retailer.mobile.toString());
							infos.push(retailer.registrationStatus);
							data.push(infos);
						});
					}
				}

				else if($('.current-nav-tab-riders').hasClass('active')){
					fileName = 'list_of_resources.xlsx';
					commonFields = ['Name', 'Mobile_No', 'City'];
					data.push(commonFields);
					if($scope.resources && $scope.resources.length > 0){
						angular.forEach($scope.resources, function(resource, idx){
							var infos = [];
							infos.push(resource.name);
							infos.push(resource.mobile.toString());
							infos.push(resource.city);
							data.push(infos);
						});
					}
				}

				else if($('.current-nav-tab-customers').hasClass('active')){
					fileName = 'list_of_customers.xlsx';
					commonFields = ['Id', 'Name', 'Mobile_No', 'Address'];
					data.push(commonFields);
					if($scope.customers && $scope.customers.length > 0){
						angular.forEach($scope.customers, function(customer, idx){
							var infos = [];
							infos.push(customer.customerId);
							infos.push(customer.name);
							infos.push(customer.mobile.toString());
							infos.push(customer.address);
							data.push(infos);
						});
					}
				}

				else if($('.current-nav-tab-orders').hasClass('active')){
					fileName = 'list_of_orders.xlsx';
					commonFields = ['Task Id', 'Order Id', 'Retailer Id', 'Retailer Mobile', 'Customer Mobile', 'Order Amount', 'Current Status', 'Update Time', 'Resource Id'];
					data.push(commonFields);
					if($scope.orders && $scope.orders.length > 0){
						angular.forEach($scope.orders, function(order, idx){
							var infos = [];
							infos.push(order.taskId);
							infos.push(order.orderId);
							infos.push(order.retailerId);
							infos.push(order.retailerMobile.toString());
							infos.push(order.customerMobile.toString());
							infos.push(order.orderAmount.toString());
							infos.push(order.currentStatus);
							infos.push(order.updateTime);
							infos.push(order.resId);
							
							data.push(infos);
						});
					}
				}

				workbook.SheetNames.push('Sheet1');
				workbook.Sheets['Sheet1'] = sheet_from_array_of_arrays(data);
				var wbout = XLSX.write(workbook,wopts);

				function s2ab(s) {
				  var buf = new ArrayBuffer(s.length);
				  var view = new Uint8Array(buf);
				  for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
				  return buf;
				}
				/* the saveAs call downloads a file on the local machine */
				saveAs(new Blob([s2ab(wbout)],{type:""}), fileName);
			}
			exportFile();
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

	  	this.adminLogin = function(data){
			var deferred = $q.defer();
			
			$http.post(base_url+'admin/adminLogin',data)
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});
			
			return deferred.promise;
	  	}

	  	this.adminLogout = function(data){
			var deferred = $q.defer();
			
			$http.post(base_url+'admin/adminLogout')
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});
			
			return deferred.promise;
	  	}

	  	this.saveConfig = function(data){
	  		console.log('inside service');
			var deferred = $q.defer();
			
			$http.post(base_url+'admin/saveConfig',data)
			.success(function(response){
				console.log('service resp',response);
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});
			
			return deferred.promise;
	  	}

	  	this.getConfig = function(){
			var deferred = $q.defer();
			
			$http.get(base_url+'admin/getConfig')
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});
			
			return deferred.promise;
	  	}

	  	this.getCustomerList = function(data){
			var deferred = $q.defer();
			
			$http.get(base_url+'admin/getCustomers')
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});
			
			return deferred.promise;
	  	}

	  	this.getOrderList = function(data){
			var deferred = $q.defer();
			
			$http.get(base_url+'order/getAllOrders')
			.success(function(response){
				deferred.resolve(response);
			})
			.error(function(err){
				deferred.reject(err);
			});

			return deferred.promise;
	  	}
		
	}]);


/**

{
  "details": {
    "orderList": [
      {
        
        "retailerId": "0001",
        "retailerMobile": "9999999991",
        "customerMobile": "9990009990",

        "orderAmount": 3600,

        "lastStatus":
        "currentStatus": "Enroute",
        "retailerName": "Bala one",
        "bookNowTime": "2015-08-14T16:12:20+0530",
        "orderId": "0001",

        "CODValue": 36580,
        "customerId": "0001",
        "custFullAddress": "add street area city 248179",
        "custName": "customer1",
        "taskId": "0001-balaone",
        "updateTime": "2015-08-14 18:12:20",
        "resId": "AR0009",
        "resMobile": "9790923827",

        "lastStatusUpdateTime": "2015-08-14 16:12:20",

      }
    ]
  
	------show on columns -----
	"taskId": "0001-balaone",
	 "orderId": "0001",
	  "retailerId": "0001",
	  "retailerMobile": "9999999991",
	    "customerMobile": "9990009990",
	       "orderAmount": 3600,
	         "currentStatus": "Enroute",
	          "updateTime": "2015-08-14 18:12:20",
	          "resId": "AR0009",
  }**/


// }
