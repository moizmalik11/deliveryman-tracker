const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');

router.post('/register', registerUser);

module.exports = router;

console.log("hello");
// This is a simple Express route for user registration.
// It imports the necessary modules, sets up a router, and defines a POST route for user registration.  
//write a loop that prints "hello" 10 times
for (let i = 0; i < 10; i++) {
    console.log("hello");
}