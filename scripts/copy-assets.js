const fs = require('fs');
const path = require('path');

// 创建 dist 目录
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 创建 icons 目录
const iconsDir = path.join(__dirname, '..', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// 复制 manifest.json
const manifestSrc = path.join(__dirname, '..', 'manifest.json');
const manifestDest = path.join(distDir, 'manifest.json');
if (fs.existsSync(manifestSrc)) {
  fs.copyFileSync(manifestSrc, manifestDest);
  console.log('✓ Copied manifest.json');
}

// 检查图标文件
const iconSizes = [16, 48, 128];
let missingIcons = [];
iconSizes.forEach(size => {
  const iconPath = path.join(iconsDir, `icon${size}.png`);
  if (!fs.existsSync(iconPath)) {
    missingIcons.push(size);
  }
});

if (missingIcons.length > 0) {
  console.log(`⚠ Warning: Missing icon files for sizes: ${missingIcons.join(', ')}`);
  console.log('   Please convert icons/icon.svg to PNG format. See INSTALL.md for details.');
}

console.log('✓ Assets copied');

