#!/usr/bin/env node

import { spawn } from 'child_process';

console.log('Starting Vite development server on port 5000...');

// Start Vite with the correct port and host
const vite = spawn('npx', ['vite', '--port', '5000', '--host', '0.0.0.0'], {
  stdio: 'inherit',
  cwd: process.cwd()
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  vite.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  vite.kill('SIGINT');
});

vite.on('error', (err) => {
  console.error('Failed to start Vite:', err);
  process.exit(1);
});

vite.on('exit', (code, signal) => {
  console.log(`Vite process exited with code ${code} and signal ${signal}`);
  process.exit(code || 0);
});