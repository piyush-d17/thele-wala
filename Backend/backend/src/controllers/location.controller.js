const axios = require('axios');
const Location = require('../models/location.model');

// Helper function to fetch the public IP
const findPublicIP = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error('Error fetching public IP address:', error);
        return null;
    }
};

const locationself = async (req, res) => {
    try {
        const myIP = await findPublicIP();
        if (!myIP) {
            return res.status(400).json({ error: 'Could not retrieve public IP address' });
        }
        const id = req.user.userId;
        const response = await axios.get(`http://api.ipstack.com/${myIP}?access_key=${process.env.IPSTACK_API_KEY}`);
        if (response.status !== 200) {
            return res.status(400).json({ error: 'Could not retrieve location data' });
        }

        // Step 3: Log the response to check its structure
        console.log('API Response:', response.data);

        // Step 4: Check if location data is present and then destructure
        const { ip, region_code, city, latitude, longitude, location } = response.data;

        if (!location) {
            return res.status(400).json({ error: 'Location data is missing' });
        }

        const { capital } = location; // Destructure 'capital' if 'location' is present

        // Step 5: Create a new Location document and save it
        const newLocation = new Location({
            user: id, // Save the user _id here
            ip,
            region_name: region_code,
            city,
            latitude: latitude.toString(),  // Store latitude and longitude as strings (or use numbers if needed)
            longitude: longitude.toString(),
            capital: capital ? capital.toString() : 'Unknown', // Ensure capital is available
        });

        await newLocation.save();

        // Step 6: Return the saved location data as response
        res.status(200).json(newLocation);

    } catch (error) {
        console.error('Error in location retrieval:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = locationself;
