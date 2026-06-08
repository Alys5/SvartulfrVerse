import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { mockFiles } from '../../data/mockFiles';
import { MdFile, SearchResult } from '../../types';
import SearchBar from '../../components/SearchBar';
import styles from './index.module.scss';

const SearchPage: React.FC = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(['Wulfnic', 'ADR-006', 'Lorebook', 'Douglas']);

  useEffect(() => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const q = currentPage?.options?.q;
    if (q) {
      const decoded = decodeURIComponent(q);
      setQuery(decoded);
      performSearch(decoded);
    }
  }, []);

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setSearched(true);
    const searchTerms = searchQuery.toLowerCase().split(/\s+/);
    const foundResults: SearchResult[] = [];

    for (const file of mockFiles) {
      const matches: { line: number; text: string; highlight: string }[] = [];
      let score = 0;

      // Search in name
      if (file.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        score += 10;
        matches.push({ line: 0, text: `Filename: ${file.name}`, highlight: file.name });
      }

      // Search in category
      if (file.category.toLowerCase().includes(searchQuery.toLowerCase())) {
        score += 5;
        matches.push({ line: 0, text: `Category: ${file.category}`, highlight: file.category });
      }

      // Search in content
      if (file.content) {
        const lines = file.content.split('\n');
        lines.forEach((line, idx) => {
          if (searchTerms.some(term => line.toLowerCase().includes(term))) {
            score += 2;
            const highlighted = line.replace(
              new RegExp(searchTerms.join('|'), 'gi'),
              (match) => `**${match}**`
            );
            matches.push({ line: idx + 1, text: line.substring(0, 100), highlight: highlighted });
          }
        });
      }

      // Search in excerpt
      if (file.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())) {
        score += 3;
        matches.push({ line: 0, text: file.excerpt, highlight: file.excerpt });
      }

      if (score > 0 && matches.length > 0) {
        foundResults.push({ file, matches: matches.slice(0, 5), score });
      }
    }

    foundResults.sort((a, b) => b.score - a.score);
    setResults(foundResults);
  };

  const handleSearch = (q: string) => {
    setQuery(q);
    performSearch(q);
    if (q && !recentSearches.includes(q)) {
      setRecentSearches(prev => [q, ...prev.slice(0, 9)]);
    }
  };

  const handleFileClick = (file: MdFile) => {
    Taro.navigateTo({ url: `/pages/viewer/index?id=${file.id}` });
  };

  const handleRecentClick = (term: string) => {
    setQuery(term);
    performSearch(term);
  };

  return (
    <View className={styles.container}>
      <SearchBar onSearch={handleSearch} placeholder="Search all documents..." />

      {!searched && (
        <View className={styles.empty}>
          <Text className={styles.emptyIcon}>🔍</Text>
          <Text className={styles.emptyTitle}>Search Documents</Text>
          <Text className={styles.emptySub}>Search across all markdown files in the repository</Text>

          {recentSearches.length > 0 && (
            <View className={styles.recentSection}>
              <Text className={styles.recentTitle}>Recent Searches</Text>
              <View className={styles.recentTags}>
                {recentSearches.map((term, i) => (
                  <View key={i} className={styles.recentTag} onClick={() => handleRecentClick(term)}>
                    <Text className={styles.recentTagText}>{term}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      )}

      {searched && (
        <View className={styles.resultsHeader}>
          <Text className={styles.resultsCount}>
            {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </Text>
        </View>
      )}

      <ScrollView className={styles.resultList} scrollY>
        {searched && results.length === 0 && (
          <View className={styles.noResults}>
            <Text className={styles.noResultsIcon}>😕</Text>
            <Text className={styles.noResultsText}>No results found</Text>
            <Text className={styles.noResultsSub}>Try different keywords or check spelling</Text>
          </View>
        )}

        {results.map((result, idx) => (
          <View key={idx} className={styles.resultCard} onClick={() => handleFileClick(result.file)}>
            <View className={styles.resultHeader}>
              <Text className={styles.resultName}>{result.file.name}</Text>
              <View className={styles.resultBadge}>
                <Text className={styles.resultBadgeText}>{result.file.category}</Text>
              </View>
            </View>
            <Text className={styles.resultPath}>{result.file.path}</Text>
            {result.matches.slice(0, 3).map((match, mi) => (
              <Text key={mi} className={styles.resultMatch} numberOfLines={1}>
                {match.text}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchPage;
