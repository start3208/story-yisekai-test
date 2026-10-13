// 120 Bespoke Sage Endings - Individually written in Japanese Light Novel style
import { CustomEndingEntry } from './types';
import { SAGE_RETIRED_ENDINGS } from './sageParts/retired';
import { SAGE_REVENGE_ENDINGS } from './sageParts/revenge';
import { SAGE_LEVEL_UP_ENDINGS } from './sageParts/levelUp';
import { SAGE_FLEX_ENDINGS } from './sageParts/flex';
import { SAGE_DAILY_ENDINGS } from './sageParts/daily';
import { SAGE_ROMANCE_ENDINGS } from './sageParts/romance';

export const SAGE_ENDINGS: Record<string, CustomEndingEntry> = {
  ...SAGE_RETIRED_ENDINGS,
  ...SAGE_REVENGE_ENDINGS,
  ...SAGE_LEVEL_UP_ENDINGS,
  ...SAGE_FLEX_ENDINGS,
  ...SAGE_DAILY_ENDINGS,
  ...SAGE_ROMANCE_ENDINGS,
};
