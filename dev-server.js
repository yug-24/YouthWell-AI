#!/usr/bin/env node

import { spawn } from 'child_process';

// Start Vite with the correct port and host
const vite = spawn('npx', ['vite', '--port', '5000', '--host', '0.0.0.0'], {
  stdio: 'inherit',
  env: { ...process.env }
});

vite.on('exit', (code) => {
  process.exit(code);
});