const fs = require('fs');
const path = require('path');

// 创建一个简单的 PNG 图标生成脚本
// 由于 Node.js 没有内置 PNG 生成功能，我们创建一个简单的占位图标说明

const iconsDir = path.join(__dirname, '..', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('生成图标文件...');
console.log('由于需要 PNG 格式，请使用以下方法之一：');
console.log('1. 使用在线工具将 icons/icon.svg 转换为 PNG（16x16, 48x48, 128x128）');
console.log('2. 使用 ImageMagick: convert -background none -resize SIZE icons/icon.svg icons/iconSIZE.png');
console.log('3. 暂时移除 manifest.json 中的 icons 配置（已自动处理）');

