const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const CheckoutSession = async (req, res) => {
    try {
        const { products } = req.body;


        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).send('Invalid data format: Missing or malformed products');
        }

        const lineItems = [];

        products.forEach(product => {
            const price = product.offerPrice * 100;  
            const validOfferPrice = price > 0 ? price : 0;

            if (validOfferPrice === 0) {
                return res.status(400).send('Invalid offer price');
            }


            lineItems.push({
                price_data: {
                    currency: 'INR', 
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: validOfferPrice,
                },
                quantity: product.quantity || 1,
            });
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/payment/success`,
            cancel_url: `${process.env.CLIENT_URL}/payment/failure`,
        });


        res.status(200).json({ id: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).send('Error creating Stripe session');
    }
};

module.exports = CheckoutSession;