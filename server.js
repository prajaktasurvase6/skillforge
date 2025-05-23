require('dotenv').config();
const express = require('express');
const { GoogleAuth } = require('google-auth-library');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch'); // Ensure this is installed (npm install node-fetch)


const app = express();
app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use('/api/gemini', cors(corsOptions));
app.options('/api/gemini', cors(corsOptions)); // just handle that one route


// app.use(cors(corsOptions));           // Apply to all routes
// app.options('*', cors(corsOptions));  // Handle preflight globally


const PORT = process.env.PORT || 5050;
const GEMINI_ENDPOINT = `https://us-central1-aiplatform.googleapis.com/v1/projects/${process.env['GCP_PROJECT_ID']}/locations/us-central1/publishers/google/models/gemini-2.5-flash-preview-05-20:streamGenerateContent`;
const auth = new GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: 'https://www.googleapis.com/auth/cloud-platform',
});

app.post('/api/gemini', async (req, res) => {
  try {
    const client = await auth.getClient();
    const accessToken = await client.getAccessToken();
    console.log('Access Token acquired');


    const prompt = req.body.prompt;
    console.log('Received prompt:', prompt);

    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 1,
          maxOutputTokens: 500,
        }
      }),
    });

    const data = await response.json();
    console.log('Gemini responded with:', JSON.stringify(data, null, 2));

    res.json(data);
  } catch (error) {
    console.error("Error calling Gemini:", error);
    console.error('Error in Gemini route:', error.message);
    res.status(500).json({ error: "Gemini API call failed" });
  }
});

app.listen(PORT, () => {
  console.log(`SkillForge AI backend running on port ${PORT}`);
});