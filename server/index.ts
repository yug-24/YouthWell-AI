// YouthWell AI Backend Server Entry Point
import dotenv from 'dotenv';

// Load environment variables first, before any other imports
dotenv.config();

import app from './app';
import { ensureDatabase } from './db-bootstrap';

const PORT = parseInt(process.env.PORT || '3001', 10);

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  process.exit(1);
}

// Initialize database and start server
async function startServer() {
  try {
    // Bootstrap database schema
    await ensureDatabase();
    
    // Start server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 YouthWell AI Backend Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 API endpoints: http://localhost:${PORT}/api`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();