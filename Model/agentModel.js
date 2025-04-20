const mongoose = require('mongoose');

const validator = require('validator');

/////////////////////////////////////////////////////////////

const socialSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Invalid Facebook URL',
      },
    },
    instagram: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Invalid Instagram URL',
      },
    },
    twitter: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Invalid Twitter URL',
      },
    },
    whatsapp: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Invalid WhatsApp URL',
      },
    },
  },
  { _id: false }
);

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
    maxLength: [20, 'the Character should be less than 15 words'],
    match: /^[A-Za-z\s]+$/,
  },
  phoneNumber: {
    type: Number,
    required: [true, 'A phone Number must be specified'],
    match: /^\d{10}$/,
  },
  photo: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'An email is required'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  joinedDate: {
    type: Date,
    default: Date.now,
  },
  properties: {
    type: Number,
    default: 0,
  },
  averageReview: {
    type: Number,
    default: 4.5,
  },
  totalSales: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
  },
  social: {
    type: socialSchema,
    default: {},
  },
});
const Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent;
