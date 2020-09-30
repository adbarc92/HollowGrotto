import { Allegiance, Unit, unitResetPosition } from 'model/Model.Unit';
import { Character, createCharacterFromTemplate } from 'model/Model.Character';
import { Facing, actorSetFacing } from 'model/Model.Actor';
import { CharacterDef, EncounterDef } from 'model/Model.Database';
import { Party } from 'model/Model.Party';
import { getSpriteSize } from 'utils/Sprites';
import { areAllUnitsDead, getRandNum } from 'utils/Utils';

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

export enum RoundAction {
  ACTION_STRIKE,
  ACTION_CHARGE,
  ACTION_INTERRUPT,
  ACTION_DEFEND,
  ACTION_HEAL,
  ACTION_USE,
  ACTION_FLEE,
  ACTION_RENEW,
}

// type RoundAction = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
// const G_ACTION_STRIKE: RoundAction = 0; // requires target
// const G_ACTION_CHARGE: RoundAction = 1;
// const G_ACTION_INTERRUPT: RoundAction = 2; // requires target
// const G_ACTION_DEFEND: RoundAction = 3;
// const G_ACTION_HEAL: RoundAction = 4;
// const G_ACTION_USE: RoundAction = 5; // may require target
// const G_ACTION_FLEE: RoundAction = 6;
// const G_ACTION_RENEW: RoundAction = 7;
const G_BATTLE_MENU_LABELS = [
  // make sure these indices match above
  'Strike',
  'Charge',
  'Break',
  'Defend',
  'Heal',
  'Item',
  'Flee',
];

let model_battlePostActionCb = () => {};
export const setBattlePostActionCb = (cb: () => void): void => {
  model_battlePostActionCb = cb;
};
export const getBattlePostActionCb = () => model_battlePostActionCb;

export interface Battle {
  party: Party;
  allies: Unit[];
  enemies: Unit[];
  rounds: Round[];
  roundIndex: 0;
  // actionMenuStack: Menu[];
  text: string;
  aiSeed: number;
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
    aiSeed: getRandNum(3) + 1,
    completionState: CompletionState.COMPLETION_IN_PROGRESS,
  };

  // G_model_battleAdvantage(battle, advantage);

  const firstRound = createRound(allies.concat(enemies));
  battleAddRound(battle, firstRound);
  return battle;
};

export const battleAddRound = (battle: Battle, round: Round): void => {
  battle.rounds.push(round);
};

export const battleGetCurrentRound = (battle: Battle): Round => {
  return battle.rounds[battle.roundIndex];
};

export const battleIsComplete = (battle: Battle): boolean => {
  return (
    areAllUnitsDead(battle.enemies) ||
    areAllUnitsDead(battle.allies) ||
    battle.completionState !== CompletionState.COMPLETION_IN_PROGRESS
  );
};

export const battleIncrementIndex = (battle: Battle) => {
  battle.roundIndex++;
};

export const roundIsOver = (round: Round): boolean => {
  return roundGetActingUnit(round) === null;
};

export const roundGetActingUnit = (round: Round): Unit | null => {
  return round.turnOrder[round.currentIndex] || null;
};

export const roundIncrementIndex = (round: Round) => {
  round.currentIndex++;
};

export const createRound = (turnOrder: Unit[]): Round => {
  return {
    turnOrder,
    currentIndex: 0,
  };
};

// NOTE: Move this
export const actionToString = (i: number): string => {
  return G_BATTLE_MENU_LABELS[i];
};
