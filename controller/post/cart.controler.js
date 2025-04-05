const Cart = require('../../models/cart.model');
const Product = require('../../models/product.model');
const redisClient = require('../../middlewares/redis');

const handleCart = async (req, res) => {
    try {
        const { productId, quantity, sizes, colors } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: 'Product ID and quantity are required' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const userId = req.user._id;
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }

        const index = cart.products.findIndex(item => item.productId.toString() === productId);

        if (index > -1) {
            cart.products[index].quantity += Number(quantity);
        } else {
            cart.products.push({ productId, quantity: Number(quantity), sizes, colors });
        }

        await cart.save();

        await redisClient.setEx(`cart:${userId}`, 60 * 60, JSON.stringify(cart));

        return res.status(200).json({ message: 'Success', cart });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error', error: error.message });
    }
};

module.exports = handleCart;
