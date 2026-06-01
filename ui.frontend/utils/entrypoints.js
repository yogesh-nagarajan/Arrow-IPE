const fs = require('fs');

/**
 * Returns all entrypoint chunks (JS and CSS) of the React app. These chunks
 * will not need to be precached because they are already requested from the HTML
 * file)
 *
 * @param {string} assetManifestPath: Path to the asset manifest file from which
 * the entrypoint files can be read
 */
function getEntrypoints(assetManifestPath) {
  if (!fs.existsSync(assetManifestPath)) {
    // If manifest doesn't exist yet (before build), return empty array
    return [];
  }
  
  try {
    const manifest = fs.readFileSync(assetManifestPath, { encoding: 'utf8' });
    const manifestContent = JSON.parse(manifest);
    
    // Return only our renamed fixed files
    return [
      'static/js/runtime.js',
      'static/css/styles.css',
      'static/js/styles.js'
    ];
  } catch (error) {
    return [];
  }
}

module.exports = getEntrypoints;
