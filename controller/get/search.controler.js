const Product = require('../../models/product.model');
const setRedisCache = require('../../utils/setRedisCache')

const GetSearchProduct = async (req, res) => {
    try {
        const { query = '', page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        const searchCriteria = query.trim()
            ? {
                  $or: [
                      { name: { $regex: query, $options: 'i' } },
                      { description: { $regex: query, $options: 'i' } },
                  ],
              }
            : {};

        const redisKey = `search:products:${query}:page:${pageNumber}:limit:${limitNumber}`;

        const cachedData = await setRedisCache.get(redisKey);

        if (cachedData) {
            const { products, totalResults, totalPages } = cachedData;
            return res.status(200).json({
                products,
                currentPage: pageNumber,
                totalPages,
                totalResults,
                source: 'cache',
            });
        }

        const products = await Product.find(searchCriteria)
            .skip(skip)
            .limit(limitNumber);

        const totalResults = await Product.countDocuments(searchCriteria);
        const totalPages = Math.ceil(totalResults / limitNumber);

        await setRedisCache(
            redisKey,
            JSON.stringify({ products, totalResults, totalPages }),
            60 * 60
        );

        res.status(200).json({
            products,
            currentPage: pageNumber,
            totalPages,
            totalResults,
            source: 'database',
        });
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = GetSearchProduct;
