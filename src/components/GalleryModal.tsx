import React, { useState } from 'react';
import {
  X,
  Lock,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Filter,
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
  Award,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { ARCHETYPES } from '../data/archetypesData';
import { getRepresentativeEndings, getEndingById } from '../data/endingsData';
import { EndingStory, PersonalityArchetype, PersonalityArchetypeId } from '../types';
import { soundFx } from '../utils/audio';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedEndingIds: string[];
  onSelectEndingToView: (ending: EndingStory) => void;
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
  onSelectEndingToView
}) => {
  const [activeTab, setActiveTab] = useState<'stories' | 'archetypes'>('stories');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [selectedArchetypeDetail, setSelectedArchetypeDetail] = useState<PersonalityArchetype | null>(null);

  if (!isOpen) return null;

  // 1. Calculate unlocked stories
  const userUnlockedEndings: EndingStory[] = unlockedEndingIds
    .map((id) => getEndingById(id))
    .filter((e): e is EndingStory => e !== null);

  // 2. Representative sample catalog
  const representativeList = getRepresentativeEndings();

  // Combine user unlocked and representative catalog without duplication
  const combinedStoryMap = new Map<string, EndingStory>();
  userUnlockedEndings.forEach((e) => combinedStoryMap.set(e.id, e));
  representativeList.forEach((e) => {
    if (!combinedStoryMap.has(e.id)) {
      combinedStoryMap.set(e.id, e);
    }
  });

  const allDisplayStories = Array.from(combinedStoryMap.values());

  const filteredStories = allDisplayStories.filter((item) => {
    if (selectedCategory === '全部') return true;
    return item.category === selectedCategory;
  });

  // Calculate unlocked archetypes set
  const unlockedArchetypeIds = new Set<PersonalityArchetypeId>();
  userUnlockedEndings.forEach((e) => unlockedArchetypeIds.add(e.archetypeId));
  const unlockedArchetypesCount = unlockedArchetypeIds.size;
  const totalArchetypesCount = Object.keys(ARCHETYPES).length; // 16

  // Explorer Title calculation
  const getExplorerTitle = (storyCount: number, archetypeCount: number) => {
    if (archetypeCount >= 14 || storyCount >= 30) return '✦ 多元时空命运织网者 ✦';
    if (archetypeCount >= 8 || storyCount >= 15) return '✦ 全知界域观察官 ✦';
    if (archetypeCount >= 4 || storyCount >= 5) return '✦ 跨维度转生旅者 ✦';
    return '✦ 异世界初生行者 ✦';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 border-b border-stone-800 bg-stone-950/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-serif text-stone-100">
                  异世界命运之书 · 图鉴档案馆
                </h2>
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25">
                  {getExplorerTitle(userUnlockedEndings.length, unlockedArchetypesCount)}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                已收录 {userUnlockedEndings.length} 条多元时空物语 · 已觉醒 {unlockedArchetypesCount} / {totalArchetypesCount} 种潜意识人格原型
              </p>
            </div>
          </div>

          {/* Close & Header Action */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Dual Main Tabs */}
            <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-800">
              <button
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
                多元物语 ({userUnlockedEndings.length})
              </button>
              <button
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
              onClick={() => {
                soundFx.playSelect();
                onClose();
              }}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-100 transition-colors"
              title="关闭"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TAB 1: STORIES & ENDINGS */}
        {activeTab === 'stories' && (
          <>
            {/* Category Filter Chips */}
            <div className="px-4 sm:px-6 py-2.5 border-b border-stone-800/80 bg-stone-900/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0 mr-1" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    soundFx.playHover();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-sm shadow-amber-500/20'
                      : 'bg-stone-950/60 text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Stories Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {filteredStories.map((ending) => {
                const isUnlocked = unlockedEndingIds.includes(ending.id);
                const archetype = ARCHETYPES[ending.archetypeId];

                if (isUnlocked) {
                  return (
                    <div
                      key={ending.id}
                      onClick={() => {
                        soundFx.playSelect();
                        onSelectEndingToView(ending);
                      }}
                      className="group relative bg-stone-950/90 hover:bg-stone-800/80 border border-stone-800 hover:border-amber-500/60 rounded-2xl p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-amber-500/10"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-amber-400 font-bold">
                            NO.{String(ending.number).padStart(2, '0')}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            已收录
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-snug">
                          {ending.title}
                        </h4>

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
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-stone-900 text-stone-400 border border-stone-800">
                            {ending.routeKey}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-stone-400 line-clamp-2 mt-3 italic border-t border-stone-800/80 pt-2">
                        {ending.epilogueQuote}
                      </p>
                    </div>
                  );
                }

                // Locked Story Clue
                return (
                  <div
                    key={ending.id}
                    className="relative bg-stone-950/40 border border-stone-800/50 rounded-2xl p-4 flex flex-col justify-between opacity-65 select-none"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-stone-400">
                          NO.{String(ending.number).padStart(2, '0')}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-stone-400">
                          <Lock className="w-3.5 h-3.5" />
                          未涉足时空
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold text-stone-400 line-clamp-2">
                        ???【待探索的异世界终章】
                      </h4>

                      <div className="flex flex-wrap items-center gap-1 pt-1">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-stone-900 text-stone-400 border border-stone-800">
                          {ending.category}
                        </span>
                        <span className="text-[11px] text-amber-400/80 font-mono">
                          线索: {ending.routeKey}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-2 border-t border-stone-900 flex items-center gap-1.5 text-[11px] text-stone-400">
                      <Sparkles className="w-3 h-3 text-amber-500/60" />
                      <span>在测试中达成对应组合即可解锁</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* TAB 2: 16 PERSONALITY ARCHETYPES */}
        {activeTab === 'archetypes' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {!selectedArchetypeDetail ? (
              <div className="space-y-4">
                <div className="text-xs text-stone-400 leading-relaxed bg-stone-950/60 p-3.5 rounded-xl border border-stone-800/80">
                  💡 每一个异世界抉择都深刻映射着你在现实生活与职场中的潜意识心理防御。点击任意人格卡片，即可查看该性格原型的深度解读、现实职场生态位、专属技能与羁绊。
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.values(ARCHETYPES).map((arch) => {
                    const isUnlocked = unlockedArchetypeIds.has(arch.id);
                    const IconComp = ARCHETYPE_ICONS[arch.iconName] || Sparkles;

                    return (
                      <div
                        key={arch.id}
                        onClick={() => {
                          soundFx.playSelect();
                          setSelectedArchetypeDetail(arch);
                        }}
                        className={`relative rounded-2xl p-4 cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                          isUnlocked
                            ? 'bg-stone-950/90 hover:bg-stone-800/80 border-stone-800 hover:border-amber-500/60 shadow-sm hover:shadow-lg'
                            : 'bg-stone-950/40 border-stone-800/50 hover:border-stone-700 opacity-75'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow"
                              style={{ backgroundColor: arch.color }}
                            >
                              <IconComp className="w-5 h-5" />
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
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: selectedArchetypeDetail.color }}
                    >
                      {React.createElement(
                        ARCHETYPE_ICONS[selectedArchetypeDetail.iconName] || Sparkles,
                        { className: 'w-7 h-7' }
                      )}
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

        {/* Footer */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/80 flex items-center justify-between text-xs text-stone-400">
          <span>
            {activeTab === 'stories'
              ? '点击已收录卡片可重温对应异世界终章与专属心理证书'
              : `已觉醒 ${unlockedArchetypesCount} / ${totalArchetypesCount} 种潜意识人格原型`}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs transition-colors"
          >
            返回冒险
          </button>
        </div>
      </div>
    </div>
  );
};
