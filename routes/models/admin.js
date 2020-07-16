//const mongoose = require('mongoose');
const {mongoose} = require('../db/mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

var AdminSchema = new mongoose.Schema({        // Schema Property
  username: {type: String, required: true, trim: true, minlength: 1},
  password: {type: String, required: true, trim: true, minlength: 6},
  startAt: {type: Date},
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// send back only "_id" and "username" to clients (instance methods)
AdminSchema.methods.toJSON = function () {
  var admin = this;
  var adminObject = admin.toObject();

  return _.pick(adminObject, ['_id', 'username']);
};

// instance method
AdminSchema.methods.generateAuthToken = function () {
  var admin = this;
  var access = 'auth';
  var token = jwt.sign({_id: admin._id.toHexString(), access}, 'jesusyen').toString();

  admin.tokens.push({access, token});

  return admin.save().then(() => {
    return token;
  });
};

// instance method
AdminSchema.methods.removeToken = function (token) {
  var admin = this;

  return admin.update({
    $pull: {
      tokens: {token}
    }
  });
};

// model method
AdminSchema.statics.findByCredentials = function (username, password) {
    var Admin = this;
    
    return Admin.findOne({username}).then((admin) => {
        if (!admin) {
            return Promise.reject();
        } 
        
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, admin.password, (err, res) => {
                if (res) {
                    resolve(admin);
                } else {
                    reject();
                }
            });
        });
    });
};

// Model method 
AdminSchema.statics.findByToken = function (token) {
    var Admin = this;
    var decoded;
    
    try {
        decoded = jwt.verify(token, 'jesusyen');
    } catch (e) {
//        return new Promise((resolve, reject) => {
//            reject();
//        })
        return Promise.reject();
    }
   
    return Admin.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    }) 
    
};

// instanace based
AdminSchema.pre('save', function(next) {
    var user = this;
    
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

var Admin = mongoose.model('Admin', AdminSchema);

module.exports = {Admin};
