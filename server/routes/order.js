const express = require('express');
const router = express.Router();

const Order  = require('../models/orderModel');
const Cart  = require('../models/cartModel');
const Product = require('../models/productModel');

//@Route Post api/order
//@desc add to order
//@access  Public
router.post('/', async (req, res) => {
    const { userId } = req.body;
    console.log(req.body);

    const cart = await Cart.findOne({ orderby: userId });
    const products = cart.products;
    const order = await Order.create({
        products: products,
        cartTotal: cart.cartTotal,
        totalAfterDiscount: cart.totalAfterDiscount,
        orderby: userId,
        paymentIntent: {
            id: "123",
            amount: cart.totalAfterDiscount,
            currency: "usd",
            status: "Cash On Delivery",
            created: Date.now(),
            payment_method_types: ["cash"],
        }
    });
    await order.save();
    await Cart.findOneAndDelete({ orderby: userId });
    res.send(order);
});

  


module.exports = router;
