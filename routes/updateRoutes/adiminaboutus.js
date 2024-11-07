const express = require('express');
const router = express.Router();
const { connectDB } = require('../../db');

// Generic route to update any 'aboutUs' section
router.post('/aboutUs/:section', async (req, res) => {
  const { section } = req.params;
  const updates = req.body;

  try {
    const db = await connectDB();
    const updateFields = {};

    // Dynamically set fields based on section
    for (let [key, value] of Object.entries(updates)) {
      updateFields[`aboutUs${section}.${key}`] = value;
    }

    const result = await db.collection('datas').updateOne(
      {},
      { $set: updateFields }
    );

    if (result.matchedCount > 0) {
      res.redirect('/admin');
    } else {
      res.status(404).json({ error: `Section ${section} not found` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
