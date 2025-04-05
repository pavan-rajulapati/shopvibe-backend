const User = require('../../models/user.model')
const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')
const bcrypt = require('bcrypt')
const redisClient = require('../../middlewares/redis')
const setCookie = require('../../utils/cookies');

dotEnv.config()
const secret_key = process.env.SECRET_KEY;

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Fields required' });
    }

    try {
        const isExist = await User.findOne({ email });
        if (!isExist) {
            console.log('User does not exist:', email);
            return res.status(401).json({ message: 'You don\'t have an account' });
        }

        console.log('Stored Password:', isExist.password); 

        if (!isExist.password) {
            return res.status(500).json({ message: 'Password not stored in the database' });
        }

        const checkPass = await bcrypt.compare(password, isExist.password);
        if (!checkPass) {
            return res.status(401).json({ message: 'Invalid Authentication' });
        }

        const token = await jwt.sign({ userId: isExist._id }, secret_key, { expiresIn: '24h' });
        setCookie(res, token, process.env.NODE_ENV === 'production');
        await redisClient.setEx(`user:${isExist._id}`, 60 * 60, JSON.stringify(isExist));

        return res.status(200).json({ message: 'success', authToken: token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Error', error: error.message });
    }
};


module.exports = handleLogin