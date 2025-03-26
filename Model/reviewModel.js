const mongoose = require('mongoose');

const reviewschema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'The review cannot be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    property: {
      type: mongoose.Schema.ObjectId,
      ref: 'Property',
      required: [true, 'the review must belong to a property'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'Customer',
      required: [true, 'the review must belong to a Customer'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Review = mongoose.model('Review', reviewschema);
module.exports = Review;
