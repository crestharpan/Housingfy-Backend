const Agent = require('../Model/agentModel');

exports.create = async (req, res) => {
  const newAgent = await Agent.create({
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    photo: req.body.photo,
    email: req.body.email,
    joinedDate: req.body.joinedDate,
    averageReview: req.body.averageReview,
    properties: req.body.properties,
    totalSales: req.body.totalSales,
    facebook: req.body.facebook,
    insta: req.body.insta,
    twitter: req.body.twitter,
    active: req.body.active,
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
