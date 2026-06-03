#!/usr/bin/env node
const puppeteer = require('puppeteer');
const { spawn } = require('child_process');
const path = require('path');

async function runTests() {
  try {
    const chromePath = await puppeteer.executablePath();
    console.log(`Setting CHROME_BIN to: ${chromePath}`);
    process.env.CHROME_BIN = chromePath;

    const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const args = ['test', '--', '--watch=false', '--browsers=ChromeHeadless'];
    
    const child = spawn(cmd, args, {
      stdio: 'inherit',
      shell: true,
      cwd: __dirname
    });

    child.on('exit', (code) => {
      process.exit(code || 0);
    });

    child.on('error', (err) => {
      console.error('Error running tests:', err);
      process.exit(1);
    });
  } catch (err) {
    console.error('Failed to get Chromium path:', err);
    process.exit(1);
  }
}

runTests();
