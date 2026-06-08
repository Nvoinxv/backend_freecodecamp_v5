const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Store file in memory only (no disk write needed)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ================================
// Routes
// ================================

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json({
    name: req.file.originalname,
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