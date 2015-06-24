

 /*jshint unused: vars */
define(['angular', 'modules/AyesapModule','controllers/AccessCtrl']/*deps*/, function (angular, AyesapModule)/*invoke*/ {
    // resolve= {
      // "getUserAccountService": function( $q, $timeout, $location){
      //   var userAccount = $q.defer();
      //   if(localStorage.getItem("userAccount")){
      //      userAccount.resolve({
      //       account: function( ) {
      //         return JSON.parse(localStorage.getItem("userAccount"));;
      //       }
      //     });
      //   }else{
      //     userAccount.reject();
      //     $(location).attr('href',"/");
      //   }
      //   return userAccount.promise;
      // }
    // };
  /** # ayeappApp
   *
   * Main module of the application.
   */
  return AyesapModule.config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'app/templates/login.html',
          controller: 'SignInCtrl'
        })
        .when('/signup', {
          templateUrl: 'app/templates/register.html',
          controller: 'SignUpCtrl'
        })
        .when('/home', {
          templateUrl: 'app/templates/home.html',
          controller: 'HomeCtrl'
        })
        .when('/pickup', {
          templateUrl: 'app/templates/pickup.html',
          controller: 'PickupCtrl'
        })
        .when('/pickupDetails', {
          templateUrl: 'app/templates/pickup-details.html',
          controller: 'PickupDetailsCtrl'
        })
        .when('/delivered', {
          templateUrl: 'app/templates/delivered.html',
          controller: 'deliveryCtrl'
        })
        .when('/customerDetails', {
          templateUrl: 'app/templates/customer-details.html',
          controller: 'customerDetailsCtrl'
        })
        .when('/orderDetails', {
          templateUrl: 'app/templates/order-details.html',
          controller: 'orderDetailsCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
});