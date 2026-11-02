// Builds www/ for the Android app from the same page used on the web.
// src/harian.html is the single source of truth; this script wraps it in a
// full HTML document and adds Capacitor's runtime so native plugins work.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const www = path.join(root, 'www');
fs.mkdirSync(www, { recursive: true });

const page = fs.readFileSync(path.join(root, 'src', 'harian.html'), 'utf8');
const head = [
  '<!doctype html><html lang="en"><head><meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">',
  '<meta name="theme-color" content="#FBEAF2">',
  '<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}',
  'body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>',
  '<script src="capacitor.js"></script>',
  '</head><body>'
].join('');
fs.writeFileSync(path.join(www, 'index.html'), head + page + '</body></html>');
fs.copyFileSync(
  path.join(root, 'node_modules', '@capacitor', 'core', 'dist', 'capacitor.js'),
  path.join(www, 'capacitor.js')
);
console.log('www/ built from src/harian.html');
