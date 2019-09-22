const express = require('express');
const router = express.Router();

// @route   GET api/profile
// @desc    Get profile (test route)
// @access  Public
router.get('/', (req, res, error) => {
    res.json({
        message: 'success'
    })
});


module.exports = router;