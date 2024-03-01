const Order = require('../Models/Order');
const nodemailer=require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vinolaquadras.cs21@sahyadri.edu.in', // replace with your email address
      pass: 'sahyadri' // replace with your email password or an app-specific password
    }
  });
  
  const sendOTP = async (email, otp) => {
    const mailOptions = {
      from: 'vinolaquadras.cs21@sahyadri.edu.in', // replace with your email address
      to: email,
      subject: 'Order Delivery Verification OTP',
      text:` Your OTP for order delivery verification is: ${otp}`
    };
  
    await transporter.sendMail(mailOptions);
  };

const placeOrder = async (req, res) => {
  const { foodId, address, paymentMode } = req.body;
  const userId = req.user.id;

  try {
    const order = new Order({
      foodId,
      userId,
      address,
      paymentMode,
    });

    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getOrdersByUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    let order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    order.updatedAt = Date.now();

    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { placeOrder, getOrdersByUser, getAllOrders, updateOrderStatus };