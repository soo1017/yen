$ = jQuery;
$.fn.validateCreditExpiry = function(callback, option) {
    
    validate = (function(_this) {
      return function() {
        var number;
        number = normalize($(_this).val());
        return validate_number(number);
      };
    })(this);
}