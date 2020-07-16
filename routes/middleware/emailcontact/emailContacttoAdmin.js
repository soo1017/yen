const {sendContactEmail} = require('./../email/sendContactEmail');
const aws = require('aws-sdk');

aws.config.loadFromPath('./config.json');
// Instantiate SES.
var ses = new aws.SES();

var emailContacttoAdmin = function(req, res, next) {
    
    sendContactEmail(req, res).then(message => {
        var sesParams = {
            RawMessage: {
                Data: message
            },
        };

        ses.sendRawEmail(sesParams, (err, data) => {
            if(err) {
                console.log('err', err);
                res.send(err);
                next();
            } else {
                console.log('data', data);
                res.send(data);
                next();
            }
        });
    }).catch((e) => {
        console.log("e-2: ", e);
        res.send(e);
    });
}

module.exports = {emailContacttoAdmin};
