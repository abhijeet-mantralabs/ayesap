define(['modules/AyesapModule', 'controllers/AccessCtrl', 'services/retailer'], function (AyesapModule) {

AyesapModule.directive('sidemenu', function (Retailer, $location){
	return {
		restrict : 'E',
		templateUrl : 'app/templates/directive-templates/side-menu.html',
		link : function(scope, element, attrs){
			if($(window).innerHeight() < 360){
            	$('.side-menu').css('min-height', '360px')
        	} else{
				$('.side-menu').css('min-height', $(window).innerHeight() + 'px' );
			}
					$(document).mouseup(function (e)
					{
				    	if($(e.target).hasClass('side-menu') || $(e.target).parents().hasClass('side-menu')){
					    	console.log('do nothing');
					    } else {
					    	 $(".side-menu").removeClass('show-menu');
					    }
					});
			scope.showMenu = function(){
				$('.side-menu').addClass('show-menu');
			}	
			scope.logout = function (){
				console.log('inside logout');
				Retailer.logout()
				.then(function(response){
					$location.path('/login')
				}).catch (function(err){
					console.log(err);
				})
			}
		}
	}
})
});