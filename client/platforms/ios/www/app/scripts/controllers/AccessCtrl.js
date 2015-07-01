define(['modules/AyesapModule', 'directives/sidemenu', 'services/retailer'], function (AyesapModule) {

    AyesapModule.controller('SignUpCtrl', function ($scope, Retailer) {
        console.log('SignUpCtrl');
        if($(window).innerHeight() < 480){
            $('.app-container').css('min-height', '480px')
        }else{
            $('.app-container').css('min-height', $(window).innerHeight() + 'px' );
        }
        $scope.reqForRegister = function(retailer){
            console.log('retailer',retailer);
            $scope.error='';
            $scope.message='';
            Retailer.requestForRegister(retailer)
            .then(function(response){
                console.log(response);
                $scope.message = response.message;
            }).catch(function(err){
                console.log(err);
                $scope.error = err.message;
            });
        }
    })

    AyesapModule.controller('SignInCtrl', function ($scope, $location, Retailer) {
      console.log('SignInCtrl');
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
                console.log(response);
                $location.path('/home');
            }).catch(function(err){
                $scope.error = err.message;
            });
        }
      }
    })

    AyesapModule.controller('HomeCtrl', function ($scope) {
      console.log('HomeCtrl');
        $('.app-container').css('min-height', $(window).innerHeight() + 'px' );
      //   function initialize() {
      //   console.log('inside canvas');
      //   var mapCanvas = document.getElementById('map-canvas');
      //   console.log('mapCanvas',mapCanvas);
      //   var mapOptions = {
      //       center: new google.maps.LatLng(44.5403, -78.5463),
      //       zoom: 8,
      //       mapTypeId: google.maps.MapTypeId.ROADMAP
      //   }
      //   var map = new google.maps.Map(mapCanvas, mapOptions)
      // }
      // google.maps.event.addDomListener(window, 'load', initialize);
     })

    AyesapModule.controller('PickupCtrl', function ($scope) {
      console.log('PickupCtrl');
    })
  
    AyesapModule.controller('PickupDetailsCtrl', function ($scope) {
        console.log('PickupDetailsCtrl');
    })
    AyesapModule.controller('deliveryCtrl', function ($scope) {
        console.log('deliveryCtrl');
    })
    
    AyesapModule.controller('customerDetailsCtrl', function ($scope) {
        console.log('customerDetailsCtrl');
    })
    
    AyesapModule.controller('orderDetailsCtrl', function ($scope) {
        console.log('orderDetailsCtrl');
        $('.app-container').css('min-height', $(window).innerHeight() + 'px' );
    })
  
}) 

