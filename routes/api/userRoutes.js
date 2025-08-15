const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe
} = require('../../controllers/userController');
const { protect } = require('../../middleware/authMiddleware');

// Public routes
router.post('/', registerUser);        // Register
router.post('/login', loginUser);      // Login

// Private route (protected with JWT)
router.get('/me', protect, getMe);

module.exports = router;
