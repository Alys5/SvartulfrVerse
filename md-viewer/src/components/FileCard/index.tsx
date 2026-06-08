import React from 'react';
import { View, Text } from '@tarojs/components';
import { MdFile } from '../../types';
import { formatFileSize } from '../../utils/mdParser';
import styles from './index.module.scss';

interface FileCardProps {
  file: MdFile;
  onClick: (file: MdFile) => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, onClick }) => {
  const categoryColors: Record<string, string> = {
    'Root': '#3366cc',
    'Governance': '#00897b',
    'Characters': '#e65100',
    'Families': '#6a1b9a',
    'Knowledge': '#0277bd',
  };

  const badgeColor = categoryColors[file.category] || '#5f6368';

  return (
    <View className={styles.card} onClick={() => onClick(file)}>
      <View className={styles.header}>
        <View className={styles.iconWrap}>
          <Text className={styles.icon}>📄</Text>
        </View>
        <View className={styles.meta}>
          <Text className={styles.name} numberOfLines={1}>{file.name}</Text>
          <Text className={styles.path} numberOfLines={1}>{file.path}</Text>
        </View>
      </View>
      {file.excerpt && (
        <Text className={styles.excerpt} numberOfLines={2}>{file.excerpt}</Text>
      )}
      <View className={styles.footer}>
        <View className={styles.badge} style={{ backgroundColor: badgeColor }}>
          <Text className={styles.badgeText}>{file.category}</Text>
        </View>
        <Text className={styles.size}>{formatFileSize(file.size)}</Text>
        <Text className={styles.date}>{file.lastModified}</Text>
      </View>
    </View>
  );
};

export default FileCard;
