import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Truck,
  Moon,
  Sparkles,
  Crown,
  Hourglass,
  Shield,
  TrendingUp,
  BookOpen,
  Zap,
  Sword,
  Skull,
  Feather,
  Sun,
  Home,
  Coffee,
  Cpu,
  Compass,
  Flame,
  Heart,
  LogOut,
  ChevronRight,
  CornerDownLeft
} from 'lucide-react';
import { QuizQuestion, QuizOption } from '../types';
import { soundFx } from '../utils/audio';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  totalSteps: number;
  currentStep: number;
  breadcrumbLabels: string[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  Truck,
  Moon,
  Sparkles,
  Crown,
  Hourglass,
  Shield,
  TrendingUp,
  BookOpen,
  Zap,
  Sword,
  Skull,
  Feather,
  Sun,
  Home,
  Coffee,
  Cpu,
  Compass,
  Flame,
  Heart,
  LogOut
};

const HOTKEYS = ['A', 'B', 'C', 'D', 'E'];

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptionId,
  onSelectOption,
  totalSteps,
  currentStep,
  breadcrumbLabels
}) => {
  // Listen to keyboard shortcut keys 1-5 or A-E
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      const key = e.key.toUpperCase();
      const numKey = parseInt(e.key, 10);

      // Check letter A-E
      const letterIndex = HOTKEYS.indexOf(key);
      if (letterIndex !== -1 && letterIndex < question.options.length) {
        e.preventDefault();
        soundFx.playSelect();
        onSelectOption(question.options[letterIndex].id);
        return;
      }

      // Check number 1-5
      if (!isNaN(numKey) && numKey >= 1 && numKey <= question.options.length) {
        e.preventDefault();
        soundFx.playSelect();
        onSelectOption(question.options[numKey - 1].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, onSelectOption]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-10">
      {/* Progress & Chapter Tracker */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2 font-mono">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold tracking-wider">
              {question.chapterBadge}
            </span>
          </div>
          <span className="font-mono text-stone-400">
            STEP <strong className="text-amber-400">{currentStep}</strong> / {totalSteps}
          </span>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden border border-stone-800">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Breadcrumb Trail */}
        {breadcrumbLabels.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-stone-400 pt-1">
            <span className="text-stone-400">已选前置：</span>
            {breadcrumbLabels.map((lbl, idx) => (
              <React.Fragment key={idx}>
                <span className="px-1.5 py-0.5 bg-stone-900/90 text-stone-300 rounded border border-stone-800 font-mono">
                  {lbl}
                </span>
                {idx < breadcrumbLabels.length - 1 && (
                  <span className="text-stone-400 text-[10px]">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Main Question Card with AnimatePresence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -14, scale: 0.98 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="relative bg-stone-900/80 border border-stone-800/90 rounded-2xl p-5 sm:p-8 backdrop-blur-xl shadow-2xl shadow-stone-950/80"
        >
          {/* Question Title & Subtitle */}
          <div className="mb-6 sm:mb-8 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-100 tracking-tight leading-snug">
              {question.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {question.subtitle}
            </p>
          </div>

          {/* Options Grid / List */}
          <div className="space-y-3">
            {question.options.map((option: QuizOption, idx: number) => {
              const IconComponent = option.icon && ICON_MAP[option.icon] ? ICON_MAP[option.icon] : Sparkles;
              const isSelected = selectedOptionId === option.id;
              const hotkeyLetter = HOTKEYS[idx] || `${idx + 1}`;

              return (
                <button
                  key={option.id}
                  id={`option-${question.id}-${option.id}`}
                  onClick={() => {
                    if (option.id === 'brute_force') {
                      soundFx.playSpecialBranch();
                    } else {
                      soundFx.playSelect();
                    }
                    onSelectOption(option.id);
                  }}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`group relative w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 flex items-start sm:items-center gap-3.5 sm:gap-4 select-none ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500 shadow-md shadow-amber-500/10'
                      : 'bg-stone-950/60 border-stone-800 hover:border-stone-600 hover:bg-stone-800/40'
                  }`}
                >
                  {/* Hotkey Badge / Option Index */}
                  <div
                    className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950'
                        : 'bg-stone-900 text-stone-400 border border-stone-700/80 group-hover:border-stone-500 group-hover:text-stone-200'
                    }`}
                  >
                    {hotkeyLetter}
                  </div>

                  {/* Icon */}
                  <div
                    className={`shrink-0 p-2 rounded-lg transition-colors hidden xs:flex items-center justify-center ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-stone-900/80 text-stone-400 group-hover:text-amber-300'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`font-semibold text-sm sm:text-base transition-colors ${
                          isSelected
                            ? 'text-amber-300'
                            : 'text-stone-200 group-hover:text-stone-100'
                        }`}
                      >
                        {option.label}
                      </span>
                      {option.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-stone-800 text-stone-400 border border-stone-700/60 font-sans">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    {option.flavor && (
                      <p className="text-xs text-stone-400 mt-1 leading-relaxed group-hover:text-stone-300 transition-colors">
                        {option.flavor}
                      </p>
                    )}
                  </div>

                  {/* Arrow Indicator */}
                  <div className="shrink-0 self-center">
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected
                          ? 'text-amber-400 translate-x-0.5'
                          : 'text-stone-600 group-hover:text-stone-400 group-hover:translate-x-0.5'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Keyboard Hint */}
          <div className="mt-6 pt-4 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-400 font-sans">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3 text-stone-400" />
              点击选项或按键盘快捷键 [A-E] 推进剧情
            </span>
            <span className="text-stone-400 hidden sm:inline font-mono">
              ISEKAI DESTINY ENGINE
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
