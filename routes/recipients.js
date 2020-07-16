var express = require('express');
var router = express.Router();
var {Recipient} = require('./models/recipient');
var {Admin} = require('./models/admin');
var {Donor} = require('./models/donor');
const {authenticate} = require('./middleware/authenticate');
const {resetPassword} = require('./middleware/resetPassword');
const {toTitleCase} = require('./modules/toTitleCase');
const {emailDeleteRecipienttoAdmin} = require('./modules/emailDonorInfo/emailDeleteRecipienttoAdmin');
var {ObjectID} = require('mongodb');
var _ = require('lodash');
const bcrypt = require('bcryptjs');
var formidable = require('formidable');
var multer = require('multer');
const aws = require('aws-sdk');
const fs = require("fs");
const rimraf = require("rimraf");
var csv = require("fast-csv");

var upload = multer({
  dest: __dirname + './uploads',
  limits: {fileSize: 5000000, files:1}
});

const S3_BUCKET = process.env.S3_BUCKET;

//console.log("process.env-recipients: ", process.env);
//console.log("S3_BUCKET: ", S3_BUCKET);

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/* Post  Data from Mobile */
/* --------------------------- */
router.get('/login', function(req, res) {

    res.header('Content-Type', 'text/html');
    res.render('recipient.html', (err_login, html) => {
        if (!err_login) {
            res.send(html);
        } else {
            res.status(400).send('GLOGIN-HTML-Err-400');
        }
    });
});

router.get('/recipients-manage', function(req, res) {

    Admin.find().then((admin) => {
        if (!admin[0]) {
            return res.status(404).send('no data in DB');
        }

        if (admin[0].tokens[0].token) {
            res.header('Content-Type', 'text/html');
            res.render('recipients-manage.html', (err_manage, html) => {
                if (!err_manage) {
                    res.send(html);
                } else {
                    res.status(400).send('GManage-HTML-Err-400');
                }
            });
        } else {
            res.send('no rendering');
        }
    }, (e) => {
        res.send(e);
    })

});

router.post('/register', function(req, res) {

    var body;
    body = _.pick(req.body, ['username', 'password']);
    body.startAt = new Date().getTime();

    Admin.find().then((admin) => {
        if (admin[0]) {               // Nothing in Admin DB
//            console.log("hi-inside");
            return res.status(404).send('Data in Admin-DB');
        }

        admin1 = new Admin(body);
        admin1.save().then(() => {
            return admin1.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(admin1);
        }).catch((e) => {
            res.status(400).send('AdminDB-Save-Err-400');
        });
    }, (e_admin) => {
        // console.log("error-admin-here1");
        res.status(400).send('AdminDB-Check-Err-400');
    });

});

router.post('/reset-password', resetPassword, function(req, res) {

    res.send();
});

router.post('/login', function(req, res) {
    var body;

    body = _.pick(req.body, ['username', 'password']);

//    console.log("body: ", body);
    Admin.findByCredentials(body.username, body.password).then((admin) => {
//        console.log("inside body: ");
//        console.log("admin.tokens[0].token: ", admin.tokens[0].token);
        if (admin.tokens[0]) {
            admin.removeToken(admin.tokens[0].token).then((admin1) => {
                if (!admin1) {
                    return res.status(404).send('error-notremove');
                }
                //res.status(200).send(admin1);
                return admin.generateAuthToken().then((token) => {
                    res.header('x-auth', token).send(admin);
                });
            }, (error) => {
                res.status(400).send('error-removetoken-beforelogin')
            });
        } else {
            return admin.generateAuthToken().then((token) => {
                res.header('x-auth', token).send(admin);
            });
        }
    }).catch((e) => {
        res.status(400).send();
    });
});

//router.post('/upload', function(req, res) {
//
//})
router.get('/recipients-manage/sign-s3', (req, res) => {
//    console.log("qws: ", aws);
    const s3 = new aws.S3();
//    console.log("s3: ", s3);
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    };

//    console.log("inside: I am in");
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
//        console.log("inside function: - data", data);

        if(err){
            // console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://s3.amazonaws.com/${S3_BUCKET}/${fileName}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
    });
});

/////* Recip Upload */////
//////////////////////////
router.post('/recipients-manage/upload', authenticate, (req, res) => {
//router.post('/recipients-manage/add-recipient', authenticate, (req, res) => {

//    console.log("req-main: ", req);
//    console.log("req-main.body: ", req.body);

    var recip;
    var aRecip;

    recip = _.pick(req.body, ['Name', 'Age', 'Sex', 'Birth', 'Country', 'Favorite', 'FutureDream', 'Picture']);

    recip.createdAt = new Date().getTime();

    aRecip = new Recipient(recip);
//    console.log("between");
//    console.log("recip-1: ", recip);
    Recipient.findOne({Name: req.body.Name, completed: false}).then((doc) => {
        // console.log("doc: ", doc);
        if (doc) {
            return res.status(405).send('Duplicated Document Found');
            // Do nothing;
        } else {
            aRecip.save().then((arecipient) => {
                // console.log("inside save");
                if (!arecipient) {
                    return res.status(405).send('A doc not saved');
                }
                res.status(200).send(arecipient);
            }, (e) => {
                // console.log("inside save-error");
                // console.log("e:", e);
                res.status(400).send('Yp-RSave-Err-400');
            });
        }
    }, (error) => {
        res.status(400).send('Found Error');
    });

});

/////* Recip File Upload */////
///////////////////////////////
router.post('/recipients-manage/upload-file', upload.single('file'), authenticate, (req, res) => {
//router.post('/recipients-manage/upload-file', upload.single('file'), (req, res) => {

   var tmp_path = req.file.path;

      /** The original name of the uploaded file
          stored in the variable "originalname". **/
    var target_path = './uploads/' + req.file.originalname;

      /** A better way to copy the uploaded file. **/
    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);

    csv
     .fromStream(src, {headers : true})
     .on("data", function(data){
//         console.log("data: ", data);
         var recip={};
         var aRecip={};
         recip = _.pick(data, ['Name', 'Age', 'Sex', 'Birth', 'Country', 'Favorite', 'FutureDream', 'Picture']);

         recip.createdAt = new Date().getTime();
         recip.Name = toTitleCase(recip.Name);

         aRecip = new Recipient(recip);
//         console.log("between");
//         console.log("data-1: ", data);
         Recipient.findOne({Name: data.Name, completed: false}).then((doc) => {
            //  console.log("doc: ", doc);
             if (doc) {
                 // Not save
             } else {
                 aRecip.save().then((arecipient) => {
                    // console.log("inside save");
                    if (!arecipient) {
//                        return res.status(404).send('Yp-RSave-NDR-404');
                    }
//                    res.status(200).send(arecipient);
                 }, (e) => {
                    // console.log("inside save-error");
                    // console.log("e:", e);
//                    res.status(400).send('Yp-RSave-Err-400');
                 });
             }
         }, (error) => {
//             res.status(400).send('Found Error');
         });
     })
     .on("end", function(){
        //  console.log("done");
         fs.unlink(target_path, (err) => {
             if (err) throw err;
            //  console.log('target_path was deleted');
         });
         res.send();
     });

    res.send();

});

router.post('/recipients-manage/query-recip', authenticate, (req, res) => {
//router.post('/recipients-manage/add-recipient', authenticate, (req, res) => {

//    console.log("req-main: ", req);
//    console.log("req-main.body: ", req.body);

    Recipient.find({Name: req.body.Name}).count(function (error, count) {
//        console.log("count: ", count);
        if (count > 1) {
            Recipient.find({Name: req.body.Name}).sort({createdAt: 1}).limit(1).then((doc0) => {
                doc0[0].count = count;
                return res.header('num', count).send(doc0[0]);
            }, (err0) => {
                res.status(400).send("Found error > 1")
            });
        } else if (count == 1) {
            Recipient.findOne({Name: req.body.Name}).then((doc1) => {
                // console.log("doc1: ", doc1);
                res.status(200).send(doc1);
            }, (err1) => {
                res.status(400).send("Found error = 1")
            });
        } else {
            return res.status(405).send("Not matched one");
        }
    }, (error) => {
        res.status(400).send('Found Error');
    });
});

router.post('/recipients-manage/query-donor', authenticate, (req, res) => {
//router.post('/recipients-manage/add-recipient', authenticate, (req, res) => {

//    console.log("req-main: ", req);
//    console.log("req-main.body: ", req.body);
    if (req.body.donorname) {
        // console.log("inside-donorname");
        Donor.find({donorname: req.body.donorname}).count(function (error, count) {
            // console.log("count: ", count);
            if (count > 1) {
                Donor.find({donorname: req.body.donorname}).sort({createdAt: 1}).limit(1).then((dono0) => {
                    // dono0[0].count = count;
                    // return res.header('num', count).send(dono0[0]);

                    if (dono0[0].recipient == true) {
                        ////////////////////////////
                        var donor_id = new ObjectID(dono0[0]._id);
                        Recipient.find({_donorID: donor_id, donorConnected: true, completed: false}).then((recp0) => {
                            return res.header('num', count).send({donor: dono0[0], recipient: recp0});
                        }, (recp0err) => {
                            res.status(400).send('Found Error');
                        });
                        /////////////////////////////
                    } else {
                        return res.header('num', count).send({donor: dono0[0]});
                    }
                }, (err0) => {
                    res.status(400).send("Found error > 1")
                });
            } else if (count == 1) {
                Donor.findOne({donorname: req.body.donorname}).then((dono1) => {
//                    console.log("doc1: ", dono1);
//                    res.status(200).send(dono1);

                    if (dono1.recipient == true) {
                        ////////////////////////////
                        var donor_id = new ObjectID(dono1._id);
                        Recipient.find({_donorID: donor_id, donorConnected: true, completed: false}).then((recp0) => {
                            return res.status(200).send({donor: dono1, recipient: recp0});
                        }, (recp0err) => {
                            res.status(400).send('Found Error');
                        });
                        /////////////////////////////
                    } else {
                        return res.status(200).send({donor: dono1});
                    }

                }, (err1) => {
                    res.status(400).send("Found error = 1")
                });
            } else {
                return res.status(405).send("Not matched one");
            }
        }, (error) => {
            res.status(400).send('Found Error');
        });
    } else {
        // console.log("inside-id");
        var donor_id = new ObjectID(req.body._id);
        Donor.findOne({_id: donor_id}).then((dono) => {
            if (!dono) {
                return res.status(405).send('Not matched one')
            }

            if (dono.recipient == true) {
//            res.status(200).send(dono);
                ////////////////////////////
                var donor_id = new ObjectID(dono._id);
                Recipient.find({_donorID: donor_id, donorConnected: true, completed: false}).then((recp0) => {
                    return res.status(200).send({donor: dono, recipient: recp0});
                }, (recp0err) => {
                    res.status(400).send('Found Error');
                });
                /////////////////////////////
            } else {
                return res.status(200).send({donor: dono});
            }
        }, (errordonor) => {
            res.status(400).send('Found Error');
        });
    }
});

router.post('/recipients-manage/delete-recip', authenticate, (req, res) => {
//router.post('/recipients-manage/add-recipient', authenticate, (req, res) => {

//    console.log("req-main: ", req);
//    console.log("req-main.body: ", req.body);

    Recipient.findOne({Name: req.body.Name, completed: false}).then((doc) => {
        if (!doc) {
            return res.status(405).send('None Found');
            // Do nothing;
        }
        var updateData_DR = {};
        updateData_DR.completed = true;
        updateData_DR.completedAt = new Date().getTime();
        updateData_DR.donorConnected = false;

        var del_donorId0 = new ObjectID(doc._id);

        Recipient.findOneAndUpdate({_id: del_donorId0, completed: false}, {$set: updateData_DR}, {new: true}).then((doc1) => {
//        Recipient.findByIdAndRemove({_id: doc._id, completed: false}).then((doc1) => {
            if(!doc1) {
                return res.status(405).send('Not Removed One Found!');
            }

            if (doc.donorConnected == true) {
                var del_donorId = new ObjectID(doc._donorID);

                //////////////////////
                Donor.findOne({_id: del_donorId, completed: false}).then((don0) => {
                    if (!don0) {
                        return res.status(405).send("None Found");
                    }

                    var updateDataDel = {};
                    if (parseInt(don0.numberofrecipient) > 1) {
                        updateDataDel.recipient = true;
                        updateDataDel.numberofrecipient = parseInt(don0.numberofrecipient) - 1;
                    } else if (parseInt(don0.numberofrecipient) == 1) {
                        updateDataDel.recipient = false;
                        updateDataDel.numberofrecipient = 0;
                    } else {
                        // Do nothing
                    }

                    Donor.findOneAndUpdate({_id: del_donorId, completed: false}, {$set: updateDataDel}, {new: true}).then((don1) => {
//                        res.status(200).send();

                        // email
                        emailDeleteRecipienttoAdmin(res, doc1.Name, don1.donorname);
                    }, (errdon1) => {
                        res.status(400).send('Found Error');
                    });
                }, (errdon0) => {
                    res.status(400).send('Found Error');
                });
                ///////////////////////

            } else {
                res.status(200).send(doc1);
            }
        }, (error1) => {
            res.status(400).send('Removed Error');
        });
    }, (error) => {
        res.status(400).send('Found Error');
    });
});

// Stop Donate
router.post('/recipients-manage/stop-donate', authenticate, (req, res) => {

    // console.log("req.body.donorname: ", req.body.donorname);
    Donor.find({donorname: req.body.donorname, completed: false}).count(function (error, count) {
        // console.log('count: ', count);
        if (count > 1) {
            return res.status(405).send("Not only one exists")
        } else if (count == 1) {
            var updateData_SD = {};
            updateData_SD.completed = true;
            updateData_SD.completedAt = new Date().getTime();
//            updateData_SD.recipient = false;

            Donor.findOneAndUpdate({donorname: req.body.donorname, completed: false}, {$set: updateData_SD}, {new: true}).then((dono1) => {
                // console.log("dono1: ", dono1);
                if (!dono1) {
                    return res.status(405).send('None Found');
                }

                if (dono1.recipient == true) {

                    ////////////////////////////
                    var donor_id = new ObjectID(dono1._id);
                    Recipient.find({_donorID: donor_id, donorConnected: true, completed: false}).then((recp0) => {
                        if (!recp0[0]) {
                            return res.status(405).send("None Found");
                        }
                        ///////////////////////
                        var updateStopDonate = {};
                        updateStopDonate.donorConnected = false;

                        Recipient.updateMany({_donorID: donor_id, donorConnected: true,  completed: false}, {$set: updateStopDonate}, {new: true}).then((recip0) => {
                            res.status(200).send({recipient: recp0});
                        }, (err_recip0) => {
                            res.status(400).send("Recip Found error");
                        });
                        ///////////////////////
                    }, (recp0err) => {
                        res.status(400).send('Found Error');
                    });
                    /////////////////////////////

                } else {
                    res.status(200).send();
                }

            }, (err1) => {
                res.status(400).send("Donor Found error")
            });
        } else {
            return res.status(405).send("Not matched one");
        }
    }, (error) => {
        res.status(400).send('Donor Found Error');
    });
});

router.post('/recipients-manage/modify-recip', authenticate, (req, res) => {
//router.post('/recipients-manage/add-recipient', authenticate, (req, res) => {

//    console.log("req-main: ", req);
//    console.log("req-main.body: ", req.body);

    var updateData = {};

    updateData.Name = req.body.Name;
    if ("Age" in req.body) {
        // console.log("Name-in");
        updateData.Age = req.body.Age;
    }
    if ("Sex" in req.body) {
        // console.log("Name-sex");
        updateData.Sex = req.body.Sex;
    }
    if ("Birth" in req.body) {
        // console.log("Name-birth");
        updateData.Birth = req.body.Birth;
    }
    if ("Country" in req.body) {
        // console.log("Name-country");
        updateData.Country = req.body.Country;
    }
    if ("Favorite" in req.body) {
        // console.log("Name-favorite");
        updateData.Favorite = req.body.Favorite;
    }
    if ("FutureDream" in req.body) {
        // console.log("Name-futuredream");
        updateData.FutureDream = req.body.FutureDream;
    }
    if ("Picture" in req.body) {
        // console.log("Name-picture");
        updateData.Picture = req.body.Picture;
    }
    if ("donorConnected" in req.body) {
        // console.log("donorConnected");
        updateData.donorConnected = (req.body.donorConnected == 'true');
        if (updateData.donorConnected == true) {
            updateData._donorID = new ObjectID(req.body._donorID);
        }
    }

    Recipient.findOne({Name: req.body.Name, completed: false}).then((rec0) => {

        // console.log("rec0: ", rec0);
        if (!rec0) {
            return res.status(405).send("None Found");
        }

        ////////// Different Cases
        if (updateData.donorConnected != rec0.donorConnected) {
            Recipient.findOneAndUpdate({Name: req.body.Name, completed: false}, {$set: updateData}, {new: true}).then((rec1) => {
                if (!rec1) {
                    return res.status(405).send("None Found")
                }


                if (rec0.donorConnected == false && updateData.donorConnected == true) {    // Prev = False, Now = True

                    var donor_id0 = new ObjectID(rec1._donorID);                            // New donor ID
                    Donor.findOne({_id: donor_id0, completed: false}).then((don0) => {
                        if (!don0) {
                            return res.status(405).send("None Found");
                        }
                        var updateDataDonor = {};
                        updateDataDonor.recipient = true;
                        updateDataDonor.numberofrecipient = (parseInt(don0.numberofrecipient) + 1).toString();
                        Donor.findOneAndUpdate({_id: donor_id0, completed: false}, {$set: updateDataDonor}, {new: true}).then((don1) => {
                            res.status(200).send();
                        }, (errdon1) => {
                            res.status(400).send('Found Error');
                        });
                    }, (errdon0) => {
                        res.status(400).send('Found Error');
                    });
                } else {                                                                    // Prev = True, Now = False
                    var donor_id0 = new ObjectID(rec1._donorID);                            // Old donor ID
                    Donor.findOne({_id: donor_id0, completed: false}).then((don0) => {
                        if (!don0) {
                            return res.status(405).send("None Found");
                        }

                        var updateDataDonor = {};
                        if (parseInt(don0.numberofrecipient) > 1) {
                            updateDataDonor.recipient = true;
                            updateDataDonor.numberofrecipient = parseInt(don0.numberofrecipient) - 1;
                        } else if (parseInt(don0.numberofrecipient) == 1) {
                            updateDataDonor.recipient = false;
                            updateDataDonor.numberofrecipient = 0;
                        } else {
                            // Do nothing
                        }

                        Donor.findOneAndUpdate({_id: donor_id0, completed: false}, {$set: updateDataDonor}, {new: true}).then((don1) => {
                            res.status(200).send();
                        }, (errdon1) => {
                            res.status(400).send('Found Error');
                        });
                    }, (errdon0) => {
                        res.status(400).send('Found Error');
                    });
                }
            }, (errrec1) => {
                    res.status(400).send('Found Error');
            });
        ////////// Same cases
        } else {
            if (rec0.donorConnected == false && updateData.donorConnected == false) {           // Prev = False, Now = False
                // Do nothing
                // console.log("false -false");
                res.status(200).send();
            } else {                                                                            // Prev = True, Now = True
                // console.log("true - true");
                if (rec0._donorID == req.body._donorID) {                                       // No diff in Donor ID
                    // Do nothing
                    res.status(200).send();
                    // console.log("true-true: id no diff");
                } else {                                                                        // Diff in Donor ID
                    // console.log("true-true: id diff");

                    Recipient.findOneAndUpdate({Name: req.body.Name, completed: false}, {$set: updateData}, {new: true}).then((rec1) => {
                        if (!rec1) {
                            return res.status(405).send("None Found");
                        }

                        var old_DonorId = new ObjectID(rec0._donorID);
                        var new_DonorId = new ObjectID(req.body._donorID);
                        // console.log("old_DonorId: ", old_DonorId);
                        // console.log("new_DonorId: ", new_DonorId);
                        ///////////////////////////////////////////////////////////// Old Donor ID
                        Donor.findOne({_id: old_DonorId, completed: false}).then((don0) => {
                            if (!don0) {
                                return res.status(405).send("None Found");
                            }
                            var updateDataOldDonor = {};
                            if (parseInt(don0.numberofrecipient) > 1) {
                                updateDataOldDonor.recipient = true;
                                updateDataOldDonor.numberofrecipient = parseInt(don0.numberofrecipient) - 1;
                            } else if (parseInt(don0.numberofrecipient) == 1) {
                                updateDataOldDonor.recipient = false;
                                updateDataOldDonor.numberofrecipient = 0;
                            } else {
                                // Do nothing
                            }

                            Donor.findOneAndUpdate({_id: old_DonorId, completed: false}, {$set: updateDataOldDonor}, {new: true}).then((don1) => {
//                               res.status(200).send();

                                ///////////////////////////////////////////////////////////// New Donor ID
                                Donor.findOne({_id: new_DonorId, completed: false}).then((newdon0) => {
                                    if (!newdon0) {
                                        return res.status(405).send("None Found");
                                    }
                                    var updateDataNewDonor = {};
                                    updateDataNewDonor.recipient = true;
                                    updateDataNewDonor.numberofrecipient = (parseInt(newdon0.numberofrecipient) + 1).toString();
                                    Donor.findOneAndUpdate({_id: new_DonorId, completed: false}, {$set: updateDataNewDonor}, {new: true}).then((newdon1) => {
                                        res.status(200).send();
                                    }, (errnewdon1) => {
                                        res.status(400).send('Found Error');
                                    });
                                }, (errnewdon0) => {
                                    res.status(400).send('Found Error');
                                });
                                ///////////////////////////////

                            }, (errdon1) => {
                                res.status(400).send('Found Error');
                            });
                        }, (errdon0) => {
                            res.status(400).send('Found Error');
                        });


                    }, (errrec1) => {
                        res.status(400).send('Found Error');
                    });
                }
            }
        }
    }, (errrec0) => {
        res.status(400).send('Found Error');
    });
});


router.delete('/recipients-manage/logout', authenticate, (req, res) => {
//    console.log("req-main: ", req);
    req.admin.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
})


module.exports = router;
