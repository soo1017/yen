var express = require('express');
var router = express.Router();
var {Donor} = require('./models/donor');
var {Recipient} = require('./models/recipient');
var {ObjectID} = require('mongodb');
const {emailDonorInfotoAdmin} = require('./modules/emailDonorInfo/emailDonorInfotoAdmin');
const {emailMatchingInfotoAdmin} = require('./modules/emailDonorInfo/emailMatchingInfotoAdmin');
var _ = require('lodash');
var aws = require('aws-sdk');

aws.config.loadFromPath('./config.json');
// Instantiate SES.
var ses = new aws.SES();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Post Faveu Data from Mobile */
/* --------------------------- */
router.post('/donation', function(req, res) {
    var donation;
    var body;
    if (req.body.donationtype == 'credit') {
        body = _.pick(req.body, ['donorname', 'donorphone', 'donoremail', 'onetime', 'donationamount', 'donationtype', 'recipient', 'nameoncard', 'credittype', 'creditnumber', 'creditexpire', 'creditcvv', 'creditzipcode', 'creditaddress', 'creditcity', 'creditstate', 'creditcountry']);
    } else if (req.body.donationtype == 'bank') {
        body = _.pick(req.body, ['donorname', 'donorphone', 'donoremail', 'onetime', 'donationamount', 'donationtype', 'recipient', 'nameonbank', 'bankname', 'bankaccount', 'bankzipcode', 'bankaddress', 'bankcity', 'bankstate', 'bankcountry']);
    } else {
        //
    }

    body.startAt = new Date().getTime();
    donation = new Donor(body);

//    console.log("donation: ", donation);
    donation.save().then((doc) => {                             // Save each fave into Document Faveu
         console.log("inside save");
        if (!doc) {
            return res.status(404).send('Yp-USave-NDR-404');
        }
//        var doc_id = new ObjectID(doc._id);
//        var saved_data = {};
//        donation.generateAuthToken();
//        res.status(200).send(doc);
//        console.log("before email");
//        console.log("before email-jsonbody", JSON.stringify(body));
//        console.log("before email-body", body);
        emailDonorInfotoAdmin(res, ses, JSON.stringify(body));       // email donor info to Admin
    }, (e) => {
        // console.log("inside save-error");
        // console.log("e:", e);
        res.status(400).send('Yp-USave-Err-400');
    });

});

/* --------------------------- */
router.post('/match-skip', function(req, res) {

    var updateMatchSkip = {};
    updateMatchSkip.numberofrecipient = req.body.numberofrecipient;
    var num_recip_match = parseInt(req.body.numberofrecipient);
    Donor.findOneAndUpdate({donorname: req.body.donorname, completed: false}, {$set: updateMatchSkip}, {new: true}).then((donor) => {
//        console.log("donor: ", donor);
        var donor_id = new ObjectID(donor._id);

        /// assign donor_id into recipients
        var updateMatchSkip1 = {};
        updateMatchSkip1._donorID = donor_id;
        updateMatchSkip1.donorConnected = true;

        Recipient.find({donorConnected: false, completed: false}).sort({createdAt: 1}).limit(num_recip_match).then((recip) => {
            if (!recip[0]) {
                return res.status(405).send("All REcip connected");
            }

            var arry_id = [];
            var arry_name = [];
            for (var n=0;n<recip.length;n++) {
                arry_id[n] = new ObjectID(recip[n]._id);
                arry_name[n] = recip[n].Name;
            }

            Recipient.updateMany({_id: { $in: arry_id }, completed: false}, {$set: updateMatchSkip1}, {new: true}).then((recip1) => {
                if (!recip1) {
                    return res.status(405).send("Recip Not Found");
                }

                emailMatchingInfotoAdmin(res, donor.donorname, donor._id, arry_name, arry_id, num_recip_match);
            }, (err_recip1) => {
                res.status(400).send('Error Found');
            });
        }, (err_recip) => {
            res.status(400).send('Recip-Match-skip-Err-400');
        });
    }, (err) => {
        res.status(400).send('Donor-Match-skip-Err-400');
    })
});

module.exports = router;
