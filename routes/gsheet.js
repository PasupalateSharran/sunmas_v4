const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const fs = require("fs");
require("dotenv").config();

// Google Sheets credentials
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const CREDENTIALS = JSON.parse(fs.readFileSync("credentials.json"));

// Authenticate with Google Sheets
const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES,
);

const sheets = google.sheets({ version: "v4", auth });

const sheetId = process.env.SHEET_ID;

// Route to handle form submission
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  try {
    // Get the current date for tracking when emails were added
    const currentDate = new Date().toLocaleString();

    // Prepare data to append (email and date)
    const values = [[email, currentDate]];

    // Append email to the Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:B", // Assuming you are writing to columns A and B of the first sheet
      valueInputOption: "USER_ENTERED",
      resource: {
        values,
      },
    });

    res.status(200).send("Email saved to Google Sheets!");
  } catch (error) {
    console.error("Error writing to Google Sheets:", error);
    res.status(500).send("Failed to save email.");
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = router;
