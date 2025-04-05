const User = require('../../models/user.model');
const redisClient = require('../../middlewares/redis');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const setCookie = require('../../utils/cookies');

dotenv.config();
const secret_key = process.env.SECRET_KEY;

const handleSignup = async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({ message: 'Fields required' });
    }

    try {
        let isExist = await User.findOne({ email });
        if (isExist) {
            return res.status(409).json({ message: 'Email already existed, please login' });
        }

        let hashedPass = await bcrypt.hash(password, 10);

        const user = new User({
            userName,
            email,
            password: hashedPass
        });

        let savedUser = await user.save();

        const token = jwt.sign({ userId: savedUser._id }, secret_key, { expiresIn: '24h' });

        await redisClient.setEx(`user:${savedUser._id}`, 60 * 60, JSON.stringify(savedUser));

        setCookie(res, token, process.env.NODE_ENV === 'production');
        return res.status(200).json({ message: 'Success', authToken : token });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error', error: error.message });
    }
};

module.exports = handleSignup;
