const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for frontend connections
app.use(cors()); 
app.use(express.json()); // Middleware for parsing JSON requests

// Corrected CORS Headers Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins, change * to specific domain if needed
  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT, DELETE"); // Allowed HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Allowed headers
  next();
});

// Define the reference code mapping
const metawalletviacode = [
  {
    code: "ENA", // Reference code
    walletAddress: "0x8619c7753f2ac1f2c96a90ad6d19b3df50a8ea93" // Corresponding wallet address
  },
  // Add other reference codes and wallet addresses here
  {
    code: "EXAMPLE",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678"
  }
];

// Route to check reference code and return corresponding wallet address
app.get("/api/metawalletviacode/:code", (req, res) => {
  const { code } = req.params; // Extract reference code from URL
  const walletData = metawalletviacode.find(entry => entry.code === code); // Search for the matching code

  if (walletData) {
    res.json({ address: walletData.walletAddress }); // Send the corresponding wallet address if found
  } else {
    res.status(404).json({ message: "Reference code not found." }); // If no match, return error message
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
