# 快速开始指南

## 5 分钟快速安装

### 步骤 1: 安装依赖
```bash
npm install
```

### 步骤 2: 构建项目
```bash
npm run build
```

### 步骤 3: 加载到浏览器

**Chrome:**
1. 打开 `chrome://extensions/`
2. 开启"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择项目根目录

**Edge:**
1. 打开 `edge://extensions/`
2. 开启"开发人员模式"
3. 点击"加载解压缩的扩展"
4. 选择项目根目录

### 步骤 4: 使用插件

1. 访问 [微信读书](https://weread.qq.com) 并打开书籍
2. 按 `Ctrl+Shift+H` (Windows) 或 `Command+Shift+H` (Mac) 切换界面
3. 进入全屏时自动隐藏导航栏和工具栏

## 快捷键

- **Windows/Linux**: `Ctrl + Shift + H`
- **Mac**: `Command + Shift + H`

可以在 `chrome://extensions/shortcuts` 中自定义快捷键。

## 功能说明

- ✅ 快捷键切换隐藏/显示导航栏和工具栏
- ✅ 全屏模式自动隐藏
- ✅ 状态记忆（刷新后保持）
- ✅ 支持动态加载的内容

## 故障排除

**插件不工作？**
- 确保已运行 `npm run build`
- 检查浏览器控制台（F12）是否有错误
- 确保在微信读书页面使用

**快捷键无效？**
- 检查是否与其他扩展冲突
- 在 `chrome://extensions/shortcuts` 中查看快捷键设置

**无法隐藏元素？**
- 微信读书可能更新了页面结构
- 打开开发者工具检查元素选择器
- 可以提交 Issue 反馈

