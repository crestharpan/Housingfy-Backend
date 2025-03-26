const express = require('express');
const propertiesController = require('../Controller/propertiesController');
const router = express.Router();

router.get('/', propertiesController.getAllProperties);
router.post('/add', propertiesController.addProperties);
router.get('/filter', propertiesController.getFilterProperties);
router.get('/details/:id', propertiesController.getProperty);
module.exports = router;
