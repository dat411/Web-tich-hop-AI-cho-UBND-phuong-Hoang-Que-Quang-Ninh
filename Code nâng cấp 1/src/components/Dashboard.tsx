import React from 'react';
import { 
  FileText, TrendingUp, Clock, 
  BookOpen, Search, MessageSquare, BarChart3,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { legalDocuments, categories } from '../data/legalDatabase';

interface DashboardProps {
  totalQueries: number;
  chatSessions: number;
}

const Dashboard: React.FC<DashboardProps> = ({ totalQueries, chatSessions }) => {
  const { isDark } = useTheme();

  // Calculate stats
  const totalDocs = legalDocuments.length;
  const totalCategories = categories.length - 1; // Exclude 'Tất cả'
  const docsByType = {
    'Luật': legalDocuments.filter(d => d.type === 'luat').length,
    'Nghị định': legalDocuments.filter(d => d.type === 'nghi-dinh').length,
    'Thông tư': legalDocuments.filter(d => d.type === 'thong-tu').length,
  };
  const topCategories = categories.slice(1, 6);

  const stats = [
    { 
      label: 'Tổng văn bản', 
      value: totalDocs, 
      icon: FileText, 
      color: 'blue',
      change: '+3 tuần này',
      trend: 'up'
    },
    { 
      label: 'Lượt tra cứu', 
      value: totalQueries, 
      icon: Search, 
      color: 'emerald',
      change: 'Hôm nay',
      trend: 'up'
    },
    { 
      label: 'Hội thoại', 
      value: chatSessions, 
      icon: MessageSquare, 
      color: 'purple',
      change: 'Phiên này',
      trend: 'neutral'
    },
    { 
      label: 'Lĩnh vực', 
      value: totalCategories, 
      icon: BookOpen, 
      color: 'amber',
      change: 'Hành chính công',
      trend: 'neutral'
    },
  ];

  const colorClasses: Record<string, { bg: string; icon: string; border: string }> = {
    blue: {
      bg: isDark ? 'bg-blue-900/30' : 'bg-blue-50',
      icon: 'text-blue-500',
      border: isDark ? 'border-blue-800/50' : 'border-blue-200'
    },
    emerald: {
      bg: isDark ? 'bg-emerald-900/30' : 'bg-emerald-50',
      icon: 'text-emerald-500',
      border: isDark ? 'border-emerald-800/50' : 'border-emerald-200'
    },
    purple: {
      bg: isDark ? 'bg-purple-900/30' : 'bg-purple-50',
      icon: 'text-purple-500',
      border: isDark ? 'border-purple-800/50' : 'border-purple-200'
    },
    amber: {
      bg: isDark ? 'bg-amber-900/30' : 'bg-amber-50',
      icon: 'text-amber-500',
      border: isDark ? 'border-amber-800/50' : 'border-amber-200'
    },
  };

  return (
    <div className={`h-full overflow-y-auto p-6 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isDark ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-purple-600'
          }`}>
            <BarChart3 size={20} className="text-white" />
          </div>
          <div>
            <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Bảng điều khiển
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              Tổng quan hệ thống DEMO
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`rounded-xl p-4 border transition-all hover:shadow-lg ${
              colorClasses[stat.color].bg
            } ${colorClasses[stat.color].border}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-slate-800' : 'bg-white'
              }`}>
                <stat.icon size={20} className={colorClasses[stat.color].icon} />
              </div>
              {stat.trend === 'up' && (
                <span className="flex items-center text-[10px] text-emerald-500 font-medium">
                  <ArrowUpRight size={12} />
                </span>
              )}
              {stat.trend === 'down' && (
                <span className="flex items-center text-[10px] text-red-500 font-medium">
                  <ArrowDownRight size={12} />
                </span>
              )}
            </div>
            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {stat.value}
            </p>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              {stat.label}
            </p>
            <p className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Document Types */}
        <div className={`rounded-xl p-5 border ${
          isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            <FileText size={16} className="text-blue-500" />
            Phân loại văn bản
          </h3>
          <div className="space-y-3">
            {Object.entries(docsByType).map(([type, count]) => (
              <div key={type}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{type}</span>
                  <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>{count}</span>
                </div>
                <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
                  <div 
                    className={`h-full rounded-full transition-all ${
                      type === 'Luật' ? 'bg-red-500' : 
                      type === 'Nghị định' ? 'bg-blue-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${(count / totalDocs) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className={`rounded-xl p-5 border ${
          isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}>
            <TrendingUp size={16} className="text-emerald-500" />
            Lĩnh vực chính
          </h3>
          <div className="space-y-2">
            {topCategories.map((cat, index) => (
              <div 
                key={cat}
                className={`flex items-center justify-between p-2.5 rounded-lg ${
                  isDark ? 'bg-slate-700/50' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    index === 0 ? 'bg-amber-500 text-white' :
                    index === 1 ? 'bg-slate-400 text-white' :
                    index === 2 ? 'bg-amber-700 text-white' :
                    isDark ? 'bg-slate-600 text-slate-300' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{cat}</span>
                </div>
                <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  {legalDocuments.filter(d => d.category === cat).length} văn bản
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className={`rounded-xl p-5 border ${
        isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${
          isDark ? 'text-white' : 'text-gray-800'
        }`}>
          <Clock size={16} className="text-purple-500" />
          Thông tin hệ thống
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
            <p className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
              Phiên bản
            </p>
            <p className={`text-sm font-semibold mt-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              v2.0 DEMO
            </p>
          </div>
          <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
            <p className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
              AI Engine
            </p>
            <p className={`text-sm font-semibold mt-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Keyword + TF-IDF
            </p>
          </div>
          <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
            <p className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
              Database
            </p>
            <p className={`text-sm font-semibold mt-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Mock Data
            </p>
          </div>
          <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
            <p className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
              Trạng thái
            </p>
            <p className="text-sm font-semibold mt-1 text-emerald-500">
              ● Hoạt động
            </p>
          </div>
        </div>
        
        {/* Upgrade Notice */}
        <div className={`mt-4 p-3 rounded-lg border ${
          isDark ? 'bg-blue-900/20 border-blue-800/50' : 'bg-blue-50 border-blue-200'
        }`}>
          <p className={`text-xs ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
            <strong>💡 Nâng cấp Production:</strong> Cần tích hợp Backend (NestJS), PostgreSQL, 
            Vector DB (Qdrant), LLM (GPT/Gemini), Authentication (JWT + RBAC), và Audit Logging.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
