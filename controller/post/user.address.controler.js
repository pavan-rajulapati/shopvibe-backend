const UserAddress = require('../../models/userAddress.model');
const redisClient = require('../../middlewares/redis');
const sendResponse = require('../../controller/post/sendResponse');

const handleUserAddress = async (req, res) => {
    const {name, mobileNumber, landMark, street, city, pincode, state, country, holderName, bankName, accountNumber, ifscCode } = req.body;

    if (!name || !mobileNumber || !landMark || !street || !city || !pincode || !state || !country) {
        return sendResponse(res, 400, 'error', 'Fields required');
    }

    try {
        const userId = req.user?._id; 
        if (!userId) {
            return sendResponse(res, 401, 'error', 'Unauthorized: Token required');
        }

        const userAddress = new UserAddress({
            userId: userId,
            address: {
                name,
                mobileNumber,
                landMark,
                street,
                city,
                pincode,
                state,
                country,
            },
            bankDetails: {
                holderName,
                bankName,
                accountNumber,
                ifscCode,
            },
        });

        const savedUserAddress = await userAddress.save();

        try {
            await redisClient.setEx(
                `userAddress:${userId}`,
                60 * 60,
                JSON.stringify(savedUserAddress)
            );
        } catch (redisError) {
            console.error('Error saving to Redis:', redisError);
        }

        sendResponse(res, 200, 'success', 'User address saved successfully', savedUserAddress);
    } catch (error) {
        console.error('Error saving user address:', error);
    }
};

module.exports = handleUserAddress;
