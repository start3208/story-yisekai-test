// 120 Bespoke Saint Endings - Individually written in Japanese Light Novel style
import { CustomEndingEntry } from './types';
import { SAINT_RETIRED_ENDINGS } from './saintParts/retired';
import { SAINT_REVENGE_ENDINGS } from './saintParts/revenge';
import { SAINT_LEVEL_UP_ENDINGS } from './saintParts/levelUp';
import { SAINT_FLEX_ENDINGS } from './saintParts/flex';
import { SAINT_DAILY_ENDINGS } from './saintParts/daily';
import { SAINT_ROMANCE_ENDINGS } from './saintParts/romance';

export const SAINT_ENDINGS: Record<string, CustomEndingEntry> = {
  ...SAINT_RETIRED_ENDINGS,
  ...SAINT_REVENGE_ENDINGS,
  ...SAINT_LEVEL_UP_ENDINGS,
  ...SAINT_FLEX_ENDINGS,
  ...SAINT_DAILY_ENDINGS,
  ...SAINT_ROMANCE_ENDINGS,
};
