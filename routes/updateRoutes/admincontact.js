const express = require('express');
const router = express.Router();
const { connectDB } = require('../../db');

// Route to update contactHeadQuarters
router.post('/contactHeadQuarters', async (req, res) => {
  const { name, address, country, Email, phnNo } = req.body;

  try {
    const db = await connectDB();
    const result = await db.collection('datas').updateOne(
      {},
      {
        $set: {
          'contactHeadQuaters.name': name,
          'contactHeadQuaters.address': address,
          'contactHeadQuaters.country': country,
          'contactHeadQuaters.Email': Email,
          'contactHeadQuaters.phnNo': phnNo
        }
      }
    );

    if (result.modifiedCount > 0) {
      res.redirect('/admin');
    } else {
      res.status(404).json({ error: "Contact Headquarters not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Generic route to update any box in contactGroupCompanies
router.post('/contactGroupCompanies/:box', async (req, res) => {
  const { box } = req.params;
  const { name, address, city, country, Email } = req.body;

  try {
    const db = await connectDB();
    const result = await db.collection('datas').updateOne(
      {},
      {
        $set: {
          [`contactGroupCompanies.${box}.name`]: name,
          [`contactGroupCompanies.${box}.address`]: address,
          [`contactGroupCompanies.${box}.city`]: city,
          [`contactGroupCompanies.${box}.country`]: country,
          [`contactGroupCompanies.${box}.Email`]: Email
        }
      }
    );

    if (result.modifiedCount > 0) {
      res.redirect('/admin');
    } else {
      res.status(404).json({ error: `Contact Group Company ${box} not found` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
