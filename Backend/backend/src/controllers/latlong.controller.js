const locationModel = require('../models/location.model');
const latlong = async(req,res)=>{
    try {
        const id = await req.user.userId;
        const loca = await locationModel.findOne({user:id});
        return res.status(200).json({lat:loca.latitude,long:loca.longitude});
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = latlong;