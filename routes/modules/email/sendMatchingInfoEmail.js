const MailComposer = require('nodemailer/lib/mail-composer');
const _ = require('lodash');

var sendMatchingInfoEmail = function(res, donorname1, donorid1, matchingRecipName1, matchingRecipID1, num_matching1){

    var from_email = "youthempoweringnation@gmail.com";
    var to_email = "youthempoweringnation@gmail.com";

    var text_Message = "Donor: " + donorname1 + "(" + donorid1 + ") - (Number of matching(skip only): " + num_matching1 + ")" + "\t\n\nRecipients: ";

    if (matchingRecipID1 == null) {
        if (_.isArray(matchingRecipName1)) {            // Array
            for (var n=0; n<matchingRecipName1.length; n++) {
                if (n == 0) {
                    text_Message += matchingRecipName1[n];
                } else {
                    text_Message += ', ' + matchingRecipName1[n];
                }
            }
        }
    } else {
        if (_.isArray(matchingRecipName1)) {            // Array
            for (var n=0; n<matchingRecipName1.length; n++) {
                if (n == 0) {
                    text_Message += matchingRecipName1[n] + "(" + matchingRecipID1[n] + ")";
                } else {
                    text_Message += ', ' + matchingRecipName1[n] + "(" + matchingRecipID1[n] + ")";
                }
            }
        }
    }

    var subject = "YEN - Matching Info Email";

    var ses_mail = new MailComposer({
        from: from_email, to: to_email, subject: subject, text: text_Message
    });

    return new Promise((resolve, reject) => {
        ses_mail.compile().build(function(err, res) {
            err ? reject(err) : resolve(res);    // res will be Email message
        });
    });
}

module.exports = {sendMatchingInfoEmail};
