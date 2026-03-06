const STORAGE_KEY = 'prism-audit-progress';
const EXPIRY_DAYS = 7;

interface SavedProgress {
  currentStage: number;
  responses: Record<string, unknown>;
  overallScore: number;
  categoryScores: Array<{ category: string; score: number; maxScore: number; percentage: number }>;
  activeStages: number[];
  suggestedTier: 'core' | 'growth' | 'enterprise';
  savedAt: number;
}

export function saveAuditProgress(data: Omit<SavedProgress, 'savedAt'>): void {
  try {
    const payload: SavedProgress = { ...data, savedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage full or unavailable
  }
}

export function loadAuditProgress(): Omit<SavedProgress, 'savedAt'> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data: SavedProgress = JSON.parse(raw);
    const age = Date.now() - data.savedAt;
    if (age > EXPIRY_DAYS * 24 * 60 * 60 * 1000) {
      clearAuditProgress();
      return null;
    }
    const { savedAt: _, ...rest } = data;
    return rest;
  } catch {
    return null;
  }
}

export function clearAuditProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
