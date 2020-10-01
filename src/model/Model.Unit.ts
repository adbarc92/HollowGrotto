import { Actor, actorSetFacing, actorSetPosition } from 'model/Model.Actor';
import { CharacterDef, StatsDef } from 'model/Model.Database';
import { Facing } from 'model/Model.Actor';
import {
  battleGetScreenPosition,
  RoundAction,
  Battle,
} from 'model/Model.Battle';
import { getScreenSize } from 'components/ReactCanvas';
import { getSpriteSize } from 'utils/Sprites';
import { isAlly } from 'utils/Utils';

export enum AI {
  PLAYER,
  CHARGER,
  STRIKER,
  BREAKER,
  BOSS,
}

export enum Allegiance {
  ALLEGIANCE_ALLY,
  ALLEGIANCE_ENEMY,
}

export interface Stats {
  hp: number;
  dmg: number;
  def: number;
  mag: number;
  spd: number;
  iCnt: number;
  cCnt: number;
}

export interface Unit {
  name: string;
  actor: Actor;
  bS: Stats;
  cS: Stats;
  i: number; // vertical index of unit
  allegiance: Allegiance;
  ai: AI;
}

export const createUnit = (
  name: string,
  actor: Actor,
  charDef: CharacterDef,
  allegiance: Allegiance,
  i: number
): Unit => {
  const stats = charDef.stats as StatsDef;
  // if (!stats) {
  //   throw new Error(`CharacterDef '${name}' has no stats!`);
  // }
  const newUnit = {
    name,
    actor,
    bS: { ...stats.bS },
    cS: { ...stats.bS },
    i,
    allegiance,
    ai: stats.ai,
  };
  newUnit.allegiance
    ? actorSetFacing(newUnit.actor, Facing.FACING_LEFT)
    : actorSetFacing(newUnit.actor, Facing.FACING_RIGHT);
  // unitResetPosition(newUnit);
  return newUnit;
};

// Needs to know how many units there are, should take battle parameter
export const unitResetPosition = (unit: Unit, team: Unit[]): void => {
  const [x, y] = battleGetScreenPosition(team, unit.i, unit.allegiance);
  actorSetPosition(unit.actor, x, y);
};

export const unitLives = (unit: Unit): boolean => {
  if (unit.cS.hp > 0) {
    return true;
  }
  return false;
};

export const unitResetDef = (unit: Unit): void => {
  unit.cS.def = unit.bS.def;
};

export const unitMoveForward = (team: Unit[], unit: Unit): void => {
  const { allegiance } = unit;
  const [x, y] = battleGetScreenPosition(team, unit.i, allegiance);
  actorSetPosition(unit.actor, x + (allegiance ? -20 : 20), y);
};

export const unitSetToCenter = (unit: Unit): void => {
  const screenSize = getScreenSize();
  console.log('screenSize:', screenSize);
  const spriteSize = getSpriteSize() * (window as any).AppInterface.scale;
  console.log('spriteSize:', spriteSize);
  const center = screenSize / 2 - spriteSize / 2;
  actorSetPosition(unit.actor, center, center);
};

export const unitModifySpeed = (unit: Unit, action: RoundAction): void => {
  const { cS } = unit;
  switch (action) {
    case RoundAction.ACTION_STRIKE:
      cS.spd += 0;
      break;
    case RoundAction.ACTION_CHARGE:
      cS.spd -= 2;
      break;
    case RoundAction.ACTION_INTERRUPT:
      cS.spd -= 1;
      break;
    case RoundAction.ACTION_DEFEND:
      cS.spd += 3;
      break;
    case RoundAction.ACTION_HEAL:
      cS.spd -= 1;
      break;
    case RoundAction.ACTION_USE:
      cS.spd -= 2;
      break;
    case RoundAction.ACTION_FLEE:
      cS.spd -= 2;
      break;
  }
};

export const statsModifyHp = (
  currentStats: Stats,
  baseStats: Stats,
  val: number
): void => {
  const { hp: chp } = currentStats;
  const { hp: bhp } = baseStats;
  let nextHp = chp + val;
  if (nextHp > bhp) {
    nextHp = bhp;
  } else if (nextHp < 0) {
    nextHp = 0;
  }
  currentStats.hp = nextHp;
};

export const unitGainBreakCharge = (unit: Unit): void => {
  unit.cS.iCnt++;
};

export const unitGetTeam = (battle: Battle, unit: Unit): Unit[] => {
  return isAlly(battle, unit) ? battle.allies : battle.enemies;
};

// Seems like a bad idea...
// export const toggleUnitHighlight = (unit: Unit): void => {
//   const { highlighted } = unit;
//   unit.highlighted = !highlighted;
// };
