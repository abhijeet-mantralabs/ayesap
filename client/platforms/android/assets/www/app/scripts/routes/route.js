

 /*jshint unused: vars */
define(['angular', 'modules/AyesapModule','controllers/AccessCtrl', 'services/retailer']/*deps*/, function (angular, AyesapModule)/*invoke*/ {
    

    resolve = {
        sessionCheck : function($q, $location, $http){
        var deferred = $q.defer();
      
        $http.post(base_url+'retailer/isLoggedIn')
            .success(function(res){
                deferred.resolve({
                    accountDetails: function() {
                        return res ; 
                    }
                });
            })
            .error(function(err){
                deferred.reject();
                $location.path('/');
            });
          
            return deferred.promise;
        }
    };
    
    return AyesapModule.config(function ($routeProvider, $httpProvider) {

        // resolve = {
        //     auth: function ($location, Retailer) {
        //         return Retailer.isLoggedIn()
        //         .then(function(status){
        //         })
        //         .catch(function(err){
        //             $location.path('/');
        //         });
        //     }
        // } 

    $routeProvider
        .when('/', {
            templateUrl: 'app/templates/login.html',
            controller: 'SignInCtrl'
        })
        .when('/signup', {
            templateUrl: 'app/templates/register.html',
            controller: 'SignUpCtrl',
        })
        .when('/home', {
            templateUrl: 'app/templates/home.html',
            controller: 'HomeCtrl',
            resolve : resolve
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