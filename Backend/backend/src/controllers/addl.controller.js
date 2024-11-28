const locationModel=require('../models/location.model.js');

const getlocContr=async(req,res)=>{
    try {
        const all=await locationModel.find();
        return res.status(200).json({all:all});
    } catch (error) {
        
    }
}
const addlocContr=async(req,res)=>{
    try {
        const {latitude,longitude}=req.body;
        if(!latitude || !longitude){
            return res.status(400).json({msg:'provide coordinates'});
        }
        await locationModel.create({latitude,longitude});
        return res.status(200).json({msg:'coordinates added'});
    } catch (error) {
        return res.status(400).json({error:error});
    }
}
const uplocContr=async(req,res)=>{
    try {
        const id = req.params.id;
        const loc=await locationModel.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
        return res.status(200).json({msg:"update successfully"})
    } catch (error) {
        return req.status(400).json({error:error});
    }
}

module.exports={getlocContr,addlocContr,uplocContr}