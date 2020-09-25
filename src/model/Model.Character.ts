import { Actor, createActor } from 'model/Model.Actor';
import { Unit, createUnit, Allegiance } from 'model/Model.Unit';
import { CharacterDef } from 'model/Model.Database';

export interface Character {
  name: string;
  actor: Actor;
  label: string;
  action?: (self?: Character) => any;
  col?: (self?: Character) => any;
  unit?: Unit; // should be optional
  aText: string; //action text
}

export const createCharacterFromTemplate = (
  characterDef: CharacterDef,
  chName?: string
): Character => {
  const { sprI, spr, stats, label, action, col, name } = characterDef;
  const actor = createActor(sprI);
  // actor.plAi = plAi || G_PLATFORM_AI_NONE;
  if (spr) {
    actor.sprite = spr;
  }
  return {
    name: chName || name,
    actor,
    label: label || '',
    action,
    col,
    aText: '',
    unit: stats
      ? createUnit(name, actor, characterDef, Allegiance.ALLEGIANCE_ALLY, 0)
      : undefined,
  };
};
