const { Server } = require("socket.io");
const cateModel = require("../models/category.model.js");
const userModel = require("../models/user.model.js");
const orderModel = require("../models/order.model.js");

const addCategory = async (req, res) => {
  try {
    const categories = [
      {
        name: "Beverages",
        subcategories: [
          "Water",
          "Juice",
          "Tea",
          "Coffee",
          "Milkshakes",
          "Smoothies",
          "Soda",
          "Energy Drinks",
        ],
      },
      {
        name: "Healthy",
        subcategories: [
          "Vegetables",
          "Fruit",
          "Plant",
          "Salads",
          "Herbs",
          "Whole Grains",
          "Nuts",
          "Legumes",
        ],
      },
      {
        name: "Desserts",
        subcategories: [
          "Ice Cream",
          "Cake",
          "Brownies",
          "Cookies",
          "Pastries",
          "Pudding",
          "Muffins",
          "Donuts",
        ],
      },
      {
        name: "Miscellaneous",
        subcategories: [
          "Rag Picker",
          "Potter",
          "Bedsheets",
          "Others",
          "Toys",
          "Utensils",
          "Decor",
          "Stationery",
        ],
      },
      {
        name: "Snacks",
        subcategories: [
          "Snacks",
          "Chips",
          "Popcorn",
          "Biscuits",
          "Crackers",
          "Trail Mix",
          "Pretzels",
          "Granola Bars",
        ],
      },
    ];

    await cateModel.insertMany(categories);
    return res.status(200).json({ message: "Categories added successfully!" });
  } catch (error) {
    console.error("Error adding categories:", error);
    return res
      .status(500)
      .json({ error: "Failed to add categories.", details: error.message });
  }
};

const viewCategory = async (req, res) => {
  try {
    const allCategories = await cateModel.find({});
    return res.status(200).json({ categories: allCategories });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

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

const searchCategory = async (req, res) => {
  try {
    const { name, subcategories } = req.body;
    if (!name && !subcategories) {
      return res
        .status(400)
        .json({
          error:
            "At least one query parameter (name or subcategories) is required.",
        });
    }

    const searchQuery = {};
    if (name) {
      searchQuery.category = { $regex: name, $options: "i" };
    }
    if (subcategories) {
      searchQuery["subcategories.subcategory"] = {
        $regex: subcategories,
        $options: "i",
      };
    }

    const sellersWithLocations = await userModel.find(searchQuery);
    const user = await userModel.findOne({ email: req.user.email });

    if (!user || !user.latitude || !user.longitude) {
      return res.status(400).json({ error: "User location not found." });
    }

    const { latitude, longitude } = user;
    const nearbySellers = sellersWithLocations.filter((seller) => {
      if (!seller.latitude || !seller.longitude) return false;
      return (
        haversineDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          parseFloat(seller.latitude),
          parseFloat(seller.longitude)
        ) <= 100000005
      ); // 5 km radius
    });

    if (nearbySellers.length === 0) {
      return res
        .status(404)
        .json({ error: "No sellers found within 5 km of your location." });
    }

    const orders = await orderModel.insertMany(
      nearbySellers.map((seller) => ({
        buyer: req.user.userId, // Ensure `req.user.userId` is correctly set
        seller: seller._id,
        items: [
          {
            category: name || "Unknown Category",
            quantity: 1, // Default quantity (update as needed)
          },
        ],
        totalAmount: 0, // Set total amount dynamically if applicable
        status: "pending", // Default status
        createdAt: new Date(),
      }))
    );

    return res.status(200).json({ sellers: nearbySellers, orders });
  } catch (error) {
    console.error("Error searching for category:", error);
    return res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

module.exports = { addCategory, viewCategory, searchCategory };
