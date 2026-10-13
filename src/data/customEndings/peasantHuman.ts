import { CustomEndingEntry } from './types';
import { PEASANT_HUMAN_RETIRED_ENDINGS } from './peasantHumanParts/retired';
import { PEASANT_HUMAN_REVENGE_ENDINGS } from './peasantHumanParts/revenge';
import { PEASANT_HUMAN_LEVEL_UP_ENDINGS } from './peasantHumanParts/levelUp';
import { PEASANT_HUMAN_FLEX_ENDINGS } from './peasantHumanParts/flex';
import { PEASANT_HUMAN_DAILY_ENDINGS } from './peasantHumanParts/daily';
import { PEASANT_HUMAN_ROMANCE_ENDINGS } from './peasantHumanParts/romance';

export const PEASANT_HUMAN_ENDINGS: Record<string, CustomEndingEntry> = {
  ...PEASANT_HUMAN_RETIRED_ENDINGS,
  ...PEASANT_HUMAN_REVENGE_ENDINGS,
  ...PEASANT_HUMAN_LEVEL_UP_ENDINGS,
  ...PEASANT_HUMAN_FLEX_ENDINGS,
  ...PEASANT_HUMAN_DAILY_ENDINGS,
  ...PEASANT_HUMAN_ROMANCE_ENDINGS,
};
