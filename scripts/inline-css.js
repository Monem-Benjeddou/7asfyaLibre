import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { resolve } from 'path';

const distLibDir = resolve(process.cwd(), 'dist-lib');
const cssFile = resolve(distLibDir, 'nuit-info-challenge.css');

try {
  // Read CSS content
  const cssContent = readFileSync(cssFile, 'utf-8');
  
  // Inject CSS into ES module
  const esFile = resolve(distLibDir, 'nuit-info-challenge.es.jsdos');
  let esContent = readFileSync(esFile, 'utf-8');
  const cssInjection = `
(function() {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = ${JSON.stringify(cssContent)};
    document.head.appendChild(style);
  }
})();
`;
  writeFileSync(esFile, cssInjection + esContent);
  
  // Inject CSS into UMD module
  const umdFile = resolve(distLibDir, 'nuit-info-challenge.umd.jsdos');
  let umdContent = readFileSync(umdFile, 'utf-8');
  writeFileSync(umdFile, cssInjection + umdContent);
  
  // Delete CSS file
  unlinkSync(cssFile);
  
  console.log('✓ CSS inlined into .jsdos files');
  console.log('✓ CSS file removed');
} catch (error) {
  console.error('Error inlining CSS:', error);
  process.exit(1);
}

