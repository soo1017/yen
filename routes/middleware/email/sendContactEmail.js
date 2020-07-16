const MailComposer = require('nodemailer/lib/mail-composer');
const _ = require('lodash');

var sendContactEmail = function(req, res){
    var contact;
    contact = _.pick(req.body, ['contact_email', 'contact_name', 'contact_inputtext']);
    
    contact.from_email = "youthempoweringnation@gmail.com";
    contact.to_email = "youthempoweringnation@gmail.com";

    var subject = "YEN: Customer Contact Email - ";
        subject = subject.concat(contact.contact_name);
        subject = subject.concat(" - ");
        subject = subject.concat(contact.contact_email);
    var text_Message = contact.contact_inputtext;

    var ses_mail = new MailComposer({
        from: contact.from_email, to: contact.to_email, subject: subject, text: text_Message
    });

    return new Promise((resolve, reject) => {
        ses_mail.compile().build(function(err, res) {
            err ? reject(err) : resolve(res);    // res will be Email message
        });
    });
}

module.exports = {sendContactEmail};
