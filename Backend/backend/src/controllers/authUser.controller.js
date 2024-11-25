const userModel = require('../models/user.model.js')

const registerUser = async (req, res) => {
    try {
        const { name, email, password,role ,aadhar,state,district,galiNumber,landmark,category,phone} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message:'Please enter all required fields' });
        }
        console.log('Received Data:', req.body);
        const newUser = await userModel.create({ name, email, password ,role,aadhar,state,district,galiNumber,landmark,category,phone});
        res.status(201).json({ newUser });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({error:error, message: 'Registration failed' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all required fields' });
        }

        // Find user by email
        const findUser = await userModel.findOne({ email });
        if (!findUser) {
            return res.status(400).json({ message: 'Please register first' });
        }

        // Check if the provided password matches
        const ismatch = await findUser.comparePassword(password);
        if (!ismatch) {
            return res.status(400).json({ message: 'Please enter correct password' });
        }
        const token = await findUser.createToken();

        // Set the token in an HTTP-only cookie
        return res.status(202).cookie('token', token, {
            httpOnly: true,
            maxAge: 1*24*60*60*1000,   
            sameSite: 'strict',
        }).json({
            user: findUser,
            message: 'Login successful'
        });;
        

    } catch (error) {
        res.status(500).json({ error: error, message: 'Login failed' });
    }
};


const logoutUser = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
};


module.exports = {registerUser,loginUser,logoutUser}