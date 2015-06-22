

 /*jshint unused: vars */
define(['angular', 'modules/AyesapModule','controllers/AyesapController']/*deps*/, function (angular, AyesapModule)/*invoke*/ {
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
        .otherwise({
          redirectTo: '/'
        });
    });
});