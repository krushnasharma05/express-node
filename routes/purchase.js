const express = require('express');

const router = express.Router();

const purchaseController = require('../controllers/purchase');
const Autherization = require('../middleware/auth');

router.get('/primiumMembership', Autherization.auth, purchaseController.primiumMembership);

router.post('/updateStatus',Autherization.auth, purchaseController.updateStatus);

module.exports = router;