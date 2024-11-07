// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const flash = require('express-flash');
const session = require('express-session');

// Include Routes
const aboutusRoutes = require('./routes/aboutus.js');
const techSecARoutes = require('./routes/techSecA.js');
const techSecBRoutes = require('./routes/techSecB.js');
const techSecCRoutes = require('./routes/techSecC.js');
const techSecDRoutes = require('./routes/techSecD.js');
const contactRoutes = require('./routes/contact.js');
const generalindustriesRoutes = require('./routes/generalindustries.js');
const indexRoutes = require('./routes/index.js');
const techRoutes = require('./routes/technologies.js');
const oilandgasRoutes = require('./routes/oilandgas.js');
const ourbusinessRoutes = require('./routes/ourbusiness.js');
const projectRoutes = require('./routes/project.js');
const wastewatertreatmentRoutes = require('./routes/wastewatertreatment.js');
const adminRoutes = require('./routes/admin.js');
const authRoutes = require('./routes/auth.js');

// Initialisation
dotenv.config(); 
const app = express();
const port = 3000; // Set port from .env or default to 3000
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the directory for views

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(helmet()); // Set security headers
app.use(session({
  secret: 'your_secret_key',  // Replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: null // Session cookie will expire when the browser is closed
  }
}));
app.use(flash()); // Initialize express-flash after session middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Route to handle PDF download
app.get('/download-brochure', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'assets', 'Sunmas Engineering And Construction Brochure.pdf');
  res.download(filePath, 'Sunmas Engineering And Construction Brochure.pdf', (err) => {
      if (err) {
          console.error('Error downloading the file:', err);
          res.status(500).send('Could not download the file');
      }
  });
});

// Routing Starts Here
app.use('/', indexRoutes);
app.use('/technologies', techRoutes);
app.use('/aboutus', aboutusRoutes);
app.use('/contact', contactRoutes);
app.use('/generalindustries', generalindustriesRoutes);
app.use('/oilandgas', oilandgasRoutes);
app.use('/ourbusiness', ourbusinessRoutes);
app.use('/project', projectRoutes);
app.use('/wastewatertreatment', wastewatertreatmentRoutes);
app.use('/admin', adminRoutes);
app.use('/login', authRoutes);
app.use('/techsecA', techSecARoutes);
app.use('/techsecB', techSecBRoutes);
app.use('/techsecC', techSecCRoutes);
app.use('/techsecD', techSecDRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
