import React from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { TocItem } from '../../types';
import styles from './index.module.scss';

interface TocPanelProps {
  items: TocItem[];
  visible: boolean;
  onItemClick: (id: string) => void;
}

const TocPanel: React.FC<TocPanelProps> = ({ items, visible, onItemClick }) => {
  if (!visible || items.length === 0) return null;

  return (
    <View className={styles.panel}>
      <View className={styles.header}>
        <Text className={styles.title}>Contents</Text>
      </View>
      <ScrollView className={styles.list} scrollY>
        {items.map((item, index) => (
          <View
            key={index}
            className={styles.tocItem}
            style={{ paddingLeft: `${(item.level - 1) * 24 + 16}rpx` }}
            onClick={() => onItemClick(item.id)}
          >
            <Text
              className={styles.tocText}
              style={{ fontSize: item.level === 1 ? '26rpx' : item.level === 2 ? '24rpx' : '22rpx' }}
              numberOfLines={1}
            >
              {item.title}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TocPanel;
