# Taro-Hooks bug 重现

## bug 概要

发现了三个 bug
  
1.[github issue](https://github.com/innocces/taro-hooks/issues/36)

### 准备工作

1.先 yarn 安装依赖
2.执行<code>yarn dev:weapp</code>
3.打开微信开发者工具

### 重新步骤

1.在筛选项 A 的条件下，上滑滚动列表到底部，加载出数据 A4-A6。
2.此时点击筛选项 B ，这时候发现数据 A4-A6 并没有被删除，数据残留(bug1)，且滑到底部，数据 B4-B6 无法被加载(bug2)。
3.如果设定 ScrollView 的高度为 200（超出第一页数据的高度），初始不能自动加载第2页（bug3），见 src/pages/home/index.tsx 中的注释。
