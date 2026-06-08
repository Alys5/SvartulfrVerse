import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { mockFiles, mockCategories } from '../../data/mockFiles';
import { MdFile } from '../../types';
import FileCard from '../../components/FileCard';
import SearchBar from '../../components/SearchBar';
import styles from './index.module.scss';

const HomePage: React.FC = () => {
  const [recentFiles, setRecentFiles] = useState<MdFile[]>([]);
  const [stats, setStats] = useState({ files: 0, categories: 0, size: 0 });

  useEffect(() => {
    setRecentFiles(mockFiles.slice(0, 5));
    setStats({
      files: mockFiles.length,
      categories: mockCategories.length - 1,
      size: mockFiles.reduce((acc, f) => acc + f.size, 0)
    });
  }, []);

  const handleFileClick = (file: MdFile) => {
    Taro.navigateTo({ url: `/pages/viewer/index?id=${file.id}` });
  };

  const handleSearch = (query: string) => {
    if (query) {
      Taro.navigateTo({ url: `/pages/search/index?q=${encodeURIComponent(query)}` });
    }
  };

  return (
    <View className={styles.container}>
      {/* Hero Section */}
      <View className={styles.hero}>
        <View className={styles.heroContent}>
          <Text className={styles.logo}>📖</Text>
          <Text className={styles.title}>MD Viewer</Text>
          <Text className={styles.subtitle}>SvartúlfrVerse Documentation</Text>
          <View className={styles.stats}>
            <View className={styles.statItem}>
              <Text className={styles.statValue}>{stats.files}</Text>
              <Text className={styles.statLabel}>Documents</Text>
            </View>
            <View className={styles.statDivider} />
            <View className={styles.statItem}>
              <Text className={styles.statValue}>{stats.categories}</Text>
              <Text className={styles.statLabel}>Categories</Text>
            </View>
            <View className={styles.statDivider} />
            <View className={styles.statItem}>
              <Text className={styles.statValue}>{(stats.size / 1024).toFixed(0)}KB</Text>
              <Text className={styles.statLabel}>Total Size</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Search */}
      <SearchBar onSearch={handleSearch} placeholder="Search documents..." />

      {/* Quick Categories */}
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>Categories</Text>
        <ScrollView className={styles.categoryScroll} scrollX>
          {mockCategories.filter(c => c.name !== 'All').map((cat, i) => (
            <View
              key={i}
              className={styles.categoryChip}
              onClick={() => Taro.navigateTo({ url: `/pages/explorer/index?cat=${encodeURIComponent(cat.name)}` })}
            >
              <Text className={styles.categoryIcon}>{cat.icon}</Text>
              <Text className={styles.categoryName}>{cat.name}</Text>
              <Text className={styles.categoryCount}>{cat.count}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Recent Files */}
      <View className={styles.section}>
        <View className={styles.sectionHeader}>
          <Text className={styles.sectionTitle}>Recent Documents</Text>
          <Text className={styles.sectionLink} onClick={() => Taro.switchTab({ url: '/pages/explorer/index' })}>
            View All →
          </Text>
        </View>
        <ScrollView className={styles.fileList} scrollY>
          {recentFiles.map(file => (
            <FileCard key={file.id} file={file} onClick={handleFileClick} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomePage;
