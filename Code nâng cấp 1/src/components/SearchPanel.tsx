import React, { useState } from 'react';
import { Search, FileText, ArrowRight, Zap, Clock, TrendingUp } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { legalDocuments, getDocumentTypeLabel } from '../data/legalDatabase';
import { normalizeVietnamese } from '../services/aiEngine';

interface SearchPanelProps {
  onAskAI: (query: string) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ onAskAI }) => {
  const { isDark } = useTheme();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<typeof legalDocuments>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setHasSearched(true);

    const normalizedQuery = normalizeVietnamese(query);
    const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 1);

    const scored = legalDocuments
      .map(doc => {
        let score = 0;
        for (const word of queryWords) {
          if (normalizeVietnamese(doc.title).includes(word)) score += 5;
          if (normalizeVietnamese(doc.number).includes(word)) score += 10;
          if (normalizeVietnamese(doc.summary).includes(word)) score += 3;
          if (doc.keywords.some(k => normalizeVietnamese(k).includes(word))) score += 7;
          if (normalizeVietnamese(doc.category).includes(word)) score += 4;
        }
        return { doc, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.doc);

    setResults(scored);
  };

  const popularSearches = [
    'Nghị định đất đai',
    'Luật Hộ tịch',
    'Chứng thực bản sao',
    'Giấy phép xây dựng',
    'Đăng ký doanh nghiệp',
    'Thu hồi đất bồi thường',
    'Đăng ký kết hôn',
    'Lý lịch tư pháp',
  ];

  const typeColors: Record<string, string> = {
    'luat': isDark ? 'border-l-red-500 bg-red-900/10' : 'border-l-red-500 bg-red-50/30',
    'nghi-dinh': isDark ? 'border-l-blue-500 bg-blue-900/10' : 'border-l-blue-500 bg-blue-50/30',
    'thong-tu': isDark ? 'border-l-purple-500 bg-purple-900/10' : 'border-l-purple-500 bg-purple-50/30',
    'quyet-dinh': isDark ? 'border-l-green-500 bg-green-900/10' : 'border-l-green-500 bg-green-50/30',
  };

  return (
    <div className={`h-full flex flex-col ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b px-6 py-5 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <Search size={20} className="text-white" />
          </div>
          <div>
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Tra cứu Văn bản</h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Tìm kiếm nhanh văn bản pháp luật</p>
          </div>
        </div>

        {/* Search Box */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
            <input
              type="text"
              placeholder="Nhập số hiệu, tên văn bản, từ khóa..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 ${
                isDark 
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-orange-500/50' 
                  : 'border border-gray-200 focus:ring-orange-500/20 focus:border-orange-400'
              }`}
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center gap-1.5"
          >
            <Search size={16} />
            Tìm kiếm
          </button>
        </div>

        {/* Popular Searches */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className={`text-xs flex items-center gap-1 mr-1 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
            <TrendingUp size={12} /> Phổ biến:
          </span>
          {popularSearches.map((term, idx) => (
            <button
              key={idx}
              onClick={() => { setQuery(term); }}
              className={`text-xs px-2.5 py-1 rounded-full transition-colors ${
                isDark 
                  ? 'bg-slate-700 hover:bg-orange-900/50 hover:text-orange-300 text-slate-300' 
                  : 'bg-gray-100 hover:bg-orange-50 hover:text-orange-600 text-gray-600'
              }`}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {!hasSearched ? (
          <div className="text-center py-16">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
              isDark ? 'bg-gradient-to-br from-orange-900/50 to-red-900/50' : 'bg-gradient-to-br from-orange-100 to-red-100'
            }`}>
              <FileText size={32} className={isDark ? 'text-orange-400' : 'text-orange-400'} />
            </div>
            <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-700'}`}>Bắt đầu tra cứu</h3>
            <p className={`text-sm max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>
              Nhập từ khóa hoặc số hiệu văn bản để tìm kiếm trong cơ sở dữ liệu DEMO
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 max-w-md mx-auto">
              <div className={`rounded-xl p-3 text-left border ${
                isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
              }`}>
                <Zap size={16} className="text-orange-500 mb-1" />
                <p className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>Tìm theo số hiệu</p>
                <p className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>VD: "102/2024/NĐ-CP"</p>
              </div>
              <div className={`rounded-xl p-3 text-left border ${
                isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
              }`}>
                <Search size={16} className="text-blue-500 mb-1" />
                <p className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>Tìm theo từ khóa</p>
                <p className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>VD: "đất đai", "hộ tịch"</p>
              </div>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isDark ? 'bg-slate-800' : 'bg-gray-100'
            }`}>
              <Search size={24} className={isDark ? 'text-slate-600' : 'text-gray-300'} />
            </div>
            <p className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-gray-500'}`}>Không tìm thấy kết quả</p>
            <p className={`text-xs mt-1 mb-4 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Thử dùng AI để phân tích chi tiết hơn</p>
            <button
              onClick={() => onAskAI(query)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Zap size={14} />
              Hỏi AI về "{query}"
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                <Clock size={12} className="inline mr-1" />
                Tìm thấy <strong>{results.length}</strong> văn bản
              </p>
              <button
                onClick={() => onAskAI(query)}
                className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1 font-medium"
              >
                <Zap size={12} />
                Phân tích bằng AI
                <ArrowRight size={12} />
              </button>
            </div>

            {results.map(doc => (
              <div
                key={doc.id}
                className={`rounded-xl border-l-4 border p-4 transition-all ${
                  typeColors[doc.type] || ''
                } ${isDark ? 'border-slate-700 hover:border-slate-600' : 'border-gray-200 hover:shadow-md'}`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {getDocumentTypeLabel(doc.type)}
                  </span>
                  <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                    Số {doc.number}
                  </span>
                  <span className={`text-[10px] ml-auto ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                    {doc.category}
                  </span>
                </div>
                <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>{doc.title}</h3>
                <p className={`text-xs line-clamp-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{doc.summary}</p>
                <div className={`flex items-center gap-3 mt-2 text-[10px] ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                  <span>📅 {doc.issueDate}</span>
                  <span>🏛️ {doc.issuingBody}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {doc.keywords.slice(0, 5).map((kw, idx) => (
                    <span key={idx} className={`text-[10px] px-1.5 py-0.5 rounded ${
                      isDark ? 'bg-slate-700 text-slate-400' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPanel;
