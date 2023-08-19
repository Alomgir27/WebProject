const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User  = require('../models/userModel');

//@Route Post api/wishlist
//@desc add to wishlist
//@access Public

router.post('/', async (req, res) => {
    const { productId, userId } = req.body;
    console.log(req.body);
  
    const user = await User.findById(userId);
    console.log(user);
    if(!user) return res.status(400).send("User not found");
    if(user.wishlist.includes(productId)) return res.status(400).send("Product already in wishlist");
    user.wishlist.push(productId);
    await user.save();
    res.send(user);
});
  
//@Route GET api/wishlist/:id
//@desc get wishlist
//@access Public
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).populate('wishlist');
    res.send(user.wishlist);
});

//@Route DELETE api/wishlist/:id
//@desc delete from wishlist
//@access Public
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { productId } = req.body;

    if(!id) return res.status(400).send("User not found");
    if(!productId) return res.status(400).send("Product not found");

    const user = await User.findById(id);
    user.wishlist.pull(productId);
    await user.save();
    res.send(user);
});

module.exports = router;
