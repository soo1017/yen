var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');
var _ = require('lodash');
var {Recipient} = require('./models/recipient');
var {Donor} = require('./models/donor');
var {ObjectID} = require('mongodb');

var {emailContacttoAdmin} = require('./middleware/emailcontact/emailContacttoAdmin');
var {recipientsMatching1Age} = require('./modules/recipientsMatching1Age');
var {recipientsMatching2AgeCnty} = require('./modules/recipientsMatching2AgeCnty');
var {recipientsMatching2AgeSex} = require('./modules/recipientsMatching2AgeSex');
var {recipientsMatching3} = require('./modules/recipientsMatching3');
const {emailMatchingInfotoAdmin} = require('./modules/emailDonorInfo/emailMatchingInfotoAdmin');

//aws.config.loadFromPath('./config.json');
//// Instantiate SES.
//var ses = new aws.SES();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'YEN' });
//    res.header('Content-Type', 'text/html');
//    res.render('index.html', (err_term, html) => {
//        if (!err_term) {
//            res.send(html);
//        } else {
//            res.status(400).send('Gindex-HTML-Err-400');
//        }
//    });
});

/* GET term of use
/* --------------------------------------  */
router.get('/termsofuse', function(req, res) {

    res.header('Content-Type', 'text/html');
    res.render('termsofuse.html', (err_term, html) => {
        if (!err_term) {
            res.send(html);
        } else {
            res.status(400).send('GTERM-HTML-Err-400');
        }
    });
});

/* GET private policy
/* --------------------------------------  */
router.get('/privacy-policy', function(req, res) {

    res.header('Content-Type', 'text/html');
    res.render('privacy.html', (err_pp, html) => {
        if (!err_pp) {
            res.send(html);
        } else {
            res.status(400).send('GPP-HTML-Err-400');
        }
    });
});

/* GET About
/* --------------------------------------  */
router.get('/about', function(req, res) {

    res.header('Content-Type', 'text/html');
    res.render('about.html', (err_about, html) => {
        if (!err_about) {
            res.send(html);
        } else {
            res.status(400).send('GABOUT-HTML-Err-400');
        }
    });
});

/* GET Mission
/* --------------------------------------  */
router.get('/mission', function(req, res) {

    res.header('Content-Type', 'text/html');
    res.render('mission.html', (err_mission, html) => {
        if (!err_mission) {
            res.send(html);
        } else {
            res.status(400).send('GMISSION-HTML-Err-400');
        }
    });
});

/* GET Donate
/* --------------------------------------  */
router.get('/donate', function(req, res) {

    res.header('Content-Type', 'text/html');
    res.render('donate.html', (err_mission, html) => {
        if (!err_mission) {
            res.send(html);
        } else {
            res.status(400).send('GDONATE-HTML-Err-400');
        }
    });
});

/* GET Team
/* --------------------------------------  */
router.get('/team', function(req, res) {

    res.header('Content-Type', 'text/html');
    res.render('team.html', (err_mission, html) => {
        if (!err_mission) {
            res.send(html);
        } else {
            res.status(400).send('GTEAM-HTML-Err-400');
        }
    });
});

/* GET Contact
/* --------------------------------------  */
router.get('/contact', function(req, res) {

    res.header('Content-Type', 'text/html');
    res.render('contact.html', (err_mission, html) => {
        if (!err_mission) {
            res.send(html);
        } else {
            res.status(400).send('GCONTACT-HTML-Err-400');
        }
    });
});

/* GET Match
/* --------------------------------------  */
router.get('/match', function(req, res) {

    // console.log("match-page");
    res.header('Content-Type', 'text/html');
    res.render('match.html', (err_match, html) => {
        if (!err_match) {
            res.send(html);
        } else {
            res.status(400).send('GMATCH-HTML-Err-400');
        }
    });
});

/* GET Match
/* --------------------------------------  */
router.get('/match/search', function(req, res) {

    var dashRegex = /\-/i;
    var age_range = [];
    var sex;
    var country;

    // Sex => Country => Age
    if (req.query.sex) {
        sex = req.query.sex;
        // console.log("sex: ", sex);
        if (req.query.country) {
            country = req.query.country;
            // console.log("country: ", country);
            if (dashRegex.test(req.query.age)) {
                age_range = req.query.age.split("-");
            } else {
                if (req.query.age == '') {
                    age_range[0] = 1;
                    age_range[1] = 17;
                } else {
                    age_range[0] = age_range[1] = req.query.age;
                }
            }
            var age_range0 = parseInt(age_range[0]);
            var age_range1 = parseInt(age_range[1]);
            recipientsMatching3(res, sex, country, age_range0, age_range1);
        } else {
            country = '';
            if (dashRegex.test(req.query.age)) {
                age_range = req.query.age.split("-");
            } else {
                if (req.query.age == '') {
                    age_range[0] = 1;
                    age_range[1] = 17;
                } else {
                    age_range[0] = age_range[1] = req.query.age;
                }
            }
            var age_range0 = parseInt(age_range[0]);
            var age_range1 = parseInt(age_range[1]);
            recipientsMatching2AgeSex(res, sex, age_range0, age_range1);
        }
    } else {
        sex = '';
        // console.log("sex-none: ", sex);
        if (req.query.country) {
            country = req.query.country;
            if (dashRegex.test(req.query.age)) {
                age_range = req.query.age.split("-");
            } else {
                if (req.query.age == '') {
                    age_range[0] = 1;
                    age_range[1] = 17;
                } else {
                    age_range[0] = age_range[1] = req.query.age;
                }
            }
            var age_range0 = parseInt(age_range[0]);
            var age_range1 = parseInt(age_range[1]);
            recipientsMatching2AgeCnty(res, country, age_range0, age_range1);
        } else {
            country = '';
            // console.log("country-none: ", country);
            if (dashRegex.test(req.query.age)) {
                age_range = req.query.age.split("-");
            } else {
                if (req.query.age == '') {
                    age_range[0] = 1;
                    age_range[1] = 17;
                } else {
                    age_range[0] = age_range[1] = req.query.age;
                }
            }
            var age_range0 = parseInt(age_range[0]);
            var age_range1 = parseInt(age_range[1]);
            recipientsMatching1Age(res, age_range0, age_range1);
        }
    }
});

/* POST Submit Child
/* --------------------------------------  */
router.post('/match/submitchild', function(req, res) {

    var updateDonor = {};
    var updateRecipName = [];
    updateDonor.recipient = true;
    updateDonor.numberofrecipient = Object.keys(req.body).length - 1;

    var n;
    for (var m=1; m<Object.keys(req.body).length; m++) {
        n = m - 1;
        var temp_key = 'data' + m;
        updateRecipName[n] = req.body[temp_key];
    }

//    console.log("updateDonor: ", updateDonor);
//    console.log("updateRecipName: ", updateRecipName);
//    console.log("req.body.donor: ", req.body.donor);
    Donor.findOneAndUpdate({donorname: req.body.donor, completed: false}, {$set: updateDonor}, {new: true}).then((donor) => {
        if (!donor) {
            return res.status(405).send("Donor Not Found");
        }
        Recipient.find({Name: { $in: updateRecipName }, donorConnected: false, completed: false}).then((recip0) => {

//            console.log("recip0: ", recip0);
            if (!recip0[0]) {
                return res.status(405).send("Nothing found");
            }
//            recip0 = array
            if (recip0.length == updateDonor.numberofrecipient) {

                /////////////////////////
                var updateRecip = {};
                updateRecip.donorConnected = true;
                updateRecip._donorID = new ObjectID(donor._id);

        //        console.log("updateRecip: ", updateRecip);

                Recipient.updateMany({Name: { $in: updateRecipName }, donorConnected: false, completed: false}, {$set: updateRecip}, {new: true}).then((recip) => {
                    // console.log("recip: ", recip);
//                    recip:  { ok: 1, nModified: 3, n: 3 }
                    if (!recip) {
                        return res.status(405).send("Recip Not Found");
                    }
                    emailMatchingInfotoAdmin(res, donor.donorname, donor._id, updateRecipName, null, null);
                }, (error1) => {
                    res.status(400).send('Error Found');
                });
                /////////////////////////
            } else {
                return res.status(405).send("Recip is taken already");
            }
        }, (error0) => {
            res.status(400).send('Error Found');
        });

    }, (error) => {
        res.status(400).send('Error Found');
    });
});

/* POST Contact
/* --------------------------------------  */
router.post('/contact/email', emailContacttoAdmin, (req, res) => {

    res.send();

});

/* GET faq
/* --------------------------------------  */
router.get('/faq', function(req, res) {

    res.header('Content-Type', 'text/html');
    res.render('faq.html', (err_mission, html) => {
        if (!err_mission) {
            res.send(html);
        } else {
            res.status(400).send('GFAQ-HTML-Err-400');
        }
    });
});


module.exports = router;
