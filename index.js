const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for frontend connections
app.use(cors()); 
app.use(express.json()); // Middleware for parsing JSON requests

// Corrected CORS Headers Middleware (optional)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins, change * to specific domain if needed
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE"); // Allowed HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Allowed headers
  next();
});

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
