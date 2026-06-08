export interface MdFile {
  id: string;
  name: string;
  path: string;
  category: string;
  size: number;
  lastModified: string;
  content?: string;
  excerpt?: string;
}

export interface TocItem {
  level: number;
  title: string;
  id: string;
}

export interface SearchResult {
  file: MdFile;
  matches: SearchMatch[];
  score: number;
}

export interface SearchMatch {
  line: number;
  text: string;
  highlight: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  tocVisible: boolean;
  lineNumbers: boolean;
}
