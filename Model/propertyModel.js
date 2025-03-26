const mongoose = require('mongoose');

const validator = require('validator');

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
    maxLength: [30, 'the Character should be less than 15 words'],
  },
  propertyType: {
    type: String,
    required: [true, 'The name is required'],
  },
  area: {
    type: Number,
  },
  floors: {
    type: Number,
  },
  age: {
    type: Number,
  },
  overview: {
    type: String,
    maxLength: [100, 'The paragraph should have less than 50 words.'],
  },
  amenities: {
    type: [String],
  },
  price: {
    type: Number,
    required: [true, 'A phone Number must be specified'],
  },
  bedrooms: {
    type: Number,
  },
  bathroom: {
    type: Number,
  },
  floors: {
    type: Number,
  },
  locationName: {
    type: String,
  },
  exteriorFeatures: [String],
  interirorFeatures: [String],
  communityFeatures: [String],
  locations: {
    address: {
      type: String,
    },

    state: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    coordinates: [Number],
    images: [String],
    nearBy: {
      metro: {
        type: String,
      },
      schools: {
        type: String,
      },
      hospitals: {
        type: String,
      },
    },
  },
});
const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
