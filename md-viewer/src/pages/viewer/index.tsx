import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { mockFiles } from '../../data/mockFiles';
import { MdFile, TocItem } from '../../types';
import { parseToc, renderMdToHtml } from '../../utils/mdParser';
import TocPanel from '../../components/TocPanel';
import styles from './index.module.scss';

const ViewerPage: React.FC = () => {
  const [file, setFile] = useState<MdFile | null>(null);
  const [toc, setToc] = useState<TocItem[]>([]);
  const [tocVisible, setTocVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pages = Taro.getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const id = currentPage?.options?.id;
    if (id) {
      const found = mockFiles.find(f => f.id === id);
      if (found) {
        setFile(found);
        if (found.content) {
          setToc(parseToc(found.content));
        }
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View className={styles.loading}>
        <Text className={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!file) {
    return (
      <View className={styles.error}>
        <Text className={styles.errorIcon}>📄</Text>
        <Text className={styles.errorText}>Document not found</Text>
      </View>
    );
  }

  const content = file.content || '';
  const htmlContent = renderMdToHtml(content);

  // Render markdown content line by line for better control
  const renderContent = () => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let inTable = false;
    let tableRows: string[] = [];

    const flushTable = () => {
      if (tableRows.length > 0) {
        const headerRow = tableRows[0];
        const dataRows = tableRows.slice(2); // skip separator
        const headers = headerRow.split('|').map(h => h.trim()).filter(Boolean);

        elements.push(
          <View key={`table-${elements.length}`} className={styles.table}>
            <View className={styles.tableHeader}>
              {headers.map((h, hi) => (
                <Text key={hi} className={styles.tableHeaderCell} numberOfLines={1}>{h}</Text>
              ))}
            </View>
            {dataRows.map((row, ri) => {
              const cells = row.split('|').map(c => c.trim()).filter(Boolean);
              return (
                <View key={ri} className={styles.tableRow}>
                  {cells.map((cell, ci) => (
                    <Text key={ci} className={styles.tableCell} numberOfLines={2}>{cell}</Text>
                  ))}
                </View>
              );
            })}
          </View>
        );
        tableRows = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <View key={`code-${i}`} className={styles.codeBlock}>
              <ScrollView className={styles.codeScroll} scrollX>
                <Text className={styles.codeText}>{codeContent.trim()}</Text>
              </ScrollView>
            </View>
          );
          codeContent = '';
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        continue;
      }

      // Table detection
      if (line.includes('|') && line.trim().startsWith('|')) {
        if (!inTable) inTable = true;
        tableRows.push(line);
        // Check if next line is not table
        const nextLine = lines[i + 1];
        if (!nextLine || !nextLine.includes('|') || !nextLine.trim().startsWith('|')) {
          inTable = false;
          flushTable();
        }
        continue;
      } else if (inTable) {
        inTable = false;
        flushTable();
      }

      // Headings
      if (line.startsWith('# ')) {
        const text = line.substring(2);
        elements.push(
          <View key={`h1-${i}`} className={styles.headingWrap}>
            <View className={styles.headingUnderline} />
            <Text className={styles.h1}>{text}</Text>
          </View>
        );
      } else if (line.startsWith('## ')) {
        const text = line.substring(3);
        elements.push(
          <View key={`h2-${i}`} className={styles.headingWrap}>
            <View className={styles.headingUnderline} />
            <Text className={styles.h2}>{text}</Text>
          </View>
        );
      } else if (line.startsWith('### ')) {
        const text = line.substring(4);
        elements.push(<Text key={`h3-${i}`} className={styles.h3}>{text}</Text>);
      } else if (line.startsWith('#### ')) {
        const text = line.substring(5);
        elements.push(<Text key={`h4-${i}`} className={styles.h4}>{text}</Text>);

      // Blockquotes
      } else if (line.startsWith('> ')) {
        const text = line.substring(2);
        elements.push(
          <View key={`bq-${i}`} className={styles.blockquote}>
            <View className={styles.blockquoteBar} />
            <Text className={styles.blockquoteText}>{text}</Text>
          </View>
        );

      // Horizontal rule
      } else if (line.trim() === '---' || line.trim() === '***') {
        elements.push(<View key={`hr-${i}`} className={styles.hr} />);

      // List items
      } else if (line.match(/^\s*[-*]\s+/)) {
        const text = line.replace(/^\s*[-*]\s+/, '');
        const indent = line.match(/^(\s*)/)?.[1]?.length || 0;
        elements.push(
          <View key={`li-${i}`} className={styles.listItem} style={{ marginLeft: `${Math.min(indent * 8, 48)}rpx` }}>
            <Text className={styles.bullet}>•</Text>
            <Text className={styles.listText}>{renderInline(text)}</Text>
          </View>
        );

      // Numbered list
      } else if (line.match(/^\s*\d+\.\s+/)) {
        const match = line.match(/^\s*(\d+)\.\s+(.+)/);
        if (match) {
          elements.push(
            <View key={`ol-${i}`} className={styles.listItem}>
              <Text className={styles.numberBullet}>{match[1]}.</Text>
              <Text className={styles.listText}>{renderInline(match[2])}</Text>
            </View>
          );
        }

      // Empty line
      } else if (line.trim() === '') {
        elements.push(<View key={`sp-${i}`} className={styles.spacer} />);

      // Paragraph (with inline formatting)
      } else {
        elements.push(
          <Text key={`p-${i}`} className={styles.paragraph}>
            {renderInline(line)}
          </Text>
        );
      }
    }

    return elements;
  };

  const renderInline = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    while (remaining.length > 0) {
      // Bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Inline code
      const codeMatch = remaining.match(/`([^`]+)`/);
      // Italic
      const italicMatch = remaining.match(/\*([^*]+)\*/);

      let firstMatch: { type: string; match: RegExpMatchArray; index: number } | null = null;

      if (boldMatch && boldMatch.index !== undefined) {
        firstMatch = { type: 'bold', match: boldMatch, index: boldMatch.index };
      }
      if (codeMatch && codeMatch.index !== undefined && (!firstMatch || codeMatch.index < firstMatch.index)) {
        firstMatch = { type: 'code', match: codeMatch, index: codeMatch.index };
      }
      if (italicMatch && italicMatch.index !== undefined && (!firstMatch || italicMatch.index < firstMatch.index)) {
        firstMatch = { type: 'italic', match: italicMatch, index: italicMatch.index };
      }

      if (firstMatch) {
        // Text before match
        if (firstMatch.index > 0) {
          parts.push(<Text key={keyIdx++}>{remaining.substring(0, firstMatch.index)}</Text>);
        }

        if (firstMatch.type === 'bold') {
          parts.push(<Text key={keyIdx++} className={styles.inlineBold}>{firstMatch.match[1]}</Text>);
        } else if (firstMatch.type === 'code') {
          parts.push(<Text key={keyIdx++} className={styles.inlineCode}>{firstMatch.match[1]}</Text>);
        } else if (firstMatch.type === 'italic') {
          parts.push(<Text key={keyIdx++} className={styles.inlineItalic}>{firstMatch.match[1]}</Text>);
        }

        remaining = remaining.substring(firstMatch.index + firstMatch.match[0].length);
      } else {
        parts.push(<Text key={keyIdx++}>{remaining}</Text>);
        break;
      }
    }

    return parts;
  };

  return (
    <View className={styles.container}>
      {/* Wiki-style header */}
      <View className={styles.wikiHeader}>
        <View className={styles.wikiHeaderContent}>
          <Text className={styles.wikiTitle}>{file.name.replace('.md', '')}</Text>
          <Text className={styles.wikiPath}>{file.path}</Text>
        </View>
        {toc.length > 0 && (
          <View className={styles.tocToggle} onClick={() => setTocVisible(!tocVisible)}>
            <Text className={styles.tocToggleText}>{tocVisible ? '✕' : '☰'}</Text>
          </View>
        )}
      </View>

      {/* Wiki content area */}
      <ScrollView className={styles.content} scrollY>
        <View className={styles.contentInner}>
          {renderContent()}
        </View>
      </ScrollView>

      {/* TOC Panel */}
      <TocPanel items={toc} visible={tocVisible} onItemClick={() => {}} />
    </View>
  );
};

export default ViewerPage;
