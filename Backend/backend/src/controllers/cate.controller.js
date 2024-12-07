const { Server } = require("socket.io"); 
const cateModel=require('../models/category.model.js')
const userModel=require('../models/user.model.js');
const orderModel=require('../models/order.model.js');

const addCategory = async (req, res) => {
    try {
      const categories = [
        {
          name: 'Beverages',
          subcategories: ['Water', 'Juice', 'Tea', 'Coffee', 'Milkshakes', 'Smoothies', 'Soda', 'Energy Drinks'],
        },
        {
          name: 'Healthy',
          subcategories: ['Vegetables', 'Fruit', 'Plant', 'Salads', 'Herbs', 'Whole Grains', 'Nuts', 'Legumes'],
        },
        {
          name: 'Desserts',
          subcategories: ['Ice Cream', 'Cake', 'Brownies', 'Cookies', 'Pastries', 'Pudding', 'Muffins', 'Donuts'],
        },
        {
          name: 'Miscellaneous',
          subcategories: ['Rag Picker', 'Potter', 'Bedsheets', 'Others', 'Toys', 'Utensils', 'Decor', 'Stationery'],
        },
        {
          name: 'Snacks',
          subcategories: ['Snacks', 'Chips', 'Popcorn', 'Biscuits', 'Crackers', 'Trail Mix', 'Pretzels', 'Granola Bars'],
        },
      ];
  
      // Insert multiple categories into the database
      await cateModel.create(categories);
  
      return res.status(200).json({ message: 'Categories added successfully!' });
    } catch (error) {
      console.error('Error adding categories:', error);
      return res.status(500).json({ error: 'Failed to add categories.', details: error.message });
    }
  };

const viewCategory=async(req,res)=>{
    try {
        const allCate=await cateModel.find({});
        return res.status(200).json({allcate:allCate});
    } catch (error) {
        return res.status(500).json({error:error});
    }
}

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // console.log(R*c);
  return R * c; // Distance in kilometers
};

const searchCategory = async (req, res, io) => {
  try {
    const { name, subcategories } = req.query;

    if (!name && !subcategories) {
      return res
        .status(400)
        .json({ error: "At least one query parameter (name or subcategories) is required." });
    }

    // Build the search query
    const searchQuery = {};
    if (name) {
      searchQuery.category = { $regex: name, $options: "i" }; // Case-insensitive match for category name
    }
    if (subcategories) {
      searchQuery["subcategories.subcategory"] = { $regex: subcategories, $options: "i" }; // Match subcategories
    }

    // Fetch sellers matching the query
    const sellersWithLocations = await userModel.find(searchQuery);

    // Send the initial response

    // Perform additional work after sending the response
    // process.nextTick(async () => {
      try {
        // Fetch the user's location from the database
        const user = await userModel.findOne({ email: req.user.email }); // Ensure req.user.email exists
        if (!user || !user.latitude || !user.longitude) {
          console.log("User location not found.");
          return;
        }

        const { latitude, longitude } = user;

        // Filter nearby sellers based on a threshold distance (e.g., 10 km)
        const nearbySellers = sellersWithLocations.filter((seller) => {
          if (!seller.latitude || !seller.longitude) return false; // Skip if seller location is missing
          const distance = haversineDistance(
            parseFloat(latitude),
            parseFloat(longitude),
            parseFloat(seller.latitude),
            parseFloat(seller.longitude)
          );
          return distance ; // Threshold distance in kilometers
        });
        if (nearbySellers.length === 0) {
          return res.status(404).json({sellersWithLocations, error: 'No sellers found within 5km of your location.' });
        }
        io.to(nearbySellers.map((seller) => seller.userModel)).emit('newOrder', {
          buyer: req.user.userId,
          searchQuery,
          address: {
              latitude: latitude,
              longitude: longitude,
          }
        });
        let acceptedSellerId = null;
        io.once('orderAccepted', (data) => {
            acceptedSellerId = data.sellerId; 
        });
        const interval = setInterval(() => {
          if (acceptedSellerId) {
              clearInterval(interval); // Stop checking
          }
        }, 500);
        setTimeout(async () => {
          if (!acceptedSellerId) {
              return res.status(408).json({ sellersWithLocations:sellersWithLocations,error: 'No sellers accepted the order in time.' });
          }
          const newOrder = await orderModel.create({
              buyer: req.user.userId,
              seller: acceptedSellerId,
              searchQuery,
          });
          res.status(201).json({ sellersWithLocations:sellersWithLocations,message: 'Order created successfully', newOrder });
        }, 100);
        // console.log("Nearby sellers:", nearbySellers);
      } catch (err) {
        console.error("Error finding nearby sellers:", err);
      }
    // });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports={addCategory,viewCategory,searchCategory}