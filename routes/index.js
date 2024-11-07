const express = require('express');
const router = express.Router();
const { connectDB } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const db = await connectDB();
    const data = await db.collection('datas').findOne();

    if (data) {
      const { indexSlider, indexServices, indexWeCare } = data;
      res.render('index', { indexSlider, indexServices, indexWeCare });
    } else {
      res.send(`
        <html>
          <body>
            <h1>OOPS! Data not found</h1>
            <button><a href="/">Go to Home</a></button>
          </body>
        </html>`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(`
      <html>
        <body>
          <h1>Server Error</h1>
          <p>Something went wrong, please try again later.</p>
          <button><a href="/">Go to Home</a></button>
        </body>
      </html>`);
  }
});

module.exports = router