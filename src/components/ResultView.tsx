import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Share2,
  RotateCcw,
  BookOpen,
  Copy,
  Check,
  Download,
  Flame,
  Shield,
  Coffee,
  Heart,
  Eye,
  Cpu,
  Compass,
  Zap,
  Award,
  Layers,
  X,
  Coins,
  Feather,
  Swords,
  Moon,
  MessageSquare,
  Hourglass,
  Crown
} from 'lucide-react';
import { EndingStory, PersonalityArchetype } from '../types';
import { ARCHETYPES } from '../data/archetypesData';
import { RadarChart } from './RadarChart';
import { generateSharePoster } from '../utils/shareCard';
import { soundFx } from '../utils/audio';

interface ResultViewProps {
  ending: EndingStory;
  isNewUnlock: boolean;
  unlockedCount: number;
  totalEndings: number;
  onRestart: () => void;
  onOpenGallery: () => void;
}

const ARCHETYPE_ICONS: Record<string, React.ElementType> = {
  Coffee,
  Flame,
  Cpu,
  Shield,
  Compass,
  Heart,
  Sparkles,
  Eye,
  Zap,
  Coins,
  Feather,
  Swords,
  Moon,
  MessageSquare,
  Hourglass,
  Crown
};

export const ResultView: React.FC<ResultViewProps> = ({
  ending,
  isNewUnlock,
  unlockedCount,
  totalEndings,
  onRestart,
  onOpenGallery
}) => {
  const archetype: PersonalityArchetype = ARCHETYPES[ending.archetypeId] || ARCHETYPES.slacker_sage;
  const ArchetypeIcon = ARCHETYPE_ICONS[archetype.iconName] || Sparkles;

  const [copied, setCopied] = useState(false);
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [showPosterModal, setShowPosterModal] = useState(false);

  // Trigger celebration confetti on mount
  useEffect(() => {
    soundFx.playVictoryFanfare();
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#ffffff']
      });
    } catch {
      // ignore
    }
  }, [ending.id]);

  // Modal ESC listener and scroll lock
  useEffect(() => {
    if (!showPosterModal) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowPosterModal(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showPosterModal]);

  const handleCopySummary = async () => {
    soundFx.playSelect();
    const text = `【异世界转生心理测评报告】\n📖 命运终章：${ending.title}\n🛤️ 抉择路线：[${ending.routeKey}]\n🎭 潜意识人格：【${archetype.name}】（${archetype.badge}）\n💬 灵魂潜台词：${archetype.subtitle}\n⚡ 现实职场映射：${archetype.workplacePersona}\n✨ 专属神赐技能：${archetype.passiveSkill.name} - ${archetype.passiveSkill.desc}\n👉 探索你的异世界多元命运与16种潜意识人格！`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleCreatePoster = async () => {
    soundFx.playSelect();
    setIsGeneratingPoster(true);
    try {
      const url = await generateSharePoster(ending, archetype);
      setPosterUrl(url);
      setShowPosterModal(true);
    } catch (err) {
      console.error('Failed to generate poster', err);
    } finally {
      setIsGeneratingPoster(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Banner Notice */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 p-3 sm:p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm font-sans"
      >
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {isNewUnlock ? '🎉 恭喜达成全新剧情分支！已收录至命运图鉴' : '📖 再次重温已收录的异世界命运'}
          </span>
        </div>
        <button
          onClick={() => {
            soundFx.playSelect();
            onOpenGallery();
          }}
          className="underline font-medium hover:text-amber-200 flex items-center gap-1 cursor-pointer"
        >
          <span>查看图鉴 ({unlockedCount}/{totalEndings})</span>
        </button>
      </motion.div>

      {/* Main Ending Certificate Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden"
      >
        {/* Ambient Top Glow according to Archetype color */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: archetype.color }}
        />

        {/* Certificate Header Bar */}
        <div className="text-center space-y-2 mb-8 border-b border-stone-800/80 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-950 border border-stone-800 text-xs font-mono text-stone-400">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: archetype.color }} />
            <span>DESTINY ENDING NO.{String(ending.number).padStart(2, '0')}</span>
            <span className="text-stone-400">|</span>
            <span className="text-amber-400 font-semibold">{ending.category}</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-bold font-serif text-stone-100 tracking-tight leading-snug pt-2">
            {ending.title}
          </h1>

          <p className="text-xs text-stone-400 italic max-w-2xl mx-auto font-sans leading-relaxed">
            {ending.jpSubtitle}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-1.5 pt-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              🛤️ 抉择路线: {ending.routeKey}
            </span>
            {ending.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-stone-800/80 text-stone-300 border border-stone-700/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Ending Story Box */}
        <div className="relative mb-8 bg-stone-950/70 border border-stone-800/90 rounded-2xl p-5 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>【终章物语 · 你的异世界下半生】</span>
          </div>

          <div className="text-sm sm:text-base text-stone-200 leading-relaxed font-sans whitespace-pre-line space-y-3">
            {ending.storyText}
          </div>

          {/* Bystander Comedy Roast Quote (Unique Single Roast Block) */}
          {ending.bystanderRoast && (
            <div className="p-3.5 rounded-xl bg-stone-900/90 border border-amber-500/20 space-y-1.5 mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-bold text-amber-400">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>【目击者现场锐评】</span>
                  <span className="text-stone-400 font-normal">({ending.bystanderRoast.witness})</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  #{ending.bystanderRoast.tag}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 font-sans italic">
                {ending.bystanderRoast.comment}
              </p>
            </div>
          )}
        </div>

        {/* Psychological Archetype & Reality Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Left Column: Archetype Profile Card (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Archetype Badge & Title */}
            <div className="bg-stone-950/60 border border-stone-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: archetype.color }}
                  >
                    <ArchetypeIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold font-serif text-stone-100">
                        {archetype.name}
                      </h3>
                      <span
                        className="px-2 py-0.5 text-[10px] font-bold rounded-full text-stone-950"
                        style={{ backgroundColor: archetype.color }}
                      >
                        {archetype.badge}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 font-medium">
                      {archetype.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 text-xs sm:text-sm font-medium text-amber-300/90 italic font-serif">
                {archetype.subtitle}
              </div>

              {/* Personality Summary */}
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                {archetype.summary}
              </p>
            </div>

            {/* Workplace / Reality Persona */}
            <div className="bg-stone-950/60 border border-stone-800 rounded-2xl p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>现实生活 / 职场潜台词映射</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                {archetype.realityAnalysis}
              </p>
              <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800/80 text-xs text-stone-300">
                <strong className="text-amber-300">💡 职场生态位：</strong>
                {archetype.workplacePersona}
              </div>
            </div>

            {/* Exclusive Passive Skill */}
            <div className="bg-stone-950/60 border border-stone-800 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 font-mono">
                <Zap className="w-3.5 h-3.5" />
                <span>专属被动特技：{archetype.passiveSkill.name}</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                {archetype.passiveSkill.desc}
              </p>
            </div>
          </div>

          {/* Right Column: Radar Chart & Party Affinity (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            {/* 6-Dimension Radar Chart */}
            <div className="bg-stone-950/60 border border-stone-800 rounded-2xl p-5 flex flex-col items-center justify-center">
              <div className="w-full flex items-center justify-between text-xs font-mono text-stone-400 mb-2">
                <span>【六维属性鉴定】</span>
                <span className="text-amber-400 font-bold">TOTAL RATING</span>
              </div>
              <RadarChart stats={ending.stats} color={archetype.color} size={250} />
            </div>

            {/* Party Affinity Box (Best Partner & Nemesis) */}
            <div className="bg-stone-950/60 border border-stone-800 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-mono text-stone-400">【异世界羁绊匹配】</div>

              <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <span>🤝 灵魂搭档：</span>
                  <span>{archetype.bestPartner.role}</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  {archetype.bestPartner.reason}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/20 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                  <span>⚔️ 天生克星：</span>
                  <span>{archetype.nemesis.role}</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  {archetype.nemesis.reason}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="pt-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              id="btn-restart-quiz"
              onClick={() => {
                soundFx.playSelect();
                onRestart();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-sm"
            >
              <RotateCcw className="w-4 h-4 text-stone-400" />
              <span>重新转生</span>
            </button>

            <button
              id="btn-view-gallery-bottom"
              onClick={() => {
                soundFx.playSelect();
                onOpenGallery();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-xs sm:text-sm font-medium transition-all active:scale-95"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>命运图鉴 ({unlockedCount}篇已解锁)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-copy-result-text"
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-stone-500 text-stone-300 text-xs sm:text-sm font-medium transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">已复制简报</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-400" />
                  <span>复制结果</span>
                </>
              )}
            </button>

            <button
              id="btn-generate-poster"
              onClick={handleCreatePoster}
              disabled={isGeneratingPoster}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              <span>{isGeneratingPoster ? '生成海报中...' : '生成分享海报'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Share Poster Modal */}
      {showPosterModal && posterUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="poster-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fade-in"
        >
          <div className="relative max-w-sm sm:max-w-md w-full bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col items-center space-y-4">
            <button
              onClick={() => setShowPosterModal(false)}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <h3 id="poster-modal-title" className="font-bold text-stone-100 text-base font-serif">
                你的异世界命运海报已生成
              </h3>
              <p className="text-xs text-stone-400">
                可长按保存图片或点击下方按钮下载分享至朋友圈 / 社交平台
              </p>
            </div>

            {/* Poster Preview */}
            <div className="w-full max-h-[60vh] overflow-y-auto rounded-xl border border-stone-800 bg-stone-950 shadow-inner">
              <img
                src={posterUrl}
                alt="异世界转生证书"
                className="w-full h-auto rounded-xl select-none"
              />
            </div>

            <div className="w-full flex gap-3">
              <a
                href={posterUrl}
                download={`异世界转生_NO${ending.number}_${ending.title.slice(1, 8)}.png`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>下载海报高清图</span>
              </a>
              <button
                onClick={() => setShowPosterModal(false)}
                className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium text-xs sm:text-sm"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
