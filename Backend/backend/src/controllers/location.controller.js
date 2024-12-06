// const axios = require('axios');
// const Location = require('../models/location.model');

// // Helper function to fetch the public IP
// const findPublicIP = async () => {
//     try {
//         const response = await axios.get('https://api.ipify.org?format=json');
//         return response.data.ip;
//     } catch (error) {
//         console.error('Error fetching public IP address:', error);
//         return null;
//     }
// };

// const locationself = async (req, res) => {
//     try {
//         // Step 1: Get the public IP address
//         const myIP = await findPublicIP();
//         if (!myIP) {
//             return res.status(400).json({ error: 'Could not retrieve public IP address' });
//         }

//         // Step 2: Get user details
//         const id = req.user.userId;
//         const role = req.user.role;

//         // Step 3: Fetch location data from ipstack API
//         const response = await axios.get(
//             `http://api.ipstack.com/${myIP}?access_key=${process.env.IPSTACK_API_KEY}`
//         );

//         if (response.status !== 200 || !response.data) {
//             return res.status(400).json({ error: 'Could not retrieve location data' });
//         }

//         const { ip, region_code, city, latitude, longitude, location } = response.data;
//         console.log(response.data);
//         if (!location) {
//             return res.status(400).json({ error: 'Location data is missing' });
//         }
//         const { capital } = location;

//         // Step 4: Check for duplicate IPs in the database
//         const existingLocation = await Location.findOne({ ip });
//         if (existingLocation) {
//             // Update the existing location document instead of creating a new one
//             existingLocation.user = id;
//             existingLocation.role = role;
//             existingLocation.region_name = region_code;
//             existingLocation.city = city;
//             existingLocation.latitude = latitude.toString();
//             existingLocation.longitude = longitude.toString();
//             existingLocation.capital = capital ? capital.toString() : 'Unknown';

//             await existingLocation.save();
//             return res.status(200).json({
//                 message: 'Location updated successfully',
//                 location: existingLocation,
//             });
//         }

//         // Step 5: Create a new location document
//         const newLocation = await Location.create({
//             user: id,
//             role: role,
//             ip,
//             region_name: region_code,
//             city,
//             latitude: latitude.toString(),
//             longitude: longitude.toString(),
//             capital: capital ? capital.toString() : 'Unknown',
//         });

//         res.status(200).json({
//             message: 'Location added successfully',
//             location: newLocation,
//         });
//     } catch (error) {
//         console.error('Error in location retrieval:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// module.exports = locationself;
