const onlybuyer = async (req,res,next)=>{
    try {
        if(req.user.role == 'buyer') {next();}
        return res.status(505).json({msg:"Invalid access"});
    } catch (error) {
        return res.status(400).json({error:error});
    }
}
module.exports=onlybuyer;