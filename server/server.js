// JavaScript entry point for YouthWell AI Backend
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Pool } = require('@neondatabase/serverless');

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

// Basic database setup for testing
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5000',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use('/api', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'YouthWell AI Backend',
  });
});

// Basic API info
app.get('/', (req, res) => {
  res.json({
    message: 'YouthWell AI Backend Server',
    version: '1.0.0',
    status: 'running',
    note: 'TypeScript implementation available in ./server/ directory',
    endpoints: {
      health: '/health',
      auth: '/api/auth (in development)',
      journal: '/api/journal (in development)',
      progress: '/api/progress (in development)',
      chat: '/api/chat (in development)',
      media: '/api/media (in development)',
    },
  });
});

// Validate environment
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  process.exit(1);
}

// Start server
app.listen(PORT, '0.0.0.0', async () => {
  try {
    // Test database connection
    await pool.query('SELECT 1');
    console.log('🚀 YouthWell AI Backend Server running on port', PORT);
    console.log('📊 Health check: http://localhost:' + PORT + '/health');
    console.log('🔗 API endpoints: http://localhost:' + PORT + '/api');
    console.log('✅ Database connection successful');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('🔄 Server running but database unavailable');
  }
});