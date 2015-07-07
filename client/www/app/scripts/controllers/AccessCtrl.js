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

    AyesapModule.controller('SignInCtrl', function ($scope, $location, Retailer) {
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
                $location.path('/home');
            }).catch(function(err){
                $scope.error = err.message;
            });
        }
      }
    })

     AyesapModule.controller('HomeCtrl', function ($scope, Retailer, $timeout) {
      console.log('HomeCtrl');

        $('.app-container').css('min-height', $(window).innerHeight() + 'px' );
        var address = "Sai Gallerium, No. 955, 5AC, Near Hormavu Underpass HRBR Layout 1st Block, Bank Avenue Colony, Bengaluru, Karnataka 560043";
        if(address){
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': address }, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                console.log('results',results);
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
            
        var markers = [
            [13.020705,77.647896],
            [12.971598700000000000,77.594562699999980000]
        ];
          
        $timeout(function() {
            console.log('markers',markers);
            for( i = 0; i < markers.length; i++ ) {
                var position = new google.maps.LatLng(markers[i][0], markers[i][1]);
                // bounds.extend(position);
                console.log(position);
                marker = new google.maps.Marker({
                    position: position,
                    map: $scope.map,
                    // title: markers[i][0]
                    icon : 'app/img/bike.png'
                });
            }
        }, 3000);

        // finding current location
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(function (position) {
        //         // markOutLocation(position.coords.latitude, position.coords.longitude);
        //         console.log(position);
        //         // var myLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //     })
        // }

        var location = {
            origins : '13.021808799999999, 77.6495135',
            destinations : '12.971598700000000000, 77.594562699999980000|13.020705, 77.647896|13.000688, 77.674658'
        }
        var getdistanceMatrix = function(location){
            Retailer.getdistanceMatrix(location)
            .then(function(response){
                var eta = [];
                var distanceArray = response.rows[0].elements;
                for ( i = 0; i < distanceArray.length; i++ ) {
                    eta.push(distanceArray[i].duration.value);
                }
                $scope.leastEta = Math.round((Math.min.apply(null, eta))/60);
            }).catch(function(err){
                $scope.error = err.message;
            })
        }
        if(location){
            getdistanceMatrix(location);
        }

    })

    AyesapModule.controller('PickupCtrl', function ($scope) {
      // console.log('PickupCtrl');
    })
  
    AyesapModule.controller('PickupDetailsCtrl', function ($scope) {
        // console.log('PickupDetailsCtrl');
    })
    AyesapModule.controller('deliveryCtrl', function ($scope) {
        // console.log('deliveryCtrl');
    })
    
    AyesapModule.controller('customerDetailsCtrl', function ($scope) {
        // console.log('customerDetailsCtrl');
    })
    
    AyesapModule.controller('orderDetailsCtrl', function ($scope) {
        // console.log('orderDetailsCtrl');
        $('.app-container').css('min-height', $(window).innerHeight() + 'px' );
    })
  
}) 

