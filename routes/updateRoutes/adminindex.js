const express = require('express');
const router = express.Router();
const { connectDB } = require('../../db');

// Generic route to update any section and box based on URL parameters
router.post('/:section/:box', async (req, res) => {
  const { section, box } = req.params;
  const { title, content } = req.body;

  try {
    const db = await connectDB();
    const updatePath = box === 'indexWeCare' ? `${section}` : `${section}.${box}`;
    const result = await db.collection('datas').updateOne(
      {},
      {
        $set: {
          [`${updatePath}.title`]: title,
          [`${updatePath}.content`]: content
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

// Usage Examples:
// To update indexSlider.box1: POST to /indexSlider/box1
// To update indexSlider.box2: POST to /indexSlider/box2
// To update indexWeCare: POST to /indexWeCare

module.exports = router;
