// 扩展消息类型
export interface Message {
  type: 'TOGGLE_UI' | 'HIDE_UI' | 'SHOW_UI' | 'CHECK_FULLSCREEN';
  payload?: any;
}

// UI 状态
export interface UIState {
  hidden: boolean;
}

