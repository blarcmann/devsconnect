const express = require('express');
const router = express.Router();

// @route   GET api/posts
// @desc    Get all posts (test route)
// @access  Public
router.get('/', (req, res, error) => {
    res.json({
        message: 'success'
    })
});


module.exports = router;