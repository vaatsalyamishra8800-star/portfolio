/**
 * build.mjs — Static Production Build Script
 */
import { build } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function runBuild() {
  console.log('\n🚀 Starting Production Build via Vite...\n');

  try {
    await build({
      root: rootDir,
      configFile: path.resolve(rootDir, 'vite.config.js')
    });

    const distDir = path.resolve(rootDir, 'dist');
    if (fs.existsSync(distDir)) {
      console.log('✓ Build completed successfully! Output in dist/');
      const files = fs.readdirSync(distDir);
      console.log(`✓ Generated ${files.length} top-level files in dist/`);
    } else {
      throw new Error('dist directory was not created');
    }
  } catch (err) {
    console.error('✗ Build failed:', err);
    process.exit(1);
  }
}

runBuild();

