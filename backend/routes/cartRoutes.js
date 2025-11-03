const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getCart)
  .post(addToCart)
  .put(updateCartItem)
  .delete(clearCart);

router.delete('/:productId', removeFromCart);

module.exports = router;
