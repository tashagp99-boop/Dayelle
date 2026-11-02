// Builds www/ for the Android app from the same page used on the web preview.
// src/harian.html is the single source of truth. This script:
//  - wraps it in a full HTML document,
//  - adds Capacitor (native plugins) and Supabase (sign-in + cloud sync),
//  - swaps Google Fonts for font files bundled in the app, so it looks right offline.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const www = path.join(root, 'www');
const nm = path.join(root, 'node_modules');
fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(www, { recursive: true });

const fonts = {
  'cormorant-garamond': ['500', '600', '700', '500-italic'],
  'dm-sans': ['400', '500', '600', '700'],
  'unbounded': ['600', '800'],
  'plus-jakarta-sans': ['400', '500', '600', '700'],
  'silkscreen': ['400']
};
const links = [];
for (const [pkg, weights] of Object.entries(fonts)) {
  const src = path.join(nm, '@fontsource', pkg);
  const dst = path.join(www, 'fonts', pkg);
  fs.mkdirSync(path.join(dst, 'files'), { recursive: true });
  for (const w of weights) {
    const css = fs.readFileSync(path.join(src, `latin-${w}.css`), 'utf8');
    fs.writeFileSync(path.join(dst, `latin-${w}.css`), css);
    for (const m of css.matchAll(/url\(\.\/files\/([^)]+)\)/g)) {
      fs.copyFileSync(path.join(src, 'files', m[1]), path.join(dst, 'files', m[1]));
    }
    links.push(`<link rel="stylesheet" href="fonts/${pkg}/latin-${w}.css">`);
  }
}

let page = fs.readFileSync(path.join(root, 'src', 'harian.html'), 'utf8');
page = page.replace(/<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\n?/, '')
           .replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/, links.join('\n'));

const head = [
  '<!doctype html><html lang="en"><head><meta charset="utf-8">',
  '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">',
  '<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}',
  'body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style>',
  '<script src="capacitor.js"></script>',
  '<script src="supabase.js"></script>',
  '</head><body>'
].join('');
fs.writeFileSync(path.join(www, 'index.html'), head + page + '</body></html>');
fs.copyFileSync(path.join(nm, '@capacitor', 'core', 'dist', 'capacitor.js'), path.join(www, 'capacitor.js'));
fs.copyFileSync(path.join(nm, '@supabase', 'supabase-js', 'dist', 'umd', 'supabase.js'), path.join(www, 'supabase.js'));
console.log('www/ built from src/harian.html with', links.length, 'bundled font files');
