import React, { useRef, useState } from 'react';
import { Camera, Upload, X, User, Check, RefreshCw } from 'lucide-react';

interface CandidatePhotoUploadProps {
  photoUrl: string;
  onPhotoChange: (url: string, fileName?: string) => void;
  error?: string;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=250&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&auto=format&fit=crop&q=80',
];

export const CandidatePhotoUpload: React.FC<CandidatePhotoUploadProps> = ({
  photoUrl,
  onPhotoChange,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Photo must be smaller than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onPhotoChange(result, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPhotoChange('', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        {/* Photo Container / Circle */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-200 shrink-0 ${
            error
              ? 'border-red-400 bg-red-50/50'
              : photoUrl
              ? 'border-emerald-500 bg-emerald-50/30'
              : 'border-slate-300 bg-slate-50 hover:border-emerald-500 hover:bg-emerald-50/20'
          }`}
        >
          {photoUrl ? (
            <>
              <img
                src={photoUrl}
                alt="Candidate Preview"
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-white transition-opacity duration-200 ${
                  isHovering ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Camera className="w-5 h-5 mb-1" />
                <span className="text-[11px] font-medium">Change Photo</span>
              </div>
              <button
                type="button"
                onClick={handleRemove}
                title="Remove photo"
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="p-3 text-center">
              <div className="w-10 h-10 mx-auto rounded-full bg-slate-200/80 text-slate-500 flex items-center justify-center mb-1.5">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-700 block">
                Upload Photo
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                PNG, JPG &lt; 5MB
              </span>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Instructions & Quick Presets */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-700">
              Clear professional photo helps founders identify your profile
            </span>
            <button
              type="button"
              onClick={() => setShowPresets(!showPresets)}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline"
            >
              {showPresets ? 'Hide Samples' : 'Select Sample Avatar'}
            </button>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Please provide a front-facing formal or smart-casual photo. Background should ideally be neutral.
          </p>

          {showPresets && (
            <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 mt-2">
              <span className="text-[11px] font-semibold text-slate-600 block mb-1.5">
                Choose a demo profile photo:
              </span>
              <div className="flex items-center gap-3">
                {PRESET_AVATARS.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onPhotoChange(url, `sample-candidate-${idx + 1}.jpg`);
                      setShowPresets(false);
                    }}
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-transform hover:scale-110 ${
                      photoUrl === url ? 'border-emerald-600 ring-2 ring-emerald-300' : 'border-slate-300'
                    }`}
                  >
                    <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {photoUrl && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium pt-1">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Photo ready for application card</span>
            </div>
          )}

          {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
        </div>
      </div>
    </div>
  );
};
