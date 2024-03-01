const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');
const authMiddleware = require('../Middleware/authMiddleware');
const nodemailer = require('nodemailer');

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
      text: `Your OTP for order delivery verification is: ${otp}`
    };
  
    await transporter.sendMail(mailOptions);
  };
  

// Routes for orders
router.post('/', authMiddleware.authenticate, orderController.placeOrder);
router.get('/user', authMiddleware.authenticate, orderController.getOrdersByUser);
router.get('/admin', authMiddleware.authenticate, authMiddleware.isAdmin, orderController.getAllOrders);
//router.put('/:id', authMiddleware.authenticate, authMiddleware.isAdmin, orderController.updateOrderStatus);
router.put('/:id', authMiddleware.authenticate, authMiddleware.isAdmin, async (req, res) => {
    const { id } = req.params;
    const { status, email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // generate 6-digit OTP
  
    try {
      let order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      order.status = status;
      order.updatedAt = Date.now();
  
      await order.save();
  
      // Send OTP to user's email for verification
      await sendOTP(email, otp);
  
      res.json(order);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;