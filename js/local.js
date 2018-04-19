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

	//our function to filter the different portfolio categories
	var $filters = $('#filter_list [data-filter]');
		$pages = $('.row [data-category]');

	$filters.on('click', function() {
		var $this = $(this);
		
		$filters.removeClass('active');
		$this.addClass('active');

		$filterCategory =  $this.attr('data-filter');
		if ($filterCategory == 'all') {
	    $pages.removeClass('is-animated')
	      .fadeOut().promise().done(function() {
	         $pages.each(function(i) {
          $(this).addClass('is-animated').delay((i++) * 200).fadeIn();
        });
	      });
	    
	    } else {
	    $pages.removeClass('is-animated')
	      .fadeOut().promise().done(function() {
	        $pages.filter('[data-category = "' + $filterCategory + '"]').each(function(i) {
          $(this).addClass('is-animated').delay((i++) * 200).fadeIn();
        });
	      });
	  }
	});

	//contact form validation

	var errors = false;

	$("input:text, textarea").each(function () {

		$(this).focus(function (){
			if ($('.my_error:visible')){
				$(this).removeClass('box-error');
				$(this).next('span').removeClass('active');
				errors = false;
			}						    
		}); 
	});

	function validateemail(inputvalue)  {  

		var email = inputvalue.val();
		var filter=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])$/;

		if(filter.test(email)) { 
			return true;        
		}

		else{   
			return false;
		}  
	}


	function handleErrors() {

		if (errors == true) {
			return false;
		}
	}


$("form").submit(function (e) {
	  
	e.preventDefault();
	  
	var clikedForm = $(this); // Select Form
	var name = clikedForm.find('#name');
	var email = clikedForm.find('#email');
	var message = clikedForm.find('#message');
	var NoErrors = clikedForm.find('.no_error');

	if(name.length>0){
		if (name.val() == '') {
			name.addClass('box-error');
			name.next('span').addClass('active');
			errors = true
		}
	}

	if(email.length>0){            
		if (!validateemail(email)) {
			email.addClass('box-error');
			email.next('span').addClass('active');
			errors = true
		}
	}
	if(message.length>0){
		if (message.val() == '') {
			message.addClass('box-error');
			message.next('span').addClass('active');
			errors = true
		}
	}
	handleErrors();

	if (errors == false) {
		//getvalues();
		//alert('no errors');
		NoErrors.addClass('active');
		}
	});
	//end form validation

	//launch  overlays

	var $el = $('a[data-toggle]');

	$el.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		var theTarget = $this.attr('data-target');
		var theTargetName = $this.attr('data-name');
		var targetModal = $(theTarget);
		
		//console.log(targetModal);
		targetModal.addClass('in')
	});

});