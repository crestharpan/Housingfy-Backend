const mongoose = require('mongoose');

const validator = require('validator');

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
    required: [true, 'A email is required'],
    validate: [validator.isEmail],
  },
  joinedDate: {
    type: Date,
  },
  properties: {
    type: Number,
  },
  averageReview: {
    type: Number,
    default: 4.5,
  },
  active: {
    type: Boolean,
  },
  totalSales: { type: Number },
  facebook: { type: String },
  twitter: { type: String },
  instagram: { type: String },
});
const Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent;
