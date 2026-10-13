import { isValidEndingId } from '../data/combinations';

const STORAGE_KEY = 'isekai_unlocked_endings';

/**
 * Safely retrieves stored unlocked ending IDs.
 * Filters out invalid IDs, duplicates, non-strings, and corrupt data without crashing.
 */
export function getUnlockedEndings(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const validIds = new Set<string>();
    for (const item of parsed) {
      if (typeof item === 'string' && item.trim()) {
        const trimmed = item.trim();
        // Accept valid combination IDs or recognized legacy IDs
        if (isValidEndingId(trimmed) || trimmed.startsWith('brute_') || trimmed.includes('_')) {
          validIds.add(trimmed);
        }
      }
    }
    return Array.from(validIds);
  } catch {
    return [];
  }
}

/**
 * Records an unlocked ending ID into persistent storage safely.
 */
export function recordUnlockedEnding(endingId: string): { isNew: boolean; totalUnlocked: number } {
  try {
    if (!endingId || typeof endingId !== 'string') {
      const current = getUnlockedEndings();
      return { isNew: false, totalUnlocked: current.length };
    }

    const current = getUnlockedEndings();
    if (!current.includes(endingId)) {
      const updated = [...current, endingId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { isNew: true, totalUnlocked: updated.length };
    }
    return { isNew: false, totalUnlocked: current.length };
  } catch {
    return { isNew: false, totalUnlocked: 1 };
  }
}

export function unlockAllEndings(allIds: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allIds));
  } catch {
    // ignore
  }
}

export function clearAllProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

