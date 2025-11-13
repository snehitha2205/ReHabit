require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware - CORS for all origins
app.use(cors({
  origin: true, // Allow all origins
  credentials: true
}));
app.use(express.json());

// MongoDB Atlas Connection with better error handling
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env file');
  process.exit(1);
}

console.log('🔗 Attempting to connect to MongoDB...');

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas');
    console.log('📊 Database:', mongoose.connection.name);
})
.catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('💡 Please check your MONGODB_URI in the .env file');
});

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

// Habit Schema - Updated to include user reference
const HabitSchema = new mongoose.Schema({
  habitName: { type: String, required: true },
  description: String,
  startDate: String,
  endDate: String,
  frequency: { type: String, required: true },
  category: String,
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  history: {
    type: Map,
    of: String,
    default: {}
  },
  notes: {
    type: Map,
    of: String,
    default: {}
  },
  color: {
    type: String,
    default: "#da746f"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Habit = mongoose.model('Habit', HabitSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'rehabit-super-secret-key-2024';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
};

// Test Route
app.get('/api/test', (req, res) => {
    res.json({ 
        success: true,
        message: '✅ ReHabit Backend is running!',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ 
        success: true,
        status: 'OK', 
        message: 'ReHabit Backend is running smoothly',
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
        timestamp: new Date().toISOString()
    });
});

// Signup Route
app.post('/api/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log('📝 Signup attempt:', { username, email });

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email or username'
            });
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, username: newUser.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error('❌ Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log('🔐 Login attempt:', { username });

        // Find user by username or email
        const user = await User.findOne({
            $or: [{ username }, { email: username }]
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Habit API routes (protected with authentication)

// Create a new habit for the authenticated user
app.post('/api/habits', authenticateToken, async (req, res) => {
  try {
    const habit = new Habit({
      ...req.body,
      userId: req.user.userId
    });
    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all habits for the authenticated user
app.get('/api/habits', authenticateToken, async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.userId });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a habit (only if it belongs to the authenticated user)
app.put('/api/habits/:id', authenticateToken, async (req, res) => {
  try {
    const habit = await Habit.findOne({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });

    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    Object.assign(habit, req.body);
    await habit.save();
    res.json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a habit (only if it belongs to the authenticated user)
app.delete('/api/habits/:id', authenticateToken, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });

    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    res.json({ message: 'Habit deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 ReHabit Backend Server running on port ${PORT}`);
    console.log(`📍 Endpoints:`);
    console.log(`   http://localhost:${PORT}/api/test`);
    console.log(`   http://localhost:${PORT}/api/health`);
    console.log(`   http://localhost:${PORT}/api/signup`);
    console.log(`   http://localhost:${PORT}/api/login`);
    console.log(`   http://localhost:${PORT}/api/habits`);
});