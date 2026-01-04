# 微信读书阅读优化插件

一个用于优化微信读书阅读体验的浏览器插件，支持隐藏导航栏和工具栏，提供更沉浸的阅读体验。

## 功能特性

1. **快捷键切换**：使用 `Ctrl+Shift+H` (Windows/Linux) 或 `Command+Shift+H` (Mac) 快速切换隐藏/显示导航栏和工具栏
2. **全屏自动隐藏**：当页面进入全屏模式时，自动隐藏导航栏和工具栏
3. **状态记忆**：记住你的隐藏/显示偏好，刷新页面后保持状态

## 安装方法

### 开发模式安装

1. 克隆或下载此项目
2. 安装依赖：
```bash
npm install
```

3. 构建项目：
```bash
npm run build
```

4. 在 Chrome/Edge 浏览器中：
   - 打开 `chrome://extensions/` 或 `edge://extensions/`
   - 开启"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目的根目录

### 打包安装

1. 构建项目后，在扩展程序管理页面点击"打包扩展程序"
2. 选择项目根目录，生成 `.crx` 文件
3. 拖拽 `.crx` 文件到浏览器安装

## 使用方法

1. 访问 [微信读书](https://weread.qq.com) 并打开任意书籍
2. 使用快捷键 `Ctrl+Shift+H` (Windows/Linux) 或 `Command+Shift+H` (Mac) 切换隐藏/显示导航栏和工具栏
3. 进入全屏模式时，导航栏和工具栏会自动隐藏

## 开发

### 项目结构

```
wereader/
├── src/              # TypeScript 源代码
│   ├── background.ts # 背景脚本（处理快捷键和消息）
│   ├── content.ts    # 内容脚本（操作页面 DOM）
│   └── types.ts      # 类型定义
├── dist/             # 编译后的文件
├── icons/            # 插件图标
├── manifest.json     # 插件配置文件
├── tsconfig.json     # TypeScript 配置
└── package.json      # 项目配置
```

### 开发命令

- `npm run build` - 构建项目
- `npm run watch` - 监听模式构建（开发时使用）
- `npm run clean` - 清理构建文件

### 技术栈

- TypeScript
- Chrome Extension Manifest V3
- 原生 DOM API

## 注意事项

- 插件仅支持微信读书网站 (`weread.qq.com`)
- 需要付费会员才能使用某些功能（这是微信读书的限制，非插件限制）
- 如果页面结构发生变化，可能需要更新选择器

## 许可证

MIT

