const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const assetManifestPath = path.join(buildDir, 'asset-manifest.json');

console.log('Starting post-build process...');

try {
  // Check if build directory exists
  if (!fs.existsSync(buildDir)) {
    throw new Error(`Build directory not found at ${buildDir}`);
  }

  // Check if manifest exists
  if (!fs.existsSync(assetManifestPath)) {
    throw new Error(`Asset manifest not found at ${assetManifestPath}`);
  }

  // Read manifest
  const manifestContent = fs.readFileSync(assetManifestPath, 'utf8');
  let manifest;
  try {
    manifest = JSON.parse(manifestContent);
  } catch (e) {
    throw new Error(`Failed to parse manifest: ${e.message}`);
  }

  // Find files
  const findFile = (pattern) => {
    for (const key in manifest.files) {
      if (key.includes(pattern) && !key.includes('.map') && !key.includes('.LICENSE')) {
        return manifest.files[key];
      }
    }
    return null;
  };

  const mainCssFile = findFile('main.css');
  const mainJsFile = findFile('main.js');
  const runtimeJsFile = findFile('runtime-main');

  console.log('Found files:');
  console.log('  main.css:', mainCssFile);
  console.log('  main.js:', mainJsFile);
  console.log('  runtime.js:', runtimeJsFile);

  // Helper to copy file
  const copyFile = (sourceRel, targetRel) => {
    const sourcePath = path.join(buildDir, sourceRel.replace(/^\/etc\.clientlibs.*?\/resources\//, ''));
    const targetPath = path.join(buildDir, targetRel);
    const targetDir = path.dirname(targetPath);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied ${sourceRel} → ${targetRel}`);
      return true;
    } else {
      console.warn(`Source file not found: ${sourcePath}`);
      return false;
    }
  };

  // Copy files
  copyFile(mainCssFile, 'static/css/styles.css');
  copyFile(mainJsFile, 'static/js/styles.js');
  copyFile(runtimeJsFile, 'static/js/runtime.js');

  // Update manifest
  manifest.files['styles.css'] = 'static/css/styles.css';
  manifest.files['styles.js'] = 'static/js/styles.js';
  manifest.files['runtime.js'] = 'static/js/runtime.js';
  
  // Keep other entrypoints, but add our renamed ones
  const existingEntrypoints = manifest.entrypoints || [];
  const newEntrypoints = ['static/js/runtime.js'];
  
  // Add chunk files (keep existing chunks)
  for (const ep of existingEntrypoints) {
    if (ep.includes('.chunk.')) {
      newEntrypoints.push(ep);
    }
  }
  
  newEntrypoints.push('static/css/styles.css');
  newEntrypoints.push('static/js/styles.js');
  
  manifest.entrypoints = newEntrypoints;

  // Write updated manifest
  fs.writeFileSync(assetManifestPath, JSON.stringify(manifest, null, 2));
  
  console.log('Post-build complete! ✨');

} catch (error) {
  console.error('Error during post-build:', error);
  process.exit(1);
}
