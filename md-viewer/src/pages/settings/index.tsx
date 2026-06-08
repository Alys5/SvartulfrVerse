import React, { useState } from 'react';
import { View, Text, Switch, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AppSettings } from '../../types';
import styles from './index.module.scss';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'light',
    fontSize: 'medium',
    tocVisible: true,
    lineNumbers: false,
  });

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const fontSizes: { label: string; value: AppSettings['fontSize'] }[] = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
  ];

  return (
    <View className={styles.container}>
      <ScrollView className={styles.scrollView} scrollY>
        {/* Appearance Section */}
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>Appearance</Text>

          <View className={styles.settingItem}>
            <View className={styles.settingInfo}>
              <Text className={styles.settingLabel}>Dark Mode</Text>
              <Text className={styles.settingDesc}>Switch to dark color scheme</Text>
            </View>
            <Switch
              checked={settings.theme === 'dark'}
              onChange={(e) => updateSetting('theme', e.detail.value ? 'dark' : 'light')}
              color="#3366cc"
            />
          </View>

          <View className={styles.settingItem}>
            <View className={styles.settingInfo}>
              <Text className={styles.settingLabel}>Font Size</Text>
              <Text className={styles.settingDesc}>Adjust document text size</Text>
            </View>
            <View className={styles.segmentControl}>
              {fontSizes.map(fs => (
                <View
                  key={fs.value}
                  className={`${styles.segmentItem} ${settings.fontSize === fs.value ? styles.segmentItemActive : ''}`}
                  onClick={() => updateSetting('fontSize', fs.value)}
                >
                  <Text className={`${styles.segmentText} ${settings.fontSize === fs.value ? styles.segmentTextActive : ''}`}>
                    {fs.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Reader Section */}
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>Reader</Text>

          <View className={styles.settingItem}>
            <View className={styles.settingInfo}>
              <Text className={styles.settingLabel}>Show Table of Contents</Text>
              <Text className={styles.settingDesc}>Display TOC panel in document viewer</Text>
            </View>
            <Switch
              checked={settings.tocVisible}
              onChange={(e) => updateSetting('tocVisible', e.detail.value)}
              color="#3366cc"
            />
          </View>

          <View className={styles.settingItem}>
            <View className={styles.settingInfo}>
              <Text className={styles.settingLabel}>Line Numbers</Text>
              <Text className={styles.settingDesc}>Show line numbers in code blocks</Text>
            </View>
            <Switch
              checked={settings.lineNumbers}
              onChange={(e) => updateSetting('lineNumbers', e.detail.value)}
              color="#3366cc"
            />
          </View>
        </View>

        {/* About Section */}
        <View className={styles.section}>
          <Text className={styles.sectionTitle}>About</Text>

          <View className={styles.aboutCard}>
            <Text className={styles.aboutLogo}>📖</Text>
            <Text className={styles.aboutName}>MD Viewer</Text>
            <Text className={styles.aboutVersion}>Version 1.0.0</Text>
            <Text className={styles.aboutDesc}>
              Wiki-style documentation browser with Material Design.
              Browse and search SvartúlfrVerse project files.
            </Text>
          </View>

          <View className={styles.infoItem}>
            <Text className={styles.infoLabel}>Project</Text>
            <Text className={styles.infoValue}>SvartúlfrVerse</Text>
          </View>
          <View className={styles.infoItem}>
            <Text className={styles.infoLabel}>Framework</Text>
            <Text className={styles.infoValue}>Taro 4.x + React + TypeScript</Text>
          </View>
          <View className={styles.infoItem}>
            <Text className={styles.infoLabel}>Design</Text>
            <Text className={styles.infoValue}>Material Design 3 + Wiki-style</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsPage;
