const express = require('express');
const router = express.Router();
const { connectDB } = require('../db')
const adminAboutUsRoutes = require('./updateRoutes/adiminaboutus');
const adminContactRoutes = require("./updateRoutes/admincontact");
const adminGeneralindustriesRoutes = require("./updateRoutes/admingeneralindustries");
const adminIndexRoutes = require("./updateRoutes/adminindex");
const adminOilAndGasRoutes = require("./updateRoutes/adminoilandgas");
const adminOurBusinessRoutes = require("./updateRoutes/adminourbusiness");
const adimnWaterWasteTreatmentRoutes = require("./updateRoutes/adminwastewatertreatment");
const adimnSecA = require("./updateRoutes/adminSecA");
const adimnSecB = require("./updateRoutes/adminSecB");
const adimnSecC = require("./updateRoutes/adminSecC");
const adimnSecD = require("./updateRoutes/adminSecD");

router.get('/', async(req, res) =>{
  try{
    if (req.session.isAuthenticated) {
    const db = await connectDB();
    const data = await db.collection('datas').findOne();
    if (data){
      const { aboutUsWelcome, aboutUsWhyChoose, aboutUsKnowUs, contactHeadQuaters, contactGroupCompanies, generalIndustriesServices, generalIndustriesBenefits, generalIndustriesDropdown, indexSlider, indexServices, indexWeCare, oilAndGasServices, oilAndGasBenefits, oilAndGasDropdown, ourBusinessServices, wasteWaterTreatmentServices,techSecA,techSecB,techSecC,techSecD,Technologies } = data;
      res.render('admin', { aboutUsWelcome, aboutUsWhyChoose, aboutUsKnowUs, contactHeadQuaters, contactGroupCompanies, generalIndustriesServices, generalIndustriesBenefits, generalIndustriesDropdown, indexSlider, indexServices, indexWeCare, oilAndGasServices, oilAndGasBenefits, oilAndGasDropdown, ourBusinessServices, wasteWaterTreatmentServices,techSecA,techSecB,techSecC,techSecD,Technologies});
    } else {
      res.status(404).json({ error: "Data not found"});
    }
  }else{
      res.redirect('/login')
    }
  } catch(err){
    console.error(err);
    res.status(500).json({ error: "Internal Server Error"});
  }
});

router.use('/aboutus', adminAboutUsRoutes);
router.use('/contact', adminContactRoutes);
router.use('/generalindustries', adminGeneralindustriesRoutes);
router.use('/index', adminIndexRoutes);
router.use('/oilandgas', adminOilAndGasRoutes);
router.use('/ourbusiness', adminOurBusinessRoutes);
router.use('/waterwastetreatment', adimnWaterWasteTreatmentRoutes);
router.use('/techSecA', adimnSecA);
router.use('/techSecB', adimnSecB);
router.use('/techSecC', adimnSecC);
router.use('/techSecD', adimnSecD);

// // Route to get data
// router.get('/', async(req, res) => {
//  try {
//     const data = await DataModel.findOne();
//     const sliderData = data.sliderData;
//     const aboutData = data.aboutData;
//     const servicesData = data.servicesData;
//     const testimonialData = data.testimonialData;
//     const contactData = data.contactData;

//     res.render("admin", {sliderData, aboutData, servicesData, testimonialData, contactData});
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ err: "Internal Server Error" }).redirect('/admin');
//   }
// });

// //  Route to update a slide
// router.post('/updateSlide/:slideKey', async (req, res) => {
//   const { slideKey } = req.params;
//   const { title, content } = req.body;

//   try {
//     const data = await DataModel.findOne();
//     if (data && data.sliderData[slideKey]) {
//       data.sliderData[slideKey].title = title;
//       data.sliderData[slideKey].content = content;
//       await data.save();
      
//     res.redirect('/admin');
//     } else {
//       res.status(404).json({ error: "Slide not found" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }

// });

// // Route to update about section
// router.post('/updateAbout', async (req, res) => {
//   const { title, content } = req.body;

//   try {
//     const data = await DataModel.findOne();
//     if (data) {
//       data.aboutData.title = title;
//       data.aboutData.content = content;
//       await data.save();
//       res.redirect('/admin/data');  
//     } else {
//       res.status(404).json({ error: "Data not found" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }

// });

// // Route to update a service
// router.post('/updateService/:serviceKey', async (req, res) => {
//   const { serviceKey } = req.params;
//   const { title, content } = req.body;

//   try {
//     const data = await DataModel.findOne();
//     if (data && data.servicesData[serviceKey]) {
//       data.servicesData[serviceKey].title = title;
//       data.servicesData[serviceKey].content = content;
//       await data.save();
//       res.redirect('/admin/data');
//     } else {
//       res.status(404).json({ error: "Service not found" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }

// });

// // Route to update a testimonial
// router.post('/updateTestimonial/:testimonialKey', async (req, res) => {
//   const { testimonialKey } = req.params;
//   const { name, position, review } = req.body;

//   try {
//     const data = await DataModel.findOne();
//     if (data && data.testimonialData[testimonialKey]) {
//       data.testimonialData[testimonialKey].name = name;
//       data.testimonialData[testimonialKey].position = position;
//       data.testimonialData[testimonialKey].review = review;
//       await data.save();
//       res.redirect('/admin/data');
//     } else {
//       res.status(404).json({ error: "Testimonial not found" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }

// });

// // Route to update contact information
// router.post('/updateContact', async (req, res) => {
//   const { title, number, website, timing, days } = req.body;

//   try {
//     const data = await DataModel.findOne();
//     if (data) {
//       data.contactData.title = title;
//       data.contactData.number = number;
//       data.contactData.website = website;
//       data.contactData.timing = timing;
//       data.contactData.days = days;
//       await data.save();
//       res.redirect('/admin/data');
//     } else {
//       res.status(404).json({ error: "Data not found" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }

// });

module.exports = router;
