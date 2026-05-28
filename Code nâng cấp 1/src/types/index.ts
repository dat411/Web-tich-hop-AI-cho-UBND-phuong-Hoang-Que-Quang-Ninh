// ============================================
// CORE TYPES - Hệ thống AI Hành chính công
// ============================================

// Message Types
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  confidence?: ConfidenceLevel;
  files?: AttachedFile[];
  intent?: IntentType;
  processingTime?: number;
  relatedDocs?: string[];
}

export interface AttachedFile {
  name: string;
  size: number;
  type: string;
  preview?: string;
}

// Chat Session Types
export interface ChatSession {
  id: string;
  title: string;
  date: Date;
  messages: Message[];
  messageCount: number;
  preview: string;
  category?: string;
  starred?: boolean;
}

// Legal Document Types
export interface LegalDocument {
  id: string;
  type: DocumentType;
  number: string;
  title: string;
  issueDate: string;
  effectiveDate: string;
  issuingBody: string;
  summary: string;
  keywords: string[];
  category: string;
  relatedDocuments: string[];
  fullContent: string;
  status?: 'active' | 'expired' | 'amended';
  viewCount?: number;
}

export type DocumentType = 
  | 'nghi-dinh' 
  | 'thong-tu' 
  | 'luat' 
  | 'quyet-dinh' 
  | 'nghi-quyet'
  | 'chi-thi'
  | 'cong-van';

// AI Response Types
export interface AIResponse {
  answer: string;
  relatedDocuments: LegalDocument[];
  confidence: ConfidenceLevel;
  suggestions: string[];
  intent: IntentType;
  processingSteps: ProcessingStep[];
  contextUsed: boolean;
}

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export type IntentType = 
  | 'lookup' // Tra cứu văn bản
  | 'procedure' // Hỏi thủ tục
  | 'clarification' // Giải thích điều khoản
  | 'comparison' // So sánh văn bản
  | 'timeline' // Hỏi thời hạn/deadline
  | 'authority' // Hỏi thẩm quyền
  | 'requirement' // Hỏi điều kiện/yêu cầu
  | 'general' // Câu hỏi chung
  | 'greeting'; // Chào hỏi

export interface ProcessingStep {
  step: string;
  status: 'completed' | 'processing' | 'pending';
  detail?: string;
}

// Statistics Types
export interface SystemStats {
  totalQueries: number;
  totalDocuments: number;
  totalCategories: number;
  avgConfidence: number;
  topCategories: { name: string; count: number }[];
  recentQueries: { query: string; date: Date }[];
}

// Search Types
export interface SearchResult {
  document: LegalDocument;
  score: number;
  matchedKeywords: string[];
  highlight?: string;
}

export interface SearchFilters {
  category: string;
  type: string;
  dateRange?: { from: string; to: string };
  status?: string;
}

// UI Types
export interface TabItem {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  badge?: string;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}
