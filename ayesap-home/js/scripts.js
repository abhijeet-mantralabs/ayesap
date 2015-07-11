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
  });

$(".screenshot").hover(function () {
  console.log();
  $(this).children('.screenshot-cover').slideToggle();
});

var formData = {
    name:$('#name').val(),
    mobile: $('#phone-number').val(),
    city:$('#city').val(),
    comment:$('#comment').val()
}