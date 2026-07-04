const express = require("express");
const router = express.Router();
const { handleGenNewURL, handleGetAnalytics } = require("../controllers/url");

router.post('/', handleGenNewURL);

router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router; 