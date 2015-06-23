define(['modules/AyesapModule', 'directives/sidemenu'], function (AyesapModule) {

  AyesapModule.controller('SignInCtrl', function ($scope) {
      console.log('signin');
  })

  AyesapModule.controller('SignUpCtrl', function ($scope) {
		console.log('signup');
  })

  AyesapModule.controller('HomeCtrl', function ($scope) {
      console.log('home');
  })

  AyesapModule.controller('PickupCtrl', function ($scope) {
      console.log('Pickup');
  })
  
}) 

