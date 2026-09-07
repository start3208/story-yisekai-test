import {
  UserSelections,
  TransmigrationId,
  CheatId,
  IdentityId,
  RaceId,
  BruteGoalId,
  GenreId
} from '../types';

export const TRANSMIGRATION_IDS: TransmigrationId[] = ['truck', 'overwork', 'circle', 'god_apology'];
export const STANDARD_CHEAT_IDS: CheatId[] = ['immortality', 'defense', 'infinite_growth', 'omniscience'];
export const OVERPOWERED_CHEAT_ID: CheatId = 'brute_force';
export const OVERPOWERED_GOAL_IDS: BruteGoalId[] = ['ordinary', 'industrial', 'return_home', 'defeat_demon_king', 'destroy_all'];

export const STANDARD_IDENTITY_IDS: IdentityId[] = ['hero', 'demon_king', 'sage', 'saint'];
export const PEASANT_IDENTITY_ID: IdentityId = 'peasant';

export const PEASANT_RACE_IDS: RaceId[] = ['human', 'elf', 'monster', 'non_living'];
export const GENRE_IDS: GenreId[] = ['retired', 'revenge', 'level_up', 'flex', 'daily', 'romance'];

export interface ValidCombination {
  id: string;
  isOverpowered: boolean;
  selections: UserSelections;
}

// 缓存全部 788 条组合
let cachedCombinations: ValidCombination[] | null = null;
let idToCombinationMap: Map<string, ValidCombination> | null = null;

export function getAllCombinations(): ValidCombination[] {
  if (cachedCombinations) return cachedCombinations;

  const result: ValidCombination[] = [];

  // 1. 劲大路线：4 种穿越 × 5 种目标 = 20 条
  // ID 结构：`${trans}_brute_${goal}`
  for (const trans of TRANSMIGRATION_IDS) {
    for (const goal of OVERPOWERED_GOAL_IDS) {
      const selections: UserSelections = {
        transmigration: trans,
        cheat: OVERPOWERED_CHEAT_ID,
        bruteGoal: goal
      };
      const id = `${trans}_brute_${goal}`;
      result.push({ id, isOverpowered: true, selections });
    }
  }

  // 2. 四大标准职业：4 种穿越 × 4 种常规外挂 × 4 种身份 × 6 种流派 = 384 条
  // ID 结构：`${trans}_${cheat}_${identity}_${genre}`
  for (const trans of TRANSMIGRATION_IDS) {
    for (const cheat of STANDARD_CHEAT_IDS) {
      for (const identity of STANDARD_IDENTITY_IDS) {
        for (const genre of GENRE_IDS) {
          const selections: UserSelections = {
            transmigration: trans,
            cheat,
            identity,
            genre
          };
          const id = `${trans}_${cheat}_${identity}_${genre}`;
          result.push({ id, isOverpowered: false, selections });
        }
      }
    }
  }

  // 3. 平民种族路线：4 种穿越 × 4 种常规外挂 × 4 种种族 × 6 种流派 = 384 条
  // ID 结构：`${trans}_${cheat}_peasant_${race}_${genre}`
  for (const trans of TRANSMIGRATION_IDS) {
    for (const cheat of STANDARD_CHEAT_IDS) {
      for (const race of PEASANT_RACE_IDS) {
        for (const genre of GENRE_IDS) {
          const selections: UserSelections = {
            transmigration: trans,
            cheat,
            identity: PEASANT_IDENTITY_ID,
            race,
            genre
          };
          const id = `${trans}_${cheat}_peasant_${race}_${genre}`;
          result.push({ id, isOverpowered: false, selections });
        }
      }
    }
  }

  cachedCombinations = result;
  idToCombinationMap = new Map(result.map(c => [c.id, c]));
  return result;
}

export function getCombinationById(id: string): ValidCombination | undefined {
  if (!idToCombinationMap) {
    getAllCombinations();
  }
  return idToCombinationMap?.get(id);
}

export function isValidEndingId(id: string): boolean {
  if (!idToCombinationMap) {
    getAllCombinations();
  }
  return idToCombinationMap?.has(id) ?? false;
}
