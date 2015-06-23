
// 'use strict';

angular
	.module('admin', [
	'ngResource',
	])
	.controller('AdminCtrl', ['$scope', function ($scope) {
		$scope.showDetails = function(){
			console.log('in');
			$('a[href="#add-retailer"]').tab('show');
		}
	}])
