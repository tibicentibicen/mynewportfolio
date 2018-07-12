// Returns true if the specified element has been scrolled into the viewport.
function isElementInViewport(elem) {
    var $elem = $(elem);
    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    // Get the position of the element on the page.
    var elemTop = Math.round($elem.offset().top);
    var elemBottom = elemTop + $elem.height();
    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

function isElementInViewpor2 (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}

//function for top stickyy nav
function stickyNav() {

    var el = $('header');
    var pos = el.position();
    var windowpos = $(window).scrollTop();

    if (windowpos > pos.top) {

        el.addClass('sticky');
    } else {
        el.removeClass('sticky');
    }
}

$(document).ready(function() {

    stickyNav();
    // and run it again every time you scroll
    $(window).on('scroll', function() {
        stickyNav();
    });

    //mobile and desktop navigation interactions
    $('#topnav li').on('click', function() {

        var theid = $(this).attr('id');
        var thetarget = $('section#my_' + theid).offset().top - 103;


        if ($('#hamburger').is(':visible')) {

            $('.line-1, .line-2, .line-3').removeClass('is-clicked');
            $('#topnav').removeClass('ulanimated');
            $('header').removeClass('responsive_sticky');
        }

        $('html, body').animate({
            scrollTop: thetarget
        }, 2000);
    });

    //our function to filter the different portfolio categories
    var $filters = $('#filter_list [data-filter]');
    $pages = $('.row [data-category]');

    $filters.on('click', function() {
        var $this = $(this);

        $filters.removeClass('active');
        $this.addClass('active');

        $filterCategory = $this.attr('data-filter');
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

    $("input:text, textarea").each(function() {

        $(this).focus(function() {
            if ($('.my_error:visible')) {
                $(this).removeClass('box-error');
                $(this).next('span').removeClass('active');
                errors = false;
            }
        });
    });

    function validateemail(inputvalue) {

        var email = inputvalue.val();
        var filter = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])$/;

        if (filter.test(email)) {
            return true;
        } else {
            return false;
        }
    }


    function handleErrors() {

        if (errors == true) {
            return false;
        }
    }


    $("form").submit(function(e) {

        e.preventDefault();

        var clikedForm = $(this); // Select Form
        var name = clikedForm.find('#name');
        var email = clikedForm.find('#email');
        var message = clikedForm.find('#message');
        var NoErrors = clikedForm.next('div');

        if (name.length > 0) {
            if (name.val() == '') {
                name.addClass('box-error');
                name.next('span').addClass('active');
                errors = true
            }
        }

        if (email.length > 0) {
            if (!validateemail(email)) {
                email.addClass('box-error');
                email.next('span').addClass('active');
                errors = true
            }
        }

        if (message.length > 0) {
            if (message.val() == '') {
                message.addClass('box-error');
                message.next('span').addClass('active');
                errors = true
            }
        }
        handleErrors();

        if (errors == false) {
            //getvalues();
            var data = clikedForm.serialize();
            var url = clikedForm.attr('action');

            $.ajax({

                type:'post',
                url: url,
                data: data,

                success: function(response){
                    //alert(data);
                    NoErrors.addClass('active');


                }   
            })
        }
    });
    //end form validation

    //launch  overlays

    var $el = $('a[data-toggle]');


    $el.on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var theTarget = $this.attr('data-target');
        var theTargetName = $this.attr('data-name');
        var targetModal = $(theTarget);
        var thePortfolio = $('.modal_body[data-name="' + theTargetName + '"]');

        $('.modal_body').removeClass('selected');
        $('body').addClass('modal_open').css('padding-right', '16px');

        //console.log(thePortfolio);
        targetModal.addClass('in')
        thePortfolio.addClass('selected');
    });


    function closeModal() {

        if ($('.my_error:visible')) {
            $('.my_error').removeClass('active');
            $('.box-error').removeClass();
        }

        if ($('.no_error:visible')) {
            $('.no_error').removeClass('active');
            $('#name, #email, #message').val('');
        }

        $('.modal.fade').removeClass('in');
        $('body').removeClass('modal_open').removeAttr('style');
    }

    $('#contact_modal, #portfolio_modal, .close_me').on('click', function() {
        closeModal();
    });

    $('.modal_dialog, .modal_center').on('click', function(e) {
        e.stopPropagation();
    })

    $('.close_me').on('click', function(e) {
        e.preventDefault();
    });

    //Mobile menu

    var hamburger = $('#hamburger');

    hamburger.on('click', function() {
        var mainUL = $(this).next('ul');
        var parent = $(this).closest('header');
        $('.line-1, .line-2, .line-3').toggleClass('is-clicked');
        mainUL.toggleClass('ulanimated');
        parent.toggleClass('responsive_sticky');
    });


    //Show/hide expandable containers

    var showButton = $("#cwwbos_show_more_btn");

    showButton.on('click', function() {
        $('.cwwbos_expandable_container').slideToggle("slow", function() {

            showButton.text(showButton.text() === 'COLLAPSE ALL' ? 'EXPAND ALL' : 'COLLAPSE ALL');

            $('html, body').animate({
                scrollTop: $(".cwwbos_faq_container").offset().top
            });

        });
        $('.cwwbos_toggle_arrow').toggleClass("cwwbos_selected");
       
    });

    var showMore = $('.show_more');

    showMore.on('click', function() {

        var $this = $(this);
        var theTargetDiv = $this.siblings('div');
        var theTargetImg = $this.siblings('img');

        theTargetDiv.slideToggle('slow', function() {

            $this.text($this.text() === 'Show Less' ? 'Show More' : 'Show Less');

            $('html, body').animate({
                scrollTop: theTargetDiv.offset().top - 90
            });

        });

        theTargetImg.toggleClass('selected');
    });

    // Check if it's time to start the animation.
    var $elem = $('#cwwbos_graph');

    function checkAnimation() {
        // If the animation has already been started

        if ($elem.hasClass('start')) return;

        if (isElementInViewpor2($elem)) {
            
            // Start the animation
            $elem.addClass('start');
            startAnimation();
        }
    }

    function startAnimation() {
        $('.count').each(function() {
            $(this).empty();
            var $this = $(this),
                countTo = $this.attr('data-count');
            $({
                countNum: $this.text()
            }).animate({
                countNum: countTo
            }, {
                duration: 3000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum) + '%');
                },
                complete: function() {
                    $this.text(this.countNum + '%');
                }
            });
        });
        $('.skillbar').each(function() {
            $(this).find('.skillbar-bar').animate({
                width: $(this).attr('data-percent')
            }, 3000);
        });
    }

    // Capture scroll events
    $(window).scroll(function() {
        checkAnimation();
    });

    checkAnimation();
    

});