require('dotenv').config();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cloudinary = require('cloudinary').v2;

// The CLOUDINARY_URL is automatically picked up from process.env if dotenv is loaded
if (!process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloudinary_url: "cloudinary://739513226186525:RWS8j7NKjcshdhJ7g4PVSnaxoYI@dpa93copz"
  });
}

const frontendFile = '/Users/sudeeshkumar/Desktop/TGT COMPANY/kumarpower/src/pages/services/Installation.tsx';
const frontendContent = fs.readFileSync(frontendFile, 'utf-8');

// Extract the installationProducts array
const match = frontendContent.match(/const installationProducts = \[([\s\S]*?)\];/);
if (!match) {
  console.log("Could not find installationProducts array");
  process.exit(1);
}

const arrContent = match[1];
const items = [];
const itemRegex = /\{[^}]*id:\s*(\d+)[^}]*name:\s*"([^"]+)"[^}]*imageUrl:\s*([^,]+)[^}]*category:\s*"([^"]+)"[^}]*\}/g;

let matchItem;
while ((matchItem = itemRegex.exec(arrContent)) !== null) {
  const [_, id, name, imgVar, category] = matchItem;
  items.push({ id, name, imgVar: imgVar.trim(), category });
}

// Extract imports to map variables to paths
const importRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s+['"]([^'"]+)['"]/g;
const importMap = {};
let matchImport;
while ((matchImport = importRegex.exec(frontendContent)) !== null) {
  importMap[matchImport[1]] = matchImport[2];
}

async function run() {
  const uniqueHashes = new Set();
  const newPortfolio = [];
  
  for (const item of items) {
    const importPath = importMap[item.imgVar];
    if (!importPath) continue;

    // Resolve absolute path
    const absPath = importPath.replace(/^@/, '/Users/sudeeshkumar/Desktop/TGT COMPANY/kumarpower/src');
    
    if (!fs.existsSync(absPath)) {
      console.log(`File missing: ${absPath}`);
      continue;
    }

    const fileBuffer = fs.readFileSync(absPath);
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

    // Only upload UNIQUE images
    if (uniqueHashes.has(hash)) {
      console.log(`Skipping duplicate image for item ${item.id} (${item.name})`);
      continue;
    }
    
    uniqueHashes.add(hash);
    console.log(`Uploading ${path.basename(absPath)}...`);
    
    try {
      const result = await cloudinary.uploader.upload(absPath, {
        folder: 'kumarpower_website/installation'
      });
      
      newPortfolio.push({
        id: `p-${item.id}`,
        name: item.name,
        category: item.category,
        imageUrl: result.secure_url
      });
      console.log(`Uploaded! ${result.secure_url}`);
    } catch (e) {
      console.error("Upload error for", absPath, e);
    }
  }

  // Update seed_installation.js
  const seedScriptFile = '/Users/sudeeshkumar/.gemini/antigravity-ide/brain/656661e6-46e8-4f25-b896-49dfad47e9ff/scratch/seed_installation.js';
  let seedScript = fs.readFileSync(seedScriptFile, 'utf-8');
  
  const portfolioPayloadStr = JSON.stringify(newPortfolio, null, 14).replace(/"([^"]+)":/g, '$1:');
  
  seedScript = seedScript.replace(/portfolio: \[[\s\S]*?\],/, `portfolio: ${portfolioPayloadStr},`);
  fs.writeFileSync(seedScriptFile, seedScript);
  console.log("Updated seed_installation.js with new Cloudinary URLs");
}

run();
