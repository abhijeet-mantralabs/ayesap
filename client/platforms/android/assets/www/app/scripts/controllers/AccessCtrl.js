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

    function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }         

    $scope.login = function(retailer){
        var credentials = { };
        // if(retailer.username.includes('.com')){
        //     credentials.email = retailer.username;
        //     credentials.password = retailer.password;
        // } else {
        //     credentials.mobile = retailer.username;
        //     credentials.password = retailer.password;
        // }
        if(validateEmail(retailer.username)){
            credentials.email = retailer.username;
            credentials.password = retailer.password;
        } else {
            credentials.mobile = retailer.username;
            credentials.password = retailer.password;
        }
        if(credentials){
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

