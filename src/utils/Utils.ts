import { Battle } from 'model/Model.Battle';
import { Unit } from 'model/Model.Unit';

export const alternate = (nFrames: number, ms: number): number => {
  return Math.floor((getElapsedMs() % ((nFrames + 1) * ms)) / ms);
};

export const isAlly = (battle: Battle, unit: Unit): boolean => {
  return battle.allies.includes(unit);
};

export const getElapsedMs = (): number => {
  return window.performance.now();
};
