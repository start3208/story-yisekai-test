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
  Crown,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { EndingStory, PersonalityArchetype } from '../types';
import { ARCHETYPES } from '../data/archetypesData';
import { RadarChart } from './RadarChart';
import { generateSharePoster } from '../utils/shareCard';
import { soundFx } from '../utils/audio';
import { getArchetypeImage } from '../utils/archetypeAssets';

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
  const [copiedImage, setCopiedImage] = useState(false);
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

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
    setIsZoomed(false);
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

  const handleDownloadImage = () => {
    if (!posterUrl) return;
    soundFx.playSelect();
    const cleanTitle = ending.title.replace(/[\/\\:*?"<>|《》【】]/g, '').trim().slice(0, 14);
    const link = document.createElement('a');
    link.href = posterUrl;
    link.download = `异世界转生_NO${ending.number}_${cleanTitle}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyImage = async () => {
    if (!posterUrl) return;
    soundFx.playSelect();
    try {
      const res = await fetch(posterUrl);
      const blob = await res.blob();
      if (navigator.clipboard && 'ClipboardItem' in window) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2500);
        return;
      }
    } catch (err) {
      console.warn('Clipboard write image failed, falling back to download:', err);
    }
    // Fallback: trigger download if clipboard API not available
    handleDownloadImage();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 py-5 sm:py-8 result-page">
      {/* Top Banner Notice */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-5 p-3 sm:p-4 rounded-xl bg-[#fff7da] border-2 border-[#2f2745] text-[#2f2745] text-xs sm:text-sm font-sans shadow-[3px_3px_0_#2f2745]"
      >
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#8b69bd] shrink-0" />
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
          className="relative bg-[#fffdf7] border-2 border-[#2f2745] rounded-2xl p-4 sm:p-8 shadow-[6px_6px_0_#2f2745] overflow-hidden"
      >
        {/* Ambient Top Glow according to Archetype color */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ backgroundColor: archetype.color }}
        />

        {/* Certificate Header Bar */}
          <div className="text-center space-y-2 mb-6 border-b-2 border-dashed border-slate-200 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border-2 border-[#2f2745] text-xs font-mono text-slate-600">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: archetype.color }} />
            <span>DESTINY ENDING NO.{String(ending.number).padStart(2, '0')}</span>
            <span className="text-slate-400">|</span>
            <span className="text-violet-700 font-semibold">{ending.category}</span>
          </div>

          <h1 className="text-xl sm:text-3xl font-bold font-serif text-[#2f2745] tracking-tight leading-snug pt-2">
            {ending.title}
          </h1>

          <p className="text-xs text-slate-500 italic max-w-2xl mx-auto font-sans leading-relaxed">
            {ending.jpSubtitle}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-1.5 pt-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#eee7fa] text-violet-800 border border-violet-200">
              🛤️ 抉择路线: {ending.routeKey}
            </span>
            {ending.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-white text-slate-600 border border-slate-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Character-first result reveal: the image is visible before the long story. */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
          className="result-character-hero"
        >
          <div className="result-character-hero__art">
            <img src={getArchetypeImage(archetype.id)} alt={`${archetype.name}形象`} />
          </div>
          <div className="result-character-hero__copy">
            <span className="result-character-hero__eyebrow">你的异世界人格类型是</span>
            <strong>{archetype.name}</strong>
            <b>{archetype.badge}</b>
            <small>{archetype.title}</small>
            <em>{archetype.subtitle}</em>
          </div>
        </motion.div>

        {/* Ending Story Box */}
        <div className="relative mb-6 bg-white/70 border-2 border-[#2f2745] rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-violet-700 font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>【终章物语 · 你的异世界下半生】</span>
          </div>

          <div className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans whitespace-pre-line space-y-3">
            {ending.storyText}
          </div>

          {/* Bystander Comedy Roast Quote (Unique Single Roast Block) */}
          {ending.bystanderRoast && (
            <div className="p-3.5 rounded-xl bg-[#f6e3b3] border-2 border-[#2f2745] space-y-1.5 mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-bold text-[#5a408e]">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>【目击者现场锐评】</span>
                  <span className="text-slate-600 font-normal">({ending.bystanderRoast.witness})</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/70 text-violet-800 border border-violet-200">
                  #{ending.bystanderRoast.tag}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-sans italic">
                {ending.bystanderRoast.comment}
              </p>
            </div>
          )}
        </div>

        {/* Psychological Archetype & Reality Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
          {/* Left Column: Archetype Profile Card (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Archetype Badge & Title */}
            <div className="bg-white/75 border-2 border-[#2f2745] rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold font-serif text-[#2f2745]">
                        {archetype.name}
                      </h3>
                      <span
                        className="px-2 py-0.5 text-[10px] font-bold rounded-full text-stone-950"
                        style={{ backgroundColor: archetype.color }}
                      >
                        {archetype.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {archetype.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="p-3 rounded-xl bg-[#f6e3b3] border-2 border-[#2f2745] text-xs sm:text-sm font-medium text-[#5a408e] italic font-serif">
                {archetype.subtitle}
              </div>

              {/* Personality Summary */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
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
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-stone-950/60 border border-stone-800 rounded-2xl p-5 flex flex-col items-center justify-center result-radar-card"
            >
              <div className="w-full flex items-center justify-between text-xs font-mono text-stone-400 mb-2">
                <span>【六维属性鉴定】</span>
                <span className="text-amber-400 font-bold">TOTAL RATING</span>
              </div>
              <RadarChart stats={ending.stats} color={archetype.color} size={250} />
            </motion.div>

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
              className="result-action result-action--primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-sm"
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
              className="result-action result-action--secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all active:scale-95"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>命运图鉴 ({unlockedCount}篇已解锁)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-copy-result-text"
              onClick={handleCopySummary}
              className="result-action result-action--secondary flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all active:scale-95"
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
              className="result-action result-action--cta flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/85 backdrop-blur-md animate-fade-in"
        >
          <div className="relative max-w-md sm:max-w-lg md:max-w-xl w-full bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col items-center space-y-3 max-h-[95vh] overflow-y-auto">
            <button
              onClick={() => setShowPosterModal(false)}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100 transition-colors z-10"
              title="关闭弹窗"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1 pr-6 pl-2">
              <h3 id="poster-modal-title" className="font-bold text-stone-100 text-base sm:text-lg font-serif">
                你的异世界命运海报已生成
              </h3>
              <p className="text-xs text-stone-400">
                完整全景证书预览 · 包含终章物语、目击者锐评与心理测评
              </p>
            </div>

            {/* Poster Preview Container (Full View by default, click to zoom) */}
            <div className="w-full flex flex-col items-center">
              <div
                onClick={() => setIsZoomed(!isZoomed)}
                className={`relative w-full rounded-xl border border-stone-800 bg-stone-950/90 shadow-inner flex items-center justify-center cursor-pointer group ${
                  isZoomed
                    ? 'max-h-[58vh] overflow-y-auto block p-2'
                    : 'max-h-[58vh] sm:max-h-[64vh] overflow-hidden p-1.5'
                }`}
                title={isZoomed ? '点击还原完整全貌' : '点击放大查看1:1细节'}
              >
                <img
                  src={posterUrl}
                  alt="异世界转生证书"
                  className={`${
                    isZoomed
                      ? 'w-full h-auto'
                      : 'max-h-[55vh] sm:max-h-[61vh] max-w-full w-auto h-auto object-contain mx-auto'
                  } rounded-lg select-none transition-all duration-200 shadow-xl`}
                />

                {/* Floating Zoom Hint Pill */}
                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-stone-900/90 border border-stone-700 text-[11px] font-mono text-stone-300 backdrop-blur-sm flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
                  {isZoomed ? (
                    <>
                      <ZoomOut className="w-3.5 h-3.5 text-amber-400" />
                      <span>还原全貌</span>
                    </>
                  ) : (
                    <>
                      <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                      <span>点击放大细节</span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-stone-400 mt-2 text-center">
                💡 提示：手机端可长按图片直接存储或发送给好友，也可点击下方按钮下载 / 复制
              </p>
            </div>

            {/* Action Buttons */}
            <div className="w-full flex flex-wrap gap-2 pt-1">
              <button
                onClick={handleDownloadImage}
                className="flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>保存高清海报图</span>
              </button>

              <button
                onClick={handleCopyImage}
                className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs sm:text-sm border border-stone-700 transition-all active:scale-95"
              >
                {copiedImage ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">已复制图片</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-stone-400" />
                    <span>复制图片</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowPosterModal(false)}
                className="px-4 py-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 font-medium text-xs sm:text-sm transition-colors"
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
