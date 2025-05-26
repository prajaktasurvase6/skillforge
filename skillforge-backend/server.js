// skillforge-backend/server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { GoogleAuth } = require('google-auth-library');

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_ENDPOINT = 'https://us-central1-aiplatform.googleapis.com/v1/projects/skillforge-ai/locations/us-central1/publishers/google/models/gemini-2.5-flash-preview-05-20:streamGenerateContent';

const auth = new GoogleAuth({
  keyFile: './gemini-service-account.json',
  scopes: 'https://www.googleapis.com/auth/cloud-platform',
});

app.post('/api/gemini', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log('🔹 Received prompt:', prompt);

    const client = await auth.getClient();
    const token = await client.getAccessToken();

    const geminiRes = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topP: 1,
          maxOutputTokens: 500,
        },
      }),
    });

    const data = await geminiRes.json();

    // Send full Gemini response to the frontend
    res.json(data);
  } catch (error) {
    console.error('Gemini API error:', error.message);
    res.status(500).json({ error: 'Gemini API call failed' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Gemini AI backend running on port ${PORT}`));