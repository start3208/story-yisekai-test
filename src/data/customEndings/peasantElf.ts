import { CustomEndingEntry } from './types';
import { PEASANT_ELF_RETIRED_ENDINGS } from './peasantElfParts/retired';
import { PEASANT_ELF_REVENGE_ENDINGS } from './peasantElfParts/revenge';
import { PEASANT_ELF_LEVEL_UP_ENDINGS } from './peasantElfParts/levelUp';
import { PEASANT_ELF_FLEX_ENDINGS } from './peasantElfParts/flex';
import { PEASANT_ELF_DAILY_ENDINGS } from './peasantElfParts/daily';
import { PEASANT_ELF_ROMANCE_ENDINGS } from './peasantElfParts/romance';

export const PEASANT_ELF_ENDINGS: Record<string, CustomEndingEntry> = {
  ...PEASANT_ELF_RETIRED_ENDINGS,
  ...PEASANT_ELF_REVENGE_ENDINGS,
  ...PEASANT_ELF_LEVEL_UP_ENDINGS,
  ...PEASANT_ELF_FLEX_ENDINGS,
  ...PEASANT_ELF_DAILY_ENDINGS,
  ...PEASANT_ELF_ROMANCE_ENDINGS,
};
