import React from 'react';
import { 
  MessageSquare, Search, BookOpen, History, 
  Plus, ChevronRight, Scale, Building2, FileCheck,
  BarChart3, AlertTriangle
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  chatHistory: { id: string; title: string; date: Date }[];
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  chatHistory,
  onNewChat,
  onSelectChat,
  isCollapsed,
  onToggle,
}) => {
  const { isDark } = useTheme();

  const menuItems = [
    { id: 'chat', icon: MessageSquare, label: 'Trợ lý AI', badge: 'AI' },
    { id: 'search', icon: Search, label: 'Tra cứu văn bản' },
    { id: 'library', icon: BookOpen, label: 'Thư viện pháp luật' },
    { id: 'dashboard', icon: BarChart3, label: 'Thống kê' },
    { id: 'history', icon: History, label: 'Lịch sử tra cứu' },
  ];

  return (
    <div className={`h-full flex flex-col transition-all duration-300 ${
      isDark 
        ? 'bg-gradient-to-b from-slate-900 to-slate-800' 
        : 'bg-gradient-to-b from-slate-800 to-slate-900'
    } text-white ${isCollapsed ? 'w-16' : 'w-72'}`}>
      
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          {!isCollapsed && (
            <div className="flex items-center gap-2 flex-1">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Scale size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold leading-tight">HC Công AI</h1>
                <p className="text-[10px] text-slate-400">Trợ lý pháp luật v2.0</p>
              </div>
            </div>
          )}
          <button 
            onClick={onToggle}
            className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ChevronRight size={16} className={`transition-transform ${isCollapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>
      </div>

      {/* PROTOTYPE Banner */}
      {!isCollapsed && (
        <div className="mx-3 mt-3 px-3 py-2 bg-amber-500/20 border border-amber-500/30 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle size={14} className="text-amber-400" />
            <span className="text-[10px] text-amber-300 font-medium">DEMO / PROTOTYPE</span>
          </div>
          <p className="text-[9px] text-amber-400/70 mt-0.5">
            Chỉ mang tính tham khảo
          </p>
        </div>
      )}

      {/* New Chat Button */}
      <div className="px-3 py-3">
        <button
          onClick={onNewChat}
          className={`w-full flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <Plus size={18} />
          {!isCollapsed && <span className="text-sm font-medium">Cuộc hội thoại mới</span>}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm ${
              activeTab === item.id
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            } ${isCollapsed ? 'justify-center' : ''}`}
          >
            <item.icon size={18} />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-md">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </nav>

      {/* Chat History */}
      {!isCollapsed && activeTab === 'chat' && chatHistory.length > 0 && (
        <div className="flex-1 overflow-y-auto px-3 mt-4">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 px-3 mb-2 font-semibold">
            Lịch sử hội thoại
          </p>
          <div className="space-y-0.5">
            {chatHistory.slice(0, 8).map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className="w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare size={12} className="flex-shrink-0 group-hover:text-blue-400" />
                  <span className="truncate">{chat.title}</span>
                </div>
                <p className="text-[10px] text-slate-600 ml-5 mt-0.5">
                  {chat.date.toLocaleDateString('vi-VN')}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-3 border-t border-slate-700/50 mt-auto">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between px-3 py-2 mb-3">
            <span className="text-xs text-slate-400">Giao diện</span>
            <ThemeToggle showLabel />
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 px-3 py-2 bg-slate-800/50 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-xs font-bold">
              NV
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">Nhân viên HC</p>
              <p className="text-[10px] text-slate-500">UBND Demo</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-slate-800/50 rounded-lg p-2 text-center">
              <div className="flex items-center justify-center gap-1">
                <Building2 size={10} className="text-blue-400" />
                <span className="text-[10px] text-slate-500">Văn bản</span>
              </div>
              <p className="text-sm font-bold text-white">20+</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-2 text-center">
              <div className="flex items-center justify-center gap-1">
                <FileCheck size={10} className="text-emerald-400" />
                <span className="text-[10px] text-slate-500">Lĩnh vực</span>
              </div>
              <p className="text-sm font-bold text-white">12</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed Theme Toggle */}
      {isCollapsed && (
        <div className="mt-auto p-3 flex justify-center">
          <ThemeToggle />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
