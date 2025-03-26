const Review = require('../Model/reviewModel');

exports.addReviews = async (req, res) => {
  const { review, rating, createdAt, property } = req.body;
  const newReview = Review.create({
    review,
    rating,
    createdAt,
    property,
  });
};

exports.getAllReviews = async (req, res) => {
  const allReviews = Review.find();
  res.status(200).json({
    status: 'success',
    data: allReviews,
  });
};
