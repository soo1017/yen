const {Admin} = require('./../models/admin');
const {ObjectID} = require('mongodb');
var _ = require('lodash');
var bcrypt = require('bcryptjs');

var resetPassword = (req, res, next) => {

    var body;
    body = _.pick(req.body, ['oldpassword', 'newpassword']);

    // console.log("reset-password");

    Admin.find().then((admin) => {
        if (!admin[0]) {               // Nothing in Admin DB
            return res.status(404).send('No Data in Admin-DB');
        }

        // console.log("admin[0]: ", admin[0]);

        var adminid = new ObjectID(admin[0]._id);
        // console.log("adminid: ", adminid);
        bcrypt.compare(body.oldpassword, admin[0].password).then((res) => {
            // res === true
            if (res === true) {
                // console.log("res: ", res);
                // console.log("body.newpassword: ", body.newpassword);

                var temp_body = {};
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(body.newpassword, salt, (err, hash) => {

                        temp_body.password = hash;
                        // console.log("hash: ", hash);
                        // console.log("hash: ", temp_body.password);

                        Admin.findOneAndUpdate({_id: adminid}, {$set: temp_body}, {new: true}).then((doc1) => {
                            // console.log('doc1-inside');
                            if (!doc1) {
                                // console.log('doc1-inside-failure');
                                return res.status(404).send('RESET-ERR-NDR-404');
                            }
                            // console.log('doc1: -- ', doc1);
                            next();
                        }, (e1) => {
                            res.status(400).send("RESET-ERR-Err-400");
                        });
                    });
                });
            } else {
                return res.status(404).send('Old password not match');
            }
        }, (e) => {
            return res.status(404).send('bcrypt compare fails');
        });
    }, (e_admin) => {
        res.status(400).send('AdminDB-Check-Err-400');
    });
};

module.exports = {resetPassword};
