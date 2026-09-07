import {
  EndingStory,
  PersonalityArchetypeId,
  StatRadar,
  TransmigrationId,
  CheatId,
  IdentityId,
  RaceId,
  BruteGoalId,
  GenreId,
  UserSelections,
  BystanderRoast
} from '../types';
import { getCombinationById } from './combinations';
import { HERO_CUSTOM_SCRIPTS, ScenarioScript } from './customScriptsHero';
import { DEMON_KING_CUSTOM_SCRIPTS } from './customScriptsDemon';
import { SAGE_CUSTOM_SCRIPTS } from './customScriptsSage';
import { SAINT_CUSTOM_SCRIPTS } from './customScriptsSaint';
import { getPeasantCustomScript } from './customScriptsPeasant';
import { synthesizeRichStory, generateEpicBruteStory } from './storyEngine';

// Human-readable labels
const TRANSMIGRATION_NAMES: Record<TransmigrationId, string> = {
  truck: '泥头车创飞',
  overwork: '熬夜猝死',
  circle: '强制召唤',
  god_apology: '神明赔罪'
};

const CHEAT_NAMES: Record<CheatId, string> = {
  immortality: '无尽寿命',
  defense: '绝对防御',
  infinite_growth: '无限成长',
  omniscience: '无穷智慧',
  brute_force: '纯粹劲大'
};

const IDENTITY_NAMES: Record<IdentityId, string> = {
  hero: '勇者',
  demon_king: '魔王',
  sage: '贤者',
  saint: '圣女',
  peasant: '平民/其他'
};

const RACE_NAMES: Record<RaceId, string> = {
  human: '人类',
  elf: '精灵',
  monster: '魔物',
  non_living: '非生物'
};

const BRUTE_GOAL_NAMES: Record<BruteGoalId, string> = {
  ordinary: '平凡归隐',
  industrial: '工业革命',
  return_home: '碎空回家',
  defeat_demon_king: '极速灭魔',
  destroy_all: '全员核平'
};

const GENRE_NAMES: Record<GenreId, string> = {
  retired: '退队流',
  revenge: '复仇流',
  level_up: '练级流',
  flex: '装逼流',
  daily: '日常流',
  romance: '恋爱流'
};

// Category mapping
const IDENTITY_CATEGORY_MAP: Record<IdentityId, EndingStory['category']> = {
  hero: '勇者篇',
  demon_king: '魔王篇',
  sage: '贤者篇',
  saint: '圣女篇',
  peasant: '平民篇'
};

/**
 * Resolves the exact unique ending based on user's choices.
 * Fully deterministic, highly expressive, distinct for every single variable change.
 */
export function resolveEnding(selections: UserSelections): EndingStory {
  const trans = selections.transmigration || 'truck';
  const cheat = selections.cheat || 'defense';

  // Branch 1: Brute Force (劲大流)
  if (cheat === 'brute_force') {
    const goal = selections.bruteGoal || 'ordinary';
    return generateBruteStory(trans, goal);
  }

  // Branch 2: Standard path (including Race for Peasant/Other)
  const identity = selections.identity || 'hero';
  const genre = selections.genre || 'retired';
  const race = identity === 'peasant' ? selections.race || 'human' : undefined;

  return generateStandardStory(trans, cheat, identity, genre, race);
}

// -------------------------------------------------------------
// BYSTANDER ROAST & WITNESS GENERATOR (局外人吐槽 / 旁观者证言)
// -------------------------------------------------------------
function generateBystanderRoast(
  identity: IdentityId | 'brute',
  genreOrGoal: GenreId | BruteGoalId,
  cheat: CheatId,
  race?: RaceId
): BystanderRoast {
  if (identity === 'brute') {
    switch (genreOrGoal) {
      case 'ordinary':
        return {
          witness: '被一拳轰飞800里的皇家先遣队长',
          comment: '“我就不小心踩坏了他院子里的半根大葱，他随手隔空一挥拳，我和我的战马像流星一样横跨了三个公国……现在全军严令把他的菜地列为绝对禁忌神域！”',
          tag: '流星体验者证言'
        };
      case 'industrial':
        return {
          witness: '帝国皇家首席大炼金术士',
          comment: '“我们还在辛辛苦苦背诵三千行古老炼金咒，他一拳砸在铁砧上，当场手搓出了一套万匹马力的蒸汽机组……神明在上，这根本不是魔法，这是工业霸权暴力拆迁！”',
          tag: '炼金师信仰崩塌'
        };
      case 'return_home':
        return {
          witness: '负责召唤勇者的王都大主教',
          comment: '“拯救世界的入职演讲稿我才刚念了第一段，他一拳把空间晶壁砸了个两米大窟窿，提着两斤烤肉跨回自家卧室看番去了……留下我们全殿王公大臣在风中凌乱！”',
          tag: '现场全员凌乱'
        };
      case 'defeat_demon_king':
        return {
          witness: '当场滑跪的原魔王军首席军师',
          comment: '“第一天！他出门第一天隔着八百里挥了一拳，我们魔王城当场变成了巨型盆地！魔王陛下甚至还没从床上睡醒！这冒险游戏到底谁在玩啊？！”',
          tag: '初日全剧终现场'
        };
      case 'destroy_all':
      default:
        return {
          witness: '孤岛上的宇宙法则观察者',
          comment: '“他嫌这个世界太虚伪复杂，直接一巴掌按在大陆架上把整个旧世界物理重启了……现在大家都在海边吃烤鱼，世界居然破天荒地和平了……”',
          tag: '物理重启目击'
        };
    }
  }

  // Standard identities
  if (identity === 'hero') {
    switch (genreOrGoal) {
      case 'level_up':
        return {
          witness: '被带躺的挂件见习刺客',
          comment: '“队长管这叫闭关练级？！他随手丢块小石子把九阶灭世骨龙脑袋砸碎了！我们几个挂件全程连刀都没拔出来，光在后头捡掉落物就躺着升到了99级满阶，我现在严重怀疑人生……”',
          tag: '混子队友怀疑人生'
        };
      case 'flex':
        return {
          witness: '帝国神殿近卫骑士长',
          comment: '“那位大人一身破旧兜帽，仅仅漫不经心伸出一指，漫天魔灾化为灰烬！队长刚才那声哈欠，分明是在用神性剑意震慑深渊！真不愧是至高无双大人！”',
          tag: '全员迪化现场'
        };
      case 'retired':
        return {
          witness: '后悔痛哭的前勇者小队队长',
          comment: '“我们当初真是瞎了狗眼才把他踢出队伍！谁能想到他是全大陆唯一的经济巨鳄和结界天花板啊？！现在我们被魔物追杀到他庄园门口，跪了三天他都不肯开门！”',
          tag: '前队友痛哭求饶'
        };
      case 'revenge':
        return {
          witness: '双腿发软的帝国特使',
          comment: '“疯子！他根本不是人类！整个神殿的三百道神圣结界在他面前脆得像层窗户纸，他当着大主教的面徒手捏碎圣剑的时候，眼神冰冷得像深渊！”',
          tag: '特使吓破胆'
        };
      case 'daily':
        return {
          witness: '在林子里潜伏了三天的魔王军探子',
          comment: '“本以为他是全大陆最可怕的救世主怪物，结果我趴窗户上看了一整天，他除了钓鱼、烤面包、揉猫肚子，啥正经事都没干！看得我都想跳槽来给他当厨子了！”',
          tag: '探子馋哭想跳槽'
        };
      case 'romance':
        return {
          witness: '路过被喂了一嘴狗粮的魔物小队长',
          comment: '“你们两个神级死敌天天在花田里脸红牵手喂对方吃草莓……整片森林的魔兽都快被你们俩的恋爱酸臭味熏得连夜搬家了！”',
          tag: '路过魔兽饱食狗粮'
        };
    }
  }

  if (identity === 'demon_king') {
    switch (genreOrGoal) {
      case 'level_up':
        return {
          witness: '魔王城看门骷髅小兵',
          comment: '“陛下说要闭关冲级，硬拉着我进深渊当靶子。结果他随手一挥袖把深渊领主秒了，逸散的经验光环把我一个看大门的硬生生灌顶成了十阶不死天尊！我现在给陛下端茶手都在抖……”',
          tag: '看门小兵被迫成神'
        };
      case 'flex':
        return {
          witness: '深渊前线第一军团统帅',
          comment: '“陛下昨天翻书叹了口气，我们参谋部通宵破解出七十二道灭世战略，今早连夜把人类三大帝国的投降书呈到了床头！陛下却只是问我们早饭吃什么，深不可测，太深不可测了！”',
          tag: '全自动脑补迪化'
        };
      case 'retired':
        return {
          witness: '人类王都圣骑士团巡逻队长',
          comment: '“全大陆都在搜寻失踪的魔王，谁能想到他在王都东街开面包店？！而且他烤的熔岩流心可颂好吃到我们圣骑士团每天早上都得偷偷翻墙去排队抢购！”',
          tag: '圣骑士通宵排队'
        };
      case 'revenge':
        return {
          witness: '神殿审判所幸存神官',
          comment: '“数千年的偏见与虚伪神权，在他一记挥手间彻底化为火海……站在焦土上的那一刻，他甚至连皇冠都懒得戴，只留下一句‘无聊的闹剧’便转身离去。”',
          tag: '神权覆灭纪实'
        };
      case 'daily':
        return {
          witness: '勇者小队先锋狂战士',
          comment: '“我们千辛万苦杀进魔王城，魔王居然端着一盘刚炸好的薯条和冰镇可乐问我们‘加不加番茄酱’，旁边还有42度恒温温泉……我们当场把大剑扔了跳进去泡澡了！”',
          tag: '勇者沉迷温泉'
        };
      case 'romance':
        return {
          witness: '深渊十二魔将全体成员',
          comment: '“那个天天扬言要讨伐陛下的纯情勇者，今天又红着脸给陛下送手作便当了……陛下嘴上说‘恶心’，结果一个人在寝宫里全吃光了！求求你们快点结婚吧！”',
          tag: '魔将集体催婚'
        };
    }
  }

  if (identity === 'sage') {
    switch (genreOrGoal) {
      case 'level_up':
        return {
          witness: '快要被神器压垮的背包客学徒',
          comment: '“导师说带我体验一下‘基础魔法研习’。结果遇到禁地九阶风暴，导师嫌风太大吹乱了头发随手一挥，风暴没了，整张地图的经验直接灌顶。我现在背包里全是不知名神级法杖，背都背不动了！”',
          tag: '学徒被神器压垮'
        };
      case 'flex':
        return {
          witness: '帝国皇家魔法学院院长',
          comment: '“那张被他随手扔在桌上垫茶杯的废纸……上面写的分明是打破神明位面禁锢的因果算式啊！我们全院元老已经在他家门前跪了整整三天了，只求见一眼祖师！”',
          tag: '学阀集体给跪'
        };
      case 'retired':
        return {
          witness: '前来请教的公会高级会长',
          comment: '“我们带了三箱金砖想向这位传说中的大贤者求教破局之法，结果老人家在后院优哉游哉地用火球术烤红薯，还顺便递给我一个问我‘甜不甜’……大道至简，莫过于此！”',
          tag: '会长顿悟人生'
        };
      case 'revenge':
        return {
          witness: '被查封的帝国贵族议员',
          comment: '“没有流一滴血，甚至连一根手指都没动！他仅仅用几个经济学模型和真理矩阵，就把我们经营了三百年的家族财阀彻底算计到破产充公……这才是最恐怖的算无遗策！”',
          tag: '降维打击受害者'
        };
      case 'daily':
        return {
          witness: '巷口杂货铺老板娘',
          comment: '“他每天下午三点准时来买一袋红茶和两块粗麦饼，坐在窗边看猫抓蝴蝶看两个小时。街坊邻居都以为他是个穷书生，谁知道他是随手能重写天地法则的神人啊！”',
          tag: '邻里日常惊叹'
        };
      case 'romance':
        return {
          witness: '图书馆管理员老爷爷',
          comment: '“两个人明明IQ加起来超过五百，一见到对方却结巴得像两个三岁小孩，连借同一本书都能脸红对视半个钟头……老头子我都替他们着急！”',
          tag: '高智商纯爱笨蛋'
        };
    }
  }

  if (identity === 'saint') {
    switch (genreOrGoal) {
      case 'level_up':
        return {
          witness: '同行见习小修士',
          comment: '“圣女殿下说带我们去后山‘温和采药’。结果遇到上古凶兽，殿下嫌它踩脏了泥巴路，一道随手弹出的治愈微光直接把凶兽原地超度飞升了！海量神光当场让我们全队连升三阶！这叫采药？！”',
          tag: '见习修士三观震裂'
        };
      case 'flex':
        return {
          witness: '王都主教堂红衣大主教',
          comment: '“殿下不过是随口哼了两句调子，九天之上祥云汇聚化作七彩神霖，枯萎荒原刹那变圣境！这不是普通圣女，这分明是创世母神降临凡间微服私访啊！万民快快叩拜！”',
          tag: '主教狂热磕头'
        };
      case 'retired':
        return {
          witness: '边境小酒馆常客雇佣兵',
          comment: '“我们酒馆那个系着碎花围裙、笑起来特别温柔的端茶姑娘，今天随手把一个闹事的八阶狂暴剑圣单手按进了地板里……从此没人敢在酒馆大声说话！”',
          tag: '酒馆无人敢惹'
        };
      case 'revenge':
        return {
          witness: '教皇近卫骑士团溃兵',
          comment: '“当她从圣坛上拔出缠绕黑炎的审判之剑时，全殿的神像都开始流下血泪……她只说了一句‘伪善的祈祷到此为止’，三千名高层神职人员的贪婪灵魂当场被净化涤荡！”',
          tag: '神圣清算目击'
        };
      case 'daily':
        return {
          witness: '修道院后院的菜农大叔',
          comment: '“圣女天天用能逆转生死的大神术给院子里的番茄和黄瓜催熟，现在我们院子里的一根黄瓜拿出去能卖三千金币，邻国的国王天天派特使来求购！”',
          tag: '天价蔬菜传奇'
        };
      case 'romance':
        return {
          witness: '追捕圣女的黑骑士队长',
          comment: '“本以为暗影杀手会辣手摧花，结果我们追上去一看，那个杀伐果断的刺客正蹲在地上手忙脚乱地给圣女揉脚踝，满脸通红……我们全队原地立正，默默收队了。”',
          tag: '追捕部队自觉撤退'
        };
    }
  }

  // Peasant / Other
  if (identity === 'peasant') {
    switch (genreOrGoal) {
      case 'level_up':
        return {
          witness: '白金级冒险者公会前台招待员',
          comment: '“这帮平民刚来登记的时候连皮甲都穿不起，天天一起摸爬滚打、互相挡刀。结果今天全员穿着自制九阶极品战甲回来交任务，顺手把公会最高悬赏的远古魔龙徽记拍在桌上……我们会长当时眼珠子差点掉在地上！”',
          tag: '泥腿子小队逆袭'
        };
      case 'flex':
        return {
          witness: '路过的S级公会会长',
          comment: '“我亲眼看到那个在村口看门的大叔，弹飞一枚瓜子壳把九阶深渊暴君爆头了……我现在已经郑重向公会总部打报告，申请转职调到新手村当巡逻保安！”',
          tag: 'S级会长申请当保安'
        };
      case 'retired':
        return {
          witness: '不可一世的前任勇者小队',
          comment: '“我们当初嫌弃他是队里没用的平民才把他踢掉的……谁能想到他是整片大陆粮食、魔药乃至帝国银行的幕后大老板？！我们现在连他家庄园大门都进不去，悔不当初啊！”',
          tag: '前勇者破防痛哭'
        };
      case 'revenge':
        return {
          witness: '瑟瑟发抖的帝国贵族监察官',
          comment: '“疯了！整个公爵府的三百道重装魔法阵，被一个平民用一根烧火棍连根挑飞！公爵大人跪在废墟上求饶的时候，那个平民甚至还在拍身上的灰尘！”',
          tag: '贵族老爷跪地求饶'
        };
      case 'daily':
        return {
          witness: '路过的商队行脚商人',
          comment: '“那个在深山林子里种田酿酒的平民，随手送我喝的一口自酿果酒，居然把我多年的陈年旧伤全部治愈了！现在全大陆的富商都在满世界打听他的小木屋在哪！”',
          tag: '神仙果酒传闻'
        };
      case 'romance':
        return {
          witness: '前来寻访皇女的帝国禁卫军',
          comment: '“我们高贵冷艳的皇女殿下，正穿着农妇粗布裙，欢天喜地地给那个平民少年端酸梅汤，还一边害羞地往人家怀里钻……陛下要是知道了，天都要塌了！”',
          tag: '禁卫军天塌了'
        };
    }
  }

  return {
    witness: '路过的大陆游历吟游诗人',
    comment: '“无论在大陆的哪一个酒馆，只要提起那位大人的传说，所有醉汉都会肃然起敬并为他点上一杯麦酒！”',
    tag: '传奇流传四海'
  };
}

// -------------------------------------------------------------
// BRUTE FORCE STORY GENERATOR (20 unique combinations)
// -------------------------------------------------------------
function generateBruteStory(trans: TransmigrationId, goal: BruteGoalId): EndingStory {
  const id = `${trans}_brute_${goal}`;
  const routeKey = `${TRANSMIGRATION_NAMES[trans]} × 纯粹劲大 × ${BRUTE_GOAL_NAMES[goal]}`;

  const epicBrute = generateEpicBruteStory(trans, goal);
  const title = epicBrute.title;
  const jpSubtitle = epicBrute.jpSubtitle;
  const storyText = epicBrute.storyText;
  const epilogueQuote = epicBrute.epilogueQuote;

  let archetypeId: PersonalityArchetypeId = 'berserk_engine';
  let tags: string[] = ['纯物理蛮力', '一拳超人'];
  const bystanderRoast = generateBystanderRoast('brute', goal, 'brute_force');
  const stats: StatRadar = {
    power: 100,
    chill: 50,
    sanity: 60,
    rebellion: 70,
    romance: 10,
    wisdom: 30
  };

  switch (goal) {
    case 'ordinary':
      archetypeId = 'slacker_sage';
      tags = ['种田归隐', '一拳清场', '低欲望战神'];
      stats.chill = 95;
      stats.sanity = 85;
      stats.rebellion = 40;
      stats.wisdom = 50;
      break;

    case 'industrial':
      archetypeId = 'order_architect';
      tags = ['工业朋克', '大力出奇迹', '降维重构'];
      stats.chill = 20;
      stats.sanity = 80;
      stats.rebellion = 60;
      stats.wisdom = 90;
      break;

    case 'return_home':
      archetypeId = 'lone_wolf';
      tags = ['碎空回归', '反套路', '终极独立'];
      stats.chill = 70;
      stats.sanity = 90;
      stats.rebellion = 85;
      stats.wisdom = 65;
      break;

    case 'defeat_demon_king':
      archetypeId = 'chaotic_jester';
      tags = ['一拳通关', '速通达人', '降维打击'];
      stats.chill = 80;
      stats.sanity = 75;
      stats.rebellion = 55;
      stats.wisdom = 40;
      break;

    case 'destroy_all':
      archetypeId = 'dark_realist';
      tags = ['掀桌疯批', '毁灭旧秩序', '极致反骨'];
      stats.chill = 10;
      stats.sanity = 20;
      stats.rebellion = 100;
      stats.wisdom = 40;
      break;
  }

  return {
    id,
    number: calculateNumberHash(id),
    title,
    jpSubtitle,
    category: '劲大流',
    archetypeId,
    routeKey,
    transmigration: trans,
    cheat: 'brute_force',
    bruteGoal: goal,
    tags,
    storyText,
    epilogueQuote,
    bystanderRoast,
    stats
  };
}

// -------------------------------------------------------------
// STANDARD STORY GENERATOR (400+ unique combinations)
// -------------------------------------------------------------
function generateStandardStory(
  trans: TransmigrationId,
  cheat: CheatId,
  identity: IdentityId,
  genre: GenreId,
  race?: RaceId
): EndingStory {
  const id = identity === 'peasant' && race
    ? `${trans}_${cheat}_${identity}_${race}_${genre}`
    : `${trans}_${cheat}_${identity}_${genre}`;
  const transName = TRANSMIGRATION_NAMES[trans];
  const cheatName = CHEAT_NAMES[cheat];
  const identityName = identity === 'peasant' && race
    ? `${IDENTITY_NAMES[identity]}(${RACE_NAMES[race]})`
    : IDENTITY_NAMES[identity];
  const genreName = GENRE_NAMES[genre];
  const routeKey = `${transName} × ${cheatName} × ${identityName} × ${genreName}`;

  // Check if a dedicated custom script exists
  let customScript: ScenarioScript | null = null;
  const scriptKey = `${cheat === 'defense' ? 'absolute_defense' : cheat === 'immortality' ? 'infinite_lifespan' : cheat}_${genre}`;

  if (identity === 'hero') {
    customScript = HERO_CUSTOM_SCRIPTS[scriptKey] || null;
  } else if (identity === 'demon_king') {
    customScript = DEMON_KING_CUSTOM_SCRIPTS[scriptKey] || null;
  } else if (identity === 'sage') {
    customScript = SAGE_CUSTOM_SCRIPTS[scriptKey] || null;
  } else if (identity === 'saint') {
    customScript = SAINT_CUSTOM_SCRIPTS[scriptKey] || null;
  } else if (identity === 'peasant') {
    const peasantCheat = cheat === 'defense' ? 'absolute_defense' : cheat === 'immortality' ? 'infinite_lifespan' : cheat;
    customScript = getPeasantCustomScript(race || 'human', peasantCheat, genre, false);
  }

  // 1. Determine Archetype
  const archetypeId = deriveArchetype(trans, cheat, identity, genre, race);

  // 2. Generate Title & Subtitle tailored to all 4/5 variables
  const synthTitle = synthesizeTitle(trans, cheat, identity, genre, race);
  const title = customScript ? customScript.title : synthTitle.title;
  const jpSubtitle = customScript ? customScript.jpSubtitle : synthTitle.jpSubtitle;

  // 3. Generate 3-Act bespoke rich story text (450+ chars, multi-act, full choice context)
  const richStory = synthesizeRichStory(trans, cheat, identity, genre, race);
  const storyText = richStory.storyText;
  const epilogueQuote = richStory.epilogueQuote;

  // 5. Generate tags
  const tags = synthesizeTags(trans, cheat, identity, genre, race);

  // 6. Generate 6-axis Radar Stats
  const stats = synthesizeStats(trans, cheat, identity, genre);

  // 7. Generate Bystander Roast
  const bystanderRoast = customScript ? customScript.bystanderRoast : generateBystanderRoast(identity, genre, cheat, race);

  return {
    id,
    number: calculateNumberHash(id),
    title,
    jpSubtitle,
    category: IDENTITY_CATEGORY_MAP[identity],
    archetypeId,
    routeKey,
    transmigration: trans,
    cheat,
    identity,
    race,
    genre,
    tags,
    storyText,
    epilogueQuote,
    bystanderRoast,
    stats
  };
}

/**
 * Maps choices to one of the 16 Archetypes psychologically
 */
function deriveArchetype(
  trans: TransmigrationId,
  cheat: CheatId,
  identity: IdentityId,
  genre: GenreId,
  race?: RaceId
): PersonalityArchetypeId {
  // Flex genre (装逼流) leads to detached strategist, cult mentor, lone wolf, chaotic jester, or slacker sage
  if (genre === 'flex') {
    if (cheat === 'omniscience') return 'detached_strategist';
    if (identity === 'demon_king') return 'cult_mentor';
    if (identity === 'hero') return 'lone_wolf';
    if (identity === 'peasant' || trans === 'overwork') return 'chaotic_jester';
    return 'slacker_sage';
  }

  // Romance leads to romantic / tsundere profiles
  if (genre === 'romance') {
    if (identity === 'demon_king' || identity === 'sage') return 'tsundere_guardian';
    if (trans === 'circle' && identity === 'peasant') return 'social_butterfly';
    return 'pure_lover';
  }

  // Revenge leads to dark realist, berserk engine, or cult mentor
  if (genre === 'revenge') {
    if (cheat === 'omniscience') return 'cult_mentor';
    if (cheat === 'infinite_growth' && trans === 'truck') return 'berserk_engine';
    if (identity === 'saint') return 'saint_martyr';
    return 'dark_realist';
  }

  // Daily leads to slacker, nihilist, or social butterfly
  if (genre === 'daily') {
    if (cheat === 'immortality' && (identity === 'sage' || trans === 'overwork')) return 'nihilist_drifter';
    if (trans === 'god_apology' || identity === 'peasant') return 'social_butterfly';
    if (trans === 'overwork') return 'destiny_procrastinator';
    return 'slacker_sage';
  }

  // Retired leads to lone wolf, opportunist, or slacker
  if (genre === 'retired') {
    if (trans === 'god_apology' || cheat === 'immortality') return 'opportunist_trader';
    if (identity === 'saint') return 'saint_martyr';
    if (identity === 'hero') return 'lone_wolf';
    return 'slacker_sage';
  }

  // Level-up leads to order architect, tragic savior, or cult mentor
  if (genre === 'level_up') {
    if (identity === 'hero' && trans === 'truck') return 'tragic_savior';
    if (cheat === 'omniscience' || identity === 'sage') return 'cult_mentor';
    if (cheat === 'defense') return 'detached_strategist';
    return 'order_architect';
  }

  return 'slacker_sage';
}

/**
 * Synthesizes high-craft light novel titles matching the exact combination
 */
function synthesizeTitle(
  trans: TransmigrationId,
  cheat: CheatId,
  identity: IdentityId,
  genre: GenreId,
  race?: RaceId
): { title: string; jpSubtitle: string } {
  // Trans context fragments
  const transLead = {
    truck: '救人被泥头车创飞后',
    overwork: '前世加班猝死换地图的我',
    circle: '被魔法阵强行绑架召唤后',
    god_apology: '狠狠敲诈手滑神明一笔后'
  }[trans];

  // Cheat fragments
  const cheatLead = {
    immortality: '拥有无尽寿命',
    defense: '全点绝对防御站桩反伤',
    infinite_growth: '数值呼吸都在暴涨翻倍',
    omniscience: '手握全知剧透剧本'
  }[cheat];

  // Identity & Genre combinations
  if (identity === 'hero') {
    switch (genre) {
      case 'flex':
        return {
          title: `《${transLead}的至高满级勇者：为了不打破世界平衡，我只能在暗中碾压一切魔灾！》`,
          jpSubtitle: '影より出でて神仏を屠る、絶対的強者の愉悦なる暗躍'
        };
      case 'retired':
        return {
          title: `《${transLead}成为勇者却遭退队？无所谓，${cheatLead}的我早已成了全大陆供奉的至尊真神》`,
          jpSubtitle: '追放された勇者の逆転劇、規格外のチートで帝国を圧倒する'
        };
      case 'revenge':
        return {
          title: `《${transLead}转生勇者惨遭王国背叛：${cheatLead}的我，在圣殿凯旋门前亲手捏碎了伪神王座》`,
          jpSubtitle: '裏切りの果てに覚醒せし黒の勇者、神殿を焼き尽くす復讐の焔'
        };
      case 'level_up':
        return {
          title: `《${transLead}觉醒天命勇者：带三个笨蛋挂件队友练级，${cheatLead}的我随手砸碎了九阶灭世骨龙》`,
          jpSubtitle: 'ポンコツ仲間を率いるチート勇者、片手間でドラゴンの群れを粉砕育成する'
        };
      case 'daily':
        return {
          title: `《${transLead}当上勇者却全职摸鱼：靠着${cheatLead}，我和宠物史莱姆在温泉乡打卡休长假》`,
          jpSubtitle: '世界を救うのは明日でいい、温泉とチートで満喫する異世界スローライフ'
        };
      case 'romance':
        return {
          title: `《${transLead}的天命勇者竟与宿敌坠入爱河：${cheatLead}的我，直接把魔王娶回了老家！》`,
          jpSubtitle: '討伐対象は運命の伴侶、世界を揺るがす禁断の純愛物語'
        };
    }
  }

  if (identity === 'demon_king') {
    switch (genre) {
      case 'flex':
        return {
          title: `《${transLead}成为深渊魔王：属下天天疯狂脑补迪化，我随手喝口水他们都觉得我在布千古大局！》`,
          jpSubtitle: 'ただお茶を飲んだだけなのに、配下が勝手に深読みして世界征服が始まった件'
        };
      case 'retired':
        return {
          title: `《${transLead}成为深渊魔王却光速退休：${cheatLead}的我，在人类边境开了家爆火的甜品面包房》`,
          jpSubtitle: '魔王引退してパン屋を開く、元勇者たちが毎日並ぶ伝説の名店'
        };
      case 'revenge':
        return {
          title: `《${transLead}降临魔王王座：目睹人类神殿伪善血祭，${cheatLead}率万魔天灾血洗圣域！》`,
          jpSubtitle: '深淵の覇者による粛清の夜、偽りの神々に叩きつける天変地異'
        };
      case 'level_up':
        return {
          title: `《${transLead}成为魔王带小弟升级：靠着${cheatLead}，硬把看门小骷髅培养成了十阶不死天尊！》`,
          jpSubtitle: '雑魚兵を神魔に育て上げる魔王様、配下育成が楽しすぎて世界征服を忘れる'
        };
      case 'daily':
        return {
          title: `《${transLead}的死宅魔王日常：凭借${cheatLead}把魔王城堡改造成五星级水疗避风港》`,
          jpSubtitle: '攻めてくる勇者を温泉でもてなす、魔王城の超快適引きこもり生活'
        };
      case 'romance':
        return {
          title: `《${transLead}的傲娇大魔王：${cheatLead}的我一眼看穿前来讨伐的勇者，原来早已暗恋我多年？！》`,
          jpSubtitle: '討伐に来たはずの聖剣使いがデレデレ、相愛相殺の甘酸っぱい攻防戦'
        };
    }
  }

  if (identity === 'sage') {
    switch (genre) {
      case 'flex':
        return {
          title: `《${transLead}的大陆真理学者：随手涂鸦的演算草稿，让全帝国皇家魔导师当场集体跪地叫祖师！》`,
          jpSubtitle: '凡人のふりした超越者、走り書きの数式で世界の常識を粉砕する'
        };
      case 'retired':
        return {
          title: `《${transLead}厌倦宫廷内耗的首席贤者：带着${cheatLead}辞职隐居，每天研究古代泡茶全自动魔像》`,
          jpSubtitle: '宮廷魔術師を辞めた天才、森の奥で気ままに始めるお茶会研究'
        };
      case 'revenge':
        return {
          title: `《${transLead}成为被陷害的大贤者：依靠${cheatLead}看破底层因果，孤身引动天基禁咒肃清王都！》`,
          jpSubtitle: '叡智の復讐者が描く終末の数式、腐敗した貴族たちに落ちる天罰'
        };
      case 'level_up':
        return {
          title: `《${transLead}的大贤者带徒弟升级：${cheatLead}的我随手挥散九阶风暴，徒弟背包全被神级装备塞爆了！》`,
          jpSubtitle: '弟子育成が雑すぎる大賢者、経験値の雨で弟子たちが白目を剥く'
        };
      case 'daily':
        return {
          title: `《${transLead}的大陆第一贤者：靠着${cheatLead}在学院后街开杂货铺，每天教猫咪飞天喝下午茶》`,
          jpSubtitle: '魔法アカデミーの裏路地にて、規格外の賢者が営むのんびり雑貨屋'
        };
      case 'romance':
        return {
          title: `《${transLead}的高冷贤者也有心动时刻：${cheatLead}的我，在真理尽头与命中注定的契约精灵相伴一生》`,
          jpSubtitle: '悠久の時を越えて結ばれた絆、叡智の果てに見つけた生涯の恋'
        };
    }
  }

  if (identity === 'saint') {
    switch (genre) {
      case 'flex':
        return {
          title: `《${transLead}的降临圣女：我只是随手打了个喷嚏，教廷狂热信徒全员激动跪拜高呼神迹降世！》`,
          jpSubtitle: '息を吸うだけで奇跡を起こす、無自覚なる至高のカリスマ聖女'
        };
      case 'retired':
        return {
          title: `《${transLead}成为被神殿剥削的圣女：撕破伪善面具主动退队，${cheatLead}的我逍遥快活去周游四海》`,
          jpSubtitle: '聖女の重責を投げ捨てて自由の旅へ、救済の力は自分のために使う'
        };
      case 'revenge':
        return {
          title: `《${transLead}的黑化圣女狂想曲：受够了道德绑架，${cheatLead}在神坛之上降下洗净罪恶的审判雷霆》`,
          jpSubtitle: '聖光が漆黒に染まる時、偽善の信徒どもを裁く断罪のレクイエム'
        };
      case 'level_up':
        return {
          title: `《${transLead}的圣女带骑士团练级：说好只在后排温和加血，${cheatLead}的我手滑把前线小怪全净化升天了！》`,
          jpSubtitle: 'ヒーラーのはずなのに前線が消滅、護衛騎士団が仕事を見失う件'
        };
      case 'daily':
        return {
          title: `《${transLead}的摸鱼圣女指南：用${cheatLead}给教堂温室种草药，顺便养了一群胖嘟嘟的圣光小肥啾》`,
          jpSubtitle: '奇跡の聖光でハーブを育てる、教会の庭でのほほん癒やし生活'
        };
      case 'romance':
        return {
          title: `《${transLead}的清纯圣女逃婚记：${cheatLead}的我，竟在暗巷拯救并倒追了负伤的叛逆魔王？！》`,
          jpSubtitle: '聖女の誓いを破りし禁忌の愛、闇の王と共に世界の果てへ'
        };
    }
  }

  // Peasant / Other (incorporating Race)
  const raceLabel = race ? {
    human: '平民百姓',
    elf: '隐世精灵',
    monster: '野生魔物',
    non_living: '灵性造物'
  }[race] : '新手村平民';

  switch (genre) {
    case 'flex':
      return {
        title: `《${transLead}明明只是个${raceLabel}：随便暗中挥了挥木枝，各路S级冒险者和魔王当场吓到给跪！》`,
        jpSubtitle: 'モブの仮面を被った規格外の怪物、一撃で大陸の均衡を崩壊させる'
      };
    case 'retired':
      return {
        title: `《${transLead}本是${raceLabel}：原勇者队伍看走眼嫌弃我？无所谓，${cheatLead}的我早已是世界幕后操盘手》`,
        jpSubtitle: '村人Aと侮るなかれ、圧倒的チートで世界の経済を裏から支配する'
      };
    case 'revenge':
      return {
        title: `《${transLead}身为${raceLabel}的反击战：贵族以为踩死一只蝼蚁？${cheatLead}的我孤身踏平公爵府清算宿怨！》`,
        jpSubtitle: '踏みにじられた平民の叛逆、一握のチートで特権階級を打倒する'
      };
    case 'level_up':
      return {
        title: `《${transLead}身为${raceLabel}带泥腿子小队练级：手把手教伙伴搬砖刷怪，不小心全员混成了白金级大佬！》`,
        jpSubtitle: '最弱の村人パーティーが泥臭く進化、気づけば大陸最強ギルドへ'
      };
    case 'daily':
      return {
        title: `《${transLead}身为${raceLabel}的自在小日子：靠着${cheatLead}，在林中木屋做美食、酿果酒、看云卷云舒》`,
        jpSubtitle: '英雄になんてならなくていい、最高に贅沢なスローライフ万歳'
      };
    case 'romance':
      return {
        title: `《${transLead}平平无奇的${raceLabel}：${cheatLead}救下落难的异国皇女，开启羡煞全大陆的甜蜜浪漫日常》`,
        jpSubtitle: '畑で拾った美少女は帝国皇女様、のどかな村で育む純情ロマンス'
      };
  }
}

/**
 * Synthesizes a rich 3-act narrative reflecting all selections
 */
function synthesizeStoryText(
  trans: TransmigrationId,
  cheat: CheatId,
  identity: IdentityId,
  genre: GenreId,
  race?: RaceId
): string {
  return synthesizeRichStory(trans, cheat, identity, genre, race).storyText;
}

function synthesizeQuote(cheat: CheatId, identity: IdentityId, genre: GenreId): string {
  if (genre === 'flex') {
    return '“我不过略微出手，怎么你们一个个就都跪在地上不敢抬头了？”';
  }
  if (genre === 'romance') {
    return '“世界或许很大很喧嚣，但能握住你的手，我就拥有了对抗整个宇宙的勇气。”';
  }
  if (genre === 'revenge') {
    return '“既然你们口口声声讲规则，那我今天就用你们听得懂的拳头，教你们什么叫因果报应。”';
  }
  if (genre === 'daily') {
    return '“只要把欲望降到最低，这世上就没有任何KPI能击穿我的防御心墙。”';
  }
  if (genre === 'retired') {
    return '“退队保平安，退群得永生。你们继续为了虚名内卷，我先去享受退休人生了。”';
  }
  if (genre === 'level_up') {
    if (identity === 'hero') {
      return '“本来自己满级就挺无聊的，顺手带几个笨蛋队友练级，怎么全员都把我当神仙供起来了？”';
    }
    if (identity === 'demon_king') {
      return '“带领手下一起进化才叫王道。你看，当初那个看大门的小骷髅，现在连神明见了都要叫前辈。”';
    }
    if (identity === 'sage') {
      return '“我只是稍微教了他们两句基础真理，谁知道他们全员把背包里的神级装备当白菜捡。”';
    }
    if (identity === 'saint') {
      return '“说好我只在后排温和奶一口，手滑把怪物全净化升天、队友当场升阶，真的只是意外事故！”';
    }
    return '“没有谁天生就是天花板，我们泥腿子抱团练级，靠的就是一手毫无保留的彼此托付！”';
  }
  return '“命运将我带向异界，而我用自己的意志，把它雕刻成了最惬意的模样。”';
}

function synthesizeTags(
  trans: TransmigrationId,
  cheat: CheatId,
  identity: IdentityId,
  genre: GenreId,
  race?: RaceId
): string[] {
  const tTags: Record<TransmigrationId, string> = {
    truck: '救世转生',
    overwork: '社畜狂喜',
    circle: '打破召唤',
    god_apology: '敲诈开局'
  };

  const cTags: Record<CheatId, string> = {
    immortality: '时间领主',
    defense: '绝对防御',
    infinite_growth: '数值怪胎',
    omniscience: '全知剧透',
    brute_force: '纯度至高'
  };

  const gTags: Record<GenreId, string> = {
    retired: '逆风翻盘',
    revenge: '黑化爽文',
    level_up: '闭关成神',
    flex: '暗中碾压',
    daily: '治愈慢调',
    romance: '纯爱发糖'
  };

  const tags = [tTags[trans], cTags[cheat], IDENTITY_NAMES[identity], gTags[genre]];
  if (identity === 'peasant' && race) {
    tags.push(RACE_NAMES[race]);
  }
  return tags;
}

function synthesizeStats(
  trans: TransmigrationId,
  cheat: CheatId,
  identity: IdentityId,
  genre: GenreId
): StatRadar {
  const stats: StatRadar = {
    power: 50,
    chill: 50,
    sanity: 50,
    rebellion: 50,
    romance: 20,
    wisdom: 50
  };

  // Trans adjustments
  if (trans === 'overwork') {
    stats.chill += 20;
    stats.sanity += 15;
  } else if (trans === 'god_apology') {
    stats.wisdom += 15;
    stats.rebellion += 15;
  } else if (trans === 'truck') {
    stats.power += 15;
  }

  // Cheat adjustments
  if (cheat === 'immortality') {
    stats.chill += 25;
    stats.sanity += 20;
    stats.wisdom += 15;
  } else if (cheat === 'defense') {
    stats.sanity += 30;
    stats.power += 10;
  } else if (cheat === 'infinite_growth') {
    stats.power += 35;
    stats.rebellion += 15;
  } else if (cheat === 'omniscience') {
    stats.wisdom += 35;
    stats.sanity += 10;
  }

  // Identity adjustments
  if (identity === 'demon_king') {
    stats.rebellion += 20;
    stats.power += 15;
  } else if (identity === 'sage') {
    stats.wisdom += 20;
    stats.chill += 10;
  } else if (identity === 'saint') {
    stats.sanity += 15;
    stats.romance += 15;
  } else if (identity === 'peasant') {
    stats.chill += 25;
  } else if (identity === 'hero') {
    stats.power += 15;
  }

  // Genre adjustments
  if (genre === 'flex') {
    stats.power = Math.min(100, stats.power + 35);
    stats.chill = Math.min(100, stats.chill + 20);
    stats.wisdom = Math.min(100, stats.wisdom + 25);
    stats.rebellion = Math.min(100, stats.rebellion + 15);
  } else if (genre === 'daily') {
    stats.chill = Math.min(100, stats.chill + 30);
    stats.sanity = Math.min(100, stats.sanity + 20);
  } else if (genre === 'revenge') {
    stats.rebellion = Math.min(100, stats.rebellion + 40);
    stats.power = Math.min(100, stats.power + 20);
    stats.sanity = Math.max(10, stats.sanity - 25);
  } else if (genre === 'romance') {
    stats.romance = Math.min(100, 95);
    stats.chill = Math.min(100, stats.chill + 15);
  } else if (genre === 'level_up') {
    stats.power = Math.min(100, 95);
    stats.chill = Math.max(10, stats.chill - 20);
  } else if (genre === 'retired') {
    stats.chill = Math.min(100, stats.chill + 20);
    stats.wisdom = Math.min(100, stats.wisdom + 20);
  }

  // Clamp 10-100
  return {
    power: Math.max(10, Math.min(100, stats.power)),
    chill: Math.max(10, Math.min(100, stats.chill)),
    sanity: Math.max(10, Math.min(100, stats.sanity)),
    rebellion: Math.max(10, Math.min(100, stats.rebellion)),
    romance: Math.max(10, Math.min(100, stats.romance)),
    wisdom: Math.max(10, Math.min(100, stats.wisdom))
  };
}

/**
 * Deterministic hash for sequential number feeling
 */
function calculateNumberHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) & 0xfffff;
  }
  return (Math.abs(hash) % 420) + 1;
}

/**
 * Returns a rich representative catalog of milestone endings
 * spanning across all 16 archetypes and 6 chapters for the gallery explore section.
 */
export function getRepresentativeEndings(): EndingStory[] {
  const samplePaths: UserSelections[] = [
    // 劲大流 5 goals
    { transmigration: 'truck', cheat: 'brute_force', bruteGoal: 'ordinary' },
    { transmigration: 'overwork', cheat: 'brute_force', bruteGoal: 'industrial' },
    { transmigration: 'circle', cheat: 'brute_force', bruteGoal: 'return_home' },
    { transmigration: 'god_apology', cheat: 'brute_force', bruteGoal: 'defeat_demon_king' },
    { transmigration: 'truck', cheat: 'brute_force', bruteGoal: 'destroy_all' },

    // 勇者篇
    { transmigration: 'truck', cheat: 'omniscience', identity: 'hero', genre: 'flex' },
    { transmigration: 'truck', cheat: 'immortality', identity: 'hero', genre: 'retired' },
    { transmigration: 'circle', cheat: 'infinite_growth', identity: 'hero', genre: 'revenge' },
    { transmigration: 'overwork', cheat: 'defense', identity: 'hero', genre: 'daily' },
    { transmigration: 'god_apology', cheat: 'omniscience', identity: 'hero', genre: 'level_up' },
    { transmigration: 'truck', cheat: 'defense', identity: 'hero', genre: 'romance' },

    // 魔王篇
    { transmigration: 'circle', cheat: 'omniscience', identity: 'demon_king', genre: 'flex' },
    { transmigration: 'overwork', cheat: 'defense', identity: 'demon_king', genre: 'retired' },
    { transmigration: 'circle', cheat: 'infinite_growth', identity: 'demon_king', genre: 'revenge' },
    { transmigration: 'god_apology', cheat: 'immortality', identity: 'demon_king', genre: 'daily' },
    { transmigration: 'truck', cheat: 'omniscience', identity: 'demon_king', genre: 'romance' },
    { transmigration: 'overwork', cheat: 'infinite_growth', identity: 'demon_king', genre: 'level_up' },

    // 贤者篇
    { transmigration: 'god_apology', cheat: 'omniscience', identity: 'sage', genre: 'flex' },
    { transmigration: 'overwork', cheat: 'omniscience', identity: 'sage', genre: 'retired' },
    { transmigration: 'circle', cheat: 'infinite_growth', identity: 'sage', genre: 'revenge' },
    { transmigration: 'god_apology', cheat: 'immortality', identity: 'sage', genre: 'daily' },
    { transmigration: 'truck', cheat: 'omniscience', identity: 'sage', genre: 'level_up' },
    { transmigration: 'circle', cheat: 'defense', identity: 'sage', genre: 'romance' },

    // 圣女篇
    { transmigration: 'truck', cheat: 'infinite_growth', identity: 'saint', genre: 'flex' },
    { transmigration: 'truck', cheat: 'immortality', identity: 'saint', genre: 'retired' },
    { transmigration: 'overwork', cheat: 'infinite_growth', identity: 'saint', genre: 'revenge' },
    { transmigration: 'circle', cheat: 'defense', identity: 'saint', genre: 'daily' },
    { transmigration: 'god_apology', cheat: 'omniscience', identity: 'saint', genre: 'level_up' },
    { transmigration: 'truck', cheat: 'defense', identity: 'saint', genre: 'romance' },

    // 平民篇 (with races)
    { transmigration: 'truck', cheat: 'infinite_growth', identity: 'peasant', race: 'human', genre: 'flex' },
    { transmigration: 'overwork', cheat: 'immortality', identity: 'peasant', race: 'elf', genre: 'retired' },
    { transmigration: 'circle', cheat: 'infinite_growth', identity: 'peasant', race: 'monster', genre: 'revenge' },
    { transmigration: 'god_apology', cheat: 'defense', identity: 'peasant', race: 'non_living', genre: 'daily' },
    { transmigration: 'truck', cheat: 'omniscience', identity: 'peasant', race: 'human', genre: 'level_up' },
    { transmigration: 'circle', cheat: 'immortality', identity: 'peasant', race: 'elf', genre: 'romance' },

    // Additional cross-combination highlights covering all 16 archetypes
    { transmigration: 'overwork', cheat: 'immortality', identity: 'sage', genre: 'daily' }, // nihilist_drifter
    { transmigration: 'god_apology', cheat: 'immortality', identity: 'peasant', race: 'human', genre: 'retired' }, // opportunist_trader
    { transmigration: 'truck', cheat: 'infinite_growth', identity: 'hero', genre: 'level_up' }, // tragic_savior
    { transmigration: 'circle', cheat: 'omniscience', identity: 'demon_king', genre: 'revenge' }, // cult_mentor
    { transmigration: 'god_apology', cheat: 'defense', identity: 'peasant', race: 'human', genre: 'daily' }, // social_butterfly
    { transmigration: 'overwork', cheat: 'defense', identity: 'hero', genre: 'retired' } // destiny_procrastinator
  ];

  return samplePaths.map((p) => resolveEnding(p));
}

/**
 * Reconstructs an EndingStory from its deterministic ID string.
 * Uses exact O(1) 788-combination registry, with legacy fallback.
 */
export function getEndingById(id: string): EndingStory | null {
  if (!id) return null;

  // 1. Direct registry lookup (handles all 788 combinations perfectly without brittle string splitting)
  const combo = getCombinationById(id);
  if (combo) {
    return resolveEnding(combo.selections);
  }

  // 2. Legacy fallback for old test saves
  if (id.startsWith('brute_')) {
    const goal = id.replace('brute_', '') as BruteGoalId;
    return resolveEnding({
      transmigration: 'truck',
      cheat: 'brute_force',
      bruteGoal: goal
    });
  }

  const parts = id.split('_');
  if (parts.length === 2) {
    return resolveEnding({
      transmigration: 'truck',
      cheat: 'defense',
      identity: parts[0] as IdentityId,
      genre: parts[1] as GenreId
    });
  }

  return null;
}
