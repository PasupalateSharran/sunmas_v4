const express = require('express');
const router = express.Router();
const { connectDB } = require('../db');

router.get('/', async(req, res, next) => {
  try{
    const db = await connectDB();
    const data = await db.collection('datas').findOne();
    if (data){
      const { oilAndGasServices, oilAndGasBenefits, oilAndGasDropdown } = data;
      res.render('oilandgas', { oilAndGasServices, oilAndGasBenefits, oilAndGasDropdown, currentRoute: req.path });
    } else {
      res.send(`<html>
        <body>
        <h1>OOPS!</h1>
        <button><a href="">
        </body>
        </html>`)
    }
  } catch(err){
    console.error(err);
  }
  });

module.exports = router