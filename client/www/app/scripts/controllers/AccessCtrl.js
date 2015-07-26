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

        $('.app-container').css('min-height', $(window).innerHeight() + 'px' );
        $('#map-canvas').css('min-height',$(window).innerHeight()-90 + 'px');
    
        var address = $rootScope.fullAddress;
        if(address){
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    // console.log('results',results);
                    $scope.myLatLng = new google.maps.LatLng((results[0].geometry.location.A),(results[0].geometry.location.F));
                    var mapOptions = {
                        zoom: 12,
                        center: $scope.myLatLng,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        // backgroundColor : '#000'
                    }
                    $scope.map = {};
                    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions); 
                    var marker = new google.maps.Marker({
                        position: $scope.myLatLng,
                        title:"Bangalore",
                    });
                    // To add the marker to the map, call setMap();
                    marker.setMap($scope.map);
                }
            });
        }
        // showing resources in map  
        var showMarkers = function(destinationArray)  {
            $timeout(function() {
                for( i = 0; i < destinationArray.length; i++ ) {
                    var latlong = destinationArray[i].split(',');
                    var position = new google.maps.LatLng(latlong[0], latlong[1]);
                    marker = new google.maps.Marker({
                        position: position,
                        map: $scope.map,
                        icon : 'app/img/bike.png'
                    });
                }
            }, 3000);
        }

        // finding current location
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(function (position) {
        //         // markOutLocation(position.coords.latitude, position.coords.longitude);
        //         console.log(position);
        //         // var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //     })
        // }

        //hardcoded for time being ,should be fetched from biker side api
        var location = {
            origins : '13.021808799999999, 77.6495135',
            destinations : '12.971598700000000000, 77.594562699999980000|13.020705, 77.647896|13.000688, 77.674658'
        }
        $scope.destinationArray = location.destinations.split('|');
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
                showMarkers($scope.destinationArray);
            }).catch(function(err){
                $scope.error = err.message;
            })
        }
        if(location){
            getdistanceMatrix(location);
        }

    })

    AyesapModule.controller('orderDetailsCtrl', function ($scope, $rootScope) {
        console.log('orderDetailsCtrl');
        $('.app-container').css('min-height', $(window).innerHeight() + 'px' );
        $scope.leastEta = $rootScope.leastEta;
        // console.log('$scope.leastEta',$scope.leastEta);

        $scope.user = $rootScope.user;
        $scope.nearestResource = $rootScope.nearestResource;

        $scope.bookResource = function(bookResource,customerDetails){
            console.log('customerDetails',customerDetails);
            console.log('bookResource',bookResource);
            console.log('inside bookresource');
            // var data = {
            //      retailerDetails: $scope.log.assertEmpty()
            // }
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
    
    

    AyesapModule.controller('settingCtrl', function ($scope) {
        // console.log('settingCtrl');
        $('.app-container').css('min-height', $(window).innerHeight() + 'px' );
        $('.coming-soon').height($('.app-container').height()-40);
    })
    

    AyesapModule.controller('aboutAppCtrl', function ($scope) {
        // console.log('aboutAppCtrl');
        $('.app-container').css('min-height', $(window).innerHeight() + 'px' );
        $('.coming-soon').height($('.app-container').height()-40);
    })
    
  
}) 

