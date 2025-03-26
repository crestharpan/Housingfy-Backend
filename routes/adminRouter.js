const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');
const reviewController = require('../Controller/reviewController');

router.post('/', authController.adminCredentials);
router.post('/login', authController.adminLogin);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.use(authController.protect);
// https://housingfy.vercel.app/admin/reviews
router.post('/add-reviews', reviewController.addReviews);
router.get('/reviews');

module.exports = router;
