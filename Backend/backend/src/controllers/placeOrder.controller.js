// const { Server } = require("socket.io"); 
// const orderModel = require('../models/order.model.js');
// const locationModel = require('../models/location.model.js'); 

// function haversineDistance(lat1, lon1, lat2, lon2) {
//     const toRadians = (degrees) => degrees * (Math.PI / 180);
//     const R = 6371; // Radius of the Earth in km
//     const dLat = toRadians(lat2 - lat1);
//     const dLon = toRadians(lon2 - lon1);
    
//     const a =
//         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//         Math.cos(toRadians(lat1)) *
//         Math.cos(toRadians(lat2)) *
//         Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
//     return R * c; // Distance in km
// }

// const buyerLattLong = async (buy_id) => {
//     try {
//         const buyerloc = await locationModel.findOne({ user: buy_id });
//         if (!buyerloc) { throw new Error('Buyer location not found'); }
//         const { longitude, latitude, city } = buyerloc; 
//         return { longitude, latitude, city };
//     } catch (error) {
//         console.error('Error getting buyerLattLong:', error.message);
//         throw new Error('Internal server error');
//     }
// };

// const placeOrder = async (req, res,io) => {
//     try {
//         const buyId = req.user.userId;
//         const Srole = req.user.role;
//         const { items, totalAmount } = req.body;
//         if (!buyId || !items || !totalAmount) {
//             return res.status(400).json({ error: 'Buyer, items, and total amount are required.' });
//         }
//         const { longitude, latitude, city } = await buyerLattLong(buyId);
//         if (!longitude || !latitude || !city) {
//             return res.status(400).json({
//                 error: 'Buyer coordinates (latitude and longitude) and city are required.',
//             });
//         }
//         const citySellers = await locationModel.find({ city: new RegExp(`^${city}$`, 'i') , role:Srole});
//         // console.log(latitude,"---buyer--",longitude);
//         const nearbySellers = citySellers.filter((seller) => {
//             // console.log(seller.latitude,"---seller--" , seller.longitude );

//             const distance = haversineDistance(
//                 parseFloat(latitude),
//                 parseFloat(longitude),
//                 parseFloat(seller.latitude),
//                 parseFloat(seller.longitude)
//             );
//             console.log(`Distance: ${distance.toFixed(2)} km`);
//             return distance  ;
//         });
//         if (nearbySellers.length === 0) {
//             return res.status(404).json({ error: 'No sellers found within 5km of your location.' });
//         }
//         // Emit to all nearby sellers about the new order
//         // Emit to all nearby sellers about the new order with buyer's address
//         io.to(nearbySellers.map((seller) => seller.user.toString())).emit('newOrder', {
//             buyer: buyId,
//             items,
//             totalAmount,
//             address: {
//                 latitude: latitude,
//                 longitude: longitude,
//                 city: city
//             }
//         });


//         // Wait for seller acceptance
//         let acceptedSellerId = null;
//         io.once('orderAccepted', (data) => {
//             acceptedSellerId = data.sellerId; // Capture sellerId when accepted
//         });

//         const interval = setInterval(() => {
//             if (acceptedSellerId) {
//                 clearInterval(interval); // Stop checking
//             }
//         }, 500);

//         setTimeout(async () => {
//             if (!acceptedSellerId) {
//                 return res.status(408).json({ error: 'No sellers accepted the order in time.' });
//             }

//             // Create order with the accepted seller ID
//             const newOrder = await orderModel.create({
//                 buyer: buyId,
//                 seller: acceptedSellerId,
//                 items,
//                 totalAmount,
//             });

//             res.status(201).json({ message: 'Order created successfully', newOrder });
//         }, 10000); // Timeout after 10 seconds if no response from sellers
//     } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// module.exports = placeOrder;

// /*
// to use socket.io for accept order message
// socket.on('newOrder', (orderDetails) => {
//     console.log('New order received:', orderDetails);
//     // Display the order details to the seller and provide an "Accept" button
// });

// // Seller accepts the order:
// document.getElementById('acceptButton').addEventListener('click', () => {
//     socket.emit('orderAccepted', { sellerId: currentSellerId });
// });


// */
