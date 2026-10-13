const fs = require('fs');
const path = require('path');

const { generateBruteEndings } = require('./generators/brute.cjs');
const { generatePeasantHumanEndings } = require('./generators/peasantHuman.cjs');
const { generatePeasantElfEndings } = require('./generators/peasantElf.cjs');
const { generatePeasantMonsterEndings } = require('./generators/peasantMonster.cjs');
const { generatePeasantNonLivingEndings } = require('./generators/peasantNonLiving.cjs');
const { generateHeroEndings } = require('./generators/hero.cjs');
const { generateDemonEndings } = require('./generators/demon.cjs');
const { generateSageEndings } = require('./generators/sage.cjs');
const { generateSaintEndings } = require('./generators/saint.cjs');

const OUT_DIR = path.join(__dirname, '../src/data/customEndings');

function writeTsFile(filename, constName, data) {
  const filePath = path.join(OUT_DIR, filename);
  const jsonStr = JSON.stringify(data, null, 2);
  const content = `// Auto-generated bespoke endings without repetitive concatenation
import { CustomEndingEntry } from './types';

export const ${constName}: Record<string, CustomEndingEntry> = ${jsonStr};
`;
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Saved ${filename}: ${Object.keys(data).length} endings`);
}

function buildAll() {
  console.log('Starting build of all 788 bespoke endings...');

  const brute = generateBruteEndings();
  writeTsFile('brute.ts', 'BRUTE_ENDINGS', brute);

  const peasantHuman = generatePeasantHumanEndings();
  writeTsFile('peasantHuman.ts', 'PEASANT_HUMAN_ENDINGS', peasantHuman);

  const peasantElf = generatePeasantElfEndings();
  writeTsFile('peasantElf.ts', 'PEASANT_ELF_ENDINGS', peasantElf);

  const peasantMonster = generatePeasantMonsterEndings();
  writeTsFile('peasantMonster.ts', 'PEASANT_MONSTER_ENDINGS', peasantMonster);

  const peasantNonLiving = generatePeasantNonLivingEndings();
  writeTsFile('peasantNonLiving.ts', 'PEASANT_NON_LIVING_ENDINGS', peasantNonLiving);

  const hero = generateHeroEndings();
  writeTsFile('hero.ts', 'HERO_ENDINGS', hero);

  const demon = generateDemonEndings();
  writeTsFile('demon.ts', 'DEMON_ENDINGS', demon);

  const sage = generateSageEndings();
  writeTsFile('sage.ts', 'SAGE_ENDINGS', sage);

  const saint = generateSaintEndings();
  writeTsFile('saint.ts', 'SAINT_ENDINGS', saint);

  const total = Object.keys(brute).length +
    Object.keys(peasantHuman).length +
    Object.keys(peasantElf).length +
    Object.keys(peasantMonster).length +
    Object.keys(peasantNonLiving).length +
    Object.keys(hero).length +
    Object.keys(demon).length +
    Object.keys(sage).length +
    Object.keys(saint).length;

  console.log(`\n========================================`);
  console.log(`Successfully generated and verified ${total} bespoke endings!`);
  console.log(`========================================\n`);

  if (total !== 788) {
    throw new Error(`Total endings count mismatch! Expected 788, got ${total}`);
  }
}

buildAll();
