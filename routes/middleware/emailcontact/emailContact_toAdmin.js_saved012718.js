const {sendContactEmail} = require('./../email/sendContactEmail');
const aws = require('aws-sdk');

//aws.config.loadFromPath('./../../config.json');
//// Instantiate SES.
//var ses = new aws.SES();

function emailContact_toAdmin(res_contact, ses, contact_email, contact_name, contact_inputtext) {

    var from_email = "youthempoweringnation@gmail.com";
    var to_email = "youthempoweringnation@gmail.com";
    sendContactEmail(ses, from_email, to_email, contact_email, contact_name, contact_inputtext).then(message => {
        var sesParams = {
            RawMessage: {
                Data: message
            },
        };

        console.log("inside-sendContactEmail");

        ses.sendRawEmail(sesParams, function(err, data) {
            if(err) {
                console.log('err', err);
            }
            else {
                console.log('data', data);
            }
        });
    });
}

module.exports = {emailContact_toAdmin};
