require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const Airtable = require('airtable');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
  const chatInput = req.body.chatInput;
  const data = {
      "messages": [
          {
              "role": "user",
              "content": chatInput
          }
      ]
  };
  try {
      const response = await axios.post('https://www.chatcsv.co/api/v1/chat', data, {
          headers: {
              'Authorization': `Bearer ${process.env.CHATCSV_API_KEY}`,
              'Content-Type': 'application/json'
          }
      });
      res.json(response.data);
  } catch (error) {
      console.error('Error contacting ChatCSV API:', error.message);
      console.error(error.stack);
      res.status(500).json({ error: 'Error contacting ChatCSV API' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
