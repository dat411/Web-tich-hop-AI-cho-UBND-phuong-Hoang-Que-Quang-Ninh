import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send, Paperclip, Sparkles, Menu, X, Bot,
  FileText, ArrowDown, RotateCcw, AlertTriangle, Info
} from 'lucide-react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import FileUpload from './components/FileUpload';
import LegalLibrary from './components/LegalLibrary';
import SearchPanel from './components/SearchPanel';
import HistoryPanel from './components/HistoryPanel';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';
import { processQuery, getGreeting, getQuickPrompts, clearContext } from './services/aiEngine';
import type { Message, ChatSession } from './types';
import useLocalStorage from './hooks/useLocalStorage';

// Main App Content (uses theme context)
const AppContent: React.FC = () => {
  const { isDark } = useTheme();
  
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [chatSessions, setChatSessions] = useLocalStorage<ChatSession[]>('chat-sessions', []);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [showScrollDown, setShowScrollDown] = useState(false);
  const [totalQueries, setTotalQueries] = useState(0);
  const [showPrototypeNotice, setShowPrototypeNotice] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const greeting = getGreeting();
  const quickPrompts = getQuickPrompts();

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Handle scroll
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      setShowScrollDown(!isNearBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const extractFileContext = (files: File[]): string => {
    if (files.length === 0) return '';
    const fileNames = files.map(f => f.name).join(', ');
    let context = `\n\n[Tài liệu đính kèm: ${fileNames}]`;

    const allNames = fileNames.toLowerCase();
    if (allNames.includes('dat') || allNames.includes('đất') || allNames.includes('so do') || allNames.includes('sổ đỏ')) {
      context += ' [Lĩnh vực: Đất đai]';
    }
    if (allNames.includes('xay dung') || allNames.includes('xây dựng') || allNames.includes('giay phep')) {
      context += ' [Lĩnh vực: Xây dựng]';
    }
    if (allNames.includes('khai sinh') || allNames.includes('ket hon') || allNames.includes('ho tich')) {
      context += ' [Lĩnh vực: Hộ tịch]';
    }
    if (allNames.includes('doanh nghiep') || allNames.includes('kinh doanh')) {
      context += ' [Lĩnh vực: Doanh nghiệp]';
    }

    return context;
  };

  const sendMessage = useCallback(async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText && uploadedFiles.length === 0) return;

    const fileContext = extractFileContext(uploadedFiles);
    const fullQuery = messageText + fileContext;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: messageText + (uploadedFiles.length > 0 ? `\n\n📎 ${uploadedFiles.length} tài liệu: ${uploadedFiles.map(f => f.name).join(', ')}` : ''),
      timestamp: new Date(),
      files: uploadedFiles.map(f => ({ name: f.name, size: f.size, type: f.type })),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setUploadedFiles([]);
    setShowFileUpload(false);
    setIsTyping(true);

    const startTime = performance.now();
    const delay = 600 + Math.random() * 800;
    await new Promise(resolve => setTimeout(resolve, delay));

    const aiResponse = processQuery(fullQuery, messages);
    const endTime = performance.now();

    const assistantMessage: Message = {
      id: generateId(),
      role: 'assistant',
      content: aiResponse.answer,
      timestamp: new Date(),
      confidence: aiResponse.confidence,
      intent: aiResponse.intent,
      processingTime: endTime - startTime,
      relatedDocs: aiResponse.relatedDocuments.map(d => d.id),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
    setTotalQueries(prev => prev + 1);

    // Save session
    const sessionTitle = messageText.slice(0, 50) + (messageText.length > 50 ? '...' : '');
    if (!currentSessionId) {
      const newSession: ChatSession = {
        id: generateId(),
        title: sessionTitle,
        date: new Date(),
        messages: [userMessage, assistantMessage],
        messageCount: 2,
        preview: messageText,
      };
      setCurrentSessionId(newSession.id);
      setChatSessions(prev => [newSession, ...prev].slice(0, 50)); // Keep last 50 sessions
    } else {
      setChatSessions(prev =>
        prev.map(s =>
          s.id === currentSessionId
            ? {
                ...s,
                messages: [...s.messages, userMessage, assistantMessage],
                messageCount: s.messageCount + 2,
              }
            : s
        )
      );
    }
  }, [inputValue, uploadedFiles, currentSessionId, messages, setChatSessions]);

  const handleNewChat = () => {
    setMessages([]);
    setCurrentSessionId('');
    setInputValue('');
    setUploadedFiles([]);
    setShowFileUpload(false);
    setActiveTab('chat');
    clearContext();
  };

  const handleSelectChat = (id: string) => {
    const session = chatSessions.find(s => s.id === id);
    if (session) {
      setMessages(session.messages);
      setCurrentSessionId(session.id);
      setActiveTab('chat');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleAskFromSearch = (query: string) => {
    setActiveTab('chat');
    setInputValue(query);
    setTimeout(() => {
      sendMessage(query);
    }, 100);
  };

  const chatHistoryForSidebar = chatSessions.map(s => ({
    id: s.id,
    title: s.title,
    date: new Date(s.date),
  }));

  const historyForPanel = chatSessions.map(s => ({
    id: s.id,
    title: s.title,
    date: new Date(s.date),
    messageCount: s.messageCount,
    preview: s.preview,
  }));

  return (
    <div className={`h-screen flex overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-gray-100'}`}>
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static z-50 h-full transition-transform duration-300 ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setMobileSidebarOpen(false);
          }}
          chatHistory={chatHistoryForSidebar}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className={`border-b px-4 py-2.5 flex items-center gap-3 shadow-sm ${
          isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
        }`}>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className={`lg:hidden p-1.5 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
          >
            <Menu size={20} className={isDark ? 'text-slate-300' : 'text-gray-600'} />
          </button>
          
          <div className="flex items-center gap-2 flex-1">
            {activeTab === 'chat' && (
              <>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    Trợ lý AI Hành chính công
                  </h2>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-green-500">DEMO Mode</span>
                  </div>
                </div>
              </>
            )}
            {activeTab === 'search' && (
              <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                🔍 Tra cứu Văn bản Pháp luật
              </h2>
            )}
            {activeTab === 'library' && (
              <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                📚 Thư viện Pháp luật
              </h2>
            )}
            {activeTab === 'dashboard' && (
              <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                📊 Bảng điều khiển
              </h2>
            )}
            {activeTab === 'history' && (
              <h2 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                📋 Lịch sử Tra cứu
              </h2>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            {activeTab === 'chat' && messages.length > 0 && (
              <button
                onClick={handleNewChat}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors ${
                  isDark 
                    ? 'text-slate-300 hover:bg-slate-700' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                <RotateCcw size={12} />
                Mới
              </button>
            )}
          </div>
        </div>

        {/* Prototype Notice */}
        {showPrototypeNotice && activeTab === 'chat' && (
          <div className={`px-4 py-2 flex items-center gap-3 text-xs border-b ${
            isDark 
              ? 'bg-amber-900/30 border-amber-800/50 text-amber-300' 
              : 'bg-amber-50 border-amber-200 text-amber-700'
          }`}>
            <AlertTriangle size={14} className="flex-shrink-0" />
            <p className="flex-1">
              <strong>⚠️ DEMO/PROTOTYPE:</strong> Hệ thống này chỉ mang tính THAM KHẢO. 
              AI Engine sử dụng Keyword Matching, không phải LLM thật. 
              Production cần: Backend + Vector DB + GPT/Gemini.
            </p>
            <button 
              onClick={() => setShowPrototypeNotice(false)}
              className={`p-1 rounded ${isDark ? 'hover:bg-amber-900/50' : 'hover:bg-amber-100'}`}
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Content Area */}
        {activeTab === 'chat' ? (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Messages Area */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto relative">
              {messages.length === 0 ? (
                /* Welcome Screen */
                <div className="h-full flex items-center justify-center p-6">
                  <div className="max-w-2xl w-full">
                    {/* Hero */}
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex items-center justify-center shadow-xl shadow-teal-500/20 animate-pulse">
                        <Sparkles size={36} className="text-white" />
                      </div>
                      <h1 className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {greeting}! 👋
                      </h1>
                      <p className={`text-sm max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                        Tôi là <strong>Trợ lý AI Hành chính công</strong> (DEMO). 
                        Tôi giúp tra cứu nghị định, luật và xác định văn bản pháp luật liên quan.
                      </p>
                    </div>

                    {/* How to use */}
                    <div className={`rounded-2xl border p-5 mb-6 ${
                      isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'
                    }`}>
                      <h3 className={`text-sm font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                        <FileText size={16} className="text-blue-500" />
                        Hướng dẫn sử dụng
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                          { num: '1', title: 'Tải hồ sơ', desc: 'Đính kèm tài liệu (PDF, DOC...)', color: 'blue' },
                          { num: '2', title: 'Mô tả vấn đề', desc: 'Nhập câu hỏi hoặc mô tả hồ sơ', color: 'emerald' },
                          { num: '3', title: 'Nhận kết quả', desc: 'AI xác định nghị định, luật', color: 'purple' },
                        ].map((step) => (
                          <div key={step.num} className={`rounded-xl p-3 ${
                            isDark ? `bg-${step.color}-900/30` : `bg-${step.color}-50`
                          }`}>
                            <div className={`w-8 h-8 rounded-lg bg-${step.color}-500 text-white flex items-center justify-center text-sm font-bold mb-2`}>
                              {step.num}
                            </div>
                            <p className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>{step.title}</p>
                            <p className={`text-[10px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{step.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Prompts */}
                    <div>
                      <h3 className={`text-xs font-semibold mb-3 uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                        💡 Câu hỏi mẫu — bấm để thử ngay
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {quickPrompts.map((prompt, index) => (
                          <button
                            key={index}
                            onClick={() => sendMessage(prompt.prompt)}
                            className={`text-left rounded-xl p-3 transition-all group border ${
                              isDark 
                                ? 'bg-slate-800 border-slate-700 hover:border-blue-500/50 hover:bg-slate-700' 
                                : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="text-xl">{prompt.icon}</span>
                              <div>
                                <p className={`text-xs font-semibold transition-colors ${
                                  isDark 
                                    ? 'text-white group-hover:text-blue-400' 
                                    : 'text-gray-700 group-hover:text-blue-600'
                                }`}>
                                  {prompt.title}
                                </p>
                                <p className={`text-[10px] mt-0.5 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>
                                  {prompt.prompt}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Info Notice */}
                    <div className={`mt-6 rounded-xl p-4 flex items-start gap-3 ${
                      isDark ? 'bg-blue-900/20 border border-blue-800/50' : 'bg-blue-50 border border-blue-200'
                    }`}>
                      <Info size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className={`text-xs font-medium ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                          Về hệ thống DEMO này
                        </p>
                        <p className={`text-xs mt-1 ${isDark ? 'text-blue-400/80' : 'text-blue-600'}`}>
                          AI Engine hiện tại sử dụng Keyword Matching + TF-IDF, không phải Semantic Search hay LLM thật. 
                          Cơ sở dữ liệu là Mock Data với 20+ văn bản mẫu. 
                          Production cần: NestJS Backend, PostgreSQL, Qdrant Vector DB, và GPT/Gemini API.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Chat Messages */
                <div className="p-4 pb-2 max-w-4xl mx-auto">
                  {messages.map((msg) => (
                    <ChatMessage
                      key={msg.id}
                      role={msg.role as 'user' | 'assistant'}
                      content={msg.content}
                      timestamp={new Date(msg.timestamp)}
                      confidence={msg.confidence}
                      processingTime={msg.processingTime}
                    />
                  ))}
                  {isTyping && (
                    <ChatMessage
                      role="assistant"
                      content=""
                      timestamp={new Date()}
                      isTyping
                    />
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}

              {/* Scroll to bottom button */}
              {showScrollDown && messages.length > 0 && (
                <button
                  onClick={scrollToBottom}
                  className={`fixed bottom-32 right-8 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-colors z-10 ${
                    isDark 
                      ? 'bg-slate-700 border border-slate-600 hover:bg-slate-600' 
                      : 'bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <ArrowDown size={18} className={isDark ? 'text-slate-300' : 'text-gray-600'} />
                </button>
              )}
            </div>

            {/* Suggestions */}
            {messages.length > 0 && !isTyping && (
              <div className="px-4 py-2 max-w-4xl mx-auto w-full">
                {(() => {
                  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
                  if (!lastUserMsg) return null;
                  const response = processQuery(lastUserMsg.content);
                  if (response.suggestions.length === 0) return null;
                  return (
                    <div className="flex flex-wrap gap-1.5">
                      {response.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => sendMessage(suggestion)}
                          className={`text-xs px-3 py-1.5 rounded-full transition-colors border ${
                            isDark 
                              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-blue-400 hover:border-blue-500/50' 
                              : 'bg-white border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300'
                          }`}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Input Area */}
            <div className={`border-t px-4 py-3 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
              <div className="max-w-4xl mx-auto">
                {/* File Upload */}
                {showFileUpload && (
                  <div className="mb-3">
                    <FileUpload files={uploadedFiles} onFilesChange={setUploadedFiles} />
                  </div>
                )}

                {/* Input Row */}
                <div className="flex items-end gap-2">
                  <button
                    onClick={() => setShowFileUpload(!showFileUpload)}
                    className={`p-2.5 rounded-xl transition-colors flex-shrink-0 ${
                      showFileUpload
                        ? 'bg-blue-500 text-white'
                        : isDark 
                          ? 'hover:bg-slate-700 text-slate-400 hover:text-slate-200' 
                          : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'
                    }`}
                    title="Đính kèm tài liệu"
                  >
                    {showFileUpload ? <X size={20} /> : <Paperclip size={20} />}
                  </button>

                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Mô tả hồ sơ hoặc đặt câu hỏi về văn bản pháp luật..."
                      rows={1}
                      className={`w-full resize-none rounded-xl px-4 py-2.5 pr-12 text-sm focus:outline-none focus:ring-2 max-h-[120px] ${
                        isDark 
                          ? 'bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:ring-blue-500/50 focus:border-blue-500' 
                          : 'border border-gray-200 bg-gray-50 focus:ring-blue-500/20 focus:border-blue-400'
                      }`}
                    />
                    {uploadedFiles.length > 0 && (
                      <span className={`absolute right-12 bottom-2.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                        isDark ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-600'
                      }`}>
                        📎 {uploadedFiles.length}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => sendMessage()}
                    disabled={!inputValue.trim() && uploadedFiles.length === 0}
                    className={`p-2.5 rounded-xl transition-all flex-shrink-0 ${
                      inputValue.trim() || uploadedFiles.length > 0
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
                        : isDark 
                          ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                          : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <Send size={20} />
                  </button>
                </div>

                {/* Disclaimer */}
                <p className={`text-[10px] text-center mt-2 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                  ⚠️ Hệ thống DEMO - Kết quả chỉ mang tính tham khảo. Luôn kiểm chứng với nguồn chính thức.
                </p>
              </div>
            </div>
          </div>
        ) : activeTab === 'search' ? (
          <SearchPanel onAskAI={handleAskFromSearch} />
        ) : activeTab === 'library' ? (
          <LegalLibrary />
        ) : activeTab === 'dashboard' ? (
          <Dashboard totalQueries={totalQueries} chatSessions={chatSessions.length} />
        ) : activeTab === 'history' ? (
          <HistoryPanel
            history={historyForPanel}
            onSelectChat={handleSelectChat}
            onClearHistory={() => {
              setChatSessions([]);
              handleNewChat();
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

// App with Theme Provider
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
