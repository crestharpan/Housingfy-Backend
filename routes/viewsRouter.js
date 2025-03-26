const express = require('express');
const viewsController = require('../Controller/viewsController');
const router = express.Router();

router.get('/admin/properties/details/:id', viewsController.getProperty);
module.exports = router;
