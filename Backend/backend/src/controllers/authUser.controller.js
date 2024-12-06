const userModel = require('../models/user.model.js')

const registerUser = async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        role,
        aadhar,
        category,
        phone,
        subcategories,
      } = req.body;
  
      // Validate required fields
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please enter all required fields' });
      }
  
      console.log('Received Data:', req.body);
  
      // Create the new user with all fields
      const newUser = await userModel.create({
        name,
        email,
        password,
        role,
        aadhar,
        category,
        phone,
        subcategories,
      });
  
      res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (error) {
      console.error('Error in registerUser:', error);
  
      // Handle duplicate email error
      if (error.code === 11000 && error.keyValue.email) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
  
      res.status(500).json({ error, message: 'Registration failed' });
    }
  };
  

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

        // Generate token
        const token = await findUser.createToken();

        // Set the token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,    // Prevents access to the cookie via JavaScript
            secure: process.env.NODE_ENV === 'production', // Secure cookie in production (requires HTTPS)
            maxAge: 3600000,   // Cookie expiration time (1 hour here, adjust as needed)
            sameSite: 'strict', // To prevent CSRF attacks (optional)
        });
        res.status(202).json({
            message: `${email} login successfull`
        });

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