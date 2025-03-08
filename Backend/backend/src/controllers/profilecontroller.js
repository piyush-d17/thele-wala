const orderModel = require("../models/order.model.js");
const userModel = require("../models/user.model.js");
const menuModel = require("../models/menuModel.model.js");

const myProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userId);
    if (!user) return res.status(400).json({ msg: "No user Available" });
    return res.status(200).json({ user: user });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
const ordersForMe = async (req, res) => {
  try {
    const sellerId = req.user.userId; // Authenticated seller's ID

    // Find orders where the user is one of the sellers
    const orders = await orderModel.find({
      "sellers.seller": sellerId, // User is one of the sellers
    });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for you as a seller" });
    }

    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error in ordersForMe:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addSellerMenu = async (req, res) => {
  try {
    const { name, subcategories = [] } = req.body;
    const author = req.user.userId;

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }
    console.log(name, subcategories, author);
    const existingCategory = await menuModel.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    if (!Array.isArray(subcategories)) {
      return res
        .status(400)
        .json({ message: "Subcategories must be an array" });
    }

    // Create a new category
    const newCategory = new menuModel({
      name,
      author,
      subcategories,
    });

    await newCategory.save();

    res
      .status(201)
      .json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getSellerMenu = async (req, res) => {
  const categoryId = req.user.userId;

  try {
    // Find the category by ID
    const category = await menuModel.find({ author: categoryId });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Add new subcategories (ensure no duplicates)
    //   const uniqueSubcategories = [...new Set([...category.subcategories, ...subcategories])];
    //   category.subcategories = uniqueSubcategories;

    // Save the updated category
    //   await category.save();

    res
      .status(200)
      .json({ message: "Subcategories added successfully", category });
  } catch (error) {
    console.error("Error adding subcategories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const clearMyMenu = async (req, res) => {
  try {
    const userId = req.user.userId;
    await menuModel.deleteMany({ author: userId });
    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    console.log(error);
  }
};

const acceptRequest_order = async (req, res) => {
  try {
    const { id } = req.body; // Order ID from the request body
    const sellerId = req.user.userId; // Authenticated seller's ID

    // Find the order by ID
    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update the sellers array:
    // 1. Remove all sellers except the authenticated seller
    // 2. Add the authenticated seller if not already present
    order.sellers = [
      {
        seller: sellerId,
        status: "accepted", // Set status to "accepted"
      },
    ];

    // Save the updated order
    await order.save();

    return res
      .status(202)
      .json({ msg: "Order successfully updated for the seller" });
  } catch (error) {
    console.error("Error in acceptRequest_order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const rejectRequest_order = async (req, res) => {
  try {
    const { id } = req.body; // Order ID from the request body
    const sellerId = req.user.userId; // Authenticated seller's ID

    // Find the order by ID
    const order = await orderModel.findById(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Remove the authenticated seller's ID from the sellers array
    order.sellers = order.sellers.filter(
      (seller) => seller.seller.toString() !== sellerId
    );

    // Save the updated order
    await order.save();

    return res
      .status(202)
      .json({ msg: "Seller successfully removed from the order" });
  } catch (error) {
    console.error("Error in rejectRequest_order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  myProfile,
  ordersForMe,
  addSellerMenu,
  getSellerMenu,
  clearMyMenu,
  acceptRequest_order,
  rejectRequest_order,
};
