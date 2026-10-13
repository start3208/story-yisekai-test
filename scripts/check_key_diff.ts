import { getAllCombinations } from '../src/data/combinations';
import { ALL_CUSTOM_ENDINGS } from '../src/data/customEndings';

const combinations = getAllCombinations();
const comboKeySet = new Set(combinations.map(c => c.id));
const customKeySet = new Set(Object.keys(ALL_CUSTOM_ENDINGS));

const inComboNotCustom = combinations.filter(c => !customKeySet.has(c.id)).map(c => c.id);
const inCustomNotCombo = Object.keys(ALL_CUSTOM_ENDINGS).filter(k => !comboKeySet.has(k));

console.log('In combinations but not in ALL_CUSTOM_ENDINGS:', inComboNotCustom.length);
console.log('Sample missing:', inComboNotCustom.slice(0, 15));
console.log('In ALL_CUSTOM_ENDINGS but not in combinations:', inCustomNotCombo.length);
console.log('Sample extra:', inCustomNotCombo.slice(0, 15));
