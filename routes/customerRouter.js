const express = require('express');
const customerController = require('../Controller/customerController');
const authController = require('../Controller/authController');
const router = express.Router();

router.use(authController.protect);
router.get('/', customerController.getCustomers);
router.get('/:id', customerController.getCustomer);
router.post('/add', customerController.createCustomer);
module.exports = router;
