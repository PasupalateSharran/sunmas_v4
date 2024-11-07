const express = require('express');
const router = express.Router();
const { connectDB } = require('../db');

router.get('/', async(req, res, next) => {
  try{
    const db = await connectDB();
    const data = await db.collection('datas').findOne();
    if (data){
      const { contactHeadQuaters, contactGroupCompanies } = data;
      res.render('contact', { contactHeadQuaters, contactGroupCompanies});
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