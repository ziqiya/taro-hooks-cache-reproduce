import Taro from '@tarojs/taro';

// 状态栏的高度
export const STATUSBAR_HEIGHT = Taro.getSystemInfoSync().statusBarHeight || 0;

// 初始请求的 page
export const INITIAL_PAGE = 0;
