const express = require('express');
const router = express.Router();
const agentController = require('../Controller/agentController');

router.post('/add', agentController.create);
router.get('/', agentController.getAllAgents);

module.exports = router;
