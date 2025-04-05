const Order = require('../../models/order.model');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const redisClient = require('../../middlewares/redis');

// Stripe Webhook Secret Key for signature verification

// Handle Order and Webhook
const handleOrder = async (req, res) => {
    const { sellerId, products, totalAmount, shippingAddress } = req.body;

    // Handle order creation
    if (!sellerId || !products || !totalAmount || !shippingAddress) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const userId = req.user._id;
    if (!userId) {
        return res.status(400).json({ message: 'Token required' });
    }

    try {
        // Save the order to your database
        const order = new Order({
            userId,
            sellerId,
            products: products.map(product => ({
                productId: product.productId,
                quantity: product.quantity
            })),
            totalAmount,
            shippingAddress
        });

        await order.save();

        // Save the order to Redis (optional)
        await redisClient.setEx(`order:${userId}`, 60 * 60, JSON.stringify(order));

        // Create a PaymentIntent if you're integrating payment here
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100,  // Total amount in cents
            currency: 'usd',  // Change currency as needed
            metadata: { orderId: order._id.toString() }
        });

        // Return the paymentIntent client secret to be used on the frontend
        return res.status(200).json({
            message: 'Order created successfully',
            order,
            clientSecret: paymentIntent.client_secret
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Error', error: error.message });
    }
};




module.exports =  handleOrder ;