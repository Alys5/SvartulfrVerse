import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { mockFiles, mockCategories } from '../../data/mockFiles';
import { MdFile } from '../../types';
import FileCard from '../../components/FileCard';
import SearchBar from '../../components/SearchBar';
import styles from './index.module.scss';

const ExplorerPage: React.FC = () => {
  const [files, setFiles] = useState<MdFile[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const cat = currentPage?.options?.cat;
    if (cat) {
      setActiveCategory(decodeURIComponent(cat));
    }
    setFiles(mockFiles);
  }, []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSearchQuery('');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = mockFiles.filter(f =>
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.excerpt?.toLowerCase().includes(query.toLowerCase()) ||
        f.category.toLowerCase().includes(query.toLowerCase())
      );
      setFiles(filtered);
    } else {
      setFiles(activeCategory === 'All' ? mockFiles : mockFiles.filter(f => f.category === activeCategory));
    }
  };

  const handleFileClick = (file: MdFile) => {
    Taro.navigateTo({ url: `/pages/viewer/index?id=${file.id}` });
  };

  const filteredFiles = searchQuery
    ? files
    : activeCategory === 'All'
      ? files
      : files.filter(f => f.category === activeCategory);

  return (
    <View className={styles.container}>
      <SearchBar onSearch={handleSearch} placeholder="Filter documents..." />

      {/* Category Tabs */}
      <ScrollView className={styles.tabBar} scrollX>
        {mockCategories.map((cat, i) => (
          <View
            key={i}
            className={`${styles.tab} ${activeCategory === cat.name ? styles.tabActive : ''}`}
            onClick={() => handleCategoryChange(cat.name)}
          >
            <Text className={styles.tabIcon}>{cat.icon}</Text>
            <Text className={`${styles.tabText} ${activeCategory === cat.name ? styles.tabTextActive : ''}`}>
              {cat.name}
            </Text>
            <Text className={`${styles.tabCount} ${activeCategory === cat.name ? styles.tabCountActive : ''}`}>
              {cat.count}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* File List */}
      <ScrollView className={styles.fileList} scrollY>
        {filteredFiles.length > 0 ? (
          filteredFiles.map(file => (
            <FileCard key={file.id} file={file} onClick={handleFileClick} />
          ))
        ) : (
          <View className={styles.empty}>
            <Text className={styles.emptyIcon}>📭</Text>
            <Text className={styles.emptyText}>No documents found</Text>
            <Text className={styles.emptySub}>Try a different category or search term</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ExplorerPage;
