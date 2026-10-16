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
const OPTION_EMOJI: Record<string, string> = {
  truck: '🚚',
  overwork: '💤',
  circle: '🌀',
  god_apology: '🙇',
  immortality: '♾️',
  defense: '🛡️',
  infinite_growth: '📈',
  omniscience: '📚',
  brute_force: '💪',
  other: '✨',
  hero: '⚔️',
  demon_king: '👿',
  sage: '🧙',
  saint: '✨',
  peasant: '🏠',
  ordinary: '🌿',
  industrial: '⚙️',
  return_home: '🚪',
  defeat_demon_king: '🔥',
  destroy_all: '💥',
  human: '🧑',
  elf: '🧝',
  monster: '👾',
  non_living: '🗿',
  sword: '🗡️',
  automaton: '🤖',
  fortress: '🏰',
  curio: '🧸',
  retired: '☕',
  revenge: '⚡',
  level_up: '🌟',
  flex: '😎',
  daily: '🍞',
  romance: '💖'
};

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
    <div className="w-full max-w-2xl mx-auto px-3 py-4 sm:py-8 quiz-card-shell">
      {/* Progress & Chapter Tracker */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2 font-mono">
            <span className="px-2 py-0.5 rounded bg-[#eee7fa] text-violet-800 border border-violet-200 font-semibold tracking-wider">
              {question.chapterBadge}
            </span>
          </div>
          <span className="font-mono text-slate-500">
            STEP <strong className="text-violet-700">{currentStep}</strong> / {totalSteps}
          </span>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
          <div
            className="h-full bg-gradient-to-r from-[#8b69bd] via-[#a98bd3] to-[#f0c95d] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Breadcrumb Trail */}
        {breadcrumbLabels.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 pt-1">
            <span className="text-slate-500">已选前置：</span>
            {breadcrumbLabels.map((lbl, idx) => (
              <React.Fragment key={idx}>
                <span className="px-1.5 py-0.5 bg-white text-slate-600 rounded border border-slate-200 font-mono">
                  {lbl}
                </span>
                {idx < breadcrumbLabels.length - 1 && (
                  <span className="text-slate-400 text-[10px]">→</span>
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
          className="relative bg-[#fffdf7] border-2 border-[#2f2745] rounded-2xl p-4 sm:p-7 shadow-[5px_5px_0_#2f2745] quiz-question-panel"
        >
          {/* Question Title & Subtitle */}
          <div className="mb-6 sm:mb-8 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2f2745] tracking-tight leading-snug">
              {question.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
                  className={`group quiz-option-card quiz-option-card--${idx} relative w-full text-left p-3.5 sm:p-4 rounded-xl border-2 transition-all duration-200 flex items-start sm:items-center gap-3.5 sm:gap-4 select-none ${isSelected ? 'is-selected' : ''}`}
                >
                  {/* Hotkey Badge / Option Index */}
                  <div
                    className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-colors ${
                      isSelected
                        ? 'bg-[#5a408e] text-white'
                        : 'bg-white/70 text-[#2f2745] border-2 border-[#2f2745] group-hover:bg-white'
                    }`}
                  >
                    {hotkeyLetter}
                  </div>

                  <span className="quiz-option-emoji" aria-hidden="true">
                    {OPTION_EMOJI[option.id] || '✨'}
                  </span>

                  {/* Icon */}
                  <div
                    className={`shrink-0 p-2 rounded-lg transition-colors hidden xs:flex items-center justify-center ${
                      isSelected
                        ? 'bg-white/70 text-[#5a408e]'
                        : 'bg-white/55 text-[#2f2745] group-hover:text-[#5a408e]'
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
                            ? 'text-[#5a408e]'
                            : 'text-[#2f2745] group-hover:text-[#1e1930]'
                        }`}
                      >
                        {option.label}
                      </span>
                      {option.badge && (
                          <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-white/70 text-slate-600 border border-slate-300 font-sans">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    {option.flavor && (
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed group-hover:text-slate-800 transition-colors">
                        {option.flavor}
                      </p>
                    )}
                  </div>

                  {/* Arrow Indicator */}
                  <div className="shrink-0 self-center">
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected
                          ? 'text-[#5a408e] translate-x-0.5'
                          : 'text-slate-500 group-hover:text-[#5a408e] group-hover:translate-x-0.5'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Keyboard Hint */}
          <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-sans">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3 text-violet-700" />
              点击选项或按键盘快捷键 [A-E] 推进剧情
            </span>
            <span className="text-stone-400 hidden sm:inline font-mono">
              选一个，翻开下一页
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
