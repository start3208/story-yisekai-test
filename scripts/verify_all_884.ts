import { getAllCombinations, getCombinationById } from '../src/data/combinations';
import { resolveEnding, getEndingById } from '../src/data/endingsData';
import { ALL_CUSTOM_ENDINGS } from '../src/data/customEndings';

console.log('--- STARTING 884 ENDINGS VERIFICATION ---');

const combinations = getAllCombinations();
console.log(`Total combinations in registry: ${combinations.length}`);

if (combinations.length !== 884) {
  console.error(`ERROR: Expected 884 combinations, found ${combinations.length}`);
  process.exit(1);
}

const customEndingsKeys = Object.keys(ALL_CUSTOM_ENDINGS);
console.log(`Total custom endings in ALL_CUSTOM_ENDINGS: ${customEndingsKeys.length}`);

let resolvedCount = 0;
let missingCustomCount = 0;
let errors: string[] = [];
let categoryCounts: Record<string, number> = {};
let archetypeCounts: Record<string, number> = {};

for (const combo of combinations) {
  try {
    const ending = resolveEnding(combo.selections);
    if (!ending) {
      errors.push(`Null ending for ${combo.id}`);
      continue;
    }

    if (ending.id !== combo.id) {
      errors.push(`ID mismatch: expected ${combo.id}, got ${ending.id}`);
    }

    if (!ending.title || ending.title.trim().length === 0) {
      errors.push(`Empty title for ${combo.id}`);
    }
    if (!ending.jpSubtitle || ending.jpSubtitle.trim().length === 0) {
      errors.push(`Empty jpSubtitle for ${combo.id}`);
    }
    if (!ending.storyText || ending.storyText.trim().length < 50) {
      errors.push(`Story text too short or empty for ${combo.id}`);
    }
    if (!ending.epilogueQuote || ending.epilogueQuote.trim().length === 0) {
      errors.push(`Empty epilogueQuote for ${combo.id}`);
    }
    if (!ending.bystanderRoast || !ending.bystanderRoast.comment) {
      errors.push(`Missing bystanderRoast for ${combo.id}`);
    }

    // Check custom ending
    if (!ALL_CUSTOM_ENDINGS[combo.id]) {
      missingCustomCount++;
    }

    // Check getEndingById
    const byId = getEndingById(combo.id);
    if (!byId) {
      errors.push(`getEndingById(${combo.id}) returned null!`);
    }

    resolvedCount++;
    categoryCounts[ending.category] = (categoryCounts[ending.category] || 0) + 1;
    archetypeCounts[ending.archetypeId] = (archetypeCounts[ending.archetypeId] || 0) + 1;
  } catch (err: any) {
    errors.push(`Exception for ${combo.id}: ${err.message}`);
  }
}

console.log(`Successfully resolved: ${resolvedCount} / ${combinations.length}`);
console.log(`Custom endings mapped in ALL_CUSTOM_ENDINGS: ${customEndingsKeys.length - missingCustomCount} / ${customEndingsKeys.length}`);
console.log('Category distribution:', categoryCounts);
console.log('Archetype distribution:', Object.keys(archetypeCounts).length, 'archetypes covered');
if (missingCustomCount > 0) {
  console.log(`Note: ${missingCustomCount} combinations fall back to generator/synthesis engine.`);
}

if (errors.length > 0) {
  console.error(`Encountered ${errors.length} errors:`);
  console.error(errors.slice(0, 10).join('\n'));
  process.exit(1);
} else {
  console.log('ALL 884 ENDINGS VERIFIED PERFECTLY WITH ZERO ERRORS!');
}
