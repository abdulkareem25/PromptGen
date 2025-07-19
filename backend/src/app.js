import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
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
import authRoutes from './routes/auth.js';
import templateRoutes from './routes/templates.js';
import aiRoutes from './routes/ai.js';

// Import middleware
import { trackPromptAnalytics } from './middleware/analytics.js';

// Use analytics middleware for AI routes
app.use('/api/ai', trackPromptAnalytics);


// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/ai', aiRoutes);




app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;