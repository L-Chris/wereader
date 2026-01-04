# 调试指南

## 问题：插件加载成功但功能不生效

### 检查步骤

1. **检查 Content Script 是否加载**
   - 打开微信读书页面
   - 按 F12 打开开发者工具
   - 切换到 Console 标签
   - 查看是否有 `[Wereader Extension] Content script loaded` 和 `[Wereader Extension] Content script initialized` 日志
   - 如果没有，说明 content script 没有正确注入

2. **检查快捷键是否注册**
   - 打开 `chrome://extensions/shortcuts` (Chrome) 或 `edge://extensions/shortcuts` (Edge)
   - 找到"微信读书阅读优化"插件
   - 查看"切换隐藏/显示导航栏和工具栏"命令是否已注册
   - 确认快捷键是 `Ctrl+Shift+H` (Windows) 或 `Command+Shift+H` (Mac)

3. **手动测试功能**
   在浏览器控制台（F12）中执行以下代码来测试隐藏功能：
   
```javascript
// 测试隐藏功能
const readerTopBar = document.querySelector('.readerTopBar');
const readerTopBarLeft = document.querySelector('.readerTopBar_left');
const readerBottomBar = document.querySelector('.readerBottomBar');
const readerContentHeader = document.querySelector('.readerContentHeader');

[readerTopBar, readerTopBarLeft, readerBottomBar, readerContentHeader]
  .filter(el => el !== null)
  .forEach(el => el.style.display = 'none');
```

4. **检查 Background Script**
   - 打开 `chrome://extensions/` 或 `edge://extensions/`
   - 找到"微信读书阅读优化"插件
   - 点击"检查视图 service worker"或"背景页"
   - 查看是否有错误信息

5. **重新加载插件**
   - 在扩展管理页面点击插件的刷新按钮
   - 刷新微信读书页面
   - 再次测试快捷键

### 常见问题

**问题：快捷键不工作**
- 检查是否与其他扩展冲突
- 确保在微信读书页面（`weread.qq.com`）使用快捷键
- 尝试在扩展管理页面重新设置快捷键

**问题：Content Script 未加载**
- 检查 `manifest.json` 中的 `matches` 是否正确
- 确认路径是 `dist/content.js` 且文件存在
- 检查浏览器控制台是否有加载错误

**问题：元素无法隐藏**
- 微信读书可能更新了页面结构
- 打开开发者工具检查元素的实际类名
- 可能需要更新 `src/content.ts` 中的选择器

