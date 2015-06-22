define(['modules/userModule'] , function (userMod) {

userMod.directive('header', function(){
	return {
		restrict : 'E',
		templateUrl : 'templates/header/mpfheader.html',
		link : function(scope, element, attrs){
		  //  	 	scope.myData = {};
				//   	scope.myData.doClick = function() {
				//       	setCookie('user','',1);
				// }
            	$('.d-arrow,.name').click( function(event){
            		event.stopPropagation();
            		console.log("bfhbj")
          			if($('.header-dropdown').css('display')=='block'){
            	  		$('.d-arrow img').attr('src','img/d-arrow.png');
          			}else{
            	  		$('.d-arrow img').attr('src','img/u-arrow.png');
          			}
          			$(this).parents('.header-right').find('.header-dropdown').slideToggle();
      			});
            	$(document).click( function(){
	        		$('.header-dropdown').slideUp();
	        		if($('.header-dropdown').css('display')=='block'){
	        	    	$('.d-arrow img').attr('src','img/d-arrow.png');
	        		}
	    		});
			
		}
	}
})
});