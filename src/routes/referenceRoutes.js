const express = require('express');
const router = express.Router();
const {
    getFishes,
    getSuperfamilies,
    getOrders,
    getClasses
} = require('../controllers/referenceController');


// Rotas de referência
router.get('/fishes', getFishes);
router.get('/superfamilies', getSuperfamilies);
router.get('/orders', getOrders);
router.get('/classes', getClasses);


module.exports = router;