const Agent = require('../Model/agentModel');

exports.create = async (req, res) => {
  const newAgent = await Agent.create({
    name: req.body.fullName,
    address: req.body.address,
    phoneNumber: req.body.phone,
    // photo: req.body.photo,
    email: req.body.email,
    // joinedDate: req.body.joinedDate,
    properties: req.body.propertiesManaged,
    totalSales: req.body.totalSales,
    photo: req.body.photo.name,

    social: {
      facebook: req.body.facebookUrl,
      insta: req.body.instagramUrl,
      twitter: req.body.twitterUrl,
    },
    // active: req.body.active,
  });
  res.status(200).json({
    status: 'Success',
    data: newAgent,
  });
};
exports.getAllAgents = async (req, res) => {
  const agentData = await Agent.find();
  res.status(200).json({
    status: 'Success',
    data: agentData,
  });
};
