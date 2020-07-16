(function($) {

//    $ = jQuery;
//    $.fn.creditExpiryDateValidate = function() {
    $.fn.creditExpiryDateValidate = function(callback, option) {
        var normalize, validate, validate_number;

        validate_number = function(month, year) {
            var returned_value = false;
            var today = new Date();
            var todayyear = today.getFullYear().toString();
            var todaymonth = today.getMonth() + 1;
            var todayyear1 = todayyear.split('');
            todayyear = todayyear1[2].concat(todayyear1[3]);
            var month1 = month.split('');
            if (month1[0] == '0') {
                month = month1[1];
            }
            if (year == todayyear) {
                if ((month > 0 && month <=12) && (month > todaymonth)) {
                    returned_value = true;
                }
            } else if (year > todayyear) {
                returned_value = true;
            } else {
                // nothing
            }
            return returned_value;
        };

        normalize = function(number) {
            return number.replace(/[ ]/g, '');
        };

        validate = (function(_this) {
            var number;
            var reg_expiry = /([0-9]{2}[/]?){2}/;
            var temp_num
            number = normalize($(_this).val());
            console.log("number", number);
            if (reg_expiry.test(number)) {
                temp_num = number.split('/');
                return validate_number(temp_num[0], temp_num[1]);
            }
        })(this);
        callback.call(this, validate);
 //       console.log("callback: ", callback.call(this, validate));
//        return validate;
    };
}(jQuery));
