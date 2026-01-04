// 类型定义
interface Message {
  type: 'TOGGLE_UI' | 'HIDE_UI' | 'SHOW_UI' | 'CHECK_FULLSCREEN';
  payload?: any;
}

// 处理快捷键命令
chrome.commands.onCommand.addListener((command: string) => {
  if (command === 'toggle-ui') {
    // 获取当前活动标签页
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id) {
        const tabId = tabs[0].id;
        
        // 检查是否是微信读书页面
        if (tabs[0].url && tabs[0].url.includes('weread.qq.com')) {
          // 发送切换消息到 content script
          chrome.tabs.sendMessage(tabId, { type: 'TOGGLE_UI' } as Message)
            .catch(() => {
              // 如果发送失败，可能是 content script 还未加载，尝试注入脚本
              chrome.scripting.executeScript({
                target: { tabId },
                files: ['dist/content.js']
              }).then(() => {
                // 脚本注入后再次发送消息
                setTimeout(() => {
                  chrome.tabs.sendMessage(tabId, { type: 'TOGGLE_UI' } as Message)
                    .catch(() => {});
                }, 100);
              }).catch(() => {});
            });
        }
      }
    });
  }
});

// 监听标签页更新，检查全屏状态
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('weread.qq.com')) {
    // 页面加载完成后，检查全屏状态
    setTimeout(() => {
      chrome.tabs.sendMessage(tabId, { type: 'CHECK_FULLSCREEN' } as Message)
        .catch(() => {
          // 如果 content script 未加载，注入它
          chrome.scripting.executeScript({
            target: { tabId },
            files: ['dist/content.js']
          }).then(() => {
            setTimeout(() => {
              chrome.tabs.sendMessage(tabId, { type: 'CHECK_FULLSCREEN' } as Message)
                .catch(() => {});
            }, 100);
          }).catch(() => {});
        });
    }, 1000);
  }
});

