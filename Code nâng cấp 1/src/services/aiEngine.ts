// ============================================
// AI ENGINE - Hệ thống Trợ lý AI Hành chính công
// ============================================
// LƯU Ý: Đây là PROTOTYPE/DEMO system
// Production cần: Backend + Vector DB + LLM thật
// ============================================

import { legalDocuments, getDocumentTypeLabel, type LegalDocument } from '../data/legalDatabase';
import type { AIResponse, IntentType, ProcessingStep, ConfidenceLevel, Message } from '../types';

// ============================================
// VIETNAMESE NLP UTILITIES
// ============================================

// Stopwords tiếng Việt
const VIETNAMESE_STOPWORDS = new Set([
  'và', 'hoặc', 'của', 'cho', 'với', 'trong', 'ngoài', 'trên', 'dưới',
  'là', 'được', 'có', 'không', 'những', 'các', 'một', 'này', 'đó',
  'để', 'như', 'theo', 'về', 'từ', 'đến', 'khi', 'nếu', 'thì', 'mà',
  'cũng', 'đã', 'sẽ', 'đang', 'bị', 'do', 'vì', 'nên', 'tôi', 'tớ',
  'em', 'anh', 'chị', 'bạn', 'họ', 'chúng', 'ta', 'mình', 'người',
  'việc', 'điều', 'hay', 'rồi', 'lại', 'còn', 'vẫn', 'rất', 'quá',
  'thế', 'sao', 'gì', 'nào', 'đâu', 'bao', 'nhiêu', 'lắm', 'nhé',
  'ạ', 'ơi', 'nhỉ', 'hả', 'ừ', 'vâng', 'dạ', 'xin', 'cảm', 'ơn'
]);

// Synonym mapping cho pháp luật
const LEGAL_SYNONYMS: Record<string, string[]> = {
  'đất đai': ['đất', 'bđs', 'bất động sản', 'nhà đất', 'đất ở', 'đất nông nghiệp', 'thổ cư'],
  'sổ đỏ': ['giấy chứng nhận quyền sử dụng đất', 'gcnqsdđ', 'sổ hồng', 'giấy tờ nhà đất'],
  'xây dựng': ['xây', 'xây nhà', 'công trình', 'kiến trúc'],
  'giấy phép xây dựng': ['gpxd', 'phép xây dựng', 'cấp phép xây dựng'],
  'hộ tịch': ['khai sinh', 'khai tử', 'kết hôn', 'ly hôn', 'nhận nuôi con'],
  'chứng thực': ['công chứng', 'sao y', 'bản sao'],
  'doanh nghiệp': ['công ty', 'doanh nghiệp', 'dn', 'cty', 'hộ kinh doanh'],
  'thuế': ['nộp thuế', 'kê khai thuế', 'quyết toán thuế', 'thuế thu nhập'],
  'bồi thường': ['đền bù', 'bồi hoàn', 'chi trả', 'hỗ trợ'],
  'thu hồi đất': ['thu hồi', 'giải phóng mặt bằng', 'gpmb', 'cưỡng chế'],
  'thủ tục': ['quy trình', 'hồ sơ', 'trình tự', 'thủ tục hành chính', 'tthc'],
  'nghị định': ['nđ', 'nd', 'nghị định cp'],
  'thông tư': ['tt', 'thông tư hướng dẫn'],
  'luật': ['bộ luật', 'pháp luật', 'văn bản quy phạm'],
};

// Intent patterns
const INTENT_PATTERNS: { pattern: RegExp; intent: IntentType }[] = [
  { pattern: /^(xin chào|chào|hi|hello|hey)/i, intent: 'greeting' },
  { pattern: /(thuộc|theo|quy định|nghị định|luật|thông tư)\s*(nào|gì)/i, intent: 'lookup' },
  { pattern: /(thủ tục|quy trình|cách|làm sao|làm thế nào|bước)/i, intent: 'procedure' },
  { pattern: /(giải thích|nghĩa là|có nghĩa|hiểu|định nghĩa)/i, intent: 'clarification' },
  { pattern: /(so sánh|khác nhau|giống nhau|khác biệt)/i, intent: 'comparison' },
  { pattern: /(thời hạn|bao lâu|deadline|hạn chót|trong vòng|ngày)/i, intent: 'timeline' },
  { pattern: /(thẩm quyền|ai|cơ quan nào|đơn vị nào|cấp nào)/i, intent: 'authority' },
  { pattern: /(điều kiện|yêu cầu|cần|phải có|hồ sơ gồm)/i, intent: 'requirement' },
];

// ============================================
// TEXT PROCESSING
// ============================================

export const normalizeVietnamese = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

export const tokenize = (text: string): string[] => {
  const normalized = normalizeVietnamese(text);
  return normalized
    .split(/\s+/)
    .filter(word => word.length > 1 && !VIETNAMESE_STOPWORDS.has(word));
};

// Expand query with synonyms
const expandQueryWithSynonyms = (query: string): string[] => {
  const tokens = tokenize(query);
  const expanded = new Set(tokens);
  
  for (const [key, synonyms] of Object.entries(LEGAL_SYNONYMS)) {
    const normalizedKey = normalizeVietnamese(key);
    const keyTokens = normalizedKey.split(/\s+/);
    
    // Check if query contains any synonym
    const queryNorm = normalizeVietnamese(query);
    for (const syn of [...synonyms, key]) {
      if (queryNorm.includes(normalizeVietnamese(syn))) {
        // Add all related terms
        keyTokens.forEach(t => expanded.add(t));
        synonyms.forEach(s => {
          normalizeVietnamese(s).split(/\s+/).forEach(t => expanded.add(t));
        });
      }
    }
  }
  
  return Array.from(expanded);
};

// ============================================
// INTENT CLASSIFICATION
// ============================================

export const classifyIntent = (query: string): IntentType => {
  for (const { pattern, intent } of INTENT_PATTERNS) {
    if (pattern.test(query)) {
      return intent;
    }
  }
  return 'general';
};

// ============================================
// RELEVANCE SCORING (TF-IDF inspired)
// ============================================

const calculateTFIDF = (queryTokens: string[], docTokens: string[], allDocs: string[][]): number => {
  let score = 0;
  const N = allDocs.length;
  
  for (const token of queryTokens) {
    // TF: Term frequency in document
    const tf = docTokens.filter(t => t === token || t.includes(token) || token.includes(t)).length;
    
    // IDF: Inverse document frequency
    const docsWithTerm = allDocs.filter(doc => 
      doc.some(t => t === token || t.includes(token) || token.includes(t))
    ).length;
    const idf = docsWithTerm > 0 ? Math.log(N / docsWithTerm) + 1 : 0;
    
    score += tf * idf;
  }
  
  return score;
};

const calculateRelevanceScore = (
  query: string, 
  doc: LegalDocument,
  allDocsTokens: string[][]
): { score: number; matchedKeywords: string[] } => {
  const expandedTokens = expandQueryWithSynonyms(query);
  const normalizedQuery = normalizeVietnamese(query);
  
  // Tokenize document fields
  const docTokens = [
    ...tokenize(doc.title),
    ...tokenize(doc.summary),
    ...doc.keywords.flatMap(k => tokenize(k)),
    ...tokenize(doc.category),
    ...tokenize(doc.fullContent),
  ];
  
  let score = 0;
  const matchedKeywords: string[] = [];
  
  // 1. TF-IDF Score
  score += calculateTFIDF(expandedTokens, docTokens, allDocsTokens) * 2;
  
  // 2. Exact keyword match (high weight)
  for (const keyword of doc.keywords) {
    const normalizedKeyword = normalizeVietnamese(keyword);
    if (normalizedQuery.includes(normalizedKeyword)) {
      score += 15;
      matchedKeywords.push(keyword);
    }
    for (const token of expandedTokens) {
      if (normalizedKeyword.includes(token) && token.length > 2) {
        score += 5;
        if (!matchedKeywords.includes(keyword)) {
          matchedKeywords.push(keyword);
        }
      }
    }
  }
  
  // 3. Title match (high weight)
  const normalizedTitle = normalizeVietnamese(doc.title);
  for (const token of expandedTokens) {
    if (normalizedTitle.includes(token) && token.length > 2) {
      score += 8;
    }
  }
  
  // 4. Category match (high weight)
  const normalizedCategory = normalizeVietnamese(doc.category);
  for (const token of expandedTokens) {
    if (normalizedCategory.includes(token)) {
      score += 12;
    }
  }
  
  // 5. Document number match (exact)
  if (normalizedQuery.includes(normalizeVietnamese(doc.number))) {
    score += 50; // Exact document number lookup
  }
  
  // 6. Summary match
  const normalizedSummary = normalizeVietnamese(doc.summary);
  for (const token of expandedTokens) {
    if (normalizedSummary.includes(token) && token.length > 2) {
      score += 3;
    }
  }
  
  // 7. Full content match (lower weight but still counts)
  const normalizedContent = normalizeVietnamese(doc.fullContent);
  for (const token of expandedTokens) {
    if (normalizedContent.includes(token) && token.length > 3) {
      score += 1;
    }
  }
  
  // 8. Boost for active documents
  if (doc.status === 'active' || !doc.status) {
    score *= 1.1;
  }
  
  return { score, matchedKeywords };
};

// ============================================
// CONTEXT-AWARE PROCESSING
// ============================================

interface ConversationContext {
  topics: string[];
  lastDocuments: string[];
  lastIntent: IntentType;
}

let conversationContext: ConversationContext = {
  topics: [],
  lastDocuments: [],
  lastIntent: 'general',
};

export const updateContext = (query: string, response: AIResponse): void => {
  const intent = classifyIntent(query);
  conversationContext.lastIntent = intent;
  
  // Extract topics from query
  const tokens = tokenize(query);
  conversationContext.topics = [...new Set([...conversationContext.topics.slice(-5), ...tokens.slice(0, 3)])];
  
  // Store last referenced documents
  conversationContext.lastDocuments = response.relatedDocuments.map(d => d.id).slice(0, 3);
};

export const getContextBoost = (doc: LegalDocument): number => {
  let boost = 0;
  
  // Boost documents related to recent topics
  for (const topic of conversationContext.topics) {
    if (doc.keywords.some(k => normalizeVietnamese(k).includes(topic))) {
      boost += 5;
    }
  }
  
  // Slight boost for recently mentioned documents
  if (conversationContext.lastDocuments.includes(doc.id)) {
    boost += 3;
  }
  
  return boost;
};

export const clearContext = (): void => {
  conversationContext = {
    topics: [],
    lastDocuments: [],
    lastIntent: 'general',
  };
};

// ============================================
// RESPONSE GENERATION
// ============================================

const generateGreetingResponse = (): string => {
  const hour = new Date().getHours();
  let greeting = 'Xin chào';
  if (hour < 12) greeting = 'Chào buổi sáng';
  else if (hour < 18) greeting = 'Chào buổi chiều';
  else greeting = 'Chào buổi tối';
  
  return `## ${greeting}! 👋

Tôi là **Trợ lý AI Hành chính công** - hệ thống demo hỗ trợ tra cứu văn bản pháp luật.

### 🎯 Tôi có thể giúp bạn:
- Tra cứu **Nghị định, Luật, Thông tư** liên quan đến hồ sơ
- Xác định văn bản pháp luật áp dụng cho từng trường hợp
- Giải thích quy trình, thủ tục hành chính
- Tìm kiếm thông tin về thẩm quyền, thời hạn

### 💡 Hãy thử hỏi tôi:
- *"Hồ sơ chuyển nhượng đất thuộc nghị định nào?"*
- *"Thủ tục đăng ký khai sinh như thế nào?"*
- *"Giấy phép xây dựng do cơ quan nào cấp?"*

---
⚠️ **Lưu ý:** Đây là hệ thống **DEMO/PROTOTYPE**. Kết quả chỉ mang tính tham khảo.`;
};

const generateDetailedAnswer = (
  query: string, 
  intent: IntentType,
  topDocs: { doc: LegalDocument; score: number; matchedKeywords: string[] }[]
): string => {
  if (topDocs.length === 0) {
    return `## ⚠️ Không tìm thấy kết quả

Xin lỗi, tôi không tìm thấy văn bản pháp luật phù hợp với nội dung: **"${query}"**

### 💡 Gợi ý:
- Mô tả cụ thể hơn về loại hồ sơ đang xử lý
- Nêu rõ lĩnh vực (đất đai, xây dựng, hộ tịch, tư pháp...)
- Cho biết vấn đề cụ thể đang gặp vướng mắc
- Thử sử dụng từ khóa khác

### 📚 Các lĩnh vực hiện có trong hệ thống:
Đất đai • Xây dựng • Hộ tịch • Tư pháp • Thuế • Môi trường • Lao động • Doanh nghiệp

---
⚠️ *Đây là hệ thống DEMO với dữ liệu giới hạn.*`;
  }

  const primaryDoc = topDocs[0].doc;
  const typeLabel = getDocumentTypeLabel(primaryDoc.type);
  const matchedKw = topDocs[0].matchedKeywords;

  let answer = `## 📋 Kết quả tra cứu\n\n`;
  
  // Intent-specific intro
  switch (intent) {
    case 'lookup':
      answer += `Dựa trên nội dung bạn mô tả, hồ sơ/tài liệu của bạn **thuộc phạm vi điều chỉnh** của:\n\n`;
      break;
    case 'procedure':
      answer += `Quy trình/thủ tục liên quan được quy định tại:\n\n`;
      break;
    case 'authority':
      answer += `Thẩm quyền giải quyết được quy định tại:\n\n`;
      break;
    case 'requirement':
      answer += `Điều kiện và yêu cầu được quy định tại:\n\n`;
      break;
    case 'timeline':
      answer += `Thời hạn giải quyết được quy định tại:\n\n`;
      break;
    default:
      answer += `Văn bản pháp luật liên quan:\n\n`;
  }
  
  answer += `---\n\n`;

  // Primary document
  answer += `### 📌 Văn bản chính áp dụng\n\n`;
  answer += `**${typeLabel} số ${primaryDoc.number}**\n`;
  answer += `> **${primaryDoc.title}**\n\n`;
  
  answer += `| Thông tin | Chi tiết |\n`;
  answer += `|-----------|----------|\n`;
  answer += `| 📅 Ngày ban hành | ${primaryDoc.issueDate} |\n`;
  answer += `| ⚡ Ngày hiệu lực | ${primaryDoc.effectiveDate} |\n`;
  answer += `| 🏛️ Cơ quan ban hành | ${primaryDoc.issuingBody} |\n`;
  answer += `| 📂 Lĩnh vực | ${primaryDoc.category} |\n`;
  if (primaryDoc.status) {
    const statusLabel = primaryDoc.status === 'active' ? '✅ Còn hiệu lực' : 
                        primaryDoc.status === 'expired' ? '❌ Hết hiệu lực' : '⚠️ Đã sửa đổi';
    answer += `| 📊 Trạng thái | ${statusLabel} |\n`;
  }
  answer += `\n`;
  
  answer += `**📝 Nội dung chính:**\n${primaryDoc.summary}\n\n`;
  
  // Matched keywords highlight
  if (matchedKw.length > 0) {
    answer += `**🔍 Từ khóa phù hợp:** ${matchedKw.map(k => `\`${k}\``).join(' • ')}\n\n`;
  }
  
  answer += `**📖 Chi tiết phạm vi điều chỉnh:**\n${primaryDoc.fullContent}\n\n`;

  // Related documents
  if (topDocs.length > 1) {
    answer += `---\n\n### 📎 Văn bản liên quan khác\n\n`;
    for (let i = 1; i < Math.min(topDocs.length, 4); i++) {
      const { doc, matchedKeywords } = topDocs[i];
      const label = getDocumentTypeLabel(doc.type);
      answer += `**${i}. ${label} số ${doc.number}**\n`;
      answer += `   - ${doc.title}\n`;
      answer += `   - 📅 Hiệu lực: ${doc.effectiveDate} | 🏛️ ${doc.issuingBody}\n`;
      if (matchedKeywords.length > 0) {
        answer += `   - 🔍 Liên quan: ${matchedKeywords.slice(0, 3).join(', ')}\n`;
      }
      answer += `\n`;
    }
  }

  // Related documents from primary
  if (primaryDoc.relatedDocuments.length > 0) {
    answer += `---\n\n### 🔗 Văn bản tham khảo thêm\n\n`;
    for (const related of primaryDoc.relatedDocuments) {
      answer += `- ${related}\n`;
    }
    answer += '\n';
  }

  // Notes section
  answer += `---\n\n### 💡 Lưu ý quan trọng\n\n`;
  answer += `1. Kết quả dựa trên cơ sở dữ liệu **DEMO** trong hệ thống.\n`;
  answer += `2. Luôn kiểm tra trên **Cổng thông tin điện tử Chính phủ** (chinhphu.vn) hoặc **CSDL quốc gia về VBPL** (vbpl.vn).\n`;
  answer += `3. Nếu cần hỗ trợ thêm, vui lòng mô tả chi tiết hơn vấn đề.\n\n`;
  
  answer += `---\n`;
  answer += `⚠️ *Đây là hệ thống PROTOTYPE. Production cần tích hợp Backend + Vector DB + LLM thật.*`;

  return answer;
};

// ============================================
// SUGGESTION GENERATION
// ============================================

const generateSuggestions = (query: string, intent: IntentType, topDocs: { doc: LegalDocument }[]): string[] => {
  const suggestions: string[] = [];
  const normalizedQuery = normalizeVietnamese(query);

  // Intent-based suggestions
  switch (intent) {
    case 'lookup':
      suggestions.push('Xem chi tiết nội dung văn bản này');
      suggestions.push('Tìm các văn bản liên quan');
      break;
    case 'procedure':
      suggestions.push('Hồ sơ cần những giấy tờ gì?');
      suggestions.push('Thời gian giải quyết bao lâu?');
      suggestions.push('Nộp hồ sơ ở đâu?');
      break;
    case 'authority':
      suggestions.push('Quy trình thực hiện như thế nào?');
      suggestions.push('Có ủy quyền được không?');
      break;
  }

  // Topic-based suggestions
  if (normalizedQuery.includes('dat') || normalizedQuery.includes('dat dai')) {
    suggestions.push('Thủ tục chuyển nhượng QSDĐ?');
    suggestions.push('Quy trình cấp sổ đỏ mới?');
    suggestions.push('Bồi thường khi thu hồi đất?');
  }
  if (normalizedQuery.includes('xay dung') || normalizedQuery.includes('giay phep')) {
    suggestions.push('Điều kiện cấp GPXD?');
    suggestions.push('Xây không phép xử phạt thế nào?');
  }
  if (normalizedQuery.includes('ho tich') || normalizedQuery.includes('khai sinh')) {
    suggestions.push('Đăng ký khai sinh trễ hạn?');
    suggestions.push('Giấy tờ đăng ký kết hôn?');
  }

  // Context-based suggestions
  if (topDocs.length > 0) {
    const cat = topDocs[0].doc.category;
    if (!suggestions.some(s => s.includes(cat))) {
      suggestions.push(`Tra cứu thêm về ${cat}`);
    }
  }

  // Default suggestions
  if (suggestions.length < 3) {
    suggestions.push('Tra cứu văn bản đất đai');
    suggestions.push('Thủ tục hành chính phổ biến');
    suggestions.push('Xem thư viện văn bản pháp luật');
  }

  return [...new Set(suggestions)].slice(0, 4);
};

// ============================================
// MAIN QUERY PROCESSOR
// ============================================

export const processQuery = (
  query: string, 
  _conversationHistory: Message[] = [],
  _attachedFiles: { name: string; type: string }[] = []
): AIResponse => {
  const startTime = performance.now();
  
  // Processing steps for UI
  const processingSteps: ProcessingStep[] = [
    { step: 'Phân tích câu hỏi', status: 'completed' },
    { step: 'Nhận diện ý định', status: 'completed' },
    { step: 'Tìm kiếm văn bản', status: 'completed' },
    { step: 'Xếp hạng kết quả', status: 'completed' },
    { step: 'Tạo phản hồi', status: 'completed' },
  ];
  
  // Classify intent
  const intent = classifyIntent(query);
  
  // Handle greeting
  if (intent === 'greeting') {
    return {
      answer: generateGreetingResponse(),
      relatedDocuments: [],
      confidence: 'high',
      suggestions: ['Tra cứu văn bản đất đai', 'Thủ tục hộ tịch', 'Hỏi về giấy phép xây dựng'],
      intent,
      processingSteps,
      contextUsed: false,
    };
  }
  
  // Prepare all documents tokens for TF-IDF
  const allDocsTokens = legalDocuments.map(doc => [
    ...tokenize(doc.title),
    ...tokenize(doc.summary),
    ...doc.keywords.flatMap(k => tokenize(k)),
  ]);
  
  // Calculate relevance scores
  const scoredDocs = legalDocuments
    .map(doc => {
      const { score, matchedKeywords } = calculateRelevanceScore(query, doc, allDocsTokens);
      const contextBoost = getContextBoost(doc);
      return { 
        doc, 
        score: score + contextBoost, 
        matchedKeywords 
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const topDocs = scoredDocs.slice(0, 5);

  // Determine confidence
  let confidence: ConfidenceLevel = 'low';
  if (topDocs.length > 0) {
    if (topDocs[0].score >= 40) confidence = 'high';
    else if (topDocs[0].score >= 20) confidence = 'medium';
  }

  // Generate answer
  const answer = generateDetailedAnswer(query, intent, topDocs);

  // Generate suggestions
  const suggestions = generateSuggestions(query, intent, topDocs);

  const response: AIResponse = {
    answer,
    relatedDocuments: topDocs.map(item => item.doc),
    confidence,
    suggestions,
    intent,
    processingSteps,
    contextUsed: conversationContext.topics.length > 0,
  };

  // Update context
  updateContext(query, response);

  const endTime = performance.now();
  console.log(`[AI Engine] Query processed in ${(endTime - startTime).toFixed(2)}ms`);

  return response;
};

// ============================================
// UTILITY EXPORTS
// ============================================

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Chào buổi sáng';
  if (hour < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
};

export const getQuickPrompts = (): { icon: string; title: string; prompt: string; category: string }[] => [
  {
    icon: '🏠',
    title: 'Đất đai',
    prompt: 'Tôi đang xử lý hồ sơ chuyển nhượng quyền sử dụng đất, hồ sơ này thuộc nghị định nào?',
    category: 'Đất đai',
  },
  {
    icon: '🏗️',
    title: 'Xây dựng',
    prompt: 'Hồ sơ xin cấp giấy phép xây dựng thuộc nghị định nào và cần những thủ tục gì?',
    category: 'Xây dựng',
  },
  {
    icon: '📝',
    title: 'Hộ tịch',
    prompt: 'Đăng ký khai sinh cho trẻ em thuộc nghị định và luật nào quy định?',
    category: 'Hộ tịch',
  },
  {
    icon: '⚖️',
    title: 'Chứng thực',
    prompt: 'Chứng thực bản sao từ bản chính thuộc nghị định nào và ai có thẩm quyền?',
    category: 'Tư pháp',
  },
  {
    icon: '💼',
    title: 'Doanh nghiệp',
    prompt: 'Thủ tục đăng ký thành lập doanh nghiệp mới theo nghị định nào?',
    category: 'Doanh nghiệp',
  },
  {
    icon: '💰',
    title: 'Bồi thường',
    prompt: 'Bồi thường khi Nhà nước thu hồi đất được quy định ở nghị định nào?',
    category: 'Đất đai',
  },
];

export const getSystemStats = () => ({
  totalDocuments: legalDocuments.length,
  totalCategories: [...new Set(legalDocuments.map(d => d.category))].length,
  documentsByType: {
    'luat': legalDocuments.filter(d => d.type === 'luat').length,
    'nghi-dinh': legalDocuments.filter(d => d.type === 'nghi-dinh').length,
    'thong-tu': legalDocuments.filter(d => d.type === 'thong-tu').length,
  },
  categories: [...new Set(legalDocuments.map(d => d.category))],
});
