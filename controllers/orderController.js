import dotenv from "dotenv";
dotenv.config();

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

// Place order & create Razorpay order
const placeOrder = async (req, res) => {
  const frontendUrl = "http://localhost:5173";
  try {
    // 1️⃣ Save order in DB
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items, // now an array of objects
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // 2️⃣ Create Razorpay order (amount in paise)
    const options = {
      amount: req.body.amount * 100, // e.g., 150 → 15000 paise
      currency: "INR",
      receipt: newOrder._id.toString(),
      payment_capture: 1, // auto capture
    };

    const order = await razorpay.orders.create(options);

    // Send order info to frontend
    res.json({ success: true, order, orderId: newOrder._id });
  } catch (error) {
    console.error("Error placing order:", error);
    res.json({ success: false, message: "Error placing order" });
  }
};

// Verify payment
const verifyOrder = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
  try {
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZOR_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      await orderModel.findByIdAndUpdate(orderId, { paymentMethod: true });
      res.json({ success: true, message: "Payment verified" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.json({ success: false, message: "Error verifying payment" });
  }
};

// Get user orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.json({ success: false, message: "Error" });
  }
};

// List all orders (admin)
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.json({ success: false, message: "Error" });
  }
};

// Update order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
