const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User  = require('../models/userModel');

// var userSchema = new mongoose.Schema(
//     {
//       firstname: {
//         type: String,
//         required: true,
//       },
//       lastname: {
//         type: String,
//         required: true,
//       },
//       email: {
//         type: String,
//         required: true,
//         unique: true,
//       },
//       mobile: {
//         type: String,
//         required: true,
//         unique: true,
//       },
//       password: {
//         type: String,
//         required: true,
//       },
//       role: {
//         type: String,
//         default: "user",
//       },
//       isBlocked: {
//         type: Boolean,
//         default: false,
//       },
//       cart: {
//         type: Array,
//         default: [],
//       },
//       address: {
//         type: String,
//       },
//       wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
//       refreshToken: {
//         type: String,
//       },
//       passwordChangedAt: Date,
//       passwordResetToken: String,
//       passwordResetExpires: Date,
//     },
//     {
//       timestamps: true,
//     }
//   );

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

        const salt = await bcrypt.genSaltSync(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

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

        const isMatch = await bcrypt.compare(password, user.password);

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





module.exports = router;
