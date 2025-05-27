const menuModel = require("../models/menuModel.model.js");
const userModel = require("../models/user.model.js");
const orderModel = require('../models/order.model.js')
const mailNotification = require("../utils/mail.js");
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const R = 6371; // Radius of Earth in km

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
};
const addOrders = async (req, res) => {
  try {
    const { name, subcategories } = req.body;

    // Validate that at least one query parameter is provided
    if (!name && !subcategories) {
      return res.status(400).json({
        error:
          "At least one query parameter (name or subcategories) is required.",
      });
    }

    // Construct the search query based on the provided parameters
    const searchQuery = {};
    if (name) {
      searchQuery.name = { $regex: name, $options: "i" };
    }
    if (subcategories) {
      searchQuery.subcategories = { $regex: subcategories, $options: "i" };
    }

    // Find sellers that match the search query
    const sellers = await menuModel.find(searchQuery).populate("author");
    if (!sellers || sellers.length === 0) {
      return res.status(404).json({ message: "No sellers found." });
    }

    // Find the user's location
    const user = await userModel.findOne({ email: req.user.email });
    if (!user || !user.latitude || !user.longitude) {
      return res.status(400).json({ error: "User location not found." });
    }

    const { latitude, longitude } = user;
    const nearbySellers = sellers.filter((seller) => {
      if (!seller.author.latitude || !seller.author.longitude)
        return res.status(500).json("NO location found for this seller");
      return haversineDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        parseFloat(seller.author.latitude),
        parseFloat(seller.author.longitude)
      ); // here you can restict radius
    });
    if (nearbySellers.length === 0) {
      return res
        .status(404)
        .json({ error: "No sellers found within 5 km of your location." });
    }
    const orders = await orderModel.insertMany([
        {
          buyer: req.user.userId, // Buyer ID from the authenticated user
          sellers: nearbySellers.map((seller) => ({
            seller: seller._id, // Seller ID
            status: "pending", // Default status for each seller
          })),
          items: [
            {
              category: name || "Unknown Category", // Category from the request or a default value
              // quantity: 1, // Optional: Add quantity if needed
            },
          ],
          // totalAmount: 0, // Optional: Add total amount if needed
          status: "pending", // Overall order status
          paymentStatus: "pending", // Payment status
          createdAt: new Date(), // Timestamp
        },
      ]);
      mailNotification();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error in addOrders:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const AllOrders = async (req, res) => {
    try {
      const userId = req.user.userId; // Authenticated user's ID
  
      // Fetch all orders where the user is either the buyer or one of the sellers
      const orders = await orderModel
        .find({
          $or: [
            { buyer: userId }, // User is the buyer
            { "sellers.seller": userId }, // User is one of the sellers
          ],
        })
        .populate("buyer", "name email") // Populate buyer details
        .populate("sellers.seller", "name email"); // Populate seller details
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found." });
      }
  
      return res.status(200).json({ orders });
    } catch (error) {
      console.error("Error in AllOrders:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  };

module.exports = { AllOrders, addOrders };
