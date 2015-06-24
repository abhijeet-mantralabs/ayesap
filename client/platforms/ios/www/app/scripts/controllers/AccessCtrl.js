define(['modules/AyesapModule', 'directives/sidemenu'], function (AyesapModule) {

    AyesapModule.controller('SignInCtrl', function ($scope) {
      console.log('SignInCtrl');
      $('.app-container').css('min-height', $(window).innerHeight() + 'px' );
    })

    AyesapModule.controller('SignUpCtrl', function ($scope) {
		console.log('SignUpCtrl');
        if($(window).innerHeight() < 480){
            $('.app-container').css('min-height', '480px')
        }else{
            $('.app-container').css('min-height', $(window).innerHeight() + 'px' );
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

