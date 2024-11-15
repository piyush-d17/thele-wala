const userModel = require('../models/user.model.js')

const registerUser = async (req, res) => {
    try {
        const { name, email, password,role ,aadhar,state,district,galiNumber,landmark,category,phone} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message:'Please enter all required fields' });
        }
        const newUser = await userModel.create({ name, email, password ,role,aadhar,state,district,galiNumber,landmark,category,phone});
        res.status(201).json({ newUser });
    } catch (error) {
        res.status(500).json({error:error, message: 'Registration failed' });
    }
}

const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({ message: 'Please enter all required fields' });
        }
        const findUser = await userModel.findOne({email})
        if(!findUser){
            return res.status(400).json({ message:'Please register first' });
        }
        const ismatch = await findUser.comparePassword
        (password);
        if(!ismatch){
            return res.status(400).json({ message:'Please enter correct password' });
        }
        const token = await findUser.createToken();
        res.status(202).json({user:findUser,token:token,message:'login successfully'})
    } catch (error) {
        res.status(500).json({error:error, message: 'login failed' });
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
};


module.exports = {registerUser,loginUser,logoutUser}