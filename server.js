const express = require('express');
const axios = require('axios');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const port = 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Krushna@123',
  database: 'seller'
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Create a table named 'products' if it doesn't exist
async function createProductsTable() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        price DECIMAL(10, 2) NOT NULL,
        quantity INT NOT NULL DEFAULT 0
      )
    `);
    connection.release();
    console.log('Table "products" created or already exists');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

// Middleware to parse JSON body
app.use(express.json());

// Save product data to the database
app.post('/saveProduct', async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query('INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)', [name, description, price, quantity || 0]);

    connection.release();
    console.log('Product saved:', req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ error: 'Failed to save product' });
  }
});

// Delete product from the database
app.delete('/deleteProduct/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM products WHERE id = ?', [productId]);

    connection.release();
    console.log('Product deleted:', productId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Get all products from the database
app.get('/getProducts', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM products');
    connection.release();
    console.log('Products retrieved:', rows);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  createProductsTable();
});
