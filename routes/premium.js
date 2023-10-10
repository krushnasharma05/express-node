const express = require('express');

const router = express.Router();

const premiumController = require('../controllers/premium');
const Autherization = require('../middleware/auth');

router.get('/showLeaderboard', Autherization.auth, premiumController.showLeaderboard);

module.exports = router;