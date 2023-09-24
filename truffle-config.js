// truffle-config.js
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = 'your-mnemonic-phrase'; // Replace with your actual mnemonic phrase
const infuraURL = 'https://coston.flare.network'; // Coston 2 testnet

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    flareCoston: {
      provider: () => new HDWalletProvider(mnemonic, infuraURL),
      network_id: 16,
    },
  },
};
