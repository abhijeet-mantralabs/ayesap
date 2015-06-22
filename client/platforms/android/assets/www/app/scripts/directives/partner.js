define(['modules/userModule'] , function (userMod) {

userMod.directive('partner',['user', 'Partner', '$rootScope', '$location', function(user, Partner, $rootScope, $location){
	return {
		restrict : 'E',
		templateUrl : 'templates/partner.html',
		scope : {
			info : "=",
			accountid : "=",
			remainingcontactscount : "=",
			purchasedcount: '='
		},
		link: function(scope, element, attrs){
			
			if(scope.info.alreadyAContact != -1){
				scope.show = false;
				scope.partnerDetailRouteId = scope.info.eId;
				scope.myAddress=false;
				scope.contactedAddress=true;
				$('.zero-contact').fadeOut();
				if(scope.info.profile.contactDetails.address ){
					if( scope.info.profile.contactDetails.address[0].nonGeoCodedAddress){
						scope.info.fullAddress = scope.info.profile.contactDetails.address[0].nonGeoCodedAddress
					}else{
						scope.info.fullAddress = scope.info.profile.contactDetails.address[0].geoCodedRef.localityGeoRef.canonicalLocalityName
					}
				scope.info.localityPin = scope.info.profile.contactDetails.address[0].geoCodedRef.localityGeoRef.pincode.pinCodeGeoRef.city.cityGeoRef.canonicalCityName+" -"+scope.info.profile.contactDetails.address[0].geoCodedRef.localityGeoRef.pincode.pinCodeGeoRef.canonicalPincode;
				}
				
				if(scope.info.profile.contactDetails && scope.info.profile.contactDetails.emailId && scope.info.profile.contactDetails.emailId.localPart!="" && scope.info.profile.contactDetails.emailId.domainName!=""){
					scope.info.email = scope.info.profile.contactDetails.emailId.localPart+"@"+scope.info.profile.contactDetails.emailId.domainName;
				}else{
					scope.info.email = "";
				}
			}else{
				scope.show = true;
				scope.myAddress=false;
				scope.contactedAddress=false;
			}
			
			scope.contactPartner = function(partnerId){
				
				if(scope.remainingcontactscount && scope.remainingcontactscount>0){
					
					var options = {"account":{"dbInfo":{"id":scope.accountid}},"profile":{"entityUiPb":{"id":partnerId}},"opportunityId":"O1"};
					var serviceContactSuccess = function(res){

						scope.myAddress=true;
						scope.newContactedADetails = res.data;
						
						scope.info.firstname = scope.newContactedADetails.businessProfile.partnerInfo[0].officialName.firstName
						if(scope.newContactedADetails.profile.contactDetails && scope.newContactedADetails.profile.contactDetails.emailId && scope.newContactedADetails.profile.contactDetails.emailId.localPart !="" && scope.newContactedADetails.profile.contactDetails.emailId.domainName !=""){
							scope.newContactedADetails.profile.email = scope.newContactedADetails.profile.contactDetails.emailId.localPart+"@"+scope.newContactedADetails.profile.contactDetails.emailId.domainName;
						}else{
							scope.newContactedADetails.profile.email="";
						}
						scope.partnerExpressId = res.data.dbInfo.id;
				    	scope.show = false;
						if(!scope.info.eId){
							scope.partnerDetailRouteId = scope.partnerExpressId;
						}
	                 	
	                 	var expressCountSuccess = function(res){
	                 		var ContactsCount = res.data.purchasedCount-res.data.usedCount;
	                 			$("#"+partnerId).parents('.ng-isolate-scope').find(".slide").show();
								$("#"+partnerId).parents('.ng-isolate-scope').find(".thankyou p").fadeIn();
								$("#"+partnerId).parents('.ng-isolate-scope').find(".slidedown-arrow").hide();
								setTimeout(function(){$("#"+partnerId).parents('.ng-isolate-scope').find(".thankyou p").fadeOut();},7000);
								$('.contacts-remaining span').html(res.data.purchasedCount-res.data.usedCount);
	                 			scope.purchasedcount = res.data.purchasedCount;
	                 			scope.remainingcontactscount = {remainingCount: res.data.purchasedCount-res.data.usedCount};
	                 		
	                 	};
	                 	var expressCountError = function(error){
	                 	
	                 		$location.path('/error');
	                 	};
				       	user.getExpressCount(scope.accountid).then(expressCountSuccess, expressCountError);
					}
					var errorserviceContactPartner = function(error){
						$location.path('price/alert');
						// $location.path('/error');
					
					}
					Partner.serviceContactPartner(options).then(serviceContactSuccess,errorserviceContactPartner);
				}else{
					
					$location.path('price/alert');
				}
			}
			$(function(){
				 $(".slidedown-arrow").click(function(){
				 	$(this).parents('.ng-isolate-scope').find(".slide").show();
				 	$(this).hide();
				    if($('.contacts-remaining span').html()==0){
				    	$(this).parents('.results-details').find('.zero-contact').fadeIn();
				    	setTimeout(function(){$('.results-details').find('.zero-contact').fadeOut();},10000);
				    }
				 }); 
				 $(".slideup-arrow").click(function(){
				    $(this).parents('.results-details-content').find(".slide").hide();
				 	$(this).parents('.ng-isolate-scope').find(".slidedown-arrow").show();
				});
			});
		}
	}
}])
});