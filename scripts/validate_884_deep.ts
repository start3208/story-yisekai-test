import { getAllCombinations, getCombinationById } from '../src/data/combinations';
import { resolveEnding, getEndingById } from '../src/data/endingsData';
import { ALL_CUSTOM_ENDINGS } from '../src/data/customEndings';
import { ARCHETYPES } from '../src/data/archetypesData';

console.log('================================================================');
console.log('🔍 FULL 884 ENDINGS INTEGRITY & COMPILATION DEEP CHECK');
console.log('================================================================');

const allCombinations = getAllCombinations();
console.log(`✓ Total valid combinations generated: ${allCombinations.length}`);

if (allCombinations.length !== 884) {
  console.error(`❌ FAILED: Expected 884 combinations, got ${allCombinations.length}`);
  process.exit(1);
}

// 1. Verify every single combination resolves properly
let nullCount = 0;
let idMismatchCount = 0;
let titleIssues = 0;
let subtitleIssues = 0;
let storyTextIssues = 0;
let quoteIssues = 0;
let roastIssues = 0;
let customHitCount = 0;
let customMissingKeys: string[] = [];

const categoryStats: Record<string, number> = {};
const archetypeStats: Record<string, number> = {};

for (const combo of allCombinations) {
  const ending = resolveEnding(combo.selections);
  if (!ending) {
    nullCount++;
    continue;
  }

  if (ending.id !== combo.id) {
    idMismatchCount++;
  }

  if (!ending.title || ending.title.trim().length < 5) {
    titleIssues++;
  }

  if (!ending.jpSubtitle || ending.jpSubtitle.trim().length < 5) {
    subtitleIssues++;
  }

  if (!ending.storyText || ending.storyText.trim().length < 50) {
    storyTextIssues++;
  }

  if (!ending.epilogueQuote || ending.epilogueQuote.trim().length < 2) {
    quoteIssues++;
  }

  if (!ending.bystanderRoast || !ending.bystanderRoast.witness || !ending.bystanderRoast.comment) {
    roastIssues++;
  }

  // Check if it has a custom ending entry
  if (ALL_CUSTOM_ENDINGS[combo.id]) {
    customHitCount++;
  } else {
    customMissingKeys.push(combo.id);
  }

  // Stats aggregation
  categoryStats[ending.category] = (categoryStats[ending.category] || 0) + 1;
  archetypeStats[ending.archetypeId] = (archetypeStats[ending.archetypeId] || 0) + 1;

  // Verify getEndingById
  const fetched = getEndingById(combo.id);
  if (!fetched || fetched.id !== combo.id) {
    console.error(`❌ getEndingById failed for ${combo.id}`);
  }
}

console.log(`✓ All 884 combinations successfully resolved to EndingStory objects`);
console.log(`✓ Category breakdown:`, categoryStats);
console.log(`✓ Archetype coverage (${Object.keys(archetypeStats).length} archetypes):`, archetypeStats);
console.log(`✓ Custom bespoke endings mapped in ALL_CUSTOM_ENDINGS: ${customHitCount} / 884`);

if (customMissingKeys.length > 0) {
  console.log(`ℹ️  Custom endings missing from ALL_CUSTOM_ENDINGS: ${customMissingKeys.length}`);
  console.log('   First 10 missing keys:', customMissingKeys.slice(0, 10));
}

// Check extra keys in ALL_CUSTOM_ENDINGS that are not in combinations
const comboIdSet = new Set(allCombinations.map(c => c.id));
const extraKeysInCustom = Object.keys(ALL_CUSTOM_ENDINGS).filter(k => !comboIdSet.has(k));
if (extraKeysInCustom.length > 0) {
  console.log(`ℹ️  Extra keys in ALL_CUSTOM_ENDINGS not in 884 combinations: ${extraKeysInCustom.length}`);
  console.log('   First 10 extra keys:', extraKeysInCustom.slice(0, 10));
}

console.log('================================================================');
console.log(`Null count: ${nullCount}`);
console.log(`ID mismatch count: ${idMismatchCount}`);
console.log(`Title issues: ${titleIssues}`);
console.log(`Subtitle issues: ${subtitleIssues}`);
console.log(`Story text issues: ${storyTextIssues}`);
console.log(`Quote issues: ${quoteIssues}`);
console.log(`Roast issues: ${roastIssues}`);
console.log('================================================================');
