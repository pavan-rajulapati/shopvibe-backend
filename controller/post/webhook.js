const Stripe = require('stripe');
const Order = require('../../models/order.model'); // Import your Order model
require('dotenv').config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
        // ✅ Ensure Stripe receives the raw request body
        const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

        console.log("✅ Webhook received:", event.type);

        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object;
            const orderId = paymentIntent.metadata.orderId; // Get order ID from metadata

            console.log("🎉 Payment successful for Order ID:", orderId);

            if (!orderId) {
                throw new Error("Order ID not found in metadata");
            }

            // ✅ Update order status in database
            const updatedOrder = await Order.findByIdAndUpdate(
                orderId,
                { paymentStatus: "Paid", paymentIntentId: paymentIntent.id },
                { new: true }
            );

            if (!updatedOrder) {
                throw new Error(`Order with ID ${orderId} not found`);
            }

            console.log("✅ Order updated successfully:", updatedOrder);
        }

        res.status(200).json({ received: true });
    } catch (err) {
        console.error("🚨 Webhook Error:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
    }
};

module.exports = handleStripeWebhook;
