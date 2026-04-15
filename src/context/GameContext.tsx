"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import type { GameState, GameAction, ScenarioId } from "@/lib/types";
import { loadGameState, saveGameState, resetGameState } from "@/lib/storage";
import { SCENARIO_ORDER } from "@/lib/scenarios";

interface GameContextValue {
  state: GameState;
  completeLevel: (scenarioId: ScenarioId, level: number, score: number) => void;
  incrementAttempts: (scenarioId: ScenarioId, level: number) => void;
  resetAll: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "LOAD_STATE":
      return action.payload;

    case "INCREMENT_ATTEMPTS": {
      const { scenarioId, level } = action.payload;
      const scenario = state.scenarios[scenarioId];
      const lvl = scenario.levels[level];
      return {
        ...state,
        totalAttempts: state.totalAttempts + 1,
        scenarios: {
          ...state.scenarios,
          [scenarioId]: {
            ...scenario,
            levels: {
              ...scenario.levels,
              [level]: { ...lvl, attempts: lvl.attempts + 1 },
            },
          },
        },
      };
    }

    case "COMPLETE_LEVEL": {
      const { scenarioId, level, score } = action.payload;
      const scenario = state.scenarios[scenarioId];
      const lvl = scenario.levels[level];
      const newBestScore = Math.max(lvl.bestScore, score);
      const nextLevel = Math.min(level + 1, 5);
      const allCompleted = [1, 2, 3, 4, 5].every(
        (l) => l === level || scenario.levels[l]?.completed
      );

      const updatedLevels = {
        ...scenario.levels,
        [level]: { ...lvl, completed: true, bestScore: newBestScore },
      };

      // Check if all scenarios completed
      const updatedScenarios = {
        ...state.scenarios,
        [scenarioId]: {
          ...scenario,
          currentLevel: allCompleted ? 5 : nextLevel,
          completed: allCompleted,
          levels: updatedLevels,
        },
      };

      const allScenariosCompleted = SCENARIO_ORDER.every(
        (id) => updatedScenarios[id].completed
      );

      return {
        ...state,
        completedAt: allScenariosCompleted ? new Date().toISOString() : state.completedAt,
        scenarios: updatedScenarios,
      };
    }

    case "RESET_ALL":
      return resetGameState();

    default:
      return state;
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, null, loadGameState);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = loadGameState();
    dispatch({ type: "LOAD_STATE", payload: saved });
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    saveGameState(state);
  }, [state]);

  const completeLevel = useCallback(
    (scenarioId: ScenarioId, level: number, score: number) => {
      dispatch({ type: "COMPLETE_LEVEL", payload: { scenarioId, level, score } });
    },
    []
  );

  const incrementAttempts = useCallback(
    (scenarioId: ScenarioId, level: number) => {
      dispatch({ type: "INCREMENT_ATTEMPTS", payload: { scenarioId, level } });
    },
    []
  );

  const resetAll = useCallback(() => {
    dispatch({ type: "RESET_ALL" });
  }, []);

  return (
    <GameContext.Provider value={{ state, completeLevel, incrementAttempts, resetAll }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
}
