const axios = require('axios');

// Function to find the public IP address
const findPublicIP = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error('Error fetching public IP address:', error);
    }
};

// const getAddressFromCoords = async (a,b)=>{
//     try {
//         const resp = axios.get(`https://us1.locationiq.com/v1/reverse?key=${'pk.d5b02ada729a83058528948a6e066379'}&lat=${a}&lon=${b}&format=json&`)
//         const add = resp.data.display_name;
//         return add;
//     } catch (error) {
//         console.log(error)
//     }
// }

// Function to get the location based on IP address
const locationself = async (req, res) => {
    try {
        const myIP = await findPublicIP();  // Fetch the public IP
        console.log(myIP)
        if (!myIP) {
            return res.status(400).json({ error: 'Could not retrieve IP address' });
        }
        const response = await axios.get(`http://api.ipstack.com/${myIP}?access_key=${'d18e876aabade3a09ad5a00bf26a98f0'}`);
        res.status(200).json({ location: response.data });
        
        // lat=(response.data.latitude);
        // lon=(response.data.longitude);
        // const address = getAddressFromCoords(lat,lon);
        
        // const {lat}
    } catch (error) {
        console.error('Error in location retrieval:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = locationself;
