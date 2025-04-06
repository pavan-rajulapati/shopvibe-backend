const Product = require('../../models/product.model');
const setRedisCache = require('../../utils/setRedisCache')

const handleCategory = async (req, res) => {
    const category = req.params.category;
    if (!category) {
        return res.status(400).json({ message: 'Missing values' });
    }

    try {
        const redisCache = await setRedisCache.get(`product:category:${category}`);
        const productCount = await Product.countDocuments({ category });

        if (redisCache && JSON.parse(redisCache).length === productCount) {
            return res.status(200).json({ message: 'success', data: JSON.parse(redisCache) });
        }

        const collectionData = await Product.find({ category }).lean();

        if (!collectionData || collectionData.length === 0) {
            return res.status(200).json({ message: 'No products found for this category' });
        }

        await Promise.all([
            setRedisCache(`product:category:${category}`, collectionData, 60 * 60), 
            res.status(200).json({ message: 'success', data: collectionData })
        ]);

    } catch (error) {
        return res.status(500).json({ message: 'Internal Error', error: error.message });
    }
};

module.exports = handleCategory;
