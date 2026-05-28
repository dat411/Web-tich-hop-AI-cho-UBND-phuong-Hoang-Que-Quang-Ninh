import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Calendar, Building2, Tag, ChevronDown, ChevronUp, ExternalLink, Eye, Download } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { legalDocuments, getDocumentTypeLabel, getStatusLabel, categories, documentTypes } from '../data/legalDatabase';

const LegalLibrary: React.FC = () => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedType, setSelectedType] = useState('all');
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'name'>('views');

  const filteredDocs = useMemo(() => {
    let docs = legalDocuments.filter(doc => {
      const matchesSearch = searchQuery === '' || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
        doc.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'Tất cả' || doc.category === selectedCategory;
      const matchesType = selectedType === 'all' || doc.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });

    // Sort
    if (sortBy === 'views') {
      docs.sort((a, b) => b.viewCount - a.viewCount);
    } else if (sortBy === 'date') {
      docs.sort((a, b) => new Date(b.effectiveDate.split('/').reverse().join('-')).getTime() - 
                          new Date(a.effectiveDate.split('/').reverse().join('-')).getTime());
    } else {
      docs.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
    }

    return docs;
  }, [searchQuery, selectedCategory, selectedType, sortBy]);

  const typeColors: Record<string, string> = {
    'luat': isDark ? 'bg-red-900/50 text-red-300 border-red-800' : 'bg-red-100 text-red-700 border-red-200',
    'nghi-dinh': isDark ? 'bg-blue-900/50 text-blue-300 border-blue-800' : 'bg-blue-100 text-blue-700 border-blue-200',
    'thong-tu': isDark ? 'bg-purple-900/50 text-purple-300 border-purple-800' : 'bg-purple-100 text-purple-700 border-purple-200',
    'quyet-dinh': isDark ? 'bg-green-900/50 text-green-300 border-green-800' : 'bg-green-100 text-green-700 border-green-200',
    'nghi-quyet': isDark ? 'bg-amber-900/50 text-amber-300 border-amber-800' : 'bg-amber-100 text-amber-700 border-amber-200',
  };

  return (
    <div className={`h-full flex flex-col ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b px-6 py-4 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Thư viện Pháp luật</h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Cơ sở dữ liệu văn bản DEMO</p>
          </div>
          <span className={`ml-auto text-xs font-semibold px-3 py-1 rounded-full ${
            isDark ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-50 text-indigo-600'
          }`}>
            {legalDocuments.length} văn bản
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, số hiệu, từ khóa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 ${
              isDark 
                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:ring-indigo-500/50 focus:border-indigo-500' 
                : 'bg-gray-50 border border-gray-200 focus:ring-indigo-500/20 focus:border-indigo-400'
            }`}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex items-center gap-1.5">
            <Filter size={14} className={isDark ? 'text-slate-500' : 'text-gray-400'} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 ${
                isDark 
                  ? 'bg-slate-700 border-slate-600 text-white focus:ring-indigo-500/50' 
                  : 'border border-gray-200 bg-white focus:ring-indigo-500/20'
              }`}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className={`text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'bg-slate-700 border-slate-600 text-white focus:ring-indigo-500/50' 
                : 'border border-gray-200 bg-white focus:ring-indigo-500/20'
            }`}
          >
            {documentTypes.map(dt => (
              <option key={dt.value} value={dt.value}>{dt.label}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'views' | 'name')}
            className={`text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 ${
              isDark 
                ? 'bg-slate-700 border-slate-600 text-white focus:ring-indigo-500/50' 
                : 'border border-gray-200 bg-white focus:ring-indigo-500/20'
            }`}
          >
            <option value="views">Phổ biến nhất</option>
            <option value="date">Mới nhất</option>
            <option value="name">Theo tên</option>
          </select>
        </div>
      </div>

      {/* Document List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredDocs.length === 0 ? (
          <div className="text-center py-12">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isDark ? 'bg-slate-800' : 'bg-gray-100'
            }`}>
              <Search size={24} className={isDark ? 'text-slate-600' : 'text-gray-300'} />
            </div>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Không tìm thấy văn bản phù hợp</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Thử thay đổi từ khóa hoặc bộ lọc</p>
          </div>
        ) : (
          filteredDocs.map(doc => {
            const statusInfo = getStatusLabel(doc.status);
            return (
              <div
                key={doc.id}
                className={`rounded-xl border overflow-hidden transition-all ${
                  isDark 
                    ? 'bg-slate-800 border-slate-700 hover:border-indigo-500/50' 
                    : 'bg-white border-gray-200 hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${typeColors[doc.type] || (isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600')}`}>
                          {getDocumentTypeLabel(doc.type)}
                        </span>
                        <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-gray-700'}`}>
                          Số {doc.number}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          statusInfo.color === 'green' ? (isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-600') :
                          statusInfo.color === 'red' ? (isDark ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-600') :
                          (isDark ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-600')
                        }`}>
                          {statusInfo.text}
                        </span>
                      </div>
                      <h3 className={`text-sm font-semibold leading-snug ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {doc.title}
                      </h3>
                      <p className={`text-xs mt-1.5 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                        {doc.summary}
                      </p>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      {expandedDoc === doc.id ? (
                        <ChevronUp size={16} className={isDark ? 'text-slate-500' : 'text-gray-400'} />
                      ) : (
                        <ChevronDown size={16} className={isDark ? 'text-slate-500' : 'text-gray-400'} />
                      )}
                    </div>
                  </div>

                  <div className={`flex flex-wrap items-center gap-3 mt-3 text-[11px] ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      Ban hành: {doc.issueDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-green-500" />
                      Hiệu lực: {doc.effectiveDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 size={12} />
                      {doc.issuingBody}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {doc.viewCount.toLocaleString()} lượt xem
                    </span>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedDoc === doc.id && (
                  <div className={`border-t px-4 py-3 ${isDark ? 'border-slate-700 bg-slate-800/50' : 'border-gray-100 bg-gray-50/50'}`}>
                    <div className="mb-3">
                      <p className={`text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                        📋 Nội dung chính:
                      </p>
                      <div className={`text-xs whitespace-pre-line leading-relaxed rounded-lg p-3 border ${
                        isDark ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-white border-gray-100 text-gray-600'
                      }`}>
                        {doc.fullContent}
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className={`text-xs font-semibold mb-1.5 flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                        <Tag size={12} /> Từ khóa:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {doc.keywords.map((kw, idx) => (
                          <span key={idx} className={`text-[10px] px-2 py-0.5 rounded-full ${
                            isDark ? 'bg-indigo-900/50 text-indigo-300' : 'bg-indigo-50 text-indigo-600'
                          }`}>
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {doc.relatedDocuments.length > 0 && (
                      <div className="mb-3">
                        <p className={`text-xs font-semibold mb-1 flex items-center gap-1 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                          <ExternalLink size={12} /> Văn bản liên quan:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {doc.relatedDocuments.map((rd, idx) => (
                            <span key={idx} className={`text-[10px] px-2 py-0.5 rounded-full ${
                              isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-50 text-blue-600'
                            }`}>
                              {rd}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <button className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                        isDark 
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white' 
                          : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                      }`}>
                        <Eye size={12} />
                        Xem chi tiết
                      </button>
                      <button className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
                        isDark 
                          ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                      }`}>
                        <Download size={12} />
                        Tải về (Demo)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LegalLibrary;
