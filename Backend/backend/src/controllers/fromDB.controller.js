const userModel = require('../models/user.model.js');

const viewData = async (req,res)=>{
    try {
        const allUser = await userModel.find();
        return res.status(200).json({allUsers: allUser});
    } catch (error) {
        res.status(400).json({error:error});
    }
}
const view = async(req,res)=>{
    try {
        res.status(200).json({role:req.user.role});
    } catch (error) {
        res.status(400).json({error:error});
    }
}
const allBuyers = async (req, res) => {
    try {
        const allBuys = await userModel
            .find({ role: 'buyer' })
            .populate('location')
        return res.status(200).json({ all_Buyers: allBuys });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};


const allseller = async (req, res) => {
    try {
        const allsells = await userModel.find({ role: 'seller' })
        //.populate('location');
        // console.log(allsells)
        return res.status(200).json({ all_sellers: allsells });
    } catch (error) {
        console.error('Error fetching sellers:', error);
        return res.status(400).json({ error: error.message });
    }
};

const viewDataOne = async (req,res)=>{
    try {
        const id = req.params.id;
        const singUser = await userModel.findById(id);
        if(!singUser){
            return res.status(404).json({error:'User not found'});
        }
        return res.status(200).json({single_User : singUser})
        
    } catch (error) {
        res.status(400).json({error:error});
    }
}
const updateData = async (req,res)=>{
    try {
        const id = req.params.id;
        const update = req.body;
        const upUser=await userModel.findByIdAndUpdate(id,update,{new:true})
        if(!upUser){
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ updated_User: upUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const deleteData = async (req,res)=>{
    try {
        const id = req.params.id;
        const delUser = await userModel.findByIdAndDelete(id);
        if(!delUser){
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ deleted_User: delUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {viewData,view,allBuyers,allseller,viewDataOne,updateData,deleteData}