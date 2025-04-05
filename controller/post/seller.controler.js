const Seller = require('../../models/seller.model');
const User = require('../../models/user.model');
const redisClient = require('../../middlewares/redis');
const sendResponse = require('./sendResponse')

const handleSeller = async (req, res) => {
    const {
        name, email, mobileNumber, profilePic, street, city, pincode, state, country,
        holderName, bankName, accountNumber, ifscCode
    } = req.body;

    if (
        !name || !email || !mobileNumber || !street || !city || !pincode || !state ||
        !country || !holderName || !bankName || !accountNumber || !ifscCode
    ) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Authentication required.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        if (user.isSeller) {
            return res.status(409).json({ success: false, message: 'You are already registered as a seller.' });
        }

        const existingSeller = await Seller.findOne({ 'personalInfo.email': email });
        if (existingSeller) {
            return res.status(409).json({ success: false, message: 'A seller with this email already exists.' });
        }

        const newSeller = new Seller({
            personalInfo: {
                userId: user._id,
                name,
                email,
                mobileNumber,
                profilePic,
            },
            address: {
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

        await newSeller.save();
        user.isSeller = true;
        await user.save();

        try {
            await redisClient.set(
                `seller:${newSeller._id}`,
                JSON.stringify(newSeller),
                'EX',
                3600
            );
        } catch (redisError) {
            console.error('Redis caching failed:', redisError.message);
        }

        return res.status(201).json({ success: true, message: 'Seller registered successfully', seller: newSeller });
    } catch (error) {
        console.error('Error saving seller:', error.message);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

module.exports = handleSeller;
