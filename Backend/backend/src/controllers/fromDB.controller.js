const User = require('../models/user.model.js');
const Location = require('../models/location.model.js');

const allUsersWithLocations = async (req, res) => {
    try {
        // Use aggregation to fetch all users and populate their associated location
        const usersWithLocations = await User.aggregate([
            {
                $lookup: {
                    from: 'locations',  // Name of the Location collection (lowercase 'locations')
                    localField: '_id',  // The _id of User (this will be compared with the user field in Location)
                    foreignField: 'user',  // The user field in Location model
                    as: 'location'  // The alias name for the populated location data
                }
            },
            {
                $unwind: {
                    path: '$location',  // Unwind the location array to flatten it
                    preserveNullAndEmptyArrays: true  // In case there is no location associated with the user
                }
            }
        ]);

        // Return the response with all users and their corresponding location data
        res.status(200).json({ all_users_with_locations: usersWithLocations });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};
const view = async(req,res)=>{
    try {
        res.status(200).json({role:req.user.role});
    } catch (error) {
        res.status(400).json({error:error});
    }
}
const allBuyersWithLocations = async (req, res) => {
    try {
        // Use aggregation to fetch all buyers and their associated location
        const buyersWithLocations = await User.aggregate([
            {
                $match: { role: 'buyer' }  // Match only users with the role 'buyer'
            },
            {
                $lookup: {
                    from: 'locations',  // Name of the Location collection (lowercase 'locations')
                    localField: '_id',  // The _id of User (this will be compared with the user field in Location)
                    foreignField: 'user',  // The user field in Location model
                    as: 'location'  // The alias name for the populated location data
                }
            },
            {
                $unwind: {
                    path: '$location',  // Unwind the location array to flatten it
                    preserveNullAndEmptyArrays: true  // In case there is no location associated with the user
                }
            }
        ]);

        // Return the response with all buyers and their corresponding location data
        res.status(200).json({ all_buyers_with_locations: buyersWithLocations });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};


const allSellersWithLocations = async (req, res) => {
    try {
        // Use aggregation to fetch all sellers and their associated location
        const sellersWithLocations = await User.aggregate([
            {
                $match: { role: 'seller' }  // Match only users with the role 'seller'
            },
            {
                $lookup: {
                    from: 'locations',  // Name of the Location collection (lowercase 'locations')
                    localField: '_id',  // The _id of User (this will be compared with the user field in Location)
                    foreignField: 'user',  // The user field in Location model
                    as: 'location'  // The alias name for the populated location data
                }
            },
            {
                $unwind: {
                    path: '$location',  // Unwind the location array to flatten it
                    preserveNullAndEmptyArrays: true  // In case there is no location associated with the user
                }
            }
        ]);

        // Return the response with all sellers and their corresponding location data
        res.status(200).json({ all_sellers_with_locations: sellersWithLocations });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

const viewDataOne = async (req,res)=>{
    try {
        const id = req.params.id;
        const singUser = await User.findById(id);
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
        const upUser=await User.findByIdAndUpdate(id,update,{new:true})
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
        const delUser = await User.findByIdAndDelete(id);
        if(!delUser){
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ deleted_User: delUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {allUsersWithLocations,view,allBuyersWithLocations,allSellersWithLocations,viewDataOne,updateData,deleteData}