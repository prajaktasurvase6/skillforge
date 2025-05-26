/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const {GoogleAuth} = require("google-auth-library");

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

// Replace this with your actual project ID
const GEMINI_ENDPOINT = `https://us-central1-aiplatform.googleapis.com/v1/projects/${process.env.GCP_PROJECT_ID}/locations/us-central1/publishers/google/models/gemini-1.5-flash:streamGenerateContent`;

// Google service account authentication
const auth = new GoogleAuth({
  keyFile: "gemini-service-account.json", // must exist in the /functions folder
  scopes: "https://www.googleapis.com/auth/cloud-platform",
});

app.post("/gemini", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log("Received prompt:", prompt);

    const client = await auth.getClient();
    const token = await client.getAccessToken();

    const response = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{text: prompt}],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 1,
          maxOutputTokens: 500,
        },
      }),
    });

    const data = await response.json();
    console.log("Gemini response:", data);

    res.json(data);
  } catch (error) {
    console.error("Error during Gemini call:", error.message);
    res.status(500).send("Failed to get recommendation from Gemini");
  }
});

// Export the express app as a Firebase Function
exports.api = functions.https.onRequest(app);
