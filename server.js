import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS so the React app can communicate with the server
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.join(__dirname, 'contacts.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Create the contacts table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (createErr) => {
        if (createErr) {
          console.error('Error creating table:', createErr.message);
        } else {
          console.log('Contacts table ready.');
        }
      }
    );
  }
});

// POST endpoint to save contact messages
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Basic server-side validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const query = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;
  db.run(query, [name.trim(), email.trim(), message.trim()], function (err) {
    if (err) {
      console.error('Error inserting data:', err.message);
      return res.status(500).json({ error: 'Failed to save message. Internal server error.' });
    }
    
    console.log(`Saved contact form submission from ${name} (ID: ${this.lastID})`);
    res.status(201).json({
      success: true,
      message: 'Message saved successfully!',
      id: this.lastID
    });
  });
});

// GET endpoint to view saved contact submissions (for verification / admin use)
app.get('/api/contact', (req, res) => {
  const query = `SELECT * FROM contacts ORDER BY created_at DESC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return res.status(500).json({ error: 'Failed to retrieve messages.' });
    }
    res.json(rows);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`SQLite database located at: ${dbPath}`);
});
