const userModel = require('../models/user.model.js');

const subscription = async (req, res, next) => {
    try {
        const email = req.user?.email; // Optional chaining to avoid errors if req.user is undefined
        if (!email) {
            return res.status(400).json({ msg: 'User not authenticated' });
        }

        const user = await userModel.findOne({ email });

        if (user?.subscription) {
            // Proceed to the next middleware or route handler
            return next();
        }

        return res.status(400).json({ msg: 'Subscribe first' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = subscription;
