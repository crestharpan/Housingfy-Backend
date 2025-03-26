const mongoose = require('mongoose');

const validator = require('validator');
const customerController = require('../Controller/customerController');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'A email is required'],
    validate: [validator.isEmail],
  },
  contactNumber: {
    type: Number,
    required: [true, 'A phone Number must be specified'],
    match: /^\d{10}$/,
  },
  address: {
    type: String,
    required: ['true', 'Must mention the address'],
  },
  propertyInformation: {
    newProperty: {
      type: String,
    },
    ownProperty: {
      type: String,
    },
    investProperty: {
      type: String,
    },
  },
  socialInformation: {
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
  },
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
