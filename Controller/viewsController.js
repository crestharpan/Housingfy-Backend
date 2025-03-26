const Property = require('../Model/propertyModel');

exports.getProperty = async (req, res) => {
  const property = await Property.findById(req.params.id);

  // res.status(200).json({
  //   property,
  // });
  res.status(200).render('map', {
    title: `${property.name}`,
    property,
  });
};
