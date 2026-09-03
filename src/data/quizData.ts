import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: Record<string, QuizQuestion> = {
  q1: {
    step: 1,
    id: 'q1',
    title: '你是怎么穿越到异世界的？',
    subtitle: '请选择你的转生契机，这揭示了你潜意识中最深沉的脱离现实渴望与灵魂底色。',
    chapterBadge: 'CHAPTER 01 · 降临契机',
    options: [
      {
        id: 'truck',
        label: '舍己救人，被大卡车创飞',
        badge: '王道转生',
        flavor: '为了救马路中间的小猫或中学生，毅然迎向疾驰的泥头车，走得很安详。',
        icon: 'Truck'
      },
      {
        id: 'overwork',
        label: '熬夜通宵，两眼一黑原地猝死',
        badge: '当代牛马',
        flavor: '连续加班赶死线/排位连跪到凌晨四点，心率狂飙，眼睛一闭直接换地图。',
        icon: 'Moon'
      },
      {
        id: 'circle',
        label: '走在大街上，被魔法阵强行召唤',
        badge: '天降横祸',
        flavor: '只是下楼买个泡面，脚底忽然亮起刺眼红光，耳边传来“拯救世界吧”的呼唤。',
        icon: 'Sparkles'
      },
      {
        id: 'god_apology',
        label: '神明手滑把你搞死了，跪着给你赔罪',
        badge: '开局索赔',
        flavor: '神界实习生误触雷击键，为了封口，主神土下座痛哭流涕答应你任意开挂。',
        icon: 'Crown'
      }
    ]
  },

  q2: {
    step: 2,
    id: 'q2',
    title: '请选择你的初始外挂（金手指）：',
    subtitle: '神明的恩赐已经就绪，你的选择将直接决定你在异世界的立足之道与战术风格。',
    chapterBadge: 'CHAPTER 02 · 初始神赐',
    options: [
      {
        id: 'immortality',
        label: '无尽寿命',
        badge: '熬死所有人',
        flavor: '（“只要我能活，看谁熬得过谁，百年之后你们全族的骨灰我来扬。”）',
        icon: 'Hourglass'
      },
      {
        id: 'defense',
        label: '绝对防御',
        badge: '全点防御力',
        flavor: '（“伤害恒定为0，刮痧反伤大师，站着让你砍三天三夜先累死你。”）',
        icon: 'Shield'
      },
      {
        id: 'infinite_growth',
        label: '无限成长',
        badge: '数值怪胎',
        flavor: '（“Lv.1 后面跟着无数个0，呼吸都在变强，上限直通多元宇宙尽头。”）',
        icon: 'TrendingUp'
      },
      {
        id: 'omniscience',
        label: '无穷智慧',
        badge: '全知之书',
        flavor: '（“上知万界古今，下知魔王弱点，看一眼即刻解析全大陆底层代码。”）',
        icon: 'BookOpen'
      },
      {
        id: 'brute_force',
        label: '劲大',
        badge: '物理哲学 (？)',
        flavor: '（“没那么多花里胡哨的魔法，纯粹是力量大到能一巴掌抽碎次元壁。”）',
        icon: 'Zap'
      }
    ]
  },

  q3_identity: {
    step: 3,
    id: 'q3_identity',
    title: '请选择你在异世界的初始身份：',
    subtitle: '在这个充满魔法与剑的大陆上，你将以何种社会地位与姿态睁开双眼？',
    chapterBadge: 'CHAPTER 03 · 命运阶级',
    options: [
      {
        id: 'hero',
        label: '勇者',
        badge: '天命背负',
        flavor: '圣剑在手，举国欢呼，全人类的救世希望（以及海量的道德绑架委托）。',
        icon: 'Sword'
      },
      {
        id: 'demon_king',
        label: '魔王',
        badge: '反派霸主',
        flavor: '王座高耸，万魔臣服，虽然手下一群笨蛋但拥有至高无上的绝对自主权。',
        icon: 'Skull'
      },
      {
        id: 'sage',
        label: '贤者',
        badge: '智识巅峰',
        flavor: '隐居大图书馆或浮空塔，掌握真理秘术，谁来请教都得看你今日心情。',
        icon: 'Feather'
      },
      {
        id: 'saint',
        label: '圣女',
        badge: '信仰核心',
        flavor: '神殿核心光环，治愈万物的神圣恩典（每天被安排接见各种虚伪贵族）。',
        icon: 'Sun'
      },
      {
        id: 'peasant',
        label: '平民 / 其他',
        badge: '自由众生',
        flavor: '冒险者、魔王手下、勇者队友、普通居民、学院学生、路人NPC...不受剧本约束。',
        icon: 'Home'
      }
    ]
  },

  q3_brute: {
    step: 3,
    id: 'q3_brute',
    title: '拥有撕裂维度蛮力的你，请选择你的终极目标：',
    subtitle: '力量已经足以颠覆宇宙法则，现在，唯有你内心最纯粹的欲望才能指引终章。',
    chapterBadge: 'SPECIAL CHAPTER · 劲力觉醒',
    options: [
      {
        id: 'ordinary',
        label: '我想过平凡的日子',
        badge: '一拳归隐',
        flavor: '开辟一亩三分地种土豆，谁敢来吵直接一拳轰飞到外太空。',
        icon: 'Coffee'
      },
      {
        id: 'industrial',
        label: '我想进行工业革命',
        badge: '蒸汽与肌肉',
        flavor: '徒手手搓蒸汽机、锻造千吨钢轨，用纯物理力量推动异世界科技飞升。',
        icon: 'Cpu'
      },
      {
        id: 'return_home',
        label: '我想回到前世的世界',
        badge: '次元爆破',
        flavor: '“既然空间有阻隔，那我对着空气轰出一拳，直接砸开回家的大门！”',
        icon: 'Compass'
      },
      {
        id: 'defeat_demon_king',
        label: '我想打倒魔王！',
        badge: '极速通关',
        flavor: '不搞任何长途拔涉，出门朝着魔王城方向挥一拳，当天全剧终。',
        icon: 'Flame'
      },
      {
        id: 'destroy_all',
        label: '毁灭吧，赶紧的！',
        badge: '核爆清场',
        flavor: '看够了人性的丑陋与虚伪，一巴掌拍在大陆板块上，全员推倒重来。',
        icon: 'Zap'
      }
    ]
  },

  // Exclusive Race selection for "peasant / other"
  q4_race: {
    step: 4,
    id: 'q4_race',
    title: '平民/其他专属 · 请选择你的初始种族：',
    subtitle: '跳脱出固定王道身份的你，将以何种血统与物理形态降临异界？',
    chapterBadge: 'CHAPTER 04 · 种族血统',
    options: [
      {
        id: 'human',
        label: '人类',
        badge: '碳基深藏不露',
        flavor: '看似平平无奇的碳基原住民，没有华丽羽翼或长耳，实则深谙世故、底牌最厚。',
        icon: 'Home'
      },
      {
        id: 'elf',
        label: '精灵',
        badge: '自然长寿种',
        flavor: '优雅长耳、容颜永驻，受森林密语与高阶魔导眷顾，漫长寿命看尽沧海桑田。',
        icon: 'Sparkles'
      },
      {
        id: 'monster',
        label: '魔物',
        badge: '骷髅/龙/史莱姆',
        flavor: '史莱姆、不死族骷髅、幼龙或者深渊魔狼，自带异化吞噬与无限蜕变进化潜质！',
        icon: 'Zap'
      },
      {
        id: 'non_living',
        label: '非生物 (???)',
        badge: '神器/人偶/魔导具',
        flavor: '睁开眼发现自己没有呼吸——你转生成了一柄绝世神剑、自动人偶、甚至自动贩卖机？！',
        icon: 'Cpu'
      }
    ]
  },

  // Hero / Saint standard genre options
  q4_genre_5: {
    step: 4,
    id: 'q4_genre_5',
    title: '请选择你的故事主线流派：',
    subtitle: '选择你最渴望经历的轻小说剧情走向，迎来专属于你的异世界终章。',
    chapterBadge: 'CHAPTER 04 · 故事终章',
    options: [
      {
        id: 'retired',
        label: '退队流 · 单飞打脸',
        badge: '莫欺少年穷',
        flavor: '被嫌弃“毫无用处”踢出队伍，扭头自己单飞，原队友很快肠子悔青跪求回归。',
        icon: 'LogOut'
      },
      {
        id: 'revenge',
        label: '复仇流 · 黑化裁决',
        badge: '深渊审判',
        flavor: '遭受背叛后从地狱归来，带着绝对力量让曾经的背叛者付出千百倍代价。',
        icon: 'Flame'
      },
      {
        id: 'level_up',
        label: '练级流 · 带队起飞',
        badge: '大爹带刷',
        flavor: '手把手带飞萌新废柴队友，随手秒掉天灾Boss，全队直呼“有神快拜”！',
        icon: 'TrendingUp'
      },
      {
        id: 'flex',
        label: '装逼流 · 影之实力者',
        badge: '极致迪化',
        flavor: '日常低调当路人甲，关键时刻暗中反手灭世；随口一句梦呓，全场队友与敌人疯狂脑补迪化！',
        icon: 'Eye'
      },
      {
        id: 'daily',
        label: '日常流 · 慢调生活',
        badge: '慢节奏治愈',
        flavor: '不打打杀杀，开咖啡馆、种田养猫、研究异世界美食，和伙伴享受惬意人生。',
        icon: 'Coffee'
      },
      {
        id: 'romance',
        label: '恋爱流 · 羁绊相随',
        badge: '发糖万岁',
        flavor: '异世界的战斗只是背景板，和命中注定的同行伴侣谈一场轰轰烈烈的恋爱。',
        icon: 'Heart'
      }
    ]
  },

  // Demon King bespoke genre options
  q4_genre_demon: {
    step: 4,
    id: 'q4_genre_demon',
    title: '魔王陛下，请选择你统治大陆的剧本走向：',
    subtitle: '深渊的王座只属于你，你的野心、疲惫或欲望将把这片大陆引向何方？',
    chapterBadge: 'CHAPTER 04 · 魔王终章',
    options: [
      {
        id: 'retired',
        label: '退位流 · 卸任摸鱼',
        badge: '辞去魔王',
        flavor: '假死脱身卸任魔王宝座，在人类边境开了家烘焙店，每天和部下烤面包度日。',
        icon: 'LogOut'
      },
      {
        id: 'revenge',
        label: '复仇流 · 天灾宣战',
        badge: '深渊怒火',
        flavor: '向虚伪的神明与伪善的王国宣战，彻底踏平旧秩序，重洗世间因果。',
        icon: 'Flame'
      },
      {
        id: 'level_up',
        label: '练级流 · 领地飞升',
        badge: '深渊军团',
        flavor: '带领魔界四天王与笨蛋魔物军团全员特训飞升，把深渊打造成全大陆最强乐园。',
        icon: 'TrendingUp'
      },
      {
        id: 'flex',
        label: '装逼流 · 随口深意',
        badge: '深渊霸道',
        flavor: '魔王陛下随手抓起茶杯叹了口气，魔界四天王当场扑通跪地：“陛下这声叹息包含三层灭世谋略，太深了！”',
        icon: 'Crown'
      },
      {
        id: 'daily',
        label: '日常流 · 城堡死宅',
        badge: '安乐度假',
        flavor: '把魔王城改成带温泉与魔法投影的死宅避难所，谁来敲门都不给开。',
        icon: 'Coffee'
      },
      {
        id: 'romance',
        label: '恋爱流 · 宿敌相契',
        badge: '相爱相杀',
        flavor: '面对前来讨伐的死敌勇者/傲娇圣女，在刀光剑影中互生情愫，上演相爱相杀。',
        icon: 'Heart'
      }
    ]
  },

  // Sage bespoke genre options
  q4_genre_sage: {
    step: 4,
    id: 'q4_genre_sage',
    title: '首席贤者，请选择你探求真理的终章路线：',
    subtitle: '全知与魔法在你的指尖流淌，这趟真理探求之旅将以何种传奇收官？',
    chapterBadge: 'CHAPTER 04 · 贤者终章',
    options: [
      {
        id: 'retired',
        label: '退团流 · 辞去首席',
        badge: '归隐林泉',
        flavor: '受够了皇家法师团的官僚内耗，主动离职隐居迷雾之森，研究古代泡茶魔像。',
        icon: 'LogOut'
      },
      {
        id: 'revenge',
        label: '复仇流 · 禁咒破晓',
        badge: '真理天罚',
        flavor: '揭露神殿篡改历史与血祭的丑恶阴谋，孤身引动天基禁咒洗清世间伪善。',
        icon: 'Flame'
      },
      {
        id: 'level_up',
        label: '练级流 · 徒弟满天下',
        badge: '全知导师',
        flavor: '开设真理讲堂，带出一批震颤大陆的魔导师、龙骑士徒弟，全员护短。',
        icon: 'TrendingUp'
      },
      {
        id: 'flex',
        label: '装逼流 · 弹指真理',
        badge: '大巧不工',
        flavor: '面对帝国最强禁咒法师团，随手在沙地上画了个草稿，帝国法神当场吐血顿悟跪求拜师！',
        icon: 'Sparkles'
      },
      {
        id: 'daily',
        label: '日常流 · 魔法工坊',
        badge: '学术慢调',
        flavor: '在学院后街开间杂货铺，教使魔小猫飞天，慢悠悠品尝红茶与研究小玩具。',
        icon: 'Coffee'
      },
      {
        id: 'romance',
        label: '恋爱流 · 契约共生',
        badge: '真理相伴',
        flavor: '在漫漫求真长路上，与同行的契约之灵或异族知己结下生死相随的羁绊。',
        icon: 'Heart'
      }
    ]
  },

  // Peasant / Other dedicated Step 5 Genre question
  q5_genre_peasant: {
    step: 5,
    id: 'q5_genre_peasant',
    title: '平民/其他专属 · 请选择你的主线走向：',
    subtitle: '在这个充满奇迹的大陆上，你将带领队友掀起怎样打破常理的物语？',
    chapterBadge: 'CHAPTER 05 · 故事终章',
    options: [
      {
        id: 'retired',
        label: '退队流 · 单飞即巅峰',
        badge: '莫欺平民穷',
        flavor: '被嫌弃是累赘踢出队伍，扭头自己拉起神级队伍单飞，原队长哭着上门求复合。',
        icon: 'LogOut'
      },
      {
        id: 'revenge',
        label: '复仇流 · 降维掀桌',
        badge: '深渊反噬',
        flavor: '曾经被贵族当炮灰抛弃，如今携深渊底牌卷土重来，连同虚伪神座一起掀翻。',
        icon: 'Flame'
      },
      {
        id: 'level_up',
        label: '练级流 · 带飞全队',
        badge: '大爹带刷',
        flavor: '拉扯着一群废柴萌新队友越级刷神兽副本，随手一拳秒Boss，队友当场抱大腿狂呼“大爹”。',
        icon: 'TrendingUp'
      },
      {
        id: 'flex',
        label: '装逼流 · 极度迪化',
        badge: '深不可测',
        flavor: '“我只是路过的普通居民啊！”随手捡起树枝弹飞天灾骨龙，身后队友：“不愧是那位神明化身！”',
        icon: 'Eye'
      },
      {
        id: 'daily',
        label: '日常流 · 治愈物语',
        badge: '开店慢活',
        flavor: '开间魔导小茶馆，和捡来的精灵萌妹、小龙娘一起做烘焙，享受异世界的静好岁月。',
        icon: 'Coffee'
      },
      {
        id: 'romance',
        label: '恋爱流 · 羁绊相随',
        badge: '跨界纯爱',
        flavor: '身份虽微却被落难的高傲公主/龙族女王赖上，在打打闹闹与共同历险中结为生死伴侣。',
        icon: 'Heart'
      }
    ]
  }
};
