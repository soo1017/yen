$(document).ready(function() {
    $('.js--team').waypoint(function(direction) {
        if (direction == "down") {
            $('nav').addClass('sticky');
        } else {
            $('nav').removeClass('sticky');
        }
    }, {
        offset: '60px;'
    });

    // Select all links with hashes
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
            if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
                }, 1000, function() {
              // Callback after animation
              // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });

    $('.js--mobile-btn').click(function() {
        var nav = $('.js--main-div');
        var icon = $('.js--mobile-btn i');

        // nav.slideToggle(200);
        if (nav.css('display') == 'none') {
            nav.css('display', 'block');
            $('.main-nav11').css('display', 'block');
        } else {
            nav.css('display', 'none');
            $('.main-nav11').css('display', 'none');
        }
        $('.cls-more').css('display', 'none');
        
        if (icon.hasClass('ion-navicon-round')) {
            icon.addClass('ion-close-round');
            icon.removeClass('ion-navicon-round');
        } else {
            icon.addClass('ion-navicon-round');
            icon.removeClass('ion-close-round');
        }
    });

    $( ".cls-heart-div1" ).hover(function() {
        $(".cls-heart1").css('display', 'block' );
        $(".cls-heart1").css('opacity', '0.2' );
        $(".cls-heart1").css('transition', 'display 0.3s' );
        $(".cls-heart1").fadeOut( 1500 );
    });
    
    $( ".cls-heart-div2" ).hover(function() {
        $(".cls-heart2").css('display', 'block' );
        $(".cls-heart2").css('opacity', '0.2' );
        $(".cls-heart2").css('transition', 'display 0.3s' );
        $(".cls-heart2").fadeOut( 1500 );
    });
    
    $( ".cls-heart-div3" ).hover(function() {
        $(".cls-heart3").css('display', 'block' );
        $(".cls-heart3").css('opacity', '0.2' );
        $(".cls-heart3").css('transition', 'display 0.3s' );
        $(".cls-heart3").fadeOut( 1500 );
    });
    $( ".cls-heart-div4" ).hover(function() {
        $(".cls-heart4").css('display', 'block' );
        $(".cls-heart4").css('opacity', '0.2' );
        $(".cls-heart4").css('transition', 'display 0.3s' );
        $(".cls-heart4").fadeOut( 1500 );
    });

    var $window = $(window);
    function checkWidth() {
        var windowsize = $window.width();
        if (windowsize > 767) {
            $('.js--main-div').css('display', 'block' );
            $('.cls-more').css('display', 'inline-block');
            $('.main-nav11').css('display', 'none');
        }
    }
    
    function checkWidth1() {
        var windowsize = $window.width();
        if (windowsize <= 767) {
            $('.js--main-div1').css('display', 'none' );
            $('.cls-more').css('display', 'none');
//            $('.main-nav11').css('display', 'block');
        }
    }

    checkWidth();
    $(window).resize(checkWidth);
    checkWidth1();
    $(window).resize(checkWidth1);
    
    $('.cls-more').click(function() {
        var icon = $('.cls-more i');
        var nav = $('.js--main-div1');

        nav.slideToggle(200);
        if (icon.hasClass('ion-android-more-horizontal')) {
            icon.addClass('ion-android-more-vertical');
            icon.removeClass('ion-android-more-horizontal');
        } else {
            icon.addClass('ion-android-more-horizontal');
            icon.removeClass('ion-android-more-vertical');
        }
    });
});




// var waypoints = $('#handler-first').waypoint(function(direction) {
//   notify(this.element.id + ' hit 25% from top of window')
// }, {
//   offset: '25%'
// })
