const express = require('express');
const router = express.Router();
const { connectDB } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const db = await connectDB();
    const data = await db.collection('datas').findOne();
    if (data) {
      const { Technologies } = data;
      
      // Console log the Technologies data
      console.log('Technologies Data:', Technologies);
      
      res.render('technologies', { Technologies });
    } else {
      res.send(`<html>
        <body>
        <h1>OOPS!</h1>
        <button><a href="">Go Back</a></button>
        </body>
        </html>`);
    }
  } catch (err) {
    console.error(err);
    next(err); // Pass the error to Express error handler
  }
});

module.exports = router;
