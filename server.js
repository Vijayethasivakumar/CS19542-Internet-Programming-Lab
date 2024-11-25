//Using Express
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dailyMenu = require('./routes/dailyMenu');
const ratings = require('./routes/Rating')
const cors = require('cors');
const login = require('./routes/login');

//create an instance of express
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Hostelmess')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('DB error',err));

// Use routes
//http://localhost:8000/api/Dailymenu
app.use('/api/Dailymenu', dailyMenu);
app.use('/api/Rating', ratings);
app.use('/api/Login', login);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
