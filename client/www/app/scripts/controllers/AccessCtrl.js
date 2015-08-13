define(['modules/AyesapModule', 'directives/sidemenu', 'services/retailer'], function (AyesapModule) {

    AyesapModule.controller('SignUpCtrl', function ($scope, Retailer) {
        // console.log('SignUpCtrl');
        if($(window).innerHeight() < 480){
            $('.app-container').css('min-height', '480px')
        }else{
            $('.app-container').css('min-height', $(window).innerHeight() + 'px' );
        }
        $scope.reqForRegister = function(retailer){
            // console.log('retailer',retailer);
            $scope.error='';
            $scope.message='';
            Retailer.requestForRegister(retailer)
            .then(function(response){
                $scope.message = response.message;
            }).catch(function(err){
                console.log(err);
                $scope.error = err.message;
            });
        }
    })

    AyesapModule.controller('SignInCtrl', function ($scope, $location, Retailer, $rootScope) {
      // console.log('SignInCtrl');
      $('.app-container').css('min-height', $(window).innerHeight() + 'px' );

    var validateEmail = function(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    } 
    var validateMobile = function (mobile) 
    {
        var re = /^\d{10}$/;
        return re.test(mobile);
    } 
    $scope.login = function(retailer){
        $scope.error = '';
        var credentials = { };
        if(validateEmail(retailer.username)) {
            credentials.email = retailer.username;
            credentials.password = retailer.password;
        } else if (validateMobile(retailer.username)) {
            credentials.mobile = retailer.username;
            credentials.password = retailer.password;
        } else {
            $scope.error = 'Please Enter valid email or mobile number';
        }
        if((credentials.email || credentials.mobile)&& credentials.password){
            console.log('credentials',credentials);
            Retailer.login(credentials)
            .then(function(response){
                $location.path('/');
            }).catch(function(err){
                $scope.error = err.message;
            });
        }
    }

    $scope.expression = function(){
        console.log('inside swipe left');
    }

    })

    AyesapModule.controller('HomeCtrl', function ($scope, Retailer, $timeout, $location, $routeParams, $rootScope) {
        
        document.addEventListener("backbutton", function(e){ 
            var path = $location.path();
            if (path == '/'){
                console.log('backbutton'); 
                e.preventDefault();
                navigator.app.exitApp();
            } else {
                navigator.app.backHistory();
            }
        });

        $scope.user = $rootScope.user;
        $('.app-container').css('min-height', $(window).innerHeight() + 'px' );
        $('#map-canvas').css('min-height',$(window).innerHeight()-90 + 'px');
    
        $scope.myLatLng = new google.maps.LatLng($scope.user.latitude,$scope.user.longitude)
        var mapOptions = {
            zoom: 12,
            center: $scope.myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        }
        $scope.map = {};
        $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions); 
        var marker = new google.maps.Marker({
            position: $scope.myLatLng,
            title:"Bangalore",
        });
        // To add the marker to the map, call setMap();
        marker.setMap($scope.map);

        var finalDestinationList = function(data){
            var finalList = '';
            angular.forEach(data, function(resource,idx){
                for(var i=0;i<resource.length;i++){
                    if(i == 0){
                        finalList += resource[i] + ',';
                    }
                    if(i == 1 && (idx == data.length -1 )){
                        finalList += resource[i];
                    } else if(i == 1){
                        finalList += resource[i] + '|';
                    }
                }
            });
            return finalList;
        };

        var showMarkers = function(destinationArray)  {
            for( i = 0; i < destinationArray.length; i++ ) {
                var latlong = destinationArray[i];
                var position = new google.maps.LatLng(latlong[0], latlong[1]);
                marker = new google.maps.Marker({
                    position: position,
                    map: $scope.map,
                    icon : 'app/img/bike.png'
                });
            }
        };

        var getdistanceMatrix = function(location){
            Retailer.getdistanceMatrix(location)
            .then(function(response){
                var eta = [];
                var distanceArray = response.rows[0].elements;
                for ( i = 0; i < distanceArray.length; i++ ) {
                    eta.push(distanceArray[i].duration.value);
                }
                // $scope.leastEta = Math.round((Math.min.apply(null, eta))/60);
                $scope.leastValue = (Math.min.apply(null, eta));
                var indexOfResource = eta.indexOf($scope.leastValue);
                $rootScope.leastEta = Math.round($scope.leastValue/60);
                $scope.nearestResource = $scope.destinationArray[indexOfResource];
                $rootScope.nearestResource = $scope.nearestResource;        
            }).catch(function(err){
                $scope.error = err.message;
            })
        };

        var getResources = function(){
            var zone = {zoneId:$scope.user.zone};
            $scope.destinationArray = [];
            Retailer.getNearbyResources(zone)
            .then(function(response){
                $scope.nearByResources = response.details.resourceList;
                angular.forEach($scope.nearByResources, function(resource,idx){
                    var data = [resource.resLat,resource.resLong]
                    $scope.destinationArray.push(data);
                })
                var location = {
                    origins : $scope.user.latitude +','+ $scope.user.longitude,
                    destinations : finalDestinationList($scope.destinationArray)
                }
                showMarkers($scope.destinationArray);
                getdistanceMatrix(location);
            }).catch(function(err){
                $scope.error = err.message; 
            }); 
        };
        getResources();
        
        
        // finding current location
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(function (position) {
        //         // markOutLocation(position.coords.latitude, position.coords.longitude);
        //         console.log(position);
        //         // var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //     })
        // }
        

    })

    AyesapModule.controller('orderDetailsCtrl', function ($scope, $rootScope) {
        console.log('orderDetailsCtrl');
        $('.app-container').css('min-height', $(window).innerHeight() + 'px' );
        $scope.leastEta = $rootScope.leastEta;
        // console.log('$scope.leastEta',$scope.leastEta);

        $scope.user = $rootScope.user;
        $scope.nearestResource = $rootScope.nearestResource;

        $scope.bookResource = function(orderAmount,CODValue,customerDetails){
            var data = {
                 retailerDetails: $scope.user,
                 customerDetails: customerDetails,
                 orderAmount:orderAmount,
                 CODValue:CODValue
            }
            console.log('data',data);
        }
    })

    AyesapModule.controller('PickupCtrl', function ($scope) {
      // console.log('PickupCtrl');
    })
  
    AyesapModule.controller('PickupDetailsCtrl', function ($scope) {
        // console.log('PickupDetailsCtrl');
    })

    AyesapModule.controller('forDeliveryCtrl', function ($scope, Retailer) {
        console.log('forDeliveryCtrl');
    })

    AyesapModule.controller('deliveryCtrl', function ($scope) {
        // console.log('deliveryCtrl');
    })
    
    AyesapModule.controller('customerDetailsCtrl', function ($scope) {
        // console.log('customerDetailsCtrl');
    })
    
    

    AyesapModule.controller('settingCtrl', function ($scope, $rootScope, Retailer) {
        // console.log('settingCtrl');
        $('.app-container').css('min-height', $(window).innerHeight() + 'px' );
        $('.coming-soon').height($('.app-container').height()-40);
        $scope.user = $rootScope.user;
        // console.log($scope.user,$scope.user);
        $scope.changePassword = function(oldPass,ConfirmPass){
            $scope.error = "";
            $scope.message = "";
            var data = {
                retailerId : $scope.user.retailerId,
                oldPlainPass : oldPass,
                newPlainPass : ConfirmPass
            }
            console.log('data',data);
            Retailer.changePassword(data)
            .then(function(response){
                $scope.message = "Password changed successfully";
            }).catch(function(err){
                $scope.error = err.message;
            });

        }
    })
    

    AyesapModule.controller('aboutAppCtrl', function ($scope) {
        // console.log('aboutAppCtrl');
        $('.app-container').css('min-height', $(window).innerHeight() + 'px' );
        $('.coming-soon').height($('.app-container').height()-40);
    })
    
  
}) 

