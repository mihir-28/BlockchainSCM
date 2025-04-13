// copyArtifacts.js
const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "..", "build", "contracts");
const destDir = path.join(__dirname, "..", "..", "frontend", "src", "contracts");
const addressMap = {};

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

fs.readdirSync(srcDir).forEach((file) => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(destDir, file);
  
  // Copy the ABI file
  fs.copyFileSync(srcFile, destFile);
  console.log(`✔ Copied ABI: ${file}`);

  // Extract contract address (if deployed)
  const artifact = JSON.parse(fs.readFileSync(srcFile, "utf8"));
  const networks = artifact.networks;

  // Get the first network address (usually for development = 5777)
  const networkIds = Object.keys(networks);
  if (networkIds.length > 0) {
    const latestNetwork = networkIds[networkIds.length - 1];
    const address = networks[latestNetwork]?.address;

    if (address) {
      addressMap[artifact.contractName] = address;
    }
  }
});

// Save addresses.json to frontend
const addressFilePath = path.join(destDir, "addresses.json");
fs.writeFileSync(addressFilePath, JSON.stringify(addressMap, null, 2));
console.log(`📍 Saved contract addresses to: addresses.json`);
