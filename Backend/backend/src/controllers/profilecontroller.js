const userModel = require('../models/user.model.js');

const myProfile = async(req,res)=>{
    try {
        const user = await userModel.findById(req.user.userId);
        if(!user) return res.status(400).json({msg:"No user Available"});
        return res.status(200).json({user:user});
    } catch (error) {
        return res.status(400).json({error:error});
    }
}

module.exports = {myProfile}