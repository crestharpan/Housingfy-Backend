const Properties = require('../Model/propertyModel');
exports.addProperties = async (req, res) => {
  const {
    name,
    propertyType,
    area,
    age,
    amenities,
    bathroom,
    bedrooms,
    floors,
    exteriorFeatures,
    interirorFeatures,
    communityFeatures,
    price,
    locationName,
    overview,
    images,
    locations,
  } = req.body;
  console.log(locations.nearBy.metro);
  const newProperty = await Properties.create({
    name,
    propertyType,
    area,
    age,
    amenities,
    images,
    amenities,
    bedrooms,
    bathroom,
    floors,
    price,
    locationName,
    exteriorFeatures,
    interirorFeatures,
    communityFeatures,
    overview,
    locations: {
      address: locations.address,
      coordinates: locations.coordinates,
      state: locations.state,
      pincode: locations.pincode,
      nearBy: {
        metro: locations.nearBy.metro,
        schools: locations.nearBy.schools,
        hospitals: locations.nearBy.hospitals,
      },
    },
  });
  res.status(200).json({
    status: 'success',
    data: newProperty,
  });
};

exports.getAllProperties = async (req, res) => {
  const allProperties = await Properties.find();
  res.status(200).json({
    status: 'success',
    data: allProperties,
  });
};

exports.getFilterProperties = async (req, res) => {
  const {
    locationName,
    propertyType,
    minPrice,
    maxPrice,

    amenities,
  } = req.query;
  const filter = {
    // locations.city:location,
    locationName,
    propertyType,

    price: { $gte: minPrice, $lte: maxPrice },

    bhk,
    amenities: { $all: amenities.split(',') },
  };
  console.log(filter);

  try {
    const filterProperties = await Properties.find(filter);
    console.log(filterProperties);
    res.status(200).json({
      message: 'success',
      results: filterProperties.length,
      data: filterProperties,
    });
  } catch (err) {
    res.status(404).json({
      status: 'error',
      Error: err,
    });
    console.log('error in fetching the filter:', err.message);
  }
};

exports.getProperty = async (req, res) => {
  const propertyDetails = await Properties.findById({ _id: req.params.id });
  res.status(200).json({
    status: 'success',
    data: propertyDetails,
  });
};
