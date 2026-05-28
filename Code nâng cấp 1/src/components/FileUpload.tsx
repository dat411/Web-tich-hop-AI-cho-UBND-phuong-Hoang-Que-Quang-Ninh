import React, { useCallback } from 'react';
import { Upload, X, FileText, Image, FileSpreadsheet, File } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface FileUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, onFilesChange }) => {
  const { isDark } = useTheme();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    onFilesChange([...files, ...droppedFiles]);
  }, [files, onFilesChange]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      onFilesChange([...files, ...selectedFiles]);
    }
  }, [files, onFilesChange]);

  const removeFile = useCallback((index: number) => {
    onFilesChange(files.filter((_, i) => i !== index));
  }, [files, onFilesChange]);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText size={14} className="text-red-500" />;
    if (type.includes('word') || type.includes('document')) return <FileText size={14} className="text-blue-500" />;
    if (type.includes('image')) return <Image size={14} className="text-green-500" />;
    if (type.includes('spreadsheet') || type.includes('excel')) return <FileSpreadsheet size={14} className="text-emerald-500" />;
    return <File size={14} className={isDark ? 'text-slate-400' : 'text-gray-400'} />;
  };

  return (
    <div className="space-y-3">
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:scale-[1.02] ${
                isDark 
                  ? 'bg-slate-700 border border-slate-600' 
                  : 'bg-blue-50 border border-blue-200'
              }`}
            >
              {getFileIcon(file.type)}
              <span className={`max-w-[150px] truncate ${isDark ? 'text-slate-200' : 'text-blue-800'}`}>
                {file.name}
              </span>
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-blue-500'}`}>
                ({formatFileSize(file.size)})
              </span>
              <button
                onClick={() => removeFile(index)}
                className={`p-0.5 rounded transition-colors ${
                  isDark 
                    ? 'text-slate-400 hover:text-red-400 hover:bg-slate-600' 
                    : 'text-blue-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer group ${
          isDark 
            ? 'border-slate-600 hover:border-blue-500 hover:bg-slate-800/50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
        }`}
      >
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
        />
        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            isDark 
              ? 'bg-slate-700 group-hover:bg-blue-900/50' 
              : 'bg-gray-100 group-hover:bg-blue-100'
          }`}>
            <Upload size={20} className={`transition-colors ${
              isDark 
                ? 'text-slate-400 group-hover:text-blue-400' 
                : 'text-gray-400 group-hover:text-blue-500'
            }`} />
          </div>
          <div>
            <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
              <span className="text-blue-500 font-medium">Tải lên tài liệu</span> hoặc kéo thả vào đây
            </p>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
              PDF, DOC, DOCX, XLS, XLSX, TXT, JPG, PNG (tối đa 10MB)
            </p>
          </div>
        </label>
      </div>

      {files.length > 0 && (
        <div className={`rounded-lg p-3 flex items-start gap-2 ${
          isDark ? 'bg-amber-900/30 border border-amber-700/50' : 'bg-amber-50 border border-amber-200'
        }`}>
          <FileText size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className={`text-xs font-medium ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
              Lưu ý về xử lý tài liệu
            </p>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-amber-400/80' : 'text-amber-600'}`}>
              Hệ thống DEMO phân tích dựa trên tên file. Production cần tích hợp OCR + Document Parser thật.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
