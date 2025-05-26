const menuModel = require("../models/menuModel.model.js");
const userModel = require("../models/user.model.js");
const orderModel = require('../models/order.model.js');

const addOrders = async (req, res) => {
  try {
    const { name, subcategories, seller } = req.body || {};

    if (!name || !subcategories || !seller) {
      return res.status(400).json({
        error: "Category, subcategory, and seller are required. this is required as the",
      });
    }

    const existingSeller = await userModel.findById(seller);
    if (!existingSeller) {
      return res.status(404).json({ message: "Seller not found." });
    }

    const order = new orderModel({
      buyer: req.user.userId,
      sellers: [{ seller, status: "pending" }],
      items: [{ category: name, subcategory: subcategories }],
      totalAmount: 100,
      status: "pending",
      paymentStatus: "pending",
      createdAt: new Date(),
    });

    await order.save();
    res.status(200).json(order);
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
const acceptOrder = async(req,res)=>{
  try {
    const id = req.params.id;
    const order = await orderModel.findById(id);
    if(!order){
      return res.status(400).json("Enter correct id");
    }
    order.status = accepted;
    await order.save();
    return res.status(200).json("Accepted successfully");
  } catch (error) {
    console.error("Error in accepting:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
const rejectOrder = async(req,res)=>{
  try {
    const id = req.params.id;
    const order = await orderModel.findById(id);
    if(!order){
      return res.status(400).json("Enter correct id");
    }
    order.status = rejected;
    await order.save();
    return res.status(200).json("Accepted successfully");
  } catch (error) {
    console.error("Error in accepting:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
module.exports = {AllOrders,addOrders,acceptOrder, rejectOrder};
