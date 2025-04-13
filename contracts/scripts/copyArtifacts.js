// copyArtifacts.js
const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "..", "build", "contracts");
const destDir = path.join(__dirname, "..", "..", "frontend", "src", "contracts");
const addressMap = {};

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log(`✅ Created directory: ${destDir}`);
}

// Check if source directory exists before reading
if (!fs.existsSync(srcDir)) {
  console.error(`❌ Source directory not found: ${srcDir}`);
  console.error("Did you run 'truffle compile' first?");
  process.exit(1);
}

// Copy each contract artifact file
fs.readdirSync(srcDir).forEach((file) => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(destDir, file);
  
  // Skip directories and non-JSON files
  if (fs.statSync(srcFile).isDirectory() || !file.endsWith('.json')) {
    return;
  }
  
  try {
    // Copy the ABI file
    fs.copyFileSync(srcFile, destFile);
    console.log(`✅ Copied ABI: ${file}`);

    // Extract contract address (if deployed)
    const artifact = JSON.parse(fs.readFileSync(srcFile, "utf8"));
    const networks = artifact.networks || {};

    // Get the first network address (usually for development = 5777)
    const networkIds = Object.keys(networks);
    if (networkIds.length > 0) {
      const latestNetwork = networkIds[networkIds.length - 1];
      const address = networks[latestNetwork]?.address;

      if (address) {
        addressMap[artifact.contractName] = address;
        console.log(`📍 Found address for ${artifact.contractName}: ${address}`);
      }
    }
  } catch (err) {
    console.error(`❌ Error processing ${file}: ${err.message}`);
  }
});

// Save addresses.json to frontend
if (Object.keys(addressMap).length > 0) {
  const addressFilePath = path.join(destDir, "addresses.json");
  fs.writeFileSync(addressFilePath, JSON.stringify(addressMap, null, 2));
  console.log(`📍 Saved contract addresses to: addresses.json`);
} else {
  console.warn(`⚠️ No contract addresses found. Make sure you've deployed your contracts.`);
}
