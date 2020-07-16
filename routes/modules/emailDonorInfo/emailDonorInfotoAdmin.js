const {sendDonorInfoEmail} = require('./../email/sendDonorInfoEmail');
//const aws = require('aws-sdk');

//aws.config.loadFromPath('./config.json');
//// Instantiate SES.
//var ses = new aws.SES();

var emailDonorInfotoAdmin = function(res, ses, emaildata) {

//    console.log("emaildata: ", emaildata);
    sendDonorInfoEmail(ses, emaildata).then(message => {
//    sendDonorInfoEmail(res, emaildata).then(message => {
        var sesParams = {
            RawMessage: {
                Data: message
            },
        };
        
//        console.log("message: ", message);

        ses.sendRawEmail(sesParams, (err, data) => {
            if(err) {
//                 console.log('err', err);
                res.send(err);
//                next();
            } else {
//                 console.log('data', data);
                res.send(data);
//                next();
            }
        });
    }).catch((e) => {
//         console.log("e-2: ", e);
        res.send(e);
    });
}

module.exports = {emailDonorInfotoAdmin};
