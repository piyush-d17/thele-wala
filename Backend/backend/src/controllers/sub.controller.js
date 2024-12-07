const subcDetail = async (req, res) => {
    try {
        // Add your logic here
        return res.status(200).json({ message: 'Work in progress' });
    } catch (error) {
        return res.status(400).json({ error: error.message || 'An error occurred while fetching subscription details' });
    }
};

const subsc = async (req, res) => {
    try {
        // Add your logic here
        return res.status(200).json({ message: 'Work in progress' });
    } catch (error) {
        return res.status(400).json({ error: error.message || 'An error occurred while processing subscription' });
    }
};

module.exports = { subcDetail, subsc };
