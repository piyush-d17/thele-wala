const { instance } = require('../../server.js');
const crypto = require('crypto');
const subsc = async (req, res) => {
    try {
        const { amount, currency, reciept, notes } = req.body;

        // Validate input fields
        if (!amount || !currency || !reciept) {
            return res.status(400).json({ error: 'Required fields are missing.' });
        }

        // Ensure notes is an object or array
        const formattedNotes = typeof notes === 'object' ? notes : {};

        // Create order
        instance.orders.create(
            { 
                amount, 
                currency, 
                receipt: reciept, 
                notes: formattedNotes 
            },
            (err, order) => {
                if (!err) {
                    res.json(order);
                } else {
                    res.status(500).json({ error: 'Order creation failed.', details: err });
                }
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong.', details: error.message });
    }
};


const payOrder = async (req, res) => {
    const {order_id, payment_id} = req.body;     
    const razorpay_signature =  req.headers['x-razorpay-signature'];

    const key_secret = process.env.key_secret;     

    // STEP 8: Verification & Send Response to User
    
    // Creating hmac object 
    let hmac = crypto.createHmac('sha256', key_secret); 

    // Passing the data to be hashed
    hmac.update(order_id + "|" + payment_id);
    
    // Creating the hmac in the required format
    const generated_signature = hmac.digest('hex');
    
    
    if(razorpay_signature===generated_signature){
        res.json({success:true, message:"Payment has been verified"})
    }
    else
    res.json({success:false, message:"Payment verification failed"})

};

module.exports = { subsc, payOrder };
