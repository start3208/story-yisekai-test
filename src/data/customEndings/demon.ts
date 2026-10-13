// 120 Bespoke Demon Endings - Individually written, zero template concatenation
import { CustomEndingEntry } from './types';
import { DEMON_RETIRED_ENDINGS } from './demonParts/retired';
import { DEMON_REVENGE_ENDINGS } from './demonParts/revenge';
import { DEMON_LEVEL_UP_ENDINGS } from './demonParts/levelUp';
import { DEMON_FLEX_ENDINGS } from './demonParts/flex';
import { DEMON_DAILY_ENDINGS } from './demonParts/daily';
import { DEMON_ROMANCE_ENDINGS } from './demonParts/romance';

export const DEMON_ENDINGS: Record<string, CustomEndingEntry> = {
  ...DEMON_RETIRED_ENDINGS,
  ...DEMON_REVENGE_ENDINGS,
  ...DEMON_LEVEL_UP_ENDINGS,
  ...DEMON_FLEX_ENDINGS,
  ...DEMON_DAILY_ENDINGS,
  ...DEMON_ROMANCE_ENDINGS,
};
