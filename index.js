const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));

// Store file in memory only (no disk write needed)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ================================
// Routes
// ================================

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  res.json({
    filename: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// ================================
// Start server
// ================================
const listener = app.listen(
  process.env.PORT || 3000,
  () => {
    console.log(
      'Your app is listening on port ' +
      listener.address().port
    );
  }
);