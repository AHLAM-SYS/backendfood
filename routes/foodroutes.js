const express = require('express');
const router = express.Router();

// Placeholder route for food-related operations
router.get('/', (req, res) => {
    res.send('Food API is working!');
});

module.exports = router;
