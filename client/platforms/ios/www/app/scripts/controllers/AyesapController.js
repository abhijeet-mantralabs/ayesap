define(['modules/AyesapModule'], function (AyesapModule) {
  AyesapModule.controller('SignInCtrl', function () {
      console.log("hello");
  })
  AyesapModule.controller('SignUpCtrl', function () {
      console.log("hello signup");
  })
  AyesapModule.controller('MenuCtrl', function ($scope) {
      console.log("hello menu");
      $scope.showMenu = function(){
      	$scope.addClass="show-menu";
      }
  })
}) 
