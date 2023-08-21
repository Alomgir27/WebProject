const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User  = require('../models/userModel');


//@Route Post api/users/register
//@desc Register user
//@access Public
router.post('/register', async (req, res) => {
    const { name, email, mobile, password } = req.body;

    console.log(req.body);

    try {
        const newUser = new User({
            firstname: name,
            email,
            mobile,
            password
        });

        // const salt = await bcrypt.genSaltSync(10);
        // newUser.password = await bcrypt.hash(newUser.password, salt);

        await newUser.save();

        return res.status(200).json({
            message: 'User registered successfully',
            user: newUser
        });

    } catch (err) {
        return res.status(400).json({
            message: 'Something went wrong',
            err
        });
    }
});

   

//@Route Post api/users/login
//@desc Login user
//@access Public

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }

        if(user.role !== 'user') {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);

        if (isMatch) {
            return res.status(200).json({
                message: 'Login successful',
                user
            });
        } else {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
});


//@Route Get api/users/:id
//@desc Get user by id
//@access Public

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({
                message: 'User not found'
            });
        }
        return res.status(200).json({
            message: 'User found',
            user
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
});





module.exports = router;
