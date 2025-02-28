const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Enable CORS and serve static files
app.use(cors());

// Serve static images from the 'frontend/images' folder
app.use('/images', express.static(path.join(__dirname, '../frontend/images')));

// Example product data
let products = require('../products.json');

// Endpoint to fetch products
app.get('/products', (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
