// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboardController.js');

router.get('/overview', dashboardController.getOverviewData);

router.get('/admin/all', dashboardController.getAllPropertiesAdmin);

module.exports = router;
