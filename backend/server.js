const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5050;

// ✅ Add this line to specifically allow React dev server
app.use(cors());

const API_KEY = '027c4fee338f2a6424890d1b8dfbccd303fccaa69a99a8953dfd0b6f9c9e7d2a';

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  console.log("✅ Query received:", query);

  if (!query) {
    console.error("❌ Missing query parameter");
    return res.status(400).json({ error: 'Missing query' });
  }

  try {
    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        q: query,
        engine: 'google',
        api_key: API_KEY
      }
    });
    
    console.log("✅ SERP Response received:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error('❌ Server error:', error.message);
    console.error('❌ Detailed error:', error.response?.data || error);
    res.status(500).json({ error: 'Search failed' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});
