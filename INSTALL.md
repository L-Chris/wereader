# 安装说明

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 构建项目

```bash
npm run build
```

### 3. 加载插件到浏览器

#### Chrome 浏览器

1. 打开 Chrome 浏览器
2. 访问 `chrome://extensions/`
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择此项目的根目录（包含 `manifest.json` 的目录）

#### Edge 浏览器

1. 打开 Edge 浏览器
2. 访问 `edge://extensions/`
3. 开启左下角的"开发人员模式"
4. 点击"加载解压缩的扩展"
5. 选择此项目的根目录

### 4. 图标说明

插件需要 PNG 格式的图标文件。当前项目包含 SVG 格式的占位图标。

**选项 1：使用在线工具转换**
- 访问 https://cloudconvert.com/svg-to-png
- 上传 `icons/icon.svg`
- 分别生成 16x16、48x48、128x128 尺寸的 PNG 文件
- 保存为 `icon16.png`、`icon48.png`、`icon128.png` 到 `icons/` 目录

**选项 2：使用 ImageMagick（如果已安装）**
```bash
convert -background none -resize 16x16 icons/icon.svg icons/icon16.png
convert -background none -resize 48x48 icons/icon.svg icons/icon48.png
convert -background none -resize 128x128 icons/icon.svg icons/icon128.png
```

**选项 3：暂时跳过图标**
- 插件可以正常工作，只是没有图标显示
- 可以在浏览器扩展管理页面看到默认图标

## 使用方法

1. 访问 [微信读书](https://weread.qq.com) 并打开任意书籍
2. 使用快捷键：
   - Windows/Linux: `Ctrl + Shift + H`
   - Mac: `Command + Shift + H`
3. 快捷键会切换隐藏/显示导航栏和工具栏
4. 进入全屏模式时，导航栏和工具栏会自动隐藏

## 开发模式

在开发过程中，可以使用监听模式自动重新编译：

```bash
npm run watch
```

修改代码后，在扩展程序管理页面点击刷新按钮即可看到更改。

## 故障排除

### 插件无法加载

- 确保已运行 `npm run build` 生成 `dist/` 目录
- 检查浏览器控制台是否有错误信息
- 确保选择的是项目根目录，而不是 `dist/` 目录

### 快捷键不工作

- 检查快捷键是否与其他扩展冲突
- 在 `chrome://extensions/shortcuts` 中查看和修改快捷键
- 确保在微信读书页面使用快捷键

### 无法隐藏元素

- 打开浏览器开发者工具（F12）
- 检查控制台是否有错误
- 微信读书可能更新了页面结构，需要更新选择器

