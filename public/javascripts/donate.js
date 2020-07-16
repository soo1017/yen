//var payform = require('payform');
var yen = {};
var testdollar = /^(([1-9]\d{0,2}(,\d{3})*)|(([1-9]\d*)?\d))(\.\d\d)?$/i;
var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
var testCVV = /^[0-9]{3,4}$/;
var count_click1 = 0;

$(document).ready(function() {
    $('.js--donate').waypoint(function(direction) {
        if (direction == "down") {
            $('nav').addClass('sticky');
        } else {
            $('nav').removeClass('sticky');
        }
    }, {
        offset: '60px;'
    });

    //
    $('html,body').animate({scrollTop:0},0);

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

    $('.js--mobile-btn').click(function(e) {
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

    function howmanyrecipient(recip_boolean, onetime_boolean, donation_amount) {
        var num_recipient = 0;
        var y = parseInt(donation_amount);
        if (recip_boolean == true) {
            if (onetime_boolean == true) {          // one time
                num_recipient = Math.floor(y/360);
            } else {                                // monthly
                num_recipient = Math.floor(y/30);
            }
        } else {
            num_recipient = 0
        }
        return num_recipient;
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

    $('.cls-donate-btn').click(function(e) {
        e.preventDefault();
        $('.cls-head-donate').attr('style', 'display:none;');
        $('.cls-sec-donate').attr('style', 'display:none;');
        $('.cls-foot-donate').attr('style', 'display:none;');
        $('.cls-sec2-donate1').attr('style', 'display:block;').scrollTop();
    });

    //// Donation Part -Navigation
    var color_select = "rgb(255, 255, 0)"; // yellow
//    var testdollar = /^\$?[0-9]+(\.[0-9][0-9])?$/;


    /***********************************************/
    /***********************************************/
    $('.ion-close-round').click(function() {
        $('.cls-head-donate').attr('style', 'display:block;');
        $('.cls-sec-donate').attr('style', 'display:block;');
        $('.cls-foot-donate').attr('style', 'display:block;');
        $('.cls-sec2-donate1').attr('style', 'display:none;');
        $('.cls-sec2-credit1').attr('style', 'display:none;');
        $('.cls-sec2-credit2').attr('style', 'display:none;');
        $('.cls-sec2-bank1').attr('style', 'display:none;');
        $('.cls-sec2-bank2').attr('style', 'display:none;');
        $('.cls-sec2-thank').attr('style', 'display:none;');
        $('.cls-donate-done-btn-div0').attr('style', 'display:none;');
        $('body').css("height", '');
    });

    /***************** Donate Page *****************/
    /***************** *********** *****************/
    $('.cls-one').click(function(e) {
        e.preventDefault();
        // console.log("this", $(this).css('color'));
        if($(this).css('color') == 'rgb(255, 255, 255)') {
            // console.log("in");
            $(this).css('color', 'yellow');
            $('.cls-mon').css('color', 'rgb(255, 255, 255)');
        } else {
            $(this).css('color', 'rgb(255, 255, 255)');
        }
    });
    $('.cls-mon').click(function(e) {
        e.preventDefault();
        // console.log("this", $(this).css('color'));
        if($(this).css('color') == 'rgb(255, 255, 255)') {
            // console.log("in");
            $(this).css('color', 'yellow');
            $('.cls-one').css('color', 'rgb(255, 255, 255)');
        } else {
            $(this).css('color', 'rgb(255, 255, 255)');
        }
    });
    $('#id-creditcard').click(function(e) {
        e.preventDefault();
        // console.log("this", $(this).css('background-color'));
        if($(this).css('background-color') == 'rgb(127, 255, 212)') {
            // console.log("in");
            $(this).css('background-color', 'yellow');
            $('#id-bankaccount').css('background-color', 'rgb(127, 255, 212)');
        } else {
            $(this).css('background-color', 'rgb(127, 255, 212)');
        }
    });
    $('#id-bankaccount').click(function(e) {
        e.preventDefault();
        // console.log("this", $(this).css('background-color'));
        if($(this).css('background-color') == 'rgb(127, 255, 212)') {
            // console.log("in");
            $(this).css('background-color', 'yellow');
            $('#id-creditcard').css('background-color', 'rgb(127, 255, 212)');
        } else {
            $(this).css('background-color', 'rgb(127, 255, 212)');
        }
    });
    /////////////////
    // $('.cls-recipient').click(function(e) {
    //     e.preventDefault();
    //     // console.log("this", $(this).css('color'));
    //     if($(this).css('color') == 'rgb(255, 255, 255)') {
    //         $(this).css('color', 'yellow');
    //     } else {
    //         $(this).css('color', 'rgb(255, 255, 255)');
    //     }
    // });
    //////////////////
    $('.cls-other').click(function(e) {
        e.preventDefault();
        // console.log("this", $(this).css('color'));
        if($(this).css('color') == 'rgb(255, 255, 255)') {
            $(this).css('color', 'yellow');
        } else {
            $(this).css('color', 'rgb(255, 255, 255)');
        }
    });

    /***************** Right Arrow *****************/
    $('.cls-sec2-donate10 .ion-arrow-right-c').click(function(e) {
        e.preventDefault();
        if ($('#id-creditcard').css("background-color") == color_select) {
            if ($('.cls-one').css("color") == color_select) {
                if (testdollar.test($('#donation-amount').val())) {
                    if ( $('.cls-recipient').css("color") == color_select ) {
                        if ( $('#donation-amount').val().replace(/[,]/g, '') >= 360 ) {
                            yen.donationamount = $('#donation-amount').val().replace(/[,]/g, '');
                            yen.onetime = true;
                            yen.donationtype = 'credit';

                            yen.recipient = true;
                            $('.cls-sec2-donate1').attr('style', 'display:none;');
                            $('.cls-sec2-credit1').attr('style', 'display:block;');

                            if ( $('.cls-sec2-donate132 p').text() == "All fields be filled and selected correctly" || $('.cls-sec2-donate132 p').text() == "Minimumly required commitment not met" ) {
                                $('.cls-sec2-donate132 p').text("");
                            }
                        } else {
                            $('.cls-sec2-donate132 p').text("Minimumly required commitment not met");
                        }
                    } else {
                        if ($('#donation-amount').val().replace(/[,]/g, '') >= 10) {
                            yen.donationamount = $('#donation-amount').val().replace(/[,]/g, '');
                            yen.onetime = true;
                            yen.donationtype = 'credit';

                            yen.recipient = false;
                            $('.cls-sec2-donate1').attr('style', 'display:none;');
                            $('.cls-sec2-credit1').attr('style', 'display:block;');

                            if ($('.cls-sec2-donate132 p').text() == "All fields be filled and selected correctly" || $('.cls-sec2-donate132 p').text() == "Minimumly required commitment not met") {
                                $('.cls-sec2-donate132 p').text("");
                            }
                        } else {
                            $('.cls-sec2-donate132 p').text("All fields be filled and selected correctly");
                        }
                    }
                } else {
                    $('.cls-sec2-donate132 p').text("All fields be filled and selected correctly");
                }
            } else if ($('.cls-mon').css("color") == color_select) {
                if (testdollar.test($('#donation-amount').val())) {
                    if ( $('.cls-recipient').css("color") == color_select ) {
                        if ( $('#donation-amount').val().replace(/[,]/g, '') >= 30 ) {
                            yen.donationamount = $('#donation-amount').val().replace(/[,]/g, '');
                            yen.onetime = false;
                            yen.donationtype = 'credit';

                            yen.recipient = true;
                            $('.cls-sec2-donate1').attr('style', 'display:none;');
                            $('.cls-sec2-credit1').attr('style', 'display:block;');

                            if ($('.cls-sec2-donate132 p').text() == "All fields be filled and selected correctly" || $('.cls-sec2-donate132 p').text() == "Minimumly required commitment not met") {
                                $('.cls-sec2-donate132 p').text("");
                            }
                        } else {
                            $('.cls-sec2-donate132 p').text("Minimumly required commitment not met");
                        }
                    } else {
                        if ($('#donation-amount').val().replace(/[,]/g, '') >= 10) {
                            yen.donationamount = $('#donation-amount').val().replace(/[,]/g, '');
                            yen.onetime = false;
                            yen.donationtype = 'credit';

                            yen.recipient = false;
                            $('.cls-sec2-donate1').attr('style', 'display:none;');
                            $('.cls-sec2-credit1').attr('style', 'display:block;');

                            if ($('.cls-sec2-donate132 p').text() == "All fields be filled and selected correctly" || $('.cls-sec2-donate132 p').text() == "Minimumly required commitment not met") {
                                $('.cls-sec2-donate132 p').text("");
                            }
                        } else {
                            $('.cls-sec2-donate132 p').text("All fields be filled and selected correctly");
                        }
                    }
                } else {
                    $('.cls-sec2-donate132 p').text("All fields be filled and selected correctly");
                }
            } else {
                $('.cls-sec2-donate132 p').text("All fields be filled and selected correctly");
            }

        } else if ($('#id-bankaccount').css("background-color") == color_select) {
            if ($('.cls-one').css("color") == color_select) {
                if (testdollar.test($('#donation-amount').val())) {

                    if ( $('.cls-recipient').css("color") == color_select ) {
                        if ( $('#donation-amount').val().replace(/[,]/g, '') >= 360 ) {
                            yen.donationamount = $('#donation-amount').val().replace(/[,]/g, '');
                            yen.onetime = true;
                            yen.donationtype = 'bank';

                            yen.recipient = true;
                            $('.cls-sec2-donate1').attr('style', 'display:none;');
                            $('.cls-sec2-bank1').attr('style', 'display:block;');

                            if ($('.cls-sec2-donate132 p').text() == "All fields be filled and selected correctly" || $('.cls-sec2-donate132 p').text() == "Minimumly required commitment not met") {
                                $('.cls-sec2-donate132 p').text("");
                            }
                        } else {
                            $('.cls-sec2-donate132 p').text("Minimumly required commitment not met");
                        }
                    } else {
                        if ($('#donation-amount').val().replace(/[,]/g, '') >= 10) {
                            yen.donationamount = $('#donation-amount').val().replace(/[,]/g, '');
                            yen.onetime = true;
                            yen.donationtype = 'bank';

                            yen.recipient = false;
                            $('.cls-sec2-donate1').attr('style', 'display:none;');
                            $('.cls-sec2-bank1').attr('style', 'display:block;');

                            if ($('.cls-sec2-donate132 p').text() == "All fields be filled and selected correctly" || $('.cls-sec2-donate132 p').text() == "Minimumly required commitment not met") {
                                $('.cls-sec2-donate132 p').text("");
                            }
                        } else {
                            $('.cls-sec2-donate132 p').text("All fields be filled and selected correctly");
                        }
                    }

                } else {
                    $('.cls-sec2-donate132 p').text("All fields be filled and selected correctly");
                }
            } else if ($('.cls-mon').css("color") == color_select) {
                if (testdollar.test($('#donation-amount').val())) {

                    if ( $('.cls-recipient').css("color") == color_select ) {
                        if ( $('#donation-amount').val().replace(/[,]/g, '') >= 30 ) {
                            yen.donationamount = $('#donation-amount').val().replace(/[,]/g, '');
                            yen.onetime = false;
                            yen.donationtype = 'bank';

                            yen.recipient = true;
                            $('.cls-sec2-donate1').attr('style', 'display:none;');
                            $('.cls-sec2-bank1').attr('style', 'display:block;');

                            if ($('.cls-sec2-donate132 p').text() == "All fields be filled and selected correctly" || $('.cls-sec2-donate132 p').text() == "Minimumly required commitment not met") {
                                $('.cls-sec2-donate132 p').text("");
                            }
                        } else {
                            $('.cls-sec2-donate132 p').text("Minimumly required commitment not met");
                        }
                    } else {
                        if ($('#donation-amount').val().replace(/[,]/g, '') >= 10) {
                            yen.donationamount = $('#donation-amount').val().replace(/[,]/g, '');
                            yen.onetime = false;
                            yen.donationtype = 'bank';

                            yen.recipient = false;
                            $('.cls-sec2-donate1').attr('style', 'display:none;');
                            $('.cls-sec2-bank1').attr('style', 'display:block;');

                            if ($('.cls-sec2-donate132 p').text() == "All fields be filled and selected correctly" || $('.cls-sec2-donate132 p').text() == "Minimumly required commitment not met") {
                                $('.cls-sec2-donate132 p').text("");
                            }
                        } else {
                            $('.cls-sec2-donate132 p').text("All fields be filled and selected correctly");
                        }
                    }

                } else {
                    $('.cls-sec2-donate132 p').text("All fields be filled and selected correctly");
                }
            } else {
                $('.cls-sec2-donate132 p').text("All fields be filled and selected correctly");
            }
        } else {
            $('.cls-sec2-donate132 p').text("All fields be filled and selected correctly");
        }
    });

    /***************** Credit Card Page 1 *****************/
    /***************** ****************** *****************/
    /******************** Right Arrow *********************/
    $('.cls-sec2-credit10 .ion-arrow-right-c').click(function(e) {
        e.preventDefault();
        var cc_num;
        var cc_expire;
        var cc_type;
        $('input#card-number').validateCreditCard(function(result) {
            cc_num = result.valid;
            result.card_type == null ? '-' : result.card_type.name;
            cc_type = result.card_type.name;
        });
//        cc_expire = $('#expire-date').creditExpiryDateValidate();
        $('#expire-date').creditExpiryDateValidate(function(result) {
            return cc_expire = result;
        });

         console.log('cc_expire: ', cc_expire);
//         console.log('cc_type: ', cc_type);
        var credit_email = $('#credit-email').val();
        var credit_cvv = $('#cvv').val();
        $('.cls-credit12-div0 input').css('background-color', 'beige');
        $('.cls-credit12-div1 input').css('background-color', 'beige');
        $('.cls-credit12-div2 input').css('background-color', 'beige');
        $('.cls-credit12-div3 input').css('background-color', 'beige');
        $('.cls-credit12-div4 input').css('background-color', 'beige');

        if ($('#name-on-card').val() && cc_num && cc_expire && testEmail.test(credit_email) && testCVV.test(credit_cvv)) {

            yen.nameoncard = $('#name-on-card').val();
            yen.creditnumber = $('#card-number').val().replace(/[ -]/g, '');
            yen.credittype = cc_type;
            yen.creditexpire = $('#expire-date').val();
            yen.creditcvv = $('#cvv').val();
            yen.donoremail = $('#credit-email').val();
            yen.donorname = $('#credit-donorname').val();
            if (yen.donorname == '') {
                yen.donorname = yen.nameoncard;
            }
            $('.cls-sec2-credit1').attr('style', 'display:none;');
            $('.cls-sec2-credit2').attr('style', 'display:block;');

            $('.cls-credit12-div5 p').text('All fields should be filled up');
            $('.cls-credit12-div5 p').css('color', 'rgb(255, 255, 255)');
        } else if (!$('#name-on-card').val() && cc_num && cc_expire && testEmail.test(credit_email) && testCVV.test(credit_cvv)) {
            $('.cls-credit12-div5 p').text('Name on card is missing');
            $('.cls-credit12-div5 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else if ($('#name-on-card').val() && !cc_num && cc_expire && testEmail.test(credit_email) && testCVV.test(credit_cvv)) {
            $('.cls-credit12-div5 p').text('Credit card number is wrong');
            $('.cls-credit12-div5 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else if ($('#name-on-card').val() && cc_num && !cc_expire && testEmail.test(credit_email) && testCVV.test(credit_cvv)) {
            $('.cls-credit12-div5 p').text('Expiry date is wrong');
            $('.cls-credit12-div5 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else if ($('#name-on-card').val() && cc_num && cc_expire && !testEmail.test(credit_email) && testCVV.test(credit_cvv)) {
            $('.cls-credit12-div5 p').text('Email is wrong');
            $('.cls-credit12-div5 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else if ($('#name-on-card').val() && cc_num && cc_expire && testEmail.test(credit_email) && !testCVV.test(credit_cvv)) {
            $('.cls-credit12-div5 p').text('CVV is wrong');
            $('.cls-credit12-div5 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else {
            $('.cls-credit12-div5 p').text('All fields should be filled up')
            $('.cls-credit12-div5 p').css('color', 'rgba(255, 0, 0, 0.7)');
        }
        /* *************************** */
        if(!$('#name-on-card').val()) {
            $('.cls-credit12-div0 input').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!cc_num) {
            $('.cls-credit12-div1 input').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!cc_expire) {
            $('.cls-credit12-div2 .cls-expire-date').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!testEmail.test(credit_email)) {
            $('.cls-credit12-div4 input').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!testCVV.test(credit_cvv)) {
            $('.cls-credit12-div2 .cls-cvv').css('background-color', 'rgb(255, 255, 0)');
        }
    });

    /******************** Left Arrow *********************/
    $('.cls-sec2-credit10 .ion-arrow-left-c').click(function(e) {
        e.preventDefault();
        $('.cls-sec2-donate1').attr('style', 'display:block;');
        $('.cls-sec2-credit1').attr('style', 'display:none;');
    });

    /***************** Credit Card Page 2 *****************/
    /***************** ****************** *****************/
    /******************** Left Arrow *********************/
    $('.cls-sec2-credit20 .ion-arrow-left-c').click(function(e) {
        e.preventDefault();
        $('.cls-sec2-credit1').attr('style', 'display:block;');
        $('.cls-sec2-credit2').attr('style', 'display:none;');
    });

    $('.cls-donate-credit').click(function(e) {
        e.preventDefault();

        count_click1++;

        $('.cls-credit22-div1 input').css('background-color', 'beige');
        $('.cls-credit22-div2 input').css('background-color', 'beige');
        $('.cls-credit22-div3 input').css('background-color', 'beige');
        $('.cls-credit22-div4 input').css('background-color', 'beige');
        $('.cls-credit22-div5 input').css('background-color', 'beige');
        $('.cls-credit22-div6 input').css('background-color', 'beige');
        $('#id-loader-donatedone').attr('style', 'display:block');

        var country_boolean = true;
        if ($('#id-credit-country').val() == 'Country') {
            country_boolean = false;
        }

        if ( $('#credit-address').val() && $('#credit-city').val() && $('#credit-state').val() && country_boolean && $('#credit-zipcode').val() && $('#credit-phone').val() ) {

            yen.creditaddress = $('#credit-address').val();
            yen.creditcity = $('#credit-city').val();
            yen.creditstate = $('#credit-state').val();
            yen.creditcountry = $('#id-credit-country').val();
            yen.creditzipcode = $('#credit-zipcode').val();
            yen.donorphone = $('#credit-phone').val();

            var yen_url = "https://www.youthempoweringnation.org/donors/donation";

            if(count_click1 == 1) {
                $.ajax({
                        url: yen_url,
                        type: 'post',
                        dataType: 'json',
                        data: yen
                }).then(function(data, textStatus, jqXHR) {
                    if (jqXHR.status == 200) {
                        window.localStorage.setItem("num-recip", howmanyrecipient(yen.recipient, yen.onetime, yen.donationamount));
                        if (howmanyrecipient(yen.recipient, yen.onetime, yen.donationamount) >= 1) {
                            $('#id-loader-donatedone').attr('style', 'display:none;');
                            window.sessionStorage.setItem("match-session", yen.donorname);
                            $('.cls-donate-done-btn-div0').attr('style', 'display:block;');
                        }
                    } else if (jqXHR.status == 405) {

                    } else {

                    }
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 200) {
                        window.localStorage.setItem("num-recip", howmanyrecipient(yen.recipient, yen.onetime, yen.donationamount));
                        if (howmanyrecipient(yen.recipient, yen.onetime, yen.donationamount) >= 1) {
                            $('#id-loader-donatedone').attr('style', 'display:none;');
                            window.sessionStorage.setItem("match-session", yen.donorname);
                            $('.cls-donate-done-btn-div0').attr('style', 'display:block;');
                        }
                    } else if (jqXHR.status == 405) {

                    } else {

                    }
                });
            }
            $('.cls-sec2-credit2').attr('style', 'display:none;');
            $('.cls-sec2-thank').attr('style', 'display:block;');
            $('.cls-foot-donate').attr('style', 'display:block;');

            $('.cls-credit22-div7 p').text('All fields should be filled up');
            $('.cls-credit22-div7 p').css('color', 'rgb(255, 255, 255)');

        } else if ( !$('#credit-address').val() && $('#credit-city').val() && $('#credit-state').val() && country_boolean && $('#credit-zipcode').val() && $('#credit-phone').val() ) {
            $('.cls-credit22-div7 p').text('Address is missing');
            $('.cls-credit22-div7 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else if ( $('#credit-address').val() && !$('#credit-city').val() && $('#credit-state').val() && country_boolean && $('#credit-zipcode').val() && $('#credit-phone').val() ) {
            $('.cls-credit22-div7 p').text('City is missing');
            $('.cls-credit22-div7 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else if ( $('#credit-address').val() && $('#credit-city').val() && !$('#credit-state').val() && country_boolean && $('#credit-zipcode').val() && $('#credit-phone').val() ) {
            $('.cls-credit22-div7 p').text('State is missing');
            $('.cls-credit22-div7 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else if ( $('#credit-address').val() && $('#credit-city').val() && $('#credit-state').val() && !country_boolean && $('#credit-zipcode').val() && $('#credit-phone').val() ) {
            $('.cls-credit22-div7 p').text('Country is missing');
            $('.cls-credit22-div7 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else if ( $('#credit-address').val() && $('#credit-city').val() && $('#credit-state').val() && country_boolean && !$('#credit-zipcode').val() && $('#credit-phone').val() ) {
            $('.cls-credit22-div7 p').text('Zipcode is missing');
            $('.cls-credit22-div7 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else if ( $('#credit-address').val() && $('#credit-city').val() && $('#credit-state').val() && country_boolean && $('#credit-zipcode').val() && !$('#credit-phone').val() ) {
            $('.cls-credit22-div7 p').text('Phone number is missing');
            $('.cls-credit22-div7 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else {
            $('.cls-credit22-div7 p').text('All fields should be filled up')
            $('.cls-credit22-div7 p').css('color', 'rgba(255, 0, 0, 0.7)');
        }
        /* *************************** */
        if(!$('#credit-address').val()) {
            $('.cls-credit22-div1 input').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!$('#credit-city').val()) {
            $('.cls-credit22-div2 input').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!$('#credit-state').val()) {
            $('.cls-credit22-div3 input').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!country_boolean) {
            $('.cls-credit22-div4 input').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!$('#credit-zipcode').val()) {
            $('.cls-credit22-div5 input').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!$('#credit-phone').val()) {
            $('.cls-credit22-div6 input').css('background-color', 'rgb(255, 255, 0)');
        }

    });

    /***************** Bank Account Page 1 ****************/
    /***************** ****************** *****************/
    /******************** Right Arrow *********************/
    $('.cls-sec2-bank10 .ion-arrow-right-c').click(function(e) {
        e.preventDefault();

        $('.cls-bank12-div0 input').css('background-color', 'beige');
        $('.cls-bank12-div1 input').css('background-color', 'beige');
        $('.cls-bank12-div2 input').css('background-color', 'beige');
        $('.cls-bank12-div3 input').css('background-color', 'beige');
        $('.cls-bank12-div4 input').css('background-color', 'beige');

        if ( $('#name-on-bank').val() && $('#bank-name').val() && $('#bank-account').val() && testEmail.test($('#bank-email').val()) ) {

            yen.nameonbank = $('#name-on-bank').val();
            yen.bankname = $('#bank-name').val();
            yen.bankaccount = $('#bank-account').val();
            yen.donoremail = $('#bank-email').val();
            yen.donorname = $('#bank-donorname').val();
            if (yen.donorname == '') {
                yen.donorname = yen.nameonbank;
            }
            $('.cls-sec2-bank1').attr('style', 'display:none;');
            $('.cls-sec2-bank2').attr('style', 'display:block;');

            $('.cls-bank12-div5 p').text('All fields should be filled up')
            $('.cls-bank12-div5 p').css('color', 'rgb(255, 255, 255)');
        } else if (!$('#name-on-bank').val() && $('#bank-name').val() && $('#bank-account').val() && testEmail.test($('#bank-email').val()) ) {
            $('.cls-bank12-div5 p').text('Name on bank is missing');
            $('.cls-bank12-div5 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else if ($('#name-on-bank').val() && !$('#bank-name').val() && $('#bank-account').val() && testEmail.test($('#bank-email').val()) ) {
            $('.cls-bank12-div5 p').text('Bank name is wrong');
            $('.cls-bank12-div5 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else if ($('#name-on-bank').val() && $('#bank-name').val() && !$('#bank-account').val() && testEmail.test($('#bank-email').val()) ) {
            $('.cls-bank12-div5 p').text('Bank account is wrong');
            $('.cls-bank12-div5 p').css('color', 'rgba(255, 0, 0, 0.7)');
//            $('.cls-bank12-div5 p').css('color', 'rgb(255, 0, 0)');
        } else if ($('#name-on-bank').val() && $('#bank-name').val() && $('#bank-account').val() && !testEmail.test($('#bank-email').val()) ) {
            $('.cls-bank12-div5 p').text('Email is wrong');
            $('.cls-bank12-div5 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else {
            $('.cls-bank12-div5 p').text('All fields should be filled up');
            $('.cls-bank12-div5 p').css('color', 'rgba(255, 0, 0, 0.7)');
        }
        /* *************************** */
        if(!$('#name-on-bank').val()) {
            $('.cls-bank12-div0 input').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!$('#bank-name').val()) {
            $('.cls-bank12-div1 input').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!$('#bank-account').val()) {
            $('.cls-bank12-div2 input').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!testEmail.test($('#bank-email').val())) {
            $('.cls-bank12-div4 input').css('background-color', 'rgb(255, 255, 0)');
        }
    });

    /******************** Left Arrow *********************/
    $('.cls-sec2-bank10 .ion-arrow-left-c').click(function(e) {
        e.preventDefault();
        $('.cls-sec2-donate1').attr('style', 'display:block;');
        $('.cls-sec2-bank1').attr('style', 'display:none;');
    });

    /***************** Bank Account Page 2 *****************/
    /***************** ****************** ******************/
    /******************** Left Arrow ***********************/
    $('.cls-sec2-bank20 .ion-arrow-left-c').click(function(e) {
        e.preventDefault();
        $('.cls-sec2-bank1').attr('style', 'display:block;');
        $('.cls-sec2-bank2').attr('style', 'display:none;');
    });

    $('.cls-donate-bank').click(function(e) {
        e.preventDefault();

        count_click1++;

        $('.cls-bank22-div1 input').css('background-color', 'beige');
        $('.cls-bank22-div2 input').css('background-color', 'beige');
        $('.cls-bank22-div3 input').css('background-color', 'beige');
        $('.cls-bank22-div4 input').css('background-color', 'beige');
        $('.cls-bank22-div5 input').css('background-color', 'beige');
        $('.cls-bank22-div6 input').css('background-color', 'beige');
        $('#id-loader-donatedone').attr('style', 'display:block');

        var country_boolean = true;
        if ($('#id-bank-country').val() == 'Country') {
            country_boolean = false;
        }

        if ( $('#bank-address').val() && $('#bank-city').val() && $('#bank-state').val() && country_boolean && $('#bank-zipcode').val() && $('#bank-phone').val() ) {

            yen.bankaddress = $('#bank-address').val();
            yen.bankcity = $('#bank-city').val();
            yen.bankstate = $('#bank-state').val();
            yen.bankcountry = $('#id-bank-country').val();
            yen.bankzipcode = $('#bank-zipcode').val();
            yen.donorphone = $('#bank-phone').val();

            var yen_url = "https://www.youthempoweringnation.org/donors/donation";

            if(count_click1 == 1) {
                $.ajax({
                        url: yen_url,
                        type: 'post',
                        dataType: 'json',
                        data: yen
                }).then(function(data, textStatus, jqXHR) {
                    if (jqXHR.status == 200) {
                        window.localStorage.setItem("num-recip", howmanyrecipient(yen.recipient, yen.onetime, yen.donationamount));

                        if (howmanyrecipient(yen.recipient, yen.onetime, yen.donationamount) >= 1) {
                            $('#id-loader-donatedone').attr('style', 'display:none;');
                            window.sessionStorage.setItem("match-session", yen.donorname);
                            $('.cls-donate-done-btn-div0').attr('style', 'display:block;');
                        }
                    } else if (jqXHR.status == 405) {

                    } else {

                    }
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 200) {
                        window.localStorage.setItem("num-recip", howmanyrecipient(yen.recipient, yen.onetime, yen.donationamount));
                        if (howmanyrecipient(yen.recipient, yen.onetime, yen.donationamount) >= 1) {
                            $('#id-loader-donatedone').attr('style', 'display:none;');
                            window.sessionStorage.setItem("match-session", yen.donorname);
                            $('.cls-donate-done-btn-div0').attr('style', 'display:block;');
                        }
                    } else if (jqXHR.status == 405) {

                    } else {

                    }
                });
            }
            $('.cls-sec2-bank2').attr('style', 'display:none;');
            $('.cls-sec2-thank').attr('style', 'display:block;');
            $('.cls-foot-donate').attr('style', 'display:block;');

            $('.cls-bank22-div7 p').text('All fields should be filled up');
            $('.cls-bank22-div7 p').css('color', 'rgb(255, 255, 255)');

        } else if ( !$('#bank-address').val() && $('#bank-city').val() && $('#bank-state').val() && country_boolean && $('#bank-zipcode').val() && $('#bank-phone').val() ) {
            $('.cls-bank22-div7 p').text('Address is missing');
            $('.cls-bank22-div7 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else if ( $('#bank-address').val() && !$('#bank-city').val() && $('#bank-state').val() && country_boolean && $('#bank-zipcode').val() && $('#bank-phone').val() ) {
            $('.cls-bank22-div7 p').text('City is missing');
            $('.cls-bank22-div7 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else if ( $('#bank-address').val() && $('#bank-city').val() && !$('#bank-state').val() && country_boolean && $('#bank-zipcode').val() && $('#bank-phone').val() ) {
            $('.cls-bank22-div7 p').text('State is missing');
            $('.cls-bank22-div7 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else if ( $('#bank-address').val() && $('#bank-city').val() && $('#bank-state').val() && !country_boolean && $('#bank-zipcode').val() && $('#bank-phone').val() ) {
            $('.cls-bank22-div7 p').text('Country is missing');
            $('.cls-bank22-div7 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else if ( $('#bank-address').val() && $('#bank-city').val() && $('#bank-state').val() && country_boolean && !$('#bank-zipcode').val() && $('#bank-phone').val() ) {
            $('.cls-bank22-div7 p').text('Zipcode is missing');
            $('.cls-bank22-div7 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else if ( $('#bank-address').val() && $('#bank-city').val() && $('#bank-state').val() && country_boolean && $('#bank-zipcode').val() && !$('#bank-phone').val() ) {
            $('.cls-bank22-div7 p').text('Phone number is missing');
            $('.cls-bank22-div7 p').css('color', 'rgba(255, 0, 0, 0.7)');
        } else {
            $('.cls-bank22-div7 p').text('All fields should be filled up')
            $('.cls-bank22-div7 p').css('color', 'rgba(255, 0, 0, 0.7)');
        }
        /* *************************** */
        if(!$('#bank-address').val()) {
            $('.cls-bank22-div1 input').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!$('#bank-city').val()) {
            $('.cls-bank22-div2 input').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!$('#bank-state').val()) {
            $('.cls-bank22-div3 input').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!country_boolean) {
            $('.cls-bank22-div4 input').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!$('#bank-zipcode').val()) {
            $('.cls-bank22-div5 input').css('background-color', 'rgb(255, 255, 0)');
        }
        if(!$('#bank-phone').val()) {
            $('.cls-bank22-div6 input').css('background-color', 'rgb(255, 255, 0)');
        }

        $('.cls-sec2-bank2').attr('style', 'display:none;');
        $('.cls-sec2-thank').attr('style', 'display:block;');
    });

    if ($('.cls-sec2-thank').attr('style') == 'display:block') {
        count_click1 = 0;
    }

    $('.cls-donate-done-skip-btn').on('click', function() {
        var ms_url = "https://www.youthempoweringnation.org/donors/match-skip";
        var ms_data = {};
        ms_data.numberofrecipient = window.localStorage.getItem("num-recip");
        ms_data.donorname = window.sessionStorage.getItem("match-session")
        $.ajax({
            url: ms_url,
            type: 'POST',
            dataType: 'json',
            data: ms_data
        }).then(function(data, textStatus, jqXHR) {
            if (jqXHR.status == 200) {
                // console.log("success-200");
            } else if (jqXHR.status == 405) {

            } else {

            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 200) {
                // console.log("fail-200");
            } else if (jqXHR.status == 405) {

            } else {

            }
        });
    })

});
