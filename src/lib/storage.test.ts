import { describe, it, expect, beforeEach } from "vitest";
import { loadGameState, saveGameState, resetGameState, getOverallProgress } from "./storage";

// Mock localStorage
const store: Record<string, string> = {};
const localStorageMock = {
  getItem: (key: string) => store[key] ?? null,
  setItem: (key: string, value: string) => { store[key] = value; },
  removeItem: (key: string) => { delete store[key]; },
  clear: () => { for (const k in store) delete store[k]; },
};
Object.defineProperty(globalThis, "localStorage", { value: localStorageMock });

describe("storage", () => {
  beforeEach(() => localStorageMock.clear());

  it("loadGameState returns initial state when empty", () => {
    const state = loadGameState();
    expect(state.totalAttempts).toBe(0);
    expect(Object.keys(state.scenarios)).toHaveLength(5);
  });

  it("saveGameState and loadGameState round-trips correctly", () => {
    const state = loadGameState();
    state.totalAttempts = 42;
    saveGameState(state);
    const loaded = loadGameState();
    expect(loaded.totalAttempts).toBe(42);
  });

  it("resetGameState clears localStorage and returns fresh state", () => {
    const state = loadGameState();
    state.totalAttempts = 99;
    saveGameState(state);
    const reset = resetGameState();
    expect(reset.totalAttempts).toBe(0);
    const reloaded = loadGameState();
    expect(reloaded.totalAttempts).toBe(0);
  });

  it("getOverallProgress calculates correctly for fresh state", () => {
    const state = loadGameState();
    const p = getOverallProgress(state);
    expect(p.completedLevels).toBe(0);
    expect(p.totalLevels).toBe(25);
    expect(p.percentage).toBe(0);
  });

  it("getOverallProgress counts completed levels correctly", () => {
    const state = loadGameState();
    state.scenarios["schaden"].levels[1].completed = true;
    state.scenarios["schaden"].levels[2].completed = true;
    const p = getOverallProgress(state);
    expect(p.completedLevels).toBe(2);
    expect(p.percentage).toBe(8);
  });
});
