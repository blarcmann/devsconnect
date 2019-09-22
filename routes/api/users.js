const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/keys');
const User = require('../../models/User');

// @route   GET api/users
// @desc    Get all users (test route)
// @access  Public
router.get('/', (req, res, error) => {
    res.json({
        message: 'success'
    })
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res.status(400).json({ email: 'Email already exists' });
            } else {
                const avatar = gravatar.url(req.body.email, {
                    rating: 'r',
                    size: '200',
                    default: 'mm'
                })
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar,
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if (error) throw error;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(error => console.log(error))
                    })
                })
            }
        })
});

// @route   POST api/users/login
// @desc    Validate credentials / send JWT token
// @access  Public

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'failed',
                    email: 'User not found'
                })
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            name: user.name,
                            id: user._id,
                            avatar: user.avatar
                        }
                        jwt.sign(payload, config.secret, { expiresIn: 84000 }, (error, token) => {
                            if (error) {
                                return res.json({ error: 'Some error occured', message: 'failed' })
                            }
                            res.json({
                                message: 'success',
                                token: 'Bearer ' + token
                            })
                        })
                    } else {
                        return res.status(400).json({
                            message: 'failed',
                            password: 'Incorrect password'
                        })
                    }
                })
        })
})


module.exports = router;