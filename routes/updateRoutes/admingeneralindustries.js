const express = require('express');
const router = express.Router();
const { connectDB } = require('../../db');

// Generic route to update any box in generalIndustriesDropdown based on URL parameters
router.post('/generalIndustriesDropdown/:box', async (req, res) => {
    const { box } = req.params;
    const { title, content } = req.body;

    try {
        const db = await connectDB();
        const result = await db.collection('datas').updateOne(
            {},
            {
                $set: {
                    [`generalIndustriesDropdown.${box}.title`]: title,
                    [`generalIndustriesDropdown.${box}.content`]: content
                }
            }
        );

        if (result.modifiedCount > 0) {
            res.redirect('/admin');
        } else {
            res.status(404).json({ error: `${box} not found` });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
