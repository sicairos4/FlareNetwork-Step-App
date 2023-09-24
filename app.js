const express = require('express');
const passport = require('./auth'); // Import your passport configuration
const session = require('express-session');
const routes = require('./routes');
const Web3 = require('web3'); // Add Web3.js

const app = express();

// Set up session middleware
app.use(
  session({
    secret: 'your-secret-key', // Replace with a secure secret
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport and restore session if applicable
app.use(passport.initialize());
app.use(passport.session());

// Mount your routes
app.use('/', routes);

// Add Web3.js code
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
const abi = [
    // ... (your contract ABI here)
];

const web3 = new Web3(new Web3.providers.HttpProvider('https://coston.flare.network')); // Coston 2 testnet
const contract = new web3.eth.Contract(abi, contractAddress);

async function getUserSteps() {
    const userAddress = 'YOUR_USER_ADDRESS'; // Replace with the user's address
    const steps = await contract.methods.userSteps(userAddress).call();
    // You can send the steps to your route or render it in your views
}

async function uploadSteps(steps) {
    const userAddress = 'YOUR_USER_ADDRESS'; // Replace with the user's address
    await contract.methods.uploadSteps(steps).send({ from: userAddress });
}

// Define your routes here and use the functions above as needed

// Start the Express.js server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
