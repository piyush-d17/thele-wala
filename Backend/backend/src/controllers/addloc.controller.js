const locModel = require('../models/location.model.js');

const addloc = async (req, res) => {
  try {
    const { state, district, galiNumber, landmark, userId } = req.body;

    // Create the location with the user reference
    const newLoc = await locModel.create({
      state,
      district,
      galiNumber,
      landmark,
      user: userId
    });

    // Populate the user field on the new location
    const populatedLoc = await locModel.findById(newLoc._id).populate('user');

    res.status(201).json({ location: populatedLoc, message: 'Location added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message, message: 'Adding location failed' });
  }
};



module.exports = addloc;
