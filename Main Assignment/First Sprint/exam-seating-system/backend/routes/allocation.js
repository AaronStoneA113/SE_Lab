const express = require('express');
const router = express.Router();
const allocationController = require('../controllers/allocationController');

router.post('/generate', allocationController.generateAllocation);

router.get('/exam/:exam_id', allocationController.getAllocation);

router.get('/search', allocationController.searchSeat);

module.exports = router;
