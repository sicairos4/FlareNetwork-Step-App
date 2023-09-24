const express = require('express');
const passport = require('./auth'); // Import your passport configuration
const axios = require('axios'); // Import the axios library
const router = express.Router();
const Web3 = require('web3'); // Add Web3.js
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
const abi = [
    // ... (your contract ABI here)
];

const web3 = new Web3(new Web3.providers.HttpProvider('https://coston.flare.network')); // Coston 2 testnet
const contract = new web3.eth.Contract(abi, contractAddress);

// Authenticate with Google
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect or respond as needed
    res.redirect('/dashboard');
  }
);

// Route to fetch steps from Google Fit and upload to your smart contract
router.get('/fetch-steps', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Authentication required.' });
  }

  try {
    const user = req.user; // User information from the OAuth process
    const accessToken = user.accessToken; // Assuming you store the access token when authenticating

    // Configure the Google Fit API endpoint
    const googleFitEndpoint = 'https://www.googleapis.com/fitness/v1/users/me/dataSources/derived:com.google.step_count.delta:com.google.android.gms:estimated_steps';

    // Set up the request headers with the access token
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Make a GET request to fetch the user's step data from Google Fit
    const response = await axios.get(googleFitEndpoint, { headers });

    // Extract the step count from the response (customize this based on Google Fit response format)
    const steps = response.data.bucket[0].dataset[0].point[0].value[0].intVal;

    // Now, you have the user's step count (steps) that you can upload to your smart contract
    const userAddress = 'YOUR_USER_ADDRESS'; // Replace with the user's address

    // Implement the code to interact with your smart contract and upload the steps here
    await contract.methods.uploadSteps(steps).send({ from: userAddress });

    // Respond with success or error messages
    res.json({ message: 'Steps uploaded successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching steps.' });
  }
});

module.exports = router;
