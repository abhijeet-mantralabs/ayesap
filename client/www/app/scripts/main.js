require.config({
	paths:{
		'jquery': 'vendor/jquery/jquery.min',
		'angular': 'vendor/angular/angular.min',
		'angularResource': 'vendor/angular-resource/angular-resource.min',
	    'angularRoute' :'vendor/angular-route/angular-route.min',
        'bootstrap'    : 'vendor/bootstrap/dist/js/bootstrap.min',
        'angularAnimate':'vendor/angular-animate/angular-animate.min',
        'angularAria': 'vendor/angular-aria/angular-aria.min',
        'angularMaterial':'vendor/bootstrap/dist/js/bootstrap.min'
    },
	shim: {
        'angular' : {'exports' : 'angular'},
        'angularResource': { 
            deps:['angular'],
            'exports' : 'angularResource'
        },
        'angularRoute':{
            deps:['angular'],
            'exports' : 'angularRoute'
        },
        'jquery': {
            'exports' : 'jquery'
        },
        'bootstrap' : {
            deps:['jquery']
        },
        'angularAnimate' : {
            deps:['angular']
        },
        'angularAria' : {
            deps:['angular']
        },
        'angularMaterial' : {
            deps:['angular','angularAria','angularAnimate']
        }
    }
});

require(['jquery', 'bootstrap', 'angular', 'angularRoute','angularResource', 'angularMaterial', 'routes/route'] , function ($, bootstrap, angular, angularRoute, angularResource , angularMaterial, route) {
    $(function () {
      angular.bootstrap(document , ['AyesapModule']);
    });
   

});
 






// require(['jquery', 'angular', 'angularroute', 'uibootstrap', 'bootstrapTagsinputAngular','routes/route'] , function ($, angular, angularroute, uibootstrap, bootstrapTagsinputAngular, route) {
  
//     $(function () {
//       angular.bootstrap(document , ['userModule', 'partnerModule']);
//     });
  
// });

 // angular.module('AyesapModule', ['ngRoute','ngResource']);
 //      // .controller('MyController', ['$scope', function ($scope) {
 //      //   $scope.greetMe = 'World';
 //    // }]);
 //    angular.element(document).ready(function() {
 //      angular.bootstrap(document, ['AyesapModule']);
 //    });
 //    // $(function () {   
 //    //     angular.bootstrap(document , ['ayesap']);
 //    // });    



 // require(['domReady!'], function (document) {
       
 //    });

/*jshint unused: vars */
// require.config({
//   paths: {
//     'angular' : '/bower_components/angular/angular',
//     'angularRoute': '/bower_components/angular-route/angular-route',
//     'angularResource': '/bower_components/angular-resource/angular-resource',
//     'angularMocks': '/bower_components/angular-mocks/angular-mocks',
//     'jquery': '/bower_components/jquery/dist/jquery',
//     'bootstrap': '/bower_components/bootstrap/dist/js/bootstrap'

//   },
//   shim: {
//     'angular' : {'exports' : 'angular'},
//     'angularRoute':{
//       deps:['angular'],
//       'exports' : 'angularRoute'
//     },
//     'angularResource':{
//       deps:['angular'],
//       'exports' : 'angularResource'
//     },
//     // 'angularRoute': ['angularRoute'],
//     // 'angularResource': ['angularResource'],
//     'angularMocks': {
//       deps:['angular'],
//       'exports':'angular.mock'
//     },
//     'bootstrap':{
//       deps:['jquery']
//     }
//   },
//   priority: [
//     'angular'
//   ]
// });

// //http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
// window.name = 'NG_DEFER_BOOTSTRAP!';

// require([
//   'angular',
//   'app',
//   'angularRoute',
//   'angularResource',
//   'jquery',
//   'bootstrap',

// ], function(angular, app, ngRoutes, ngResource , $) {
//   'use strict';
//   /* jshint ignore:start */
//   var $html = angular.element(document.getElementsByTagName('html')[0]);
//   /* jshint ignore:end */
//   angular.element().ready(function() {
//     angular.resumeBootstrap([app.name]);
//   });
// });
