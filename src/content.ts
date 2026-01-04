// 类型定义
interface Message {
  type: 'TOGGLE_UI' | 'HIDE_UI' | 'SHOW_UI' | 'CHECK_FULLSCREEN';
  payload?: any;
}

interface UIState {
  hidden: boolean;
}

// 选择器定义 - 针对微信读书的实际页面结构
const SELECTORS = {
  header: [
    '.readerTopBar',
    // '.readerFooter',
    '.readerContentHeader'
  ],
  sidebar: [
    '.readerControls'
  ]
};

// 存储元素的原始 display 值
const originalDisplays = new WeakMap<HTMLElement, string>();

// 存储当前状态
let uiState: UIState = {
  hidden: false
};

// 查找元素
function findElements(selectors: string[]): HTMLElement[] {
  const elements: HTMLElement[] = [];
  selectors.forEach(selector => {
    try {
      const found = document.querySelectorAll<HTMLElement>(selector);
      found.forEach(el => {
        if (!elements.includes(el)) {
          elements.push(el);
        }
      });
    } catch (e) {
      // 忽略无效选择器
    }
  });
  return elements;
}

// 获取所有需要隐藏的元素
function getAllUIElements(): HTMLElement[] {
  const elements: HTMLElement[] = [];
  
  // 查找头部导航栏
  elements.push(...findElements(SELECTORS.header));
  
  // 查找侧边栏
  elements.push(...findElements(SELECTORS.sidebar));
  
  return elements;
}

// 隐藏/显示 UI
function toggleUI(hidden?: boolean): void {
  const elements = getAllUIElements();
  const shouldHide = hidden !== undefined ? hidden : !uiState.hidden;
  
  elements.forEach(element => {
    if (shouldHide) {
      // 保存原始 display 值
      if (!originalDisplays.has(element)) {
        const computedStyle = window.getComputedStyle(element);
        originalDisplays.set(element, computedStyle.display);
      }
      element.style.display = 'none';
    } else {
      // 恢复原始 display 值
      const originalDisplay = originalDisplays.get(element);
      if (originalDisplay) {
        element.style.display = originalDisplay;
      } else {
        element.style.display = '';
      }
    }
  });
  
  uiState.hidden = shouldHide;
  
  // 保存状态到 localStorage
  try {
    localStorage.setItem('wereader_ui_hidden', String(shouldHide));
  } catch (e) {
    // 忽略存储错误
  }
}

// 从 localStorage 恢复状态
function restoreState(): void {
  try {
    const saved = localStorage.getItem('wereader_ui_hidden');
    if (saved === 'true') {
      uiState.hidden = true;
      toggleUI(true);
    }
  } catch (e) {
    // 忽略读取错误
  }
}

// 检查是否全屏（包括F11浏览器全屏和元素全屏）
function checkFullscreen(): boolean {
  // 检查元素全屏 API
  const elementFullscreen = !!(
    document.fullscreenElement ||
    (document as any).webkitFullscreenElement ||
    (document as any).mozFullScreenElement ||
    (document as any).msFullscreenElement
  );
  
  // 检查浏览器全屏（F11）
  // 当浏览器全屏时，window.innerHeight 应该等于 screen.height
  // 并且 window.outerHeight 也应该接近 screen.height
  const browserFullscreen = 
    (window.innerHeight === screen.height && window.innerWidth === screen.width) ||
    (window.outerHeight === screen.height && window.outerWidth === screen.width) ||
    // 另一种检测方式：检查窗口是否占满整个屏幕
    (window.screenTop === 0 && window.screenLeft === 0 && 
     window.outerHeight >= screen.height - 100 && window.outerWidth >= screen.width - 100);
  
  return elementFullscreen || browserFullscreen;
}

// 监听全屏变化
function setupFullscreenListener(): void {
  // 监听元素全屏变化事件
  const fullscreenEvents = [
    'fullscreenchange',
    'webkitfullscreenchange',
    'mozfullscreenchange',
    'MSFullscreenChange'
  ];
  
  fullscreenEvents.forEach(event => {
    document.addEventListener(event, () => {
      const isFullscreen = checkFullscreen();
      if (isFullscreen) {
        toggleUI(true);
      } else {
        // 退出全屏时，根据之前的状态决定是否显示UI
        // 如果之前是手动隐藏的，保持隐藏；否则显示
        const saved = localStorage.getItem('wereader_ui_hidden');
        if (saved !== 'true') {
          toggleUI(false);
        }
      }
    });
  });
  
  // 监听窗口大小变化（用于检测F11浏览器全屏）
  let resizeTimer: number | null = null;
  window.addEventListener('resize', () => {
    // 防抖处理
    if (resizeTimer) {
      clearTimeout(resizeTimer);
    }
    resizeTimer = window.setTimeout(() => {
      const isFullscreen = checkFullscreen();
      if (isFullscreen) {
        toggleUI(true);
      } else {
        // 退出全屏时，根据之前的状态决定是否显示UI
        const saved = localStorage.getItem('wereader_ui_hidden');
        if (saved !== 'true') {
          toggleUI(false);
        }
      }
    }, 100);
  });
  
  // 监听键盘事件，检测F11键
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    // F11 键码是 122
    if (e.key === 'F11' || e.keyCode === 122) {
      // 延迟检查，等待浏览器全屏状态更新
      setTimeout(() => {
        const isFullscreen = checkFullscreen();
        if (isFullscreen) {
          toggleUI(true);
        } else {
          const saved = localStorage.getItem('wereader_ui_hidden');
          if (saved !== 'true') {
            toggleUI(false);
          }
        }
      }, 200);
    }
  });
}

// 监听来自 background 的消息
chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
  switch (message.type) {
    case 'TOGGLE_UI':
      toggleUI();
      sendResponse({ success: true, hidden: uiState.hidden });
      break;
    case 'HIDE_UI':
      toggleUI(true);
      sendResponse({ success: true, hidden: uiState.hidden });
      break;
    case 'SHOW_UI':
      toggleUI(false);
      sendResponse({ success: true, hidden: uiState.hidden });
      break;
    case 'CHECK_FULLSCREEN':
      const isFullscreen = checkFullscreen();
      sendResponse({ success: true, isFullscreen });
      if (isFullscreen) {
        toggleUI(true);
      }
      break;
    default:
      sendResponse({ success: false });
  }
  return true; // 保持消息通道开放
});

// 初始化
function init(): void {
  // 等待 DOM 加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      restoreState();
      setupFullscreenListener();
      
      // 延迟检查全屏状态，确保页面完全加载
      setTimeout(() => {
        if (checkFullscreen()) {
          toggleUI(true);
        }
      }, 500);
    });
  } else {
    restoreState();
    setupFullscreenListener();
    
    setTimeout(() => {
      if (checkFullscreen()) {
        toggleUI(true);
      }
    }, 500);
  }
  
  // 监听 DOM 变化，处理动态加载的元素
  const observer = new MutationObserver(() => {
    if (uiState.hidden) {
      // 如果当前是隐藏状态，确保新加载的元素也被隐藏
      toggleUI(true);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// 启动
console.log('[Wereader Extension] Content script loaded');
init();
console.log('[Wereader Extension] Content script initialized');

