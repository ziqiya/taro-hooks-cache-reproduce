import { useRequest } from 'taro-hooks';
import { useRef, useState } from 'react';

import useMemoizedFn from '@/hooks/useMemoizedFn';
import { INITIAL_PAGE } from '@/constant';

interface ConditionProps {
  page: number;
  filterKey: string;
}

// 初始值
const INITIAL_KEY = 'A';

// 模拟列表格式数据
const MOCK_DATA = {
  // 筛选项 A
  A: {
    // 第1页
    1: [
      { id: 1, name: 'A1' },
      { id: 2, name: 'A2' },
      { id: 3, name: 'A3' },
    ],
    // 第2页
    2: [
      { id: 4, name: 'A4' },
      { id: 5, name: 'A5' },
      { id: 6, name: 'A6' },
    ],
  },
  // 筛选项 B
  B: {
    // 第1页
    1: [
      { id: 7, name: 'B1' },
      { id: 8, name: 'B2' },
      { id: 9, name: 'B3' },
    ],
    // 第2页
    2: [
      { id: 10, name: 'B4' },
      { id: 11, name: 'B5' },
      { id: 12, name: 'B6' },
    ],
  },
};

export function useHomeService() {
  const scrollViewRef = useRef<any>(null);
  const [activeKey, setActiveKey] = useState<string>(INITIAL_KEY);
  const mockRequest = (condition: ConditionProps) => {
    const { page, filterKey } = condition || {};

    const result = MOCK_DATA[filterKey][page] || [];
    console.log('result: ', result);

    return Promise.resolve({
      list: result,
      page: 1,
      pageSize: 10,
      total: 6,
    });
  };

  /** 商品列表 */
  const {
    data,
    loading,
    reload,
    loadingMore,
    noMore,
    run: fetchList,
  } = useRequest(
    (d: any) => {
      const params: any = {
        page: d ? d.page + 1 : 1,
        pageSize: 10,
        filterKey: d?.filterKey || INITIAL_KEY,
      };
      return mockRequest(params);
    },
    {
      loadMore: true,
      ref: scrollViewRef,
      cacheKey: 'id',
      isNoMore: (d: Page) => (d ? d.list.length >= d.total : false),
    }
  );

  const { list } = data || {};

  /** 点击 Tag 选择当前筛选条件 */
  const handleTagClick = (key: string) => {
    fetchList({ filterKey: key, page: INITIAL_PAGE });
    setActiveKey(key);
  };

  return {
    activeKey,
    list,
    loading,
    noMore,
    scrollViewRef,
    fetchList,
    loadingMore,
    reload: useMemoizedFn(reload),
    handleTagClick: useMemoizedFn(handleTagClick),
  };
}
