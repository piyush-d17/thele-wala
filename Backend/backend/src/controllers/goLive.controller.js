const axios = require('axios');
const goliveRouter = require('../routes/goliveRouter');

const findPublicIP = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error('Error fetching public IP address:', error);
        return null;
    }
};

const goLivecontroller = async (req,res)=>{
    try {
        const myIP = await findPublicIP();
        if (!myIP) {
            return res.status(400).json({ error: 'Could not retrieve public IP address' });
        }
        const response = await axios.get(
            `http://api.ipstack.com/${myIP}?access_key=${process.env.IPSTACK_API_KEY1}`
        );
        const { ip,latitude, longitude } = response.data;
        res.status(200).json({ip:ip,latitude:latitude,longitude:longitude});
    } catch (error) {
        res.status(404).json({error:error});
    }
}

module.exports = goLivecontroller;