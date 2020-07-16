const MailComposer = require('nodemailer/lib/mail-composer');
const _ = require('lodash');

var sendDeleteRecipientEmail = function(res, recip_name1, donor_name1){
    
    var from_email = "youthempoweringnation@gmail.com";
    var to_email = "youthempoweringnation@gmail.com";
    
    var text_Message = "Deleted Recipient: " + recip_name1 + "\t\n\nRelated Donor: " + donor_name1;

    var subject = "YEN - Recipient Delete Info Email";
    
    var ses_mail = new MailComposer({
        from: from_email, to: to_email, subject: subject, text: text_Message
    });

    return new Promise((resolve, reject) => {
        ses_mail.compile().build(function(err, res) {
            err ? reject(err) : resolve(res);    // res will be Email message
        });
    });
}

module.exports = {sendDeleteRecipientEmail};
