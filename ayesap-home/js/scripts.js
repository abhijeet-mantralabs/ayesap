window.aboutScroll = function(ele,el)
{   

  var section;
   switch(ele)
   {
      case 'brief-note':
           section = '.brief-note';                
          break; 
        
      case 'business-services': 
          section = '.business-services';
          break; 
          
      case 'ourteam': 
          section = '.ourteam';
          break; 

      case 'corevalues':
        section = '.corevalues';
        break;

      case 'contactus':
        section = ".contactus-block";
        break;
        
      default : section = 'body';   
    }
    // if($('.nav-container').height() == null){
    //   var pos = $('.aboutushdr-fixed ').height() + 37;
    // }else{
    //   var pos = (($('.aboutushdr-fixed ').height())+($('.nav-container').height()));//137;//$('.aboutushdr-fixed').height();
    // }
  
  $('html, body').animate({scrollTop:$(section).offset().top},1000);
}
$(".screenshot").hover(function () {
  console.log();
  $(this).children('.screenshot-cover').slideToggle();
});
