$(document).ready(function() {
    $('.cls-login-btn').click(function(e) {
        e.preventDefault();

        var temp_text = $('.cls-login-btn').text();
        var admin = {};
        if (temp_text == "LOGIN") {

            admin.username = $('#id-username').val();
            admin.password = $('#id-pwd').val();
            var yen_admin_url = "https://www.youthempoweringnation.org/recipients/login";

            $.ajax({
                url: yen_admin_url,
                type: 'post',
                dataType: 'json',
                data: admin
            }).then(function(data, textStatus, jqXHR) {
                if (jqXHR.status == 200) {
                    sessionStorage.setItem('token', jqXHR.getResponseHeader('x-auth'));
                    if (sessionStorage.getItem('token')) {
                        window.location.href="https://www.youthempoweringnation.org/recipients/recipients-manage";
                    }
                } else if (jqXHR.status == 405) {

                } else {

                }
            }).fail(function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status == 200) {
                    sessionStorage.setItem('token', jqXHR.getResponseHeader('x-auth'));
                    if (sessionStorage.getItem('token')) {
                        window.location.href="https://www.youthempoweringnation.org/recipients/recipients-manage";
                    }
                } else if (jqXHR.status == 405) {

                } else {

                }
            });
        } else if (temp_text == "RESET") {
            var yen_resetpwd_url = "https://www.youthempoweringnation.org/recipients/reset-password";
            admin.oldpassword = $('#id-oldpwd').val();
            admin.newpassword = $('#id-pwd').val();
            var pwd_confirm = $('#id-confirm-pwd').val();

            if (admin.oldpassword && admin.newpassword && (admin.newpassword == pwd_confirm)) {

                $.ajax({
                    url: yen_resetpwd_url,
                    type: 'post',
                    dataType: 'json',
                    data: admin
                }).then(function(data, textStatus, jqXHR) {
                    if (jqXHR.status == 200) {
                        alert("reset-200");
                        $('.cls-login-btn').text('LOGIN');
                        $('#id-username').attr('style', 'display:block;');
                        $('#id-pwd').attr('style', 'display:block;');
                        $('.container1').attr('style', 'display:block;');

                        $('#id-username').attr('placeholder', 'Username');
                        $('#id-pwd').attr('placeholder', 'Password');

                        $('#id-confirm-pwd').attr('placeholder', 'Confirm password');
                        $('#id-confirm-pwd').attr('style', 'display:none');
                        $('#id-oldpwd').attr('style', 'display:none');
                        $('.container2').attr('style', 'display:none;');
                    } else {
                        $('.container2').attr('style', 'display:block;');
                        $('.cls-complaint').text('Try again!');
                    }
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 200) {
                        alert("reset-200");
                        $('.cls-login-btn').text('LOGIN');
                        $('#id-username').attr('style', 'display:block;');
                        $('#id-pwd').attr('style', 'display:block;');
                        $('.container1').attr('style', 'display:block;');

                        $('#id-username').attr('placeholder', 'Username');
                        $('#id-pwd').attr('placeholder', 'Password');

                        $('#id-confirm-pwd').attr('placeholder', 'Confirm password');
                        $('#id-confirm-pwd').attr('style', 'display:none');
                        $('#id-oldpwd').attr('style', 'display:none');
                        $('.container2').attr('style', 'display:none;');
                    } else {
                        $('.container2').attr('style', 'display:block;');
                        $('.cls-complaint').text('Try again!');
                    }
                });
            } else {
                $('.container2').attr('style', 'display:block;');
                $('.cls-complaint').text('Try again!');
            }
        } else {
            var yen_register_url = "https://www.youthempoweringnation.org/recipients/register";

            admin.username = $('#id-username').val();
            admin.password = $('#id-pwd').val();
            var pwd_confirm = $('#id-confirm-pwd').val();

            if (admin.username && admin.password && (admin.password == pwd_confirm)) {

                $.ajax({
                    url: yen_register_url,
                    type: 'post',
                    dataType: 'json',
                    data: admin
                }).then(function(data, textStatus, jqXHR) {
                    if (jqXHR.status == 200) {
                        sessionStorage.setItem('token', jqXHR.getResponseHeader('x-auth'));
                        if (sessionStorage.getItem('token')) {
                            window.location.href="https://www.youthempoweringnation.org/recipients/recipients-manage";
                        }
                    } else if (jqXHR.status == 404 && jqXHR.responseText == "Data in Admin-DB") {
                        $('.container1').attr('style', 'display:block;');
                        $('.container2').attr('style', 'display:block;');
                        $('.cls-complaint').text('Already registered!');

                        $('.cls-login-btn').text('LOGIN');
                        $('#id-confirm-pwd').attr('style', 'display:none');

                        $('#id-username').attr('style', 'display:block;');
                        $('#id-pwd').attr('style', 'display:block;');

                        $('#id-username').attr('placeholder', 'Username');
                        $('#id-pwd').attr('placeholder', 'Password');
                    } else {
                        $('.container2').attr('style', 'display:block;');
                        $('.cls-complaint').text('Try again!');
                    }
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status == 200) {
                        sessionStorage.setItem('token', jqXHR.getResponseHeader('x-auth'));
                        if (sessionStorage.getItem('token')) {
                            window.location.href="https://www.youthempoweringnation.org/recipients/recipients-manage";
                        }
                    } else if (jqXHR.status == 404 && jqXHR.responseText == "Data in Admin-DB") {
                        $('.container1').attr('style', 'display:block;');
                        $('.container2').attr('style', 'display:block;');
                        $('.cls-complaint').text('Already registered!');
                        $('.cls-login-btn').text('LOGIN');
                        $('#id-confirm-pwd').attr('style', 'display:none');

                        $('#id-username').attr('style', 'display:block;');
                        $('#id-pwd').attr('style', 'display:block;');

                        $('#id-username').attr('placeholder', 'Username');
                        $('#id-pwd').attr('placeholder', 'Password');
                    } else {
                        $('.container2').attr('style', 'display:block;');
                        $('.cls-complaint').text('Try again!');
                    }
                });
            } else {
                $('.container2').attr('style', 'display:block;');
                $('.cls-complaint').text('Try again!');
            }
        }
    });

    $('.register').click(function() {
//        e.preventDefault();

        $('.container1').attr('style', 'display:none;');
        $('.container2').attr('style', 'display:none;');
        $('#id-oldpwd').attr('style', 'display:none;');
        $('#id-username').attr('style', 'display:block;');
        $('#id-pwd').attr('style', 'display:block;');
        $('#id-pwd').attr('placeholder', 'Password');
        $('#id-confirm-pwd').attr('style', 'display:block');
        $('#id-confirm-pwd').attr('placeholder', 'Confirm password');
        $('.cls-login-btn').text('REGISTER');
    });

    $('.forgotpwd').click(function() {
//        e.preventDefault();

        $('.container1').attr('style', 'display:none;');
        $('.container2').attr('style', 'display:none;');
        $('#id-username').attr('style', 'display:none;');
        $('#id-oldpwd').attr('style', 'display:block');
        $('#id-pwd').attr('placeholder', 'New password');
        $('#id-confirm-pwd').attr('style', 'display:block');
        $('#id-confirm-pwd').attr('placeholder', 'Confirm new password');
        $('.cls-login-btn').text('RESET');
    });

    // console.log("document.referrer: ", document.referrer);

    if(document.referrer == 'https://www.youthempoweringnation.org/recipients/recipients-manage'){
        // console.log("history-beforepush: ", history);
        history.pushState(null, null, 'login');
        // console.log("history-afterpush: ", history);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, 'login');
        });
    }
});
