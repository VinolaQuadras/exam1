const express = require('express');
const router = express.Router();
const foodController = require('../Controllers/foodController');
const authMiddleware = require('../Middleware/authMiddleware');

// Routes for food
router.get('/', foodController.getAllFood);
router.get('/:id', foodController.getFoodById);
router.post('/', authMiddleware.authenticate, authMiddleware.isAdmin, foodController.createFood);
router.put('/:id', authMiddleware.authenticate, authMiddleware.isAdmin, foodController.updateFood);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.isAdmin, foodController.deleteFood);

module.exports = router;