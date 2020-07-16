//const mongoose = require('mongoose');
const {mongoose} = require('../db/mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

var DonorSchema = new mongoose.Schema({        // Schema Property
  donorname: {type: String, required: true, trim: true, minlength: 1},
  donorphone: {type: String, trim: true},
  donoremail: {type: String, required: true, trim: true, minlength: 1,
             validate: {
               validator: (value) => {
                 return validator.isEmail(value);
               },
               message: '{VALUE} is not a valid name'
             }
           },
  onetime: {type: Boolean, required: true, deafult: true},
  monthlyexpire: {type: String, trim: true},
  recipient: {type: Boolean, deafult: false},
  numberofrecipient: {type: String, trim:true, default: 0},
  donationamount: {type: Number, required: true},
  donationtype: {type: String, required: true, default: 'credit'},
  nameoncard: {type: String, trim: true},
  credittype: {type: String, deafult: 'none'},
  creditnumber: {type: String, trim: true},
  creditexpire: {type: String, trim: true},
  creditcvv: {type: Number, trim: true},
  creditzipcode: {type: Number, trim: true},
  creditaddress: {type: String, trim: true},
  creditcity: {type: String, trim: true},
  creditstate: {type: String, trim: true},
  creditcountry: {type: String, trim: true},
  bankname: {type: String, trim: true},
  nameonbank: {type: String, trim: true},
  bankaccount: {type: String, trim: true},
  bankzipcode: {type: Number, trim: true},
  bankaddress: {type: String, trim: true},
  bankcity: {type: String, trim: true},
  bankstate: {type: String, trim: true},
  bankcountry: {type: String, trim: true},
  startAt: {type: Date},
  completed: {type: Boolean, required: true, default: false},
  completedAt: {type: Date},
//  tokens: [{
//    access: {
//      type: String,
//      required: true
//    },
//    token: {
//      type: String,
//      required: true
//    }
//  }]
});

// send back only "_id" and "username" to clients (instance methods)
DonorSchema.methods.toJSON = function () {
  var donor = this;
  var donorObject = donor.toObject();

  return _.pick(donorObject, ['_id', 'donorname', 'onetime', 'donationamount', 'recipient', 'numberofrecipient', 'completed']);
};

// send back only "_id" and "username" to clients (instance methods)
//DonorSchema.methods.toJSON1 = function () {
//  var donor = this;
//  var donorObject = donor.toObject();
//
//  return _.pick(donorObject, ['_id', 'donorname', 'recipient', 'numberofrecipient']);
//};

// instance method
DonorSchema.methods.generateAuthToken = function () {
  var donor = this;
  var access = 'auth';
  var token = jwt.sign({_id: donor._id.toHexString(), access}, 'jesusyen').toString();

  donor.tokens.push({access, token});

  return donor.save().then(() => {
    return token;
  });
};

// instanace based
DonorSchema.pre('save', function(next) {
    var donor = this;

    // Credit Card Number
    // console.log("pre-save");
//    if (donor.isModified('creditnumber')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(donor.creditnumber, salt, (err, hash) => {
                donor.creditnumber = hash;
                // console.log("hash");
                next();
            });
        });
//    } else {
//        next();
//    }

    // Credir Card CVV Number
//    if (donor.isModified('creditcvv')) {
        bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(donor.creditcvv, salt, (err, hash) => {
                donor.creditcvv = hash;
                next();
            });
        });
//    } else {
//        next();
//    }

    // Bank Account Number
//    if (donor.isModified('bankaccount')) {
        bcrypt.genSalt(15, (err, salt) => {
            bcrypt.hash(donor.bankaccount, salt, (err, hash) => {
                donor.bankaccount = hash;
                next();
            });
        });
//    } else {
//        next();
//    }
});

var Donor = mongoose.model('Donor', DonorSchema);

module.exports = {Donor};
