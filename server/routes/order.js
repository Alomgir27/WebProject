const express = require('express');
const router = express.Router();

const Order  = require('../models/orderModel');
const Cart  = require('../models/cartModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

//@Route Post api/order
//@desc add to order
//@access  Public
router.post('/', async (req, res) => {
    const { userId } = req.body;
    console.log(req.body);

    const cart = await Cart.findOne({ orderby: userId });
    const user = await User.findById(userId);
    const admin = await User.findOne({ role: 'admin' });
    if(!cart) return res.status(400).json({ message: 'Cart does not exist' });
    if(!user) return res.status(400).json({ message: 'User does not exist' });
    if(!admin) return res.status(400).json({ message: 'Admin does not exist' });
    if(user?.amount < cart?.totalAfterDiscount) return res.status(400).json({ message: 'Insufficient Balance' });
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

    products.map(async (item) => {
        const product = await Product.findById(item.product);
        product.quantity = product.quantity - item.count;
        product.sold = product.sold + item.count;
        await product.save();

        let discount =  1 - (cart.cartTotal - cart.totalAfterDiscount) / cart.cartTotal;
        // console.log(discount, product)
        // // add 90% amount to supllier and 10% to admin
        const user = await User.findById(product.supplierId);
        user.amount = user.amount + item.price * item.count * discount * 0.9;
        await user.save();
    });
    admin.amount = admin.amount + cart.totalAfterDiscount * 0.1;
    await admin.save();

   
    user.amount = user.amount - cart.totalAfterDiscount;
    await user.save();
    await Cart.findOneAndRemove({ orderby: userId });
    return res.status(200).json({ message: 'Order placed successfully', order });

});

  


module.exports = router;
