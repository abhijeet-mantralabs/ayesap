window.aboutScroll = function(ele,el)
{   

  var section;
   switch(ele)
   {
      case 'home':
           section = '#home';                
          break; 
        
      case 'how-it-works': 
          section = '#how-it-works';
          break; 
          
      case 'start-shipping': 
          section = '#get-started';
          break; 

      case 'become-rider':
        section = '#become-rider';
        break;

      case 'contact-us':
        section = "#contact-us";
        break;
        
      default : section = 'body';   
    }
    // if($('.nav-container').height() == null){
    //   var pos = $('.aboutushdr-fixed ').height() + 37;
    // }else{
      var pos = $('header').height();
    // }
  
  $('html, body').animate({scrollTop:$(section).offset().top-pos},1000);
}


   $(window).scroll(function (event)
   {

      var home = $('#home').height()-$('header').height();
      var howitworks = $('#how-it-works').offset().top-$('header').height()-5;
      var getstarted =  $('#get-started').offset().top-$('header').height()-5;
      var becomerider = $('#become-rider').offset().top-$('header').height()-5;
      var contactus = $('#contact-us').offset().top-$('header').height()-5;
      // var offsetOurteam =   $('.ourteam').height()  + $('.ourteam').offset().top  - $('.aboutushdr-fixed').height() - $('.heightfixed-block').height();//-$('.mob-navlist').height();
 
      // var offsetCorevalues =   $('.corevalues').height()  + $('.corevalues').offset().top  - $('.aboutushdr-fixed').height() - $('.heightfixed-block').height();//-$('.mob-navlist').height();
      // var offsetContactus = $('.contactus-block').height()  + $('.contactus-block').offset().top  - $('.aboutushdr-fixed').height() - $('.heightfixed-block').height();//-$('.mob-navlist').height();   

      if ($(window).scrollTop() <= howitworks){
        $('.nav-item').removeClass('active-tab');
        $('#nav-home').addClass('active-tab');
      }
      else if ($(window).scrollTop() <= getstarted && ($(window).scrollTop() >= home)){
        $('.nav-item').removeClass('active-tab');
        $('#nav-how-it-works').addClass('active-tab');
      }
      else if ($(window).scrollTop() <= becomerider && ($(window).scrollTop() >= getstarted)){
        $('.nav-item').removeClass('active-tab');
        $('#nav-start-shipping').addClass('active-tab');
      }
      else if ($(window).scrollTop() <= contactus && ($(window).scrollTop() >= becomerider)){
        $('.nav-item').removeClass('active-tab');
        $('#nav-become-rider').addClass('active-tab');
      }
      else if ($(window).scrollTop() >= becomerider){
        $('.nav-item').removeClass('active-tab');
        $('#nav-contact-us').addClass('active-tab');
      }
      // else if ($(window).scrollTop() <= getstarted && ($(window).scrollTop() >= howitworks)){
      //   $('.nav-item').removeClass('active-tab');
      //   $('#nav-start-shipping').addClass('active-tab');
      // }
      // else{
      //     $('#about-us').removeClass('tabhighlight');
      // }

      // if ( ($(window).scrollTop() <= offsetBusinessservices) && ($(window).scrollTop() >= offsetAboutus) ){
      //     $('#business-services').addClass('tabhighlight');
      // }
      // else{
      //     $('#business-services').removeClass('tabhighlight');
      // }

      //  if ( ($(window).scrollTop() <= offsetOurteam) && ($(window).scrollTop() >= offsetBusinessservices) ){
      //     $('#our-team').addClass('tabhighlight');
      // }
      // else{
      //     $('#our-team').removeClass('tabhighlight');
      // }

      //  if ( ($(window).scrollTop() <= offsetCorevalues) && ($(window).scrollTop() >= offsetOurteam ) ){
      //     $('#corevalues').addClass('tabhighlight');
      // }
      // else{
      //     $('#corevalues').removeClass('tabhighlight');
      // }

      //  if ( ($(window).scrollTop() <= offsetContactus) && ($(window).scrollTop() >= offsetCorevalues ) ){
      //     $('#contact-us').addClass('tabhighlight');
      // }
      // else{
      //     $('#contact-us').removeClass('tabhighlight');
      // }    
  });



$(".screenshot").hover(function () {
  console.log();
  $(this).children('.screenshot-cover').slideToggle();
});
