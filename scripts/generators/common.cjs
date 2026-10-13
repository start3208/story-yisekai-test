// Common helpers and verification utilities
const TRANSMIGRATIONS = ['truck', 'overwork', 'circle', 'god_apology'];
const CHEATS = ['immortality', 'defense', 'infinite_growth', 'omniscience'];
const GENRES = ['retired', 'revenge', 'level_up', 'flex', 'daily', 'romance'];

function assertValidEnding(id, entry) {
  if (!entry.title || !entry.jpSubtitle || !entry.storyText || !entry.epilogueQuote) {
    throw new Error(`Ending ${id} missing required text fields!`);
  }
  if (!entry.bystanderRoast || !entry.bystanderRoast.witness || !entry.bystanderRoast.comment || !entry.bystanderRoast.tag) {
    throw new Error(`Ending ${id} missing bystander roast fields!`);
  }
  const len = entry.storyText.length;
  if (len < 400 || len > 550) {
    throw new Error(`Ending ${id} storyText length ${len} is out of bounds [400, 550]!`);
  }
  const paragraphs = entry.storyText.split('\n\n');
  if (paragraphs.length < 3) {
    throw new Error(`Ending ${id} has insufficient paragraph structure (${paragraphs.length})!`);
  }
  // Check for banned mechanical Frankenstein concatenations:
  const bannedPhrases = [
    '在永恒的时间法则面前，任何神魔所谓的千秋霸业',
    '我还以为是哪家精灵在给我做泰式推拿',
    '只是刚才伸懒腰的时候，不小心稍微用了半成力气',
    '我都随手写在垫桌脚的餐巾纸上了'
  ];
  // If the quote merely glues these onto another unrelated quote, flag it
  for (const b of bannedPhrases) {
    if (entry.epilogueQuote.includes(b) && entry.epilogueQuote.length > b.length + 20) {
      throw new Error(`Ending ${id} contains Frankenstein mechanical quote stitching: "${entry.epilogueQuote}"`);
    }
  }
}

module.exports = {
  TRANSMIGRATIONS,
  CHEATS,
  GENRES,
  assertValidEnding
};
