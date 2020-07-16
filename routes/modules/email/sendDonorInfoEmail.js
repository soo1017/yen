const MailComposer = require('nodemailer/lib/mail-composer');

var sendDonorInfoEmail = function(ses, data){
//var sendDonorInfoEmail = function(res_1, data){
    
    var from_email = "youthempoweringnation@gmail.com";
    var to_email = "youthempoweringnation@gmail.com";
//    var to_email = "ilsoo66@gmail.com";

    var subject = "YEN - Donor Info Email";
    var text_Message = data;

    var ses_mail = new MailComposer({
        from: from_email, to: to_email, subject: subject, text: text_Message
    });

    return new Promise((resolve, reject) => {
        ses_mail.compile().build(function(err, res) {
//            console.log("err-promise: ", err);
            err ? reject(err) : resolve(res);    // res will be Email message
        });
    });
}

module.exports = {sendDonorInfoEmail};
