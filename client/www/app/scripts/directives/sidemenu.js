define(['modules/AyesapModule'], function (AyesapModule) {

AyesapModule.directive('sidemenu', function(){
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
						console.log('inside mouse');
					    // var container = $("side-menu");
					    console.log(e.target.className);
					    if(e.target.className !== "side-menu")
					    {
					      $(".side-menu").removeClass('show-menu');
					    }

					    // if (!container.is(e.target) // if the target of the click isn't the container...
					    //     && container.has(e.target).length === 0) // ... nor a descendant of the container
					    // {
					    // 	console.log('inside mouseup')
					    // 	console.log(container);
					    //     container.removeClass('show-menu');
					    // }
					});
			scope.showMenu = function(){
				// scope.addClass="show-menu";
				$('.side-menu').addClass('show-menu');
			}	
		}
	}
})
});