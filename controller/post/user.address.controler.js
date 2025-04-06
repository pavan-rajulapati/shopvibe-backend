const UserAddress = require('../../models/userAddress.model');
const setRedisCache = require('../../utils/setRedisCache')

const handleUserAddress = async (req, res) => {
    const {name, mobileNumber, landMark, street, city, pincode, state, country, holderName, bankName, accountNumber, ifscCode } = req.body;

    if (!name || !mobileNumber || !landMark || !street || !city || !pincode || !state || !country) {
        return res.json({success : false, message : "Fields Required"});
    }

    try {
        const userId = req.user?._id; 
        if (!userId) {
            return res.json({success : false, message : "Unauthorized"})
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
            await setRedisCache(
                `userAddress:${userId}`,
                savedUserAddress,
                60 * 60
            );
        } catch (redisError) {
            console.error('Error saving to Redis:', redisError);
        }

        return res.json({success : true, message : "success"})
    } catch (error) {
        return res.json({success : false, message : "Internal Error"})
        console.error('Error saving user address:', error);
    }
};

module.exports = handleUserAddress;
