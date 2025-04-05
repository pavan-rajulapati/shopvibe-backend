const Seller = require('../../models/seller.model');
const redisClient = require('../../middlewares/redis');

const handleSeller = async (req, res) => {
    const sellerId = req.params.sellerId;
    
    if (!sellerId) {
        return res.status(400).json({ message: 'Params not sent' });
    }

    try {
        const redisCache = await redisClient.get(`seller:${sellerId}`);
        const countData = await Seller.countDocuments({}); 

        if (redisCache) {
            const parsedCache = JSON.parse(redisCache);
            if (parsedCache.length === countData) {
                return res.status(200).json({ message: 'success', data: parsedCache });
            }
        }

        const collectionData = await Seller.find({ _id: sellerId }); 

        if (!collectionData || collectionData.length === 0) {
            return res.status(204).json({ message: 'No data available' });
        }

        await redisClient.setEx(`seller:${sellerId}`, 60 * 60, JSON.stringify(collectionData));

        return res.status(200).json({ message: 'success', data: collectionData });

    } catch (error) {
        console.error('Error fetching seller data:', error);
        return res.status(500).json({ message: 'Internal Error', error: error.message });
    }
};

module.exports = handleSeller;
