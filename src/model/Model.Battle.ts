import { Allegiance, Unit, unitResetPosition } from 'model/Model.Unit';
import { Character, createCharacterFromTemplate } from 'model/Model.Character';
import { Facing, actorSetFacing } from 'model/Model.Actor';
import { CharacterDef, EncounterDef } from 'model/Model.Database';
import { Party } from 'model/Model.Party';
import { getSpriteSize } from 'utils/Sprites';

export interface Round {
  turnOrder: Unit[];
  currentIndex: number;
}

export enum CompletionState {
  COMPLETION_VICTORY,
  COMPLETION_FAILURE,
  COMPLETION_INCONCLUSIVE,
  COMPLETION_IN_PROGRESS,
}

export interface Battle {
  party: Party;
  allies: Unit[];
  enemies: Unit[];
  rounds: Round[];
  roundIndex: 0;
  // actionMenuStack: Menu[];
  text: string;
  // aiSeed: number;
  completionState: CompletionState;
}

export const battleGetScreenPosition = (
  team: Unit[],
  i: number,
  allegiance: Allegiance
): [number, number] => {
  const unitSize = getSpriteSize() * (window as any).AppInterface.scale;
  const margin = 16;
  const positionHeight = unitSize + margin;
  const xPos =
    allegiance === Allegiance.ALLEGIANCE_ALLY ? 40 : 512 - 40 - unitSize;
  const height = positionHeight * team.length;
  const yPos = 512 / 2 - height / 2 + i * positionHeight;
  return [xPos, yPos];
};

const makeAllies = (characters: Character[]) => {
  const battleParty: Unit[] = [];
  for (let i = 0; i < characters.length; i++) {
    const { unit, name } = characters[i];
    if (unit) {
      unit.name = name;
      unit.i = i;
      unit.allegiance = Allegiance.ALLEGIANCE_ALLY;
      actorSetFacing(unit.actor, Facing.FACING_RIGHT);
      battleParty.push(unit);
    }
  }
  battleParty.forEach(unit => unitResetPosition(unit, battleParty));
  return battleParty;
};

const makeEnemies = (monsters: CharacterDef[]) => {
  const monsterParty: Unit[] = [];
  for (let i = 0; i < monsters.length; i++) {
    const ch = createCharacterFromTemplate(monsters[i]);
    const unit = ch.unit as Unit;
    unit.i = i;
    unit.allegiance = Allegiance.ALLEGIANCE_ENEMY;
    actorSetFacing(unit.actor, Facing.FACING_LEFT);
    monsterParty.push(unit);
  }
  monsterParty.forEach(unit => unitResetPosition(unit, monsterParty));
  return monsterParty;
};

export const createBattle = (party: Party, encounter: EncounterDef): Battle => {
  // advantage = advantage || G_ADVANTAGE_NONE;

  // const screenSize = G_model_getScreenSize();
  // const menuWidth = 100;
  // const lineHeight = 20;
  // const x = screenSize / 2 - menuWidth / 2;
  // const y = screenSize - lineHeight * G_BATTLE_MENU_LABELS.length;
  // const actionMenuStack = [
  //   G_model_createVerticalMenu(
  //     x,
  //     y,
  //     menuWidth,
  //     G_BATTLE_MENU_LABELS,
  //     handleActionMenuSelected,
  //     party.inv.filter(item => !!item.onUse).length ? [] : [G_ACTION_USE], //  if no items, disable items, if items enable it
  //     true,
  //     lineHeight
  //   ),
  // ];

  const allies = makeAllies(party.characters);
  const enemies = makeEnemies(encounter.enemies);
  const battle: Battle = {
    party,
    allies,
    enemies,
    rounds: [],
    roundIndex: 0,
    // actionMenuStack,
    text: '',
    // aiSeed: G_utils_getRandNum(3) + 1,
    completionState: CompletionState.COMPLETION_IN_PROGRESS,
  };

  // G_model_battleAdvantage(battle, advantage);

  const firstRound = createRound(allies.concat(enemies));
  battleAddRound(battle, firstRound);
  return battle;
};

const createRound = (turnOrder: Unit[]): Round => {
  return {
    turnOrder,
    currentIndex: 0,
  };
};

const battleAddRound = (battle: Battle, round: Round) => {
  battle.rounds.push(round);
};

export const battleGetCurrentRound = (battle: Battle): Round => {
  return battle.rounds[battle.roundIndex];
};
