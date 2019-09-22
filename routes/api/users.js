const express = require('express');
const router = express.Router();

// @route   GET api/users
// @desc    Get all users (test route)
// @access  Public
router.get('/', (req, res, error) => {
    res.json({
        message: 'success'
    })
});


module.exports = router;