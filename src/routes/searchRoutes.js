const express = require('express');
const router = express.Router();
const {
    getSearches,

} = require('../controllers/searchController');

// Rotas de referência
router.get('/', getSearches);

module.exports = router;