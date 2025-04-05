const User = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const setCookie = require('../../utils/cookies');

dotenv.config();
const secret_key = process.env.SECRET_KEY;

const handleGoogleLogin = async (req, res) => {
    const { email, googleUid } = req.body;

    if (!email || !googleUid) {
        console.error('Missing fields:', { email, googleUid });
        return res.status(400).json({ message: 'Fields required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.error('User not found for email:', email);
            return res.status(401).json({ message: 'You don\'t have an account ' });
        }

        const checkId = await bcrypt.compare(googleUid, user.googleUid);
        if (!checkId) {
            console.error('Google UID does not match for user:', email);
            return res.status(401).json({ message: 'Unauthorized user' });
        }

        const token = await jwt.sign({ userId: user._id }, secret_key, { expiresIn: '24h' });
        console.log('Token generated:', token);

        setCookie(res, token, process.env.NODE_ENV === 'production');
        console.log('Cookie set successfully.');

        return res.status(200).json({ message: 'success', authToken: token });
    } catch (error) {
        console.error('Error in handleGoogleLogin:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};



module.exports = handleGoogleLogin;
