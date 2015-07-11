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
    var pos = $('header').height();
  
    $('html, body').animate({scrollTop:$(section).offset().top-pos},1000);
}


$(window).scroll(function (event){
   
    var home = $('#home').height()-$('header').height();
    var howitworks = $('#how-it-works').offset().top-$('header').height()-5;
    var getstarted =  $('#get-started').offset().top-$('header').height()-5;
    var becomerider = $('#become-rider').offset().top-$('header').height()-5;
    var contactus = $('#contact-us').offset().top-$('header').height()-5; 

    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        $('.nav-item').removeClass('active-tab');
        $('#nav-contact-us').addClass('active-tab');
    }
    else if ($(window).scrollTop() <= howitworks){
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
    $(this).children('.screenshot-cover').slideToggle();
});

window.contactRetailer = function(){
    var base_url = "http://www.ayesap.com/api/";
    console.log('in');
    var formData = {
        name:$('#name').val(),
        mobile: $('#phone-number').val(),
        city:$('#city').val(),
        comment:$('#comment').val()
    }
    $.ajax({
        url: base_url+'retailer/requestForRegister', formData,
        type: 'post',
        dataType: 'json',
        data:formData,
        success: function(data) {
            // alert('success');
            console.log(data);
        }
    });
}
window.becomeRider = function(){
    var base_url = "http://www.ayesap.com/api/";
    console.log('in');
    var formData = {
        name:$('#rider-name').val(),
        mobile: $('#rider-phone').val(),
        city:$('#rider-city').val(),
    }
    $.ajax({
        url: base_url+'resources/reqForResRegister', formData,
        type: 'post',
        dataType: 'json',
        data:formData,
        success: function(data) {
            // alert(data.message);
            console.log(data);
        }
    });
}
function initialize() {
    var myLatLng = new google.maps.LatLng(12.916600, 77.647165);
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
      center: myLatLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var marker = new google.maps.Marker({
    position: myLatLng,
    title:"Ayesap",
    });
    var map = new google.maps.Map(mapCanvas, mapOptions);
    marker.setMap(map);
}
initialize();


