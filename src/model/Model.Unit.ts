import { Actor, actorSetFacing, actorSetPosition } from 'model/Model.Actor';
import { CharacterDef, StatsDef } from 'model/Model.Database';
import { Facing } from 'model/Model.Actor';
import { battleGetScreenPosition } from 'model/Model.Battle';

export enum AI {
  AI_PLAYER,
  AI_CHARGER,
  AI_STRIKER,
  AI_BREAKER,
  AI_BOSS,
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
