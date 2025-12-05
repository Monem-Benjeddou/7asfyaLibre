import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'

// Custom plugin to inline CSS into JS bundle
function inlineCssPlugin() {
  return {
    name: 'inline-css',
    generateBundle(options, bundle) {
      // Find CSS file
      const cssFile = Object.keys(bundle).find(file => file.endsWith('.css'));
      if (!cssFile) return;
      
      const cssContent = bundle[cssFile].source;
      delete bundle[cssFile]; // Remove CSS file from output
      
      // Inject CSS into all JS files
      Object.keys(bundle).forEach(file => {
        if (file.endsWith('.jsdos')) {
          const jsContent = bundle[file].code || bundle[file].source;
          const cssInjection = `
(function() {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = ${JSON.stringify(cssContent)};
    document.head.appendChild(style);
  }
})();
`;
          bundle[file].code = cssInjection + jsContent;
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isLibraryBuild = mode === 'library' || process.env.BUILD_LIBRARY === 'true';
  
  if (isLibraryBuild) {
    // Library build for .jsdos bundle
    // Set EXTERNALIZE_REACT=true to externalize React (requires React in consuming project)
    const externalizeReact = process.env.EXTERNALIZE_REACT === 'true';
    
    return {
      plugins: [
        react({
          include: /\.(jsx|js|jsdos)$/,
        }),
        inlineCssPlugin(),
      ],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/lib.jsdos.jsx'),
          name: 'NuitInfoChallenge',
          fileName: (format) => `nuit-info-challenge.${format}.jsdos`,
          formats: ['es', 'umd'],
        },
        rollupOptions: {
          // Optionally externalize React (default: bundle everything for self-contained build)
          ...(externalizeReact ? {
            external: ['react', 'react-dom'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
              },
              exports: 'named',
            },
          } : {
            output: {
              exports: 'named',
            },
          }),
        },
        cssCodeSplit: false,
        outDir: 'dist-lib',
        // Bundle all dependencies for self-contained .jsdos file
        commonjsOptions: {
          include: [/node_modules/],
        },
      },
    };
  }
  
  // Regular app build
  return {
    plugins: [
      react({
        include: /\.(jsx|js|jsdos)$/,
      }),
    ],
  };
})
