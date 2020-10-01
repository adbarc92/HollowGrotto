// Model Imports
import { Allegiance, Unit, unitResetPosition } from 'model/Model.Unit';
import { Character, createCharacterFromTemplate } from 'model/Model.Character';
import { Facing, actorSetFacing } from 'model/Model.Actor';
import { CharacterDef, EncounterDef } from 'model/Model.Database';
import { Party } from 'model/Model.Party';

// Utility Imports
import { getSpriteSize } from 'utils/Sprites';
import { areAllUnitsDead, getRandNum } from 'utils/Utils';
// Component Imports
// Controller Imports

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

export const G_BATTLE_MENU_LABELS = [
  // make sure these indices match above
  'Strike',
  'Charge',
  'Break',
  'Defend',
  'Heal',
  'Item',
  'Flee',
];

let model_battlePostActionCb = () => {
  console.log('surprise pizza');
};
export const setBattlePostActionCb = (cb: () => void): void => {
  model_battlePostActionCb = cb;
};
export const getBattlePostActionCb = (): (() => void) =>
  model_battlePostActionCb;

export interface Battle {
  party: Party;
  allies: Unit[];
  enemies: Unit[];
  rounds: Round[];
  roundIndex: 0;
  actionMenuStack: [];
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
  const margin = 16; // Same Value
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

// const selectTarget = async (battle: Battle): Promise<Unit | null> => {
//   return new Promise(resolve => {
//     const targets = battle.enemies;

//     const [startX, startY] = battleGetScreenPosition(
//       battle.allies,
//       0,
//       Allegiance.ALLEGIANCE_ENEMY
//     );

//     const disabledItems = battle.enemies
//       .map((_, i) => {
//         return i;
//       })
//       .filter(i => {
//         return !unitLives(battle.enemies[i]);
//       });

//     const scale = (window as any).AppInterface.scale;

//     // const x = startX * G_BATTLE_SCALE - G_CURSOR_WIDTH;
//     // const y = startY * G_BATTLE_SCALE + G_CURSOR_HEIGHT / 2; // ???
//     const x = startX * scale - 16;
//     const y = startY * scale - 16;
//     const h = 16 * scale; // lineHeight in pixels; constant is same value as battleGetScreenPosition's margin
// const targetMenu = createVerticalMenu(
//   x,
//   y,
//   100, // set this to 100 so I could debug by turning on the background
//   Array(targets.length).fill(''),
//   // this function is called when a target is selected
//   (i: number) => {
//     battle.actionMenuStack.shift(); // returns input to the last menu
//     if (i >= 0) {
//       resolve(targets[i]);
//     } else {
//       resolve(null);
//     }
//   },
//   disabledItems,
//   false,
//   h
// );
// targetMenu.i = -1;
// G_model_menuSetNextCursorIndex(targetMenu, 1);
// battle.actionMenuStack.unshift(targetMenu); // transfers input to the newly-created menu
//   });
// };

// export const handleActionMenuSelected = async (
//   i: RoundAction,
//   setPlayerInputState: (PlayerInputState) => void
// ): Promise<void> => {
//   // const battle = G_model_getCurrentBattle();
//   const battle = (window as any).AppInterface.currentBattle;
//   const round = battleGetCurrentRound(battle);

//   switch (i) {
//     case RoundAction.ACTION_STRIKE: {
//       const target: Unit | null = await selectTarget(battle);
//       if (target) {
//         roundApplyAction(RoundAction.ACTION_STRIKE, round, target);
//       }
//       break;
//     }
//     case RoundAction.ACTION_CHARGE:
//       roundApplyAction(RoundAction.ACTION_CHARGE, round, null);
//       break;
//     case RoundAction.ACTION_DEFEND:
//       roundApplyAction(RoundAction.ACTION_DEFEND, round, null);
//       break;
//     case RoundAction.ACTION_HEAL:
//       roundApplyAction(RoundAction.ACTION_HEAL, round, null);
//       break;
//     case RoundAction.ACTION_USE: {
//       const item = await battleSelectItem(battle);
//       if (item) {
//         roundApplyAction(RoundAction.ACTION_USE, round, null, item);
//       }
//       // battle.actionMenuStack.shift();
//       setPlayerInputState(PlayerInputState.InputDisabled);
//       break;
//     }
//     case RoundAction.ACTION_INTERRUPT: {
//       const target: Unit | null = await selectTarget(battle);
//       if (!target) {
//         roundApplyAction(RoundAction.ACTION_INTERRUPT, round, target);
//       }
//       break;
//     }
//     case RoundAction.ACTION_FLEE: {
//       roundApplyAction(RoundAction.ACTION_FLEE, round, null);
//       break;
//     }
//     default:
//       console.error('Action', i, 'Is not implemented yet.');
//   }
// };

export const createBattle = (party: Party, encounter: EncounterDef): Battle => {
  // advantage = advantage || G_ADVANTAGE_NONE;

  const allies = makeAllies(party.characters);
  const enemies = makeEnemies(encounter.enemies);
  const battle: Battle = {
    party,
    allies,
    enemies,
    rounds: [],
    roundIndex: 0,
    actionMenuStack: [],
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

export const battleIncrementIndex = (battle: Battle): void => {
  battle.roundIndex++;
};

export const roundIsOver = (round: Round): boolean => {
  return roundGetActingUnit(round) === null;
};

export const roundGetActingUnit = (round: Round): Unit | null => {
  return round.turnOrder[round.currentIndex] || null;
};

export const roundIncrementIndex = (round: Round): void => {
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
