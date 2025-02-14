const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for the frontend app
app.use(cors());

// Store the reference codes and wallet addresses (could be in a database)
const referenceCodes = {
  "ENA": "0x8619c7753f2ac1f2c96a90ad6d19b3df50a8ea93"
  // Add more codes here
};

// Endpoint to get the wallet address based on reference code
app.get('/get-wallet-address/:code', (req, res) => {
  const code = req.params.code;
  const walletAddress = referenceCodes[code];

  if (walletAddress) {
    res.json({ address: walletAddress });
  } else {
    res.status(404).json({ error: "Reference code not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
