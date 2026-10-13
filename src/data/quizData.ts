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
      },
      {
        id: 'other',
        label: '其他 / 超验异化',
        badge: '超脱既定外挂',
        flavor: '（“拒绝被寿命或数值定义，拥有不可名状的奇诡权柄或脱离常规碳基概念。”）',
        icon: 'Sparkles'
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

  // Exclusive Race selection for "peasant / other" with standard cheats (Human, Elf, Monster)
  q4_race: {
    step: 4,
    id: 'q4_race',
    title: '平民/其他专属 · 请选择你的初始种族：',
    subtitle: '跳脱出固定王道身份的你，将以何种血统降临异界？',
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
      }
    ]
  },

  // Exclusive Non-living selection for "other" cheat + "peasant" identity
  q4_race_other: {
    step: 4,
    id: 'q4_race_other',
    title: '超验异化专属 · 请选择你的非生物形态：',
    subtitle: '睁开眼发现自己没有呼吸与心跳——在这个世界，你将以何种非凡器物君临大陆？',
    chapterBadge: 'SPECIAL CHAPTER · 器物化身',
    options: [
      {
        id: 'sword',
        label: '绝世神器 / 封印妖刀',
        badge: '器灵至尊',
        flavor: '苏醒于远古剑冢古战场，谁拔出你谁就是天命主角……或者沦为你的执剑工具人。',
        icon: 'Sword'
      },
      {
        id: 'automaton',
        label: '机巧魔偶 / 自律人偶',
        badge: '机械觉醒',
        flavor: '超古代魔导文明遗留的最高杰作，精金齿轮与永动机芯咬合，悄然诞生属于自己的灵魂。',
        icon: 'Cpu'
      },
      {
        id: 'fortress',
        label: '魔导城堡 / 迷宫要塞',
        badge: '活体领地',
        flavor: '你转生成了一座拥有自我意志的宏大地下城，冒险者、帝国军与恶龙都在你腹中进出。',
        icon: 'Shield'
      },
      {
        id: 'curio',
        label: '现代奇物 / 自动贩卖机',
        badge: '降维怪诞',
        flavor: '异界荒原上唯一的红白机箱，靠吐出冰镇可乐、热腾腾泡面与降维道具让全大陆趋之若鹜。',
        icon: 'Coffee'
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
        label: '退队流',
        badge: '莫欺少年穷',
        flavor: '遭受盲目队友的轻视与驱逐，果断单飞自立门户，在更高的巅峰让曾经轻视你的人追悔莫及。',
        icon: 'LogOut'
      },
      {
        id: 'revenge',
        label: '复仇流',
        badge: '清算宿怨',
        flavor: '撕碎虚伪的救世伪善与算计背叛，以绝对霸道的实力掀翻旧规则，带来彻底的清算与重构。',
        icon: 'Flame'
      },
      {
        id: 'level_up',
        label: '练级流',
        badge: '并肩蜕变',
        flavor: '拒绝单打独斗，与志同道合的队友在危机四伏的地下城并肩砥砺，经历生死洗礼，一步一个脚印实现队伍与个人的全面飞升。',
        icon: 'TrendingUp'
      },
      {
        id: 'flex',
        label: '装逼流',
        badge: '深不可测',
        flavor: '身怀绝世伟力却低调如常，行事举重若轻，举手投足间的漫不经心引得世间豪强与神魔疯狂揣摩推崇。',
        icon: 'Eye'
      },
      {
        id: 'daily',
        label: '日常流',
        badge: '惬意慢调',
        flavor: '放下打打杀杀与宏大叙事，开店、种田、研制异世界美食，与知心旅伴享受最纯粹的治愈人生。',
        icon: 'Coffee'
      },
      {
        id: 'romance',
        label: '恋爱流',
        badge: '羁绊相依',
        flavor: '战斗只是点缀与契机，在波澜壮阔的异世界冒险中，与命中注定同行的人谈一场刻骨铭心的恋爱。',
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
        label: '退位流',
        badge: '假死摸鱼',
        flavor: '受够了劳碌沉重的魔王职责，假死隐退金盆洗手，在人魔边境开启悠哉度日的第二人生。',
        icon: 'LogOut'
      },
      {
        id: 'revenge',
        label: '复仇流',
        badge: '天灾降临',
        flavor: '向虚伪自私的神殿旧秩序全面宣战，释放积攒千年的深渊狂怒，重铸属于世间万物的公理。',
        icon: 'Flame'
      },
      {
        id: 'level_up',
        label: '练级流',
        badge: '全员飞升',
        flavor: '一人独强不如阵营全盛。赐名栽培麾下的忠诚眷属，带领曾经弱小的魔物军团全员进化升级，打造横推大陆的至尊魔国。',
        icon: 'TrendingUp'
      },
      {
        id: 'flex',
        label: '装逼流',
        badge: '帝皇威仪',
        flavor: '居于幽暗王座之上一言不发，哪怕随意一个小动作，也让麾下魔将与人界斥候吓得肝胆俱裂、疯狂脑补。',
        icon: 'Crown'
      },
      {
        id: 'daily',
        label: '日常流',
        badge: '魔王别苑',
        flavor: '把阴森的魔王宫殿改造成带温泉和美食的度假胜地，过上让勇者看了都羡慕的快乐死宅生活。',
        icon: 'Coffee'
      },
      {
        id: 'romance',
        label: '恋爱流',
        badge: '相爱相杀',
        flavor: '谁说魔王与宿敌注定生死相对？在一次次针锋相对的碰撞中擦出炽热火花，谱写打破阵营界限的绝美爱恋。',
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
        label: '退隐流',
        badge: '归隐林泉',
        flavor: '厌倦了皇家魔法学院的官僚拉扯与学阀内耗，辞去首席之位归隐秘境，专心研究有趣的炼金小发明。',
        icon: 'LogOut'
      },
      {
        id: 'revenge',
        label: '复仇流',
        badge: '真理裁决',
        flavor: '不再扮演逆来顺受的学者，以纯粹的真理矩阵引动天基法则，彻底清算曾经构陷背叛你的伪善政客。',
        icon: 'Flame'
      },
      {
        id: 'level_up',
        label: '练级流',
        badge: '门徒如林',
        flavor: '授人以鱼不如授人以渔。广开真理学派，破除学阀门第之见，带领求知若渴的年轻学徒们共同参悟至高法则，全派集体突破。',
        icon: 'TrendingUp'
      },
      {
        id: 'flex',
        label: '装逼流',
        badge: '大巧不工',
        flavor: '信手拈来便是震动学术界的无上至理，从容自若间便让高傲自负的大魔导师与法神集体顿悟叹服。',
        icon: 'Sparkles'
      },
      {
        id: 'daily',
        label: '日常流',
        badge: '魔法工坊',
        flavor: '在古朴小巷中经营一间充满奇妙道具的杂货铺，改良日常生活小法术，在悠扬茶香中享受闲适岁月。',
        icon: 'Coffee'
      },
      {
        id: 'romance',
        label: '恋爱流',
        badge: '灵魂共鸣',
        flavor: '在漫长冰冷的求知之路上，终于遇见了能读懂你所有思想与孤独的灵魂知己，携手漫步真理之巅。',
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
        label: '退队流',
        badge: '莫欺平民穷',
        flavor: '被嫌弃是毫无战斗力的新手村民，离队后靠着隐藏才能建立庞大产业，让前队友肠子悔青求上门。',
        icon: 'LogOut'
      },
      {
        id: 'revenge',
        label: '复仇流',
        badge: '降维掀桌',
        flavor: '看似无害的普通路人，在踩碎底线后爆发碾压级别的超然底牌，将自命不凡的傲慢强权连根拔起。',
        icon: 'Flame'
      },
      {
        id: 'level_up',
        label: '练级流',
        badge: '底层逆袭',
        flavor: '虽是起点最低的新手平民，却与同伴在泥泞中紧握彼此双手。从微末的1阶技能摸索配合，以血汗与不屈越级强攻，扎实迈向神坛。',
        icon: 'TrendingUp'
      },
      {
        id: 'flex',
        label: '装逼流',
        badge: '扫地僧式',
        flavor: '以最普通的平民外表漫步世间，随手一击便化解灭世危机，留下让整片大陆惊叹寻找的无名世外高人传说。',
        icon: 'Eye'
      },
      {
        id: 'daily',
        label: '日常流',
        badge: '田园牧歌',
        flavor: '种灵果、酿佳酿、烹饪异界珍馐，把平凡平淡的日常过成万众向往的世外桃源。',
        icon: 'Coffee'
      },
      {
        id: 'romance',
        label: '恋爱流',
        badge: '奇缘相随',
        flavor: '在看似不起眼的日常偶遇中，与误入凡尘的落难皇女、神女或巨龙结下生死相许的纯真情缘。',
        icon: 'Heart'
      }
    ]
  }
};
