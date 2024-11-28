const locationModel=require('../models/location.model.js');

const getlocContr=async(req,res)=>{
    try {
        const all=await locationModel.find({});
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

        // Check if the record already exists
        const existingLocation = await locationModel.findOne({ latitude, longitude, ip });
        if (existingLocation) {
            return res.status(409).json({ msg: 'Coordinates with this IP already exist.' });
        }

        // Create a new record
        await locationModel.create({ latitude, longitude, ip });
        return res.status(201).json({ msg: 'Coordinates added successfully.' });
    } catch (error) {
        console.error('Error adding location:', error);
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
        const updatedLocation = await locationModel.findByIdAndUpdate(
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