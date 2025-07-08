const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
// Connect to the database
connectDB();
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/api', (req, res) => {
  res.send('API is running...');  
});

// Import routes
const authRoutes = require('./routes/auth');
const templateRoutes = require('./routes/templates');
const aiRoutes = require('./routes/ai');

// Import middleware
const trackPromptAnalytics = require('./middleware/analytics');

// Use analytics middleware for AI routes
app.use('/api/ai', trackPromptAnalytics);


// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/ai', aiRoutes);




app.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = app;