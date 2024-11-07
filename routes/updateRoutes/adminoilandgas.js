const express = require('express');
const router = express.Router();
const { connectDB } = require('../../db');

// General route to update oilAndGasServices and oilAndGasDropdown boxes
router.post('/:section/:box', async (req, res) => {
  const { section, box } = req.params;
  const { title, content } = req.body;

  try {
    const db = await connectDB();
    const result = await db.collection('datas').updateOne(
      {},
      {
        $set: {
          [`${section}.${box}.title`]: title,
          [`${section}.${box}.content`]: content
        }
      }
    );

    if (result.modifiedCount > 0) {
      res.redirect('/admin');
    } else {
      res.status(404).json({ error: `${section} ${box} not found` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to update oilAndGasBenefits with multiple fields
router.post('/oilAndGasBenefits', async (req, res) => {
  const { title, content, p1, p2, p3, p4 } = req.body;

  try {
    const db = await connectDB();
    const result = await db.collection('datas').updateOne(
      {},
      {
        $set: {
          "oilAndGasBenefits.title": title,
          "oilAndGasBenefits.content": content,
          "oilAndGasBenefits.p1": p1,
          "oilAndGasBenefits.p2": p2,
          "oilAndGasBenefits.p3": p3,
          "oilAndGasBenefits.p4": p4
        }
      }
    );

    if (result.modifiedCount > 0) {
      res.redirect('/admin');
    } else {
      res.status(404).json({ error: "oilAndGasBenefits not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
