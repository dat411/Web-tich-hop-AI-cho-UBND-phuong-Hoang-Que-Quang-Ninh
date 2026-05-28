import React from 'react';
import { History, MessageSquare, Clock, Trash2, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ChatHistoryItem {
  id: string;
  title: string;
  date: Date;
  messageCount: number;
  preview: string;
}

interface HistoryPanelProps {
  history: ChatHistoryItem[];
  onSelectChat: (id: string) => void;
  onClearHistory: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelectChat, onClearHistory }) => {
  const { isDark } = useTheme();

  const groupByDate = (items: ChatHistoryItem[]) => {
    const groups: Record<string, ChatHistoryItem[]> = {};
    const today = new Date();
    
    items.forEach(item => {
      const diffDays = Math.floor((today.getTime() - item.date.getTime()) / (1000 * 60 * 60 * 24));
      let label = '';
      if (diffDays === 0) label = 'Hôm nay';
      else if (diffDays === 1) label = 'Hôm qua';
      else if (diffDays < 7) label = 'Tuần này';
      else if (diffDays < 30) label = 'Tháng này';
      else label = 'Trước đó';

      if (!groups[label]) groups[label] = [];
      groups[label].push(item);
    });

    return groups;
  };

  const grouped = groupByDate(history);

  return (
    <div className={`h-full flex flex-col ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`border-b px-6 py-4 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <History size={20} className="text-white" />
            </div>
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Lịch sử tra cứu</h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{history.length} cuộc hội thoại</p>
            </div>
          </div>
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className={`text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                isDark 
                  ? 'text-red-400 hover:bg-red-900/30' 
                  : 'text-red-500 hover:bg-red-50'
              }`}
            >
              <Trash2 size={12} />
              Xóa tất cả
            </button>
          )}
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-4">
        {history.length === 0 ? (
          <div className="text-center py-16">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isDark ? 'bg-slate-800' : 'bg-gray-100'
            }`}>
              <Clock size={24} className={isDark ? 'text-slate-600' : 'text-gray-300'} />
            </div>
            <p className={`text-sm font-medium ${isDark ? 'text-slate-300' : 'text-gray-500'}`}>Chưa có lịch sử tra cứu</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Các cuộc hội thoại với AI sẽ được lưu tại đây</p>
          </div>
        ) : (
          Object.entries(grouped).map(([label, items]) => (
            <div key={label} className="mb-6">
              <h3 className={`text-[10px] uppercase tracking-wider font-semibold mb-2 px-1 ${
                isDark ? 'text-slate-500' : 'text-gray-400'
              }`}>
                {label}
              </h3>
              <div className="space-y-2">
                {items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => onSelectChat(item.id)}
                    className={`w-full text-left rounded-xl border p-3.5 transition-all group ${
                      isDark 
                        ? 'bg-slate-800 border-slate-700 hover:border-purple-500/50 hover:bg-slate-800/80' 
                        : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isDark ? 'bg-purple-900/50' : 'bg-purple-50'
                      }`}>
                        <MessageSquare size={14} className="text-purple-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>
                            {item.title}
                          </h4>
                        </div>
                        <p className={`text-xs mt-0.5 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>
                          {item.preview}
                        </p>
                        <div className={`flex items-center gap-3 mt-1.5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                          <span className="text-[10px] flex items-center gap-0.5">
                            <Clock size={10} />
                            {item.date.toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}
                          </span>
                          <span className="text-[10px]">
                            {item.messageCount} tin nhắn
                          </span>
                        </div>
                      </div>
                      <ArrowRight size={14} className={`mt-1 transition-colors ${
                        isDark 
                          ? 'text-slate-600 group-hover:text-purple-400' 
                          : 'text-gray-300 group-hover:text-purple-500'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;
