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
    <header className="relative z-20 w-full border-b border-stone-800/80 bg-stone-950/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Title */}
        <button
          onClick={onReset}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-stone-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-stone-100 text-sm sm:text-base tracking-wide group-hover:text-amber-300 transition-colors">
                异世界转生命运之书
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                PSY-QUIZ
              </span>
            </div>
            <p className="text-[11px] text-stone-400 font-sans tracking-tight">
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900/90 border border-stone-700 hover:border-amber-500/50 text-stone-200 hover:text-amber-300 text-xs font-medium transition-all shadow-sm active:scale-95"
            title="查看26个异世界结局收集图鉴"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>图鉴</span>
            <span className="font-mono text-[11px] text-amber-400/90 bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-500/20">
              {unlockedCount}/{totalEndings}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            id="btn-toggle-sound"
            onClick={handleToggleSound}
            className="p-2 rounded-lg bg-stone-900/90 border border-stone-700 hover:border-stone-500 text-stone-300 hover:text-amber-300 transition-all active:scale-95"
            title={soundOn ? '静音音效' : '开启音效'}
            aria-label="Toggle Sound"
          >
            {soundOn ? (
              <Volume2 className="w-4 h-4 text-amber-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-500" />
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
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-300 text-xs font-medium transition-all active:scale-95"
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
