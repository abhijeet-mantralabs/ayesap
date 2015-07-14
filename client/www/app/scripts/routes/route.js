

 /*jshint unused: vars */
define(['angular', 'modules/AyesapModule','controllers/AccessCtrl', 'services/retailer']/*deps*/, function (angular, AyesapModule)/*invoke*/ {
    

    // resolve = {
    //     sessionCheck : function($q, $location, $http){
    //     var deferred = $q.defer();
      
    //     $http.post(base_url+'retailer/isLoggedIn')
    //         .success(function(res){
    //             $scope.user = response.details.user;
    //             $rootscope.fullAddress = $scope.user.address + ' ' + $scope.user.street + ' ' +  $scope.user.area + ' ' + $scope.user.city + ' ' + $scope.user.state + ' ' + $scope.user.pincode + ' ' + $scope.user.country;
    //             deferred.resolve({
    //                 accountDetails: function() {
    //                     return res ; 
    //                     console.log('isloggedin',res);
    //                 }
    //             });
    //         })
    //         .error(function(err){
    //             deferred.reject();
    //             $location.path('/');
    //         });
          
    //         return deferred.promise;
    //     }
    // };
    
    return AyesapModule.config(function ($routeProvider, $httpProvider) {

        resolve = {
            auth: function ($location, Retailer) {
                return Retailer.isLoggedIn()
                .then(function(status){
                })
                .catch(function(err){
                    $location.path('/login');
                });
            }
        } 

    $routeProvider
        .when('/', {
            templateUrl: 'app/templates/home.html',
            controller: 'HomeCtrl',
            resolve : resolve
        })
        .when('/signup', {
            templateUrl: 'app/templates/register.html',
            controller: 'SignUpCtrl'
        })
        .when('/login', {
            templateUrl: 'app/templates/login.html',
            controller: 'SignInCtrl'

        })
        .when('/pickup', {
            templateUrl: 'app/templates/pickup.html',
            controller: 'PickupCtrl',
            resolve : resolve
        })
        .when('/pickupDetails', {
            templateUrl: 'app/templates/pickup-details.html',
            controller: 'PickupDetailsCtrl',
            resolve : resolve
        })
        .when('/delivered', {
            templateUrl: 'app/templates/delivered.html',
            controller: 'deliveryCtrl',
            resolve : resolve
        })
        .when('/customerDetails', {
            templateUrl: 'app/templates/customer-details.html',
            controller: 'customerDetailsCtrl',
            resolve : resolve
        })
        .when('/orderDetails', {
            templateUrl: 'app/templates/order-details.html',
            controller: 'orderDetailsCtrl',
            resolve : resolve
        })
        .otherwise({
            redirectTo: '/'
        });
    });
});