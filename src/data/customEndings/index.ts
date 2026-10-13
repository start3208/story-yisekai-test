import { CustomEndingEntry } from './types';
import { BRUTE_ENDINGS } from './brute';
import { HERO_ENDINGS } from './hero';
import { DEMON_ENDINGS } from './demon';
import { SAGE_ENDINGS } from './sage';
import { SAINT_ENDINGS } from './saint';
import { PEASANT_HUMAN_ENDINGS } from './peasantHuman';
import { PEASANT_ELF_ENDINGS } from './peasantElf';
import { PEASANT_MONSTER_ENDINGS } from './peasantMonster';
import { PEASANT_NON_LIVING_ENDINGS } from './peasantNonLiving';

export * from './types';

export const ALL_CUSTOM_ENDINGS: Record<string, CustomEndingEntry> = {
  ...BRUTE_ENDINGS,
  ...HERO_ENDINGS,
  ...DEMON_ENDINGS,
  ...SAGE_ENDINGS,
  ...SAINT_ENDINGS,
  ...PEASANT_HUMAN_ENDINGS,
  ...PEASANT_ELF_ENDINGS,
  ...PEASANT_MONSTER_ENDINGS,
  ...PEASANT_NON_LIVING_ENDINGS
};

export function getCustomEnding(id: string): CustomEndingEntry | undefined {
  return ALL_CUSTOM_ENDINGS[id];
}
