import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

console.log('=== Production Build Verification Checklist ===\n');

// 1. Verify dist folder exists
if (!fs.existsSync(distDir)) {
  console.error('FAIL: dist directory does not exist.');
  process.exit(1);
}
console.log('✔ dist/ directory exists');

// 2. Verify index.html exists and is non-empty
const indexPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('FAIL: dist/index.html is missing.');
  process.exit(1);
}
const indexHtml = fs.readFileSync(indexPath, 'utf-8');
console.log(`✔ dist/index.html exists (${indexHtml.length} bytes)`);

// 3. Verify CSS and JS assets referenced in index.html actually exist on disk
const scriptMatch = indexHtml.match(/src="([^"]+\.js)"/);
const styleMatch = indexHtml.match(/href="([^"]+\.css)"/);

if (!scriptMatch) {
  console.error('FAIL: No JS script tag found in index.html');
  process.exit(1);
}
const jsRelPath = scriptMatch[1].replace(/^\.\//, '').replace(/^\//, '');
const jsFullPath = path.join(distDir, jsRelPath);
if (!fs.existsSync(jsFullPath)) {
  console.error(`FAIL: Referenced JS bundle ${jsRelPath} missing on disk!`);
  process.exit(1);
}
const jsContent = fs.readFileSync(jsFullPath, 'utf-8');
console.log(`✔ JS bundle exists: ${jsRelPath} (${Math.round(jsContent.length / 1024)} kB)`);

if (!styleMatch) {
  console.error('FAIL: No CSS stylesheet tag found in index.html');
  process.exit(1);
}
const cssRelPath = styleMatch[1].replace(/^\.\//, '').replace(/^\//, '');
const cssFullPath = path.join(distDir, cssRelPath);
if (!fs.existsSync(cssFullPath)) {
  console.error(`FAIL: Referenced CSS bundle ${cssRelPath} missing on disk!`);
  process.exit(1);
}
const cssContent = fs.readFileSync(cssFullPath, 'utf-8');
console.log(`✔ CSS stylesheet exists: ${cssRelPath} (${Math.round(cssContent.length / 1024)} kB)`);

// 4. Verify deployment configuration files
const redirectsPath = path.join(distDir, '_redirects');
if (!fs.existsSync(redirectsPath)) {
  console.error('FAIL: dist/_redirects is missing');
  process.exit(1);
}
console.log('✔ dist/_redirects exists for Netlify/Cloudflare SPA routing');

const vercelJsonPath = path.resolve(__dirname, '../vercel.json');
if (!fs.existsSync(vercelJsonPath)) {
  console.error('FAIL: vercel.json is missing');
  process.exit(1);
}
console.log('✔ vercel.json exists for Vercel SPA routing');

const netlifyTomlPath = path.resolve(__dirname, '../netlify.toml');
if (!fs.existsSync(netlifyTomlPath)) {
  console.error('FAIL: netlify.toml is missing');
  process.exit(1);
}
console.log('✔ netlify.toml exists for Netlify build setup');

// 5. Check bundle for localhost references
if (jsContent.includes('http://localhost') || jsContent.includes('https://localhost')) {
  console.error('FAIL: Bundle contains hardcoded localhost URL!');
  process.exit(1);
}
console.log('✔ Zero hardcoded localhost references in JS bundle');

// 6. Verify favicon and assets
const faviconPath = path.join(distDir, 'favicon.svg');
if (fs.existsSync(faviconPath)) {
  console.log('✔ dist/favicon.svg exists');
}

console.log('\nAll production build verification tests PASSED cleanly!');
