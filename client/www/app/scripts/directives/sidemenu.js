define(['modules/AyesapModule'], function (AyesapModule) {

AyesapModule.directive('sidemenu', function(){
	return {
		restrict : 'E',
		templateUrl : 'app/templates/directive-templates/side-menu.html',
		link : function(scope, element, attrs){

			console.log("hello menu");
			scope.showMenu = function(){
				scope.addClass="show-menu";
			}	
		}
	}
})
});