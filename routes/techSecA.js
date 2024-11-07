const express = require('express');
const router = express.Router();
const { connectDB } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const db = await connectDB();
    const data = await db.collection('datas').findOne();
    
    if (data) {
      const { techSecA,Technologies } = data; // Retrieve the 'techSecA' section
      res.render('tech_sec_A', { techSecA,title : Technologies.box1.title }); // Pass the data to the EJS template
    } else {
      // Send an HTML error message if no data is found
      res.send(`
        <html>
          <body>
            <h1>OOPS! Data Not Found</h1>
            <p>The requested information is not available at the moment.</p>
            <button><a href="/">Go Back to Home</a></button>
          </body>
        </html>
      `);
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
