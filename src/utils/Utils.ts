import { Battle, G_BATTLE_MENU_LABELS } from 'model/Model.Battle';
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

export const areAllUnitsDead = (units: Unit[]): boolean => {
  return units.reduce((everyoneIsDead: boolean, unit: Unit) => {
    return everyoneIsDead && unit.cS.hp === 0;
  }, true);
};

export const unitIsDead = (unit: Unit): boolean => {
  return unit.cS.hp > 0;
};

export const waitMs = async (ms: number): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

export const getRandNum = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const actionToString = (i: number): string => {
  return G_BATTLE_MENU_LABELS[i];
};

export const to1d = (x: number, y: number, width: number): number => {
  return y * width + x;
};
