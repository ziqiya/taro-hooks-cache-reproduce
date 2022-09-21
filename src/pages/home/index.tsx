import { Cell, List, Tag } from '@taroify/core';
import { ScrollView, View } from '@tarojs/components';

import styles from './index.module.less';
import { useHomeService } from './useHomeService';

import { STATUSBAR_HEIGHT } from '@/constant';

// 筛选项 tag 列表
const tagsList = ['A', 'B'];

interface ItemProps {
  name: string;
  id: number;
}

export default () => {
  const { activeKey, list, scrollViewRef, handleTagClick } = useHomeService();

  return (
    <View
      style={{
        marginTop: STATUSBAR_HEIGHT,
      }}
    >
      {tagsList.map(item => (
        <Tag
          className={styles.tag}
          key={item}
          size="small"
          variant="outlined"
          color={activeKey === item ? 'primary' : 'default'}
          onClick={() => handleTagClick(item)}
        >
          筛选项{item}
        </Tag>
      ))}
      <ScrollView
        className={styles.content}
        ref={scrollViewRef}
        style={{
          // bug3 把这里改为 200 可复现
          height: 140,
        }}
        scrollY
      >
        <List>
          {list.map((item: ItemProps) => (
            <Cell>{item.name}</Cell>
          ))}
        </List>
      </ScrollView>
    </View>
  );
};
