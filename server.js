require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');

const app = express();
const port = process.env.PORT || 3000;


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'e-Vault')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'e-Vault', 'index.html'));
});

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);

    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      maxBodyLength: 'Infinity',
      headers: {
        ...formData.getHeaders(),
        'pinata_api_key': String(process.env.PINATA_API_KEY),
        'pinata_secret_api_key': String(process.env.PINATA_SECRET_API_KEY)
      }
    });

    const cid = response.data.IpfsHash;
    const ipfsLink = `https://gateway.pinata.cloud/ipfs/${cid}`;
    res.json({ cid, ipfsLink });
  } catch (error) {
    console.error('Error uploading file to Pinata:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error uploading file to Pinata' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
