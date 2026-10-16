import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Lock,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Filter,
  Search,
  Coffee,
  Flame,
  Cpu,
  Shield,
  Compass,
  Heart,
  Eye,
  Coins,
  Feather,
  Swords,
  Moon,
  Zap,
  MessageSquare,
  Hourglass,
  Crown,
  ChevronRight,
  RotateCcw,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ARCHETYPES } from '../data/archetypesData';
import { resolveEnding, getEndingById } from '../data/endingsData';
import { getAllCombinations } from '../data/combinations';
import { EndingStory, PersonalityArchetype, PersonalityArchetypeId } from '../types';
import { soundFx } from '../utils/audio';
import { unlockAllEndings, clearAllProgress } from '../utils/storage';
import { getArchetypeImage } from '../utils/archetypeAssets';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedEndingIds: string[];
  onSelectEndingToView: (ending: EndingStory) => void;
  onUpdateUnlockedIds?: (ids: string[]) => void;
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

const CATEGORIES = ['全部', '劲大流', '勇者篇', '魔王篇', '贤者篇', '圣女篇', '平民篇'];

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  unlockedEndingIds,
  onSelectEndingToView,
  onUpdateUnlockedIds
}) => {
  const [activeTab, setActiveTab] = useState<'stories' | 'archetypes'>('stories');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArchetypeDetail, setSelectedArchetypeDetail] = useState<PersonalityArchetype | null>(null);
  const [displayLimit, setDisplayLimit] = useState<number>(48);

  // Keyboard Escape listener & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset limit when filter changes
  useEffect(() => {
    setDisplayLimit(48);
  }, [selectedCategory, statusFilter, searchQuery]);

  // Pre-resolve all 884 endings once
  const all884Stories = useMemo(() => {
    const combos = getAllCombinations();
    return combos.map((c) => resolveEnding(c.selections));
  }, []);

  const totalPossible = all884Stories.length;
  const unlockedIdSet = useMemo(() => new Set(unlockedEndingIds), [unlockedEndingIds]);
  const userUnlockedStories = useMemo(() => {
    return all884Stories.filter((s) => unlockedIdSet.has(s.id));
  }, [all884Stories, unlockedIdSet]);

  const unlockedCount = userUnlockedStories.length;

  // Archetypes calculation
  const unlockedArchetypeIds = useMemo(() => {
    const ids = new Set<PersonalityArchetypeId>();
    userUnlockedStories.forEach((e) => ids.add(e.archetypeId));
    return ids;
  }, [userUnlockedStories]);

  const unlockedArchetypesCount = unlockedArchetypeIds.size;
  const totalArchetypesCount = Object.keys(ARCHETYPES).length; // 16

  // Category counts
  const categoryCountMap = useMemo(() => {
    const map: Record<string, number> = { 全部: totalPossible };
    for (const story of all884Stories) {
      map[story.category] = (map[story.category] || 0) + 1;
    }
    return map;
  }, [all884Stories, totalPossible]);

  // Filtered stories
  const filteredStories = useMemo(() => {
    return all884Stories.filter((story) => {
      // 1. Category Filter
      if (selectedCategory !== '全部' && story.category !== selectedCategory) {
        return false;
      }

      const isUnlocked = unlockedIdSet.has(story.id);

      // 2. Status Filter
      if (statusFilter === 'unlocked' && !isUnlocked) return false;
      if (statusFilter === 'locked' && isUnlocked) return false;

      // 3. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const archetype = ARCHETYPES[story.archetypeId];
        const matchTitle = story.title.toLowerCase().includes(query);
        const matchRoute = story.routeKey.toLowerCase().includes(query);
        const matchArchetype = archetype?.name.toLowerCase().includes(query) || archetype?.title.toLowerCase().includes(query);
        const matchWitness = story.bystanderRoast.witness.toLowerCase().includes(query);
        const matchTag = story.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchTitle && !matchRoute && !matchArchetype && !matchWitness && !matchTag) {
          return false;
        }
      }

      return true;
    });
  }, [all884Stories, selectedCategory, statusFilter, searchQuery, unlockedIdSet]);

  // Handler: Unlock All 884 Endings
  const handleUnlockAll = () => {
    const allIds = all884Stories.map((s) => s.id);
    unlockAllEndings(allIds);
    onUpdateUnlockedIds?.(allIds);
    soundFx.playVictoryFanfare();
    try {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  // Handler: Clear All Progress
  const handleClearProgress = () => {
    if (window.confirm('确认重置图鉴收录进度吗？已点亮的成就将恢复为未探索状态。')) {
      clearAllProgress();
      onUpdateUnlockedIds?.([]);
      soundFx.playSelect();
    }
  };

  // Explorer Title calculation
  const getExplorerTitle = (storyCount: number, archetypeCount: number) => {
    if (storyCount >= 800) return '✦ 全维度真理神祇 · 宇宙创生主 ✦';
    if (storyCount >= 400 || archetypeCount >= 16) return '✦ 多元时空命运织网者 ✦';
    if (storyCount >= 100 || archetypeCount >= 12) return '✦ 全知界域高阶观察官 ✦';
    if (storyCount >= 20 || archetypeCount >= 6) return '✦ 跨维度转生旅者 ✦';
    return '✦ 异世界初生行者 ✦';
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-950/85 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-6xl max-h-[94vh] bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 border-b border-stone-800 bg-stone-950/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 id="gallery-modal-title" className="text-base sm:text-lg font-bold font-serif text-stone-100">
                  异世界命运之书 · 884时空全景图鉴
                </h2>
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {getExplorerTitle(unlockedCount, unlockedArchetypesCount)}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                已点亮 <span className="font-mono text-amber-400 font-bold">{unlockedCount}</span> / {totalPossible} 条多元时空终章 ({Math.round((unlockedCount / totalPossible) * 100)}%) · 觉醒 <span className="font-mono text-amber-400 font-bold">{unlockedArchetypesCount}</span> / {totalArchetypesCount} 种潜意识人格
              </p>
            </div>
          </div>

          {/* Quick Actions & Tabs */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* Quick Unlock All Test / Reset Buttons */}
            <button
              id="btn-unlock-all-endings"
              onClick={handleUnlockAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all active:scale-95"
              title="一键点亮全图鉴884条物语并测试全量渲染"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>点亮全图鉴 (884)</span>
            </button>

            {unlockedCount > 0 && (
              <button
                id="btn-reset-gallery"
                onClick={handleClearProgress}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-stone-800/80 hover:bg-rose-950/40 hover:border-rose-700/50 border border-stone-700 text-stone-400 hover:text-rose-300 text-xs transition-colors"
                title="清除解锁记录"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">重置</span>
              </button>
            )}

            {/* Main Tabs */}
            <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-800">
              <button
                id="tab-stories"
                onClick={() => {
                  soundFx.playHover();
                  setActiveTab('stories');
                  setSelectedArchetypeDetail(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'stories'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                全景物语 ({totalPossible})
              </button>
              <button
                id="tab-archetypes"
                onClick={() => {
                  soundFx.playHover();
                  setActiveTab('archetypes');
                  setSelectedArchetypeDetail(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'archetypes'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                16大人格 ({unlockedArchetypesCount}/16)
              </button>
            </div>

            <button
              id="btn-close-gallery"
              onClick={() => {
                soundFx.playSelect();
                onClose();
              }}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100 transition-colors"
              title="关闭图鉴"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TAB 1: 884 STORIES & ENDINGS */}
        {activeTab === 'stories' && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Filter & Search Bar */}
            <div className="px-4 sm:px-6 py-2.5 border-b border-stone-800/80 bg-stone-950/50 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shrink-0">
              {/* Category Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0 mr-0.5" />
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      soundFx.playHover();
                      setSelectedCategory(cat);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-sm shadow-amber-500/20'
                        : 'bg-stone-900/90 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="font-mono text-[10px] opacity-80">
                      ({categoryCountMap[cat] || 0})
                    </span>
                  </button>
                ))}
              </div>

              {/* Status & Search Controls */}
              <div className="flex items-center gap-2">
                {/* Status Toggle */}
                <div className="flex bg-stone-900 p-0.5 rounded-lg border border-stone-800 text-xs shrink-0">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                      statusFilter === 'all'
                        ? 'bg-amber-500/20 text-amber-300 font-bold'
                        : 'text-stone-400 hover:text-stone-300'
                    }`}
                  >
                    全部
                  </button>
                  <button
                    onClick={() => setStatusFilter('unlocked')}
                    className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                      statusFilter === 'unlocked'
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                        : 'text-stone-400 hover:text-stone-300'
                    }`}
                  >
                    已点亮 ({unlockedCount})
                  </button>
                  <button
                    onClick={() => setStatusFilter('locked')}
                    className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                      statusFilter === 'locked'
                        ? 'bg-stone-800 text-stone-300 font-bold'
                        : 'text-stone-400 hover:text-stone-300'
                    }`}
                  >
                    未解锁 ({totalPossible - unlockedCount})
                  </button>
                </div>

                {/* Search Box */}
                <div className="relative flex-1 sm:w-56">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索标题 / 关键词 / 人格..."
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg pl-8 pr-7 py-1 text-xs text-stone-200 placeholder-stone-400 focus:outline-none focus:border-amber-500/50"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Stories Grid with Infinite / Progressive Render */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
              {filteredStories.length === 0 ? (
                <div className="py-16 text-center text-stone-400 space-y-2">
                  <Layers className="w-8 h-8 text-stone-400 mx-auto" />
                  <p className="text-sm">未找到符合当前筛选条件的异世界物语</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('全部');
                      setStatusFilter('all');
                      setSearchQuery('');
                    }}
                    className="text-xs text-amber-400 underline hover:text-amber-300 mt-2"
                  >
                    重置所有筛选
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
                    {filteredStories.slice(0, displayLimit).map((ending) => {
                      const isUnlocked = unlockedIdSet.has(ending.id);
                      const archetype = ARCHETYPES[ending.archetypeId];

                      if (isUnlocked) {
                        return (
                          <div
                            key={ending.id}
                            id={`ending-card-${ending.id}`}
                            onClick={() => {
                              soundFx.playSelect();
                              onSelectEndingToView(ending);
                            }}
                            className="group relative bg-stone-950/90 hover:bg-stone-900 border border-amber-500/30 hover:border-amber-500/70 rounded-2xl p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-amber-500/10 active:scale-[0.99]"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-mono text-amber-400 font-bold">
                                  NO.{String(ending.number).padStart(3, '0')}
                                </span>
                                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  已点亮
                                </span>
                              </div>

                              <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                                {ending.title}
                              </h4>

                              <p className="text-[11px] text-amber-400/80 font-serif italic line-clamp-1">
                                {ending.jpSubtitle}
                              </p>

                              <div className="flex flex-wrap items-center gap-1 pt-1">
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                  {ending.category}
                                </span>
                                <span
                                  className="px-1.5 py-0.5 rounded text-[10px] font-bold text-stone-950"
                                  style={{ backgroundColor: archetype?.color || '#f59e0b' }}
                                >
                                  {archetype?.name}
                                </span>
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-stone-900 text-stone-400 border border-stone-800 line-clamp-1">
                                  {ending.routeKey}
                                </span>
                              </div>
                            </div>

                            <p className="text-[11px] text-stone-400 line-clamp-2 mt-3 italic border-t border-stone-800/80 pt-2 leading-relaxed">
                              {ending.epilogueQuote}
                            </p>
                          </div>
                        );
                      }

                      // Locked Story Clue Card
                      return (
                        <div
                          key={ending.id}
                          id={`ending-card-${ending.id}`}
                          onClick={() => {
                            soundFx.playHover();
                            onSelectEndingToView(ending);
                          }}
                          className="group relative bg-stone-950/40 hover:bg-stone-950/70 border border-stone-800/60 hover:border-stone-700 rounded-2xl p-4 flex flex-col justify-between opacity-75 hover:opacity-100 cursor-pointer transition-all duration-200"
                          title="点击可预览线索与剧情脉络"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-mono text-stone-400">
                                NO.{String(ending.number).padStart(3, '0')}
                              </span>
                              <span className="flex items-center gap-1 text-[11px] text-stone-400">
                                <Lock className="w-3.5 h-3.5" />
                                待探索时空
                              </span>
                            </div>

                            <h4 className="text-sm font-semibold text-stone-400 line-clamp-2">
                              ???【未涉足的平行因果终章】
                            </h4>

                            <div className="flex flex-wrap items-center gap-1 pt-1">
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-stone-900 text-stone-400 border border-stone-800">
                                {ending.category}
                              </span>
                              <span className="text-[11px] text-amber-400/80 font-mono line-clamp-1">
                                抉择线索: {ending.routeKey}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 pt-2 border-t border-stone-900/80 flex items-center justify-between text-[11px] text-stone-400">
                            <div className="flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-500/60" />
                              <span>达成对应分支即可点亮</span>
                            </div>
                            <span className="text-amber-400/60 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all text-[10px]">
                              查看线索 →
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Load More Pagination */}
                  {filteredStories.length > displayLimit && (
                    <div className="mt-6 flex flex-col items-center gap-2">
                      <button
                        id="btn-load-more-stories"
                        onClick={() => setDisplayLimit((prev) => prev + 48)}
                        className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-amber-300 text-xs font-semibold border border-stone-700 hover:border-amber-500/40 transition-all shadow-md active:scale-95 flex items-center gap-2"
                      >
                        <Layers className="w-4 h-4 text-amber-400" />
                        <span>加载更多故事 (当前已展示 {displayLimit} / {filteredStories.length})</span>
                      </button>
                      <span className="text-[11px] text-stone-400">
                        或切换上方分类查看各篇章专属结局
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: 16 PERSONALITY ARCHETYPES */}
        {activeTab === 'archetypes' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
            {!selectedArchetypeDetail ? (
              <div className="space-y-4">
                <div className="text-xs text-stone-300 leading-relaxed bg-stone-950/70 p-4 rounded-2xl border border-stone-800/80 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300">16 种潜意识防御机制画像说明：</span>
                    <span className="text-stone-400 ml-1">
                      你在异世界的每一次轻小说转生选择，本质上都在投射现实职场与日常生活中最深沉的心理防御与本能欲望。已觉醒 <strong className="text-amber-400 font-mono">{unlockedArchetypesCount}</strong> / 16 种人格。点击任意卡片查看深度剖析。
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.values(ARCHETYPES).map((arch) => {
                    const isUnlocked = unlockedArchetypeIds.has(arch.id);
                    const IconComp = ARCHETYPE_ICONS[arch.iconName] || Sparkles;

                    return (
                      <div
                        key={arch.id}
                        id={`archetype-card-${arch.id}`}
                        onClick={() => {
                          soundFx.playSelect();
                          setSelectedArchetypeDetail(arch);
                        }}
                        className={`relative rounded-2xl p-4 cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                          isUnlocked
                            ? 'bg-stone-950/90 hover:bg-stone-800/90 border-amber-500/40 hover:border-amber-500 shadow-sm hover:shadow-lg'
                            : 'bg-stone-950/40 border-stone-800/60 hover:border-stone-700 opacity-75'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-20 h-20 rounded-xl bg-[#eee7fa] border-2 border-[#2f2745] flex items-center justify-center overflow-hidden shadow-[2px_2px_0_#2f2745]">
                              <img src={getArchetypeImage(arch.id)} alt={`${arch.name}形象`} className="w-full h-full object-contain" />
                            </div>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isUnlocked
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-stone-900 text-stone-400 border border-stone-800'
                              }`}
                            >
                              {isUnlocked ? '已觉醒' : '待觉醒'}
                            </span>
                          </div>

                          <div>
                            <h4 className="text-base font-bold font-serif text-stone-100">
                              {arch.name}
                            </h4>
                            <p className="text-xs text-stone-400 font-medium">
                              {arch.title}
                            </p>
                          </div>

                          <p className="text-xs text-amber-300/80 italic font-serif line-clamp-2">
                            {arch.subtitle}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                          <span className="font-mono text-[11px]">{arch.badge}</span>
                          <span className="text-amber-400 flex items-center gap-0.5 font-medium group-hover:translate-x-1 transition-transform">
                            查看解读 <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Detailed Deep-Dive View for Selected Archetype
              <div className="space-y-5 animate-fade-in max-w-3xl mx-auto">
                <button
                  onClick={() => setSelectedArchetypeDetail(null)}
                  className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-amber-300 transition-colors py-1.5 px-3 rounded-lg bg-stone-950 border border-stone-800"
                >
                  <span>← 返回人格总表</span>
                </button>

                <div className="bg-stone-950/80 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
                  {/* Top Bar */}
                  <div className="flex items-center gap-4 border-b border-stone-800 pb-5">
                    <div className="w-32 h-32 rounded-2xl bg-[#eee7fa] border-2 border-[#2f2745] flex items-center justify-center overflow-hidden shadow-[3px_3px_0_#2f2745] shrink-0">
                      <img src={getArchetypeImage(selectedArchetypeDetail.id)} alt={`${selectedArchetypeDetail.name}形象`} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-2xl font-bold font-serif text-stone-100">
                          {selectedArchetypeDetail.name}
                        </h3>
                        <span
                          className="px-2.5 py-0.5 text-xs font-bold rounded-full text-stone-950"
                          style={{ backgroundColor: selectedArchetypeDetail.color }}
                        >
                          {selectedArchetypeDetail.badge}
                        </span>
                      </div>
                      <p className="text-sm text-stone-400 mt-0.5">
                        {selectedArchetypeDetail.title}
                      </p>
                    </div>
                  </div>

                  {/* Soul Subtitle Quote */}
                  <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800/80 text-sm font-medium text-amber-300 italic font-serif">
                    {selectedArchetypeDetail.subtitle}
                  </div>

                  {/* Psychological Summary */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-amber-400 font-mono">
                      【潜意识深度诊断】
                    </h5>
                    <p className="text-sm text-stone-300 leading-relaxed">
                      {selectedArchetypeDetail.summary}
                    </p>
                  </div>

                  {/* Workplace / Reality Persona */}
                  <div className="space-y-2 bg-stone-900/50 p-4 rounded-2xl border border-stone-800">
                    <h5 className="text-xs font-bold text-amber-400 font-mono">
                      【现实打工人 / 校园画像】
                    </h5>
                    <p className="text-sm text-stone-300 leading-relaxed">
                      {selectedArchetypeDetail.realityAnalysis}
                    </p>
                    <div className="pt-2 text-xs text-stone-300 border-t border-stone-800/60 mt-2">
                      <strong className="text-amber-300">💡 职场生态位：</strong>
                      {selectedArchetypeDetail.workplacePersona}
                    </div>
                  </div>

                  {/* Exclusive Passive Skill */}
                  <div className="space-y-2 bg-stone-900/50 p-4 rounded-2xl border border-stone-800">
                    <h5 className="text-xs font-bold text-cyan-400 font-mono">
                      ✨ 专属神赐特技：{selectedArchetypeDetail.passiveSkill.name}
                    </h5>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {selectedArchetypeDetail.passiveSkill.desc}
                    </p>
                  </div>

                  {/* Affinity Partners */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 space-y-1">
                      <div className="text-xs font-bold text-emerald-400">
                        🤝 灵魂搭档：{selectedArchetypeDetail.bestPartner.role}
                      </div>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        {selectedArchetypeDetail.bestPartner.reason}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/20 space-y-1">
                      <div className="text-xs font-bold text-rose-400">
                        ⚔️ 天生克星：{selectedArchetypeDetail.nemesis.role}
                      </div>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        {selectedArchetypeDetail.nemesis.reason}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-stone-800 bg-stone-950/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-400 shrink-0">
          <div className="flex items-center gap-2">
            <span>
              {activeTab === 'stories'
                ? `共收录 884 篇纯手工独立撰写物语 · 当前已点亮 ${unlockedCount} 篇 (${Math.round((unlockedCount / totalPossible) * 100)}%)`
                : `16 种潜意识防御机制原型 · 已觉醒 ${unlockedArchetypesCount} / 16 种`}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs transition-colors self-end sm:self-auto"
          >
            返回测试
          </button>
        </div>
      </div>
    </div>
  );
};
