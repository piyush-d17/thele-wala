const locationModel=require('../models/location.model.js');
const usermodel=require('../models/user.model.js');

const getlocContr=async(req,res)=>{
    try {
        const all=await usermodel.find({});
        return res.status(200).json({all:all});
    } catch (error) {
        return res.status(400).json({error:error});
    }
}
const addlocContr = async (req, res) => {
    try {
        const { latitude, longitude, ip } = req.body;

        if (!latitude || !longitude || !ip) {
            return res.status(400).json({ msg: 'Please provide valid coordinates and IP address.' });
        }
        const role=req.user.role;
        const email=req.user.email;
        const phone=req.user.phone;

        const role = req.user.role;
        const email = req.user.email;
        const phone = req.user.phone;

        // Check if the record with the same IP already exists
        const existingLocation = await usermodel.findOne({ email });

        // if (existingLocation) {
        //     // Update the existing record with new latitude and longitude
        //     existingLocation.latitude = latitude;
        //     existingLocation.longitude = longitude;
        //     existingLocation.ip = ip;
        //     await existingLocation.save();

        //     return res.status(200).json({ msg: 'Coordinates updated successfully.', updatedLocation: existingLocation });
        // }
        existingLocation.latitude = latitude;
        existingLocation.longitude = longitude;
        existingLocation.ip = ip;
        await existingLocation.save();
        // If no record exists, create a new one
        // const newLocation = await usermodel.create({ latitude, longitude, ip });
        return res.status(201).json({ msg: 'Coordinates added successfully.', existingLocation });
    } catch (error) {
        console.error('Error adding/updating location:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

const uplocContr = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if ID exists in the request
        if (!id) {
            return res.status(400).json({ msg: "Location ID is required." });
        }

        // Update the location with validation
        const updatedLocation = await usermodel.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true } // Return the updated document and run schema validators
        );

        // If no location found with the provided ID
        if (!updatedLocation) {
            return res.status(404).json({ msg: "Location not found." });
        }

        return res.status(200).json({ msg: "Update successful", data: updatedLocation });
    } catch (error) {
        console.error('Error updating location:', error);

        // Handle invalid MongoDB ObjectID errors
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ msg: "Invalid Location ID." });
        }

        // Handle any other errors
        return res.status(500).json({ error: "Internal server error." });
    }
};


module.exports={getlocContr,addlocContr,uplocContr}