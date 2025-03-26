const Customer = require('../Model/customerModel');

exports.createCustomer = async (req, res) => {
  const {
    name,
    email,
    address,
    contactNumber,
    propertyInformation,
    socialInformation,
  } = req.body;
  console.log(propertyInformation);
  const newCustomer = await Customer.create({
    name,
    email,
    address,
    contactNumber,
    propertyInformation: {
      investProperty: propertyInformation.investProperty,
      ownProperty: propertyInformation.ownProperty,
      newProperty: propertyInformation.newProperty,
    },
    socialInformation: {
      facebook: socialInformation.facebook,
      instagram: socialInformation.instagram,
      twitter: socialInformation.twitter,
      whatsapp: socialInformation.whatsapp,
    },
  });
  res.status(200).json({
    status: '200',
    data: newCustomer,
  });
};
exports.getCustomers = async (req, res) => {
  const allCustomer = await Customer.find();
  res.status(200).json({
    status: 'Success',
    data: allCustomer,
  });
};
exports.getCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const getCustomer = await Customer.findById(String(customerId));

    res.status(200).json({
      status: 'ok',
      data: getCustomer,
    });
  } catch (err) {
    console.log('error in getting a customer', err);
  }
};
