import { CustomEndingEntry } from './types';
import { PEASANT_NON_LIVING_RETIRED_ENDINGS } from './peasantNonLivingParts/retired';
import { PEASANT_NON_LIVING_REVENGE_ENDINGS } from './peasantNonLivingParts/revenge';
import { PEASANT_NON_LIVING_LEVEL_UP_ENDINGS } from './peasantNonLivingParts/levelUp';
import { PEASANT_NON_LIVING_FLEX_ENDINGS } from './peasantNonLivingParts/flex';
import { PEASANT_NON_LIVING_DAILY_ENDINGS } from './peasantNonLivingParts/daily';
import { PEASANT_NON_LIVING_ROMANCE_ENDINGS } from './peasantNonLivingParts/romance';

export const PEASANT_NON_LIVING_ENDINGS: Record<string, CustomEndingEntry> = {
  ...PEASANT_NON_LIVING_RETIRED_ENDINGS,
  ...PEASANT_NON_LIVING_REVENGE_ENDINGS,
  ...PEASANT_NON_LIVING_LEVEL_UP_ENDINGS,
  ...PEASANT_NON_LIVING_FLEX_ENDINGS,
  ...PEASANT_NON_LIVING_DAILY_ENDINGS,
  ...PEASANT_NON_LIVING_ROMANCE_ENDINGS,
};
