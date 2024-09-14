
const Friends = require('../models/friends.js');
const express = require('express');
const router = express.Router();
const { users } = require('@clerk/clerk-sdk-node');

// Example: Fetch user details by ID
router.post('/', async (request, response) => {
  try {
    const user = await users.getUser(userId);
    console.log(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
})

module.exports = router;