import React, { useRef, useState } from 'react';
import { UploadCloud, FileText, CheckCircle, X, Download, Eye } from 'lucide-react';
import { ApplicationFormData } from '../types';

interface ResumeUploadProps {
  resumeFile?: ApplicationFormData['resumeFile'];
  onResumeChange: (fileInfo?: ApplicationFormData['resumeFile']) => void;
  error?: string;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({
  resumeFile,
  onResumeChange,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert('Resume file size must be within 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      onResumeChange({
        name: file.name,
        size: file.size,
        type: file.type || 'application/pdf',
        lastModified: file.lastModified,
        dataUrl: dataUrl,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleAttachSample = () => {
    onResumeChange({
      name: 'Candidate_Resume_MediTrust_2026.pdf',
      size: 1420500,
      type: 'application/pdf',
      lastModified: Date.now(),
      dataUrl: 'data:application/pdf;base64,JVBERi0xLjQKJcTl8uXrp...',
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
          <span>Resume / Curriculum Vitae</span>
          <span className="text-red-500">*</span>
        </label>
        {!resumeFile && (
          <button
            type="button"
            onClick={handleAttachSample}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline"
          >
            Attach Sample CV
          </button>
        )}
      </div>

      {!resumeFile ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
            error
              ? 'border-red-400 bg-red-50/40'
              : isDragOver
              ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]'
              : 'border-slate-300 bg-slate-50/80 hover:border-emerald-500 hover:bg-emerald-50/20'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleFile(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>

          <div className="text-sm font-semibold text-slate-700">
            Click to upload or drag & drop your resume
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Supports PDF, DOC, DOCX formats (Max size: 10 MB)
          </div>
          <div className="inline-block mt-3 px-3 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-600 shadow-2xs">
            Browse Document
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <FileText className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-slate-900 truncate">
                {resumeFile.name}
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                <span>{formatFileSize(resumeFile.size)}</span>
                <span>•</span>
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Ready to submit
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                // If it's a sample or has dataUrl, simulate quick view
                window.alert(`Resume attached: ${resumeFile.name} (${formatFileSize(resumeFile.size)}). Ready for review by Soham Sali and Abhay Pratap Singh.`);
              }}
              className="p-2 text-slate-600 hover:text-emerald-700 rounded-lg hover:bg-white/80 transition-colors"
              title="Preview details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onResumeChange(undefined)}
              className="p-2 text-slate-500 hover:text-red-600 rounded-lg hover:bg-white/80 transition-colors"
              title="Remove file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}
    </div>
  );
};
