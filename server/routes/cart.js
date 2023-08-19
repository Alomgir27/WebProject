const express = require('express');
const router = express.Router();

const Cart  = require('../models/cartModel');
const Product = require('../models/productModel');

//@Route Post api/cart
//@desc add to cart
//@access Public
router.post('/', async (req, res) => {
    const { userId, productId} = req.body;
    console.log(req.body);

    const cart = await Cart.findOne({ orderby: userId });
    const product = await Product.findById(productId);

    let count = parseInt(req.body?.count);
    let discount = parseInt(req.body?.discount) || 0;

    if(!cart) {
        const newCart = await Cart.create({
            products: [{
                product: productId,
                count: count,
                price: product.price
            }],
            cartTotal: count * product.price,
            totalAfterDiscount: count * product.price - ((count * product.price * discount) / 100),
            orderby: userId
        });
        await newCart.save();
        res.send(newCart);
    } else {
        const index = cart.products.findIndex(p => p.product == productId);
        if(index != -1) {
            cart.products[index].count += count;
            cart.cartTotal += (count * product.price);
            cart.totalAfterDiscount += (count * product.price - ((count * product.price * discount) / 100));
            await cart.save();
            res.send(cart);
        } else {
            cart.products.push({
                product: productId,
                count: count,
                price: product.price
            });
            cart.cartTotal += (count * product.price);
            cart.totalAfterDiscount += (count * product.price - ((count * product.price * discount )/ 100));
            await cart.save();
            res.send(cart);
        }
    }
});

  
//@Route Get api/cart/:id
//@desc get cart by id
//@access Public
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const cart = await Cart.findOne({ orderby: id }).populate('products.product');
    res.send(cart);
});



module.exports = router;
