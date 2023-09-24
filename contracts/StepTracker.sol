const { FlareSigner } = require("@zondax/flare-connect");
const { ethers } = require("ethers");

const flareNodeUrl = "YOUR_FLARE_NODE_URL"; // Replace with the Flare Network Coston 2 node URL
const contractABI = require("./yourFlareContractABI.json"); // Replace with your Flare contract's ABI
const contractAddress = "YOUR_FLARE_CONTRACT_ADDRESS"; // Replace with your Flare contract's address

// Initialize FlareSigner
const provider = new FlareSigner(flareNodeUrl);

// Initialize ethers.js provider with FlareSigner
const ethersProvider = new ethers.JsonRpcProvider(flareNodeUrl, {
  signer: provider,
});

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, ethersProvider);

async function uploadSteps() {
  const userAddress = "USER_ADDRESS"; // The user's Ethereum address on Flare Network
  const steps = 1000; // Replace with the actual steps

  try {
    // Connect to the wallet (Metamask, Flare Finance Wallet, etc.)
    await provider.connect(); // This will prompt the user to connect their wallet

    // Check if the wallet is connected
    if (!provider.connected) {
      throw new Error("Wallet not connected.");
    }

    // Upload the steps to your Flare Network smart contract
    const tx = await contract.uploadSteps(steps, userAddress);

    // Wait for the transaction to be mined
    await tx.wait();

    // Respond with a success message
    console.log("Steps uploaded successfully.");
  } catch (error) {
    console.error("Error uploading steps:", error.message);
  }
}

// Call the function to upload steps
uploadSteps();
