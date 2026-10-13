// 120 Bespoke Hero Endings - Individually written, zero template concatenation
import { CustomEndingEntry } from './types';
import { HERO_RETIRED_ENDINGS } from './heroParts/retired';
import { HERO_REVENGE_ENDINGS } from './heroParts/revenge';
import { HERO_LEVEL_UP_ENDINGS } from './heroParts/levelUp';
import { HERO_FLEX_ENDINGS } from './heroParts/flex';
import { HERO_DAILY_ENDINGS } from './heroParts/daily';
import { HERO_ROMANCE_ENDINGS } from './heroParts/romance';

export const HERO_ENDINGS: Record<string, CustomEndingEntry> = {
  ...HERO_RETIRED_ENDINGS,
  ...HERO_REVENGE_ENDINGS,
  ...HERO_LEVEL_UP_ENDINGS,
  ...HERO_FLEX_ENDINGS,
  ...HERO_DAILY_ENDINGS,
  ...HERO_ROMANCE_ENDINGS,
};
