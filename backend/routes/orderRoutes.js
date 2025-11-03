const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .post(createOrder)
  .get(getMyOrders);

router.get('/all', admin, getAllOrders);

router.route('/:id')
  .get(getOrder)
  .put(admin, updateOrderStatus);

module.exports = router;
