// if($(window).innerHeight()>768){
    // $('.slider-content').height($(window).innerHeight()-$('header').height());
    // // console.log();
    // $(window).resize(function(event) {
    //     $('.slider-content').height($(window).innerHeight()-$('header').height());
    // });
// }
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
$('.menu-icon').click(function(e) {
    e.stopPropagation();
    if($(this).hasClass('open')){
        $(this).removeClass('open');
        $('.nav-bar-mob').slideToggle();
    } else {
       $(this).addClass('open'); 
       $('.nav-bar-mob').slideToggle();
    }
      
});
$('html').click(function() {
//Hide the menus if visible
    if($('.menu-icon').hasClass('open')){
        $('.menu-icon').removeClass('open');
        $('.nav-bar-mob').slideToggle();
    }
});

$(window).scroll(function (event){
    var home = $('#home').height()-$('.nav-container').height();
    var howitworks = $('#how-it-works').offset().top-$('.nav-container').height()-5;
    var getstarted =  $('#get-started').offset().top-$('.nav-container').height()-5;
    var becomerider = $('#become-rider').offset().top-$('.nav-container').height()-5;
    var contactus = $('#contact-us').offset().top-$('.nav-container').height()-5; 

    if($(window).scrollTop() + $(window).height() == $(document).height()) {
        $('.nav-item').removeClass('active-tab');
        $('#nav-contact-us').addClass('active-tab');
        $('.nav-item-mob').removeClass('active-tab-mob');
        $('#nav-contact-us-mob').addClass('active-tab-mob');
    }
    else if ($(window).scrollTop() <= howitworks){
        $('.nav-item').removeClass('active-tab');
        $('#nav-home').addClass('active-tab');
        $('.nav-item-mob').removeClass('active-tab-mob');
        $('#nav-home-mob').addClass('active-tab-mob');
    }
    else if ($(window).scrollTop() <= getstarted && ($(window).scrollTop() >= home)){
        $('.nav-item').removeClass('active-tab');
        $('#nav-how-it-works').addClass('active-tab');
        $('.nav-item-mob').removeClass('active-tab-mob');
        $('#nav-how-it-works-mob').addClass('active-tab-mob');
    }
    else if ($(window).scrollTop() <= becomerider && ($(window).scrollTop() >= getstarted)){
        $('.nav-item').removeClass('active-tab');
        $('#nav-start-shipping').addClass('active-tab');
        $('.nav-item-mob').removeClass('active-tab-mob');
        $('#nav-start-shipping-mob').addClass('active-tab-mob');
    }
    else if ($(window).scrollTop() <= contactus && ($(window).scrollTop() >= becomerider)){
        $('.nav-item').removeClass('active-tab');
        $('#nav-become-rider').addClass('active-tab');
        $('.nav-item-mob').removeClass('active-tab-mob');
        $('#nav-become-rider-mob').addClass('active-tab-mob');
    }
    else if ($(window).scrollTop() >= becomerider){
        $('.nav-item').removeClass('active-tab');
        $('#nav-contact-us').addClass('active-tab');
        $('.nav-item-mob').removeClass('active-tab-mob');
        $('#nav-contact-us-mob').addClass('active-tab-mob');
    }

});

$(".screenshot").hover(function () {
    $(this).children('.screenshot-cover').slideToggle();
});

// Attach a submit handler to the form for retailer
$( "#retailer-form" ).submit(function( event ) {
    $("#result-retailer").empty();
    // Stop form from submitting normally
    event.preventDefault();
    // Get some values from elements on the page:
    //    var $form = $( this ),
    //        term = $form.find( "input[name='s']" ).val(),
    //        url = $form.attr( "action" );

    var formData = {
        "name":$('#name').val(),
        "mobile": $('#phone-number').val(),
        "city":$('#city').val(),
        "comments":$('#comment').val()
    }
//    console.log(formData);
    // Send the data using post
    //var base_url = "http://ayesap.zolome.com/api/";
    //var base_url = "http://localhost:1337/";
    var base_url = "http://www.ayesap.com/api/";
    var posting = $.post( base_url+'retailer/requestForRegister', formData)

    posting.done(function( data ) {
//        console.log(data)
        $('#name').val('');
        $('#phone-number').val('');
        $('#city').val('');
        $('#comment').val('');
// Put the results in a div
       $("#result-retailer").text(data.message);
        $("#result-retailer").show();
        setTimeout('$("#result-retailer").hide()',1500);
    });

});
// Attach a submit handler to the form for retailer
$( "#rider-form" ).submit(function( event ) {
    $( "#result-rider" ).empty();
    // Stop form from submitting normally
    event.preventDefault();
    // Get some values from elements on the page:
    //    var $form = $( this ),
    //        term = $form.find( "input[name='s']" ).val(),
    //        url = $form.attr( "action" );

    var formData = {
        "name":$('#rider-name').val(),
        "mobile": $('#rider-phone').val(),
        "city":$('#rider-city').val()
    }
//    console.log(formData);
    // Send the data using post
    //var base_url = "http://ayesap.zolome.com/api/";
    //var base_url = "http://localhost:1337/";
    var base_url = "http://www.ayesap.com/api/";
    var posting = $.post( base_url+'resources/reqForResRegister', formData)

    posting.done(function( data ) {
        $('#rider-name').val('');
        $('#rider-phone').val('');
        $('#rider-city').val('');
// Put the results in a div
        $("#result-rider").text(data.message);
        $("#result-rider").show();
        setTimeout('$("#result-rider").empty()',1500);
    });

});

//window.contactRetailer = function(){
//    //var base_url = "http://ayesap.zolome.com/api/";
//    //var base_url = "http://localhost:1337/";
//    var base_url = "http://www.ayesap.com/api/";
//    console.log('in');
//    var formData = {
//        "name":$('#name').val(),
//        "mobile": $('#phone-number').val(),
//        "city":$('#city').val(),
//        "comment":$('#comment').val()
//    }
//    $.ajax({
//        url: base_url+'retailer/requestForRegister',
//        type: 'post',
//        dataType: 'json',
//        data:formData,
//        success: function(data) {
//            // alert('success');
//            console.log(data);
//        }
//    });
//}
//
//
//window.becomeRider = function(){
//    //var base_url = "http://ayesap.zolome.com/api/";
//    //var base_url = "http://localhost:1337/";
//    var base_url = "http://www.ayesap.com/api/";
//    console.log('in');
//    var formData = {
//        "name":$('#rider-name').val(),
//        "mobile": $('#rider-phone').val(),
//        "city":$('#rider-city').val()
//    }
//    $.ajax({
//        url: base_url+'resources/reqForResRegister',
//        type: 'post',
//        dataType: 'json',
//        data:formData,
//        success: function(data) {
//            // alert(data.message);
//            console.log(data);
//        }
//    });
//}
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


