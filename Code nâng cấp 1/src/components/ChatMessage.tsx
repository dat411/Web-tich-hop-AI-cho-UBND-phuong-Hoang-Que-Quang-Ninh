import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../contexts/ThemeContext';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  confidence?: 'high' | 'medium' | 'low';
  isTyping?: boolean;
  processingTime?: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  role, 
  content, 
  timestamp, 
  confidence, 
  isTyping,
  processingTime 
}) => {
  const { isDark } = useTheme();
  const isUser = role === 'user';

  const confidenceLabel = {
    high: { 
      text: 'Độ tin cậy cao', 
      color: isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-700', 
      icon: '✅' 
    },
    medium: { 
      text: 'Độ tin cậy TB', 
      color: isDark ? 'bg-yellow-900/50 text-yellow-300' : 'bg-yellow-100 text-yellow-700', 
      icon: '⚠️' 
    },
    low: { 
      text: 'Độ tin cậy thấp', 
      color: isDark ? 'bg-red-900/50 text-red-300' : 'bg-red-100 text-red-700', 
      icon: '❗' 
    },
  };

  return (
    <div 
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4 animate-fade-in`}
    >
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm shadow-lg transition-transform hover:scale-105 ${
        isUser 
          ? 'bg-gradient-to-br from-blue-500 to-blue-700' 
          : 'bg-gradient-to-br from-emerald-500 to-teal-700'
      }`}>
        {isUser ? '👤' : '🤖'}
      </div>

      {/* Message */}
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`rounded-2xl px-4 py-3 shadow-sm transition-all ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-sm'
            : isDark 
              ? 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-sm' 
              : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
        }`}>
          {isTyping ? (
            <div className="flex items-center gap-1.5 py-2 px-2">
              <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-slate-500' : 'bg-gray-400'}`} style={{ animationDelay: '0ms' }} />
              <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-slate-500' : 'bg-gray-400'}`} style={{ animationDelay: '150ms' }} />
              <div className={`w-2 h-2 rounded-full animate-bounce ${isDark ? 'bg-slate-500' : 'bg-gray-400'}`} style={{ animationDelay: '300ms' }} />
              <span className={`text-xs ml-2 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>Đang xử lý...</span>
            </div>
          ) : isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
          ) : (
            <div className={`prose prose-sm max-w-none 
              ${isDark 
                ? 'prose-invert prose-headings:text-slate-200 prose-p:text-slate-300 prose-strong:text-slate-100 prose-th:text-slate-200 prose-td:text-slate-300' 
                : 'prose-headings:text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-900'
              }`}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Meta info */}
        <div className={`flex items-center gap-2 mt-1.5 flex-wrap ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
            {timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
          </span>
          
          {!isUser && confidence && !isTyping && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${confidenceLabel[confidence].color}`}>
              {confidenceLabel[confidence].icon} {confidenceLabel[confidence].text}
            </span>
          )}
          
          {!isUser && processingTime && !isTyping && (
            <span className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
              ⚡ {processingTime.toFixed(0)}ms
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
