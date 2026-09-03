const STORAGE_KEY = 'isekai_unlocked_endings';

export function getUnlockedEndings(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function recordUnlockedEnding(endingId: string): { isNew: boolean; totalUnlocked: number } {
  try {
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

export function clearAllProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
