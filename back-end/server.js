const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const tasks_routes = require('./routes/tasks_routes')
const board_routes = require('./routes/board_routes')
// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());  // Enable CORS
// MongoDB Connection
mongoose.connect(process.env.MongoDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Use API routes with prefix /api/auth
app.use('/api/auth', authRoutes);

app.use('/api/tasks', tasks_routes)
app.use('/api/boards', board_routes)
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
