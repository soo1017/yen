const MailComposer = require('nodemailer/lib/mail-composer');

function sendContactEmail(ses, from_email, to_email, contact_email, contact_name, contact_message){
    
    var contact;
    contact = _.pick(req.body, ['contact_email', 'contact_name', 'contact_inputtext']);
    
    contact.from_email = "youthempoweringnation@gmail.com";
    contact.to_email = "youthempoweringnation@gmail.com";

    var subject = "YEN: Customer Contact Email - ";
        subject = subject.concat(contact_name);
        subject = subject.concat(" - ");
        subject = subject.concat(contact_email);
    var text_Message = contact_message;


    var ses_mail = new MailComposer({
        from: from_email, to: to_email, subject: subject, text: text_Message
    });

    return new Promise((resolve, reject) => {
        ses_mail.compile().build(function(err, res) {
            err ? reject(err) : resolve(res);
        });
    });

}

module.exports = {sendContactEmail};
