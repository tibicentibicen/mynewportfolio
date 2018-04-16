$(document).ready(function() {

	var makeshadow = $('header').offset().top;

	// our function that decides weather the navigation bar should have "fixed" css position or not.
   	var stickyNav = function(){
	    var scrollTop = $(window).scrollTop(); // our current vertical position from the top
	         
	    // if we've scrolled more than the navigation, change its position to fixed to stick to top,
	    // otherwise change it back to relative
	    if (scrollTop > makeshadow) { 
	        $('header').addClass('sticky');
	    } else {
	        $('header').removeClass('sticky'); 
	    }
	};

	stickyNav();
	// and run it again every time you scroll
	$(window).on('scroll', function() {
		stickyNav();
	})

	$('#topnav li').on('click', function(){

		var theid = $(this).attr('id');
		var thetarget = $('section#my_' + theid).offset().top - 103;
		//alert(thetarget);

		$('html, body').animate({scrollTop: thetarget}, 2000);
	});

});