const Product = require('../../models/product.model'); 
const redisClient = require('../../middlewares/redis');

const getTotalProducts = async (req, res) => {
    try {
        const productId = req.params.productId;

        const cachedProduct = await redisClient.get(`product:${productId}`);
        if (cachedProduct) {
            return res.status(200).json({ message: 'success', data: JSON.parse(cachedProduct) });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await redisClient.setEx(`product:${productId}`, 60 * 60, JSON.stringify(product));

        res.status(200).json({ message: 'success', data: product });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports =  getTotalProducts ;