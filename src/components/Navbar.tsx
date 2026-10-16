import React, { useState } from 'react';
import { Volume2, VolumeX, BookOpen, RotateCcw, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  unlockedCount: number;
  totalEndings: number;
  onOpenGallery: () => void;
  onReset: () => void;
  isResultPage: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  unlockedCount,
  totalEndings,
  onOpenGallery,
  onReset,
  isResultPage
}) => {
  const [soundOn, setSoundOn] = useState<boolean>(soundFx.enabled);

  const handleToggleSound = () => {
    const newState = soundFx.toggleSound();
    setSoundOn(newState);
  };

  const percentage = Math.round((unlockedCount / totalEndings) * 100);

  return (
    <header className="relative z-20 w-full border-b border-slate-200/90 bg-[#fffdf7]/88 backdrop-blur-md quiz-navbar">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Title */}
        <button
          onClick={onReset}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#c9b8eb] border-2 border-[#2f2745] flex items-center justify-center text-[#2f2745] font-bold shadow-[3px_3px_0_#2f2745] group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-[#2f2745]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-[#2f2745] text-sm sm:text-base tracking-wide group-hover:text-violet-700 transition-colors">
                异世界转生命运之书
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                PSY-QUIZ
              </span>
            </div>
              <p className="text-[11px] text-slate-500 font-sans tracking-tight">
              轻小说分支 × 潜意识人格测评
            </p>
          </div>
        </button>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ending Compendium Gallery Button */}
          <button
            id="btn-open-gallery"
            onClick={() => {
              soundFx.playSelect();
              onOpenGallery();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border-2 border-[#2f2745] hover:bg-[#eee7fa] text-[#2f2745] text-xs font-medium transition-all shadow-[2px_2px_0_#2f2745] active:scale-95"
            title="查看异世界命运图鉴与16种潜意识人格"
          >
            <BookOpen className="w-3.5 h-3.5 text-violet-700" />
            <span>图鉴</span>
            <span className="font-mono text-[11px] text-violet-800 bg-[#eee7fa] px-1.5 py-0.2 rounded border border-violet-200">
              {unlockedCount} 篇已收录
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            id="btn-toggle-sound"
            onClick={handleToggleSound}
            className="p-2 rounded-lg bg-white border-2 border-[#2f2745] hover:bg-[#eee7fa] text-[#2f2745] transition-all active:scale-95"
            title={soundOn ? '静音音效' : '开启音效'}
            aria-label="Toggle Sound"
          >
            {soundOn ? (
              <Volume2 className="w-4 h-4 text-violet-700" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Reset / Restart Button */}
          {isResultPage && (
            <button
              id="btn-nav-restart"
              onClick={() => {
                soundFx.playSelect();
                onReset();
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#f4d877] border-2 border-[#2f2745] hover:bg-[#edc75c] text-[#2f2745] text-xs font-medium transition-all shadow-[2px_2px_0_#2f2745] active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">重新转生</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
