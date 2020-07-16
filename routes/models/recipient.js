const {mongoose} = require('../db/mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var {ObjectID} = require('mongodb');

var RecipientSchema = new mongoose.Schema({        // Schema Property
  Name: {type: String, trim: true, minlength: 1},
  Age: {type: Number},
  Sex: {type: String},
  Birth: {type: String, trim: true, minlength: 1},
  Country: {type: String, trim: true, minlength: 1},
  Favorite: {type: String, trim: true, minlength: 1},
  FutureDream: {type: String, trim: true, minlength: 1},
  Picture: {type: String, trim: true, minlength: 1},
  donorConnected: {type: Boolean, trim: true, default: false},
  _donorID: {type: mongoose.Schema.Types.ObjectId},
  createdAt: {type: Date},
  completed: {type: Boolean, default: false},                         
  completedAt: {type: Date}

});

// send back only "_id" and "username" to clients (instance methods)
RecipientSchema.methods.toJSON = function () {
  var recipient = this;
  var recipientObject = recipient.toObject();

  return _.pick(recipientObject, ['_id', 'Name', 'Age', 'Sex', 'Birth', 'Country', 'Favorite', 'FutureDream', 'Picture', 'donorConnected', '_donorID', 'completed']);
};

var Recipient = mongoose.model('Recipient', RecipientSchema);

module.exports = {Recipient};
