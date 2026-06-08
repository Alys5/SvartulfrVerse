import React, { useState } from 'react';
import { View, Input, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = 'Search documents...' }) => {
  const [value, setValue] = useState('');

  const handleInput = (e: any) => {
    setValue(e.detail.value);
  };

  const handleConfirm = () => {
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <View className={styles.container}>
      <View className={styles.searchBox}>
        <Text className={styles.searchIcon}>🔍</Text>
        <Input
          className={styles.input}
          value={value}
          onInput={handleInput}
          onConfirm={handleConfirm}
          placeholder={placeholder}
          placeholderClass={styles.placeholder}
          confirmType="search"
        />
        {value.length > 0 && (
          <View className={styles.clearBtn} onClick={handleClear}>
            <Text className={styles.clearText}>✕</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchBar;
