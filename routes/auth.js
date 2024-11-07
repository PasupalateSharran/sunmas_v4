const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { connectDB } = require('../db')

// Array of users
const users = [
    {
        name: "SunmasAdmin",
        password: "$2b$10$gVA3BLpjKqvAMquqmM2QvOGWu49JFR1s24XUgYGGyBaaW2NUw54DK" // Hashed password
    }
];

// Route to handle admin login
router.post('/', async (req, res) => {
    const db = await connectDB();
    const data = await db.collection('AdminUsers').findOne();
    const user = data.name === req.body.name;
    if (!user) {
        return res.status(400).send('User not found');
    }
    if (data){
    try {
        const passwordMatch = await bcrypt.compare(req.body.password, data.password);
        if (passwordMatch) {
            req.session.isAuthenticated = true;
            req.session.username = req.body.name; // Store the username in the session
            res.redirect('/admin'); // Redirect to /admin
        } else {
            res.status(401).send('Incorrect password');
        }
    } catch (error) {
        console.error("Error in bcrypt compare:", error);
        res.status(500).send('Internal server error occurred. Please try again later.');
    }}else{
        res.status(404).json({ error: "Login  Data not found"});
    }
});

router.get('/', (req, res) => {
    res.render('login', {currentRoute: req.path}); 
});

module.exports = router;