const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const Product  = require('../models/productModel');

//@Route get api/products
//@desc get all products
router.get('/', async (req, res) => {
    console.log("get all products");
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//@Route get api/products/:id
//@desc get a single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
});



module.exports = router;
