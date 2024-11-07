const express = require('express');
const router = express.Router();
const { connectDB } = require('../../db');

// General route to update any box in wasteWaterTreatmentServices
router.post('/techSecD/:box', async (req, res) => {
  const { box } = req.params; // Get the box number from the URL
  const { title, content } = req.body;

  try {
    const db = await connectDB();
    const result = await db.collection('datas').updateOne(
      {},
      {
        $set: {
          [`techSecD.${box}.title`]: title,
          [`techSecD.${box}.content`]: content
        }
      }
    );

    if (result.modifiedCount > 0) {
      res.redirect('/admin');
    } else {
      res.status(404).json({ error: `techSecD ${box} not found` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
