export type TransmigrationId = 'truck' | 'overwork' | 'circle' | 'god_apology';
export type CheatId = 'immortality' | 'defense' | 'infinite_growth' | 'omniscience' | 'brute_force' | 'other';
export type IdentityId = 'hero' | 'demon_king' | 'sage' | 'saint' | 'peasant';
export type RaceId = 'human' | 'elf' | 'monster' | 'non_living' | 'sword' | 'automaton' | 'fortress' | 'curio';
export type BruteGoalId = 'ordinary' | 'industrial' | 'return_home' | 'defeat_demon_king' | 'destroy_all';
export type GenreId = 'retired' | 'revenge' | 'level_up' | 'flex' | 'daily' | 'romance';

export interface UserSelections {
  transmigration?: TransmigrationId;
  cheat?: CheatId;
  identity?: IdentityId;
  race?: RaceId;
  bruteGoal?: BruteGoalId;
  genre?: GenreId;
}

export type PersonalityArchetypeId =
  | 'slacker_sage'           // 摆烂哲学家
  | 'dark_realist'           // 黑化现实主义者
  | 'order_architect'        // 极限卷王
  | 'saint_martyr'           // 隐忍内耗型圣母
  | 'lone_wolf'              // 边界感孤狼
  | 'pure_lover'             // 纯爱战神
  | 'chaotic_jester'         // 乐子人
  | 'detached_strategist'    // 智识冷眼旁观者
  | 'opportunist_trader'     // 降维投机客
  | 'tragic_savior'          // 悲情殉道者
  | 'tsundere_guardian'      // 傲娇守护者
  | 'nihilist_drifter'       // 虚无主义幽灵
  | 'berserk_engine'         // 狂躁推土机
  | 'social_butterfly'       // 社交牛逼症
  | 'destiny_procrastinator' // 宿命拖延狂
  | 'cult_mentor';           // 偏执造神导师

export interface StatRadar {
  power: number;       // 战力 / 爆发力
  chill: number;       // 摸鱼 / 松弛度
  sanity: number;      // 精神状态 / SAN值
  rebellion: number;   // 反骨值 / 叛逆度
  romance: number;     // 恋爱脑 / 情感度
  wisdom: number;      // 智力 / 策略度
}

export interface BystanderRoast {
  witness: string;
  comment: string;
  tag?: string;
}

export interface PersonalityArchetype {
  id: PersonalityArchetypeId;
  name: string;
  title: string;
  subtitle: string;
  quote: string;
  badge: string;
  color: string;
  gradient: string;
  iconName: string;
  summary: string;
  realityAnalysis: string;
  workplacePersona: string;
  chibiPrompt?: string;
  passiveSkill: {
    name: string;
    desc: string;
  };
  bestPartner: {
    role: string;
    reason: string;
  };
  nemesis: {
    role: string;
    reason: string;
  };
}

export interface EndingStory {
  id: string; // e.g. "truck_brute_ordinary", "overwork_defense_hero_retired"
  number: number;
  title: string;
  jpSubtitle: string;
  category: '劲大流' | '勇者篇' | '魔王篇' | '贤者篇' | '圣女篇' | '平民篇';
  archetypeId: PersonalityArchetypeId;
  routeKey: string; // concise description of path
  transmigration: TransmigrationId;
  cheat: CheatId;
  identity?: IdentityId;
  race?: RaceId;
  bruteGoal?: BruteGoalId;
  genre?: GenreId;
  tags: string[];
  storyText: string;
  epilogueQuote: string;
  bystanderRoast?: BystanderRoast;
  stats: StatRadar;
}

export interface QuizOption {
  id: string;
  label: string;
  badge?: string;
  flavor?: string;
  icon?: string;
}

export interface QuizQuestion {
  step: number;
  id: 'q1' | 'q2' | 'q3_identity' | 'q3_brute' | 'q4_race' | 'q4_race_other' | 'q4_genre_5' | 'q4_genre_demon' | 'q4_genre_sage' | 'q5_genre_peasant';
  title: string;
  subtitle: string;
  chapterBadge: string;
  options: QuizOption[];
}
