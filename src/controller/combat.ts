import { Battle } from 'model/Model.Battle';
import {
  CompletionState,
  battleIsComplete,
  battleGetCurrentRound,
  roundIsOver,
  Round,
  createRound,
  roundIncrementIndex,
  battleAddRound,
  battleIncrementIndex,
  roundGetActingUnit,
  RoundAction,
  getBattlePostActionCb,
  setBattlePostActionCb,
  actionToString,
} from 'model/Model.Battle';
import { doAI } from 'controller/ai';
import {
  Unit,
  unitLives,
  unitResetDef,
  unitMoveForward,
  unitSetToCenter,
  unitModifySpeed,
  unitResetPosition,
  statsModifyHp,
  unitGainBreakCharge,
  unitGetTeam,
} from 'model/Model.Unit';
import { createVerticalMenu } from 'model/Model.Menu';
import { getScreenSize } from 'components/ReactCanvas';
import { Item } from 'model/Model.Party';
import { areAllUnitsDead, isAlly, waitMs } from 'utils/Utils';

// const G_controller_doBattle = async (battle: Battle) => {
//   return new Promise(async resolve => {
//     (window as any).AppInterface.setCurrentBattle(battle);
//     G_model_setBattleInputEnabled(false);

//     while (!G_model_battleIsComplete(battle)) {
//       await G_controller_battleSimulateNextRound(battle); // do the fight!
//     }

//     if (battle.completionState === G_COMPLETION_IN_PROGRESS) {
//       if (G_utils_areAllUnitsDead(battle.allies)) {
//         battle.completionState = G_COMPLETION_FAILURE;
//       } else if (G_utils_areAllUnitsDead(battle.enemies)) {
//         battle.completionState = G_COMPLETION_VICTORY;
//       } else {
//         battle.completionState = G_COMPLETION_INCONCLUSIVE;
//       }
//     }
//     G_model_setCurrentBattle(null);
//     resolve();
//   });

//   // console.log('Battle complete!');
//   // setTimeout(() => {
//   //   const battle2 = G_model_createBattle(battle.party, G_ENCOUNTER_0);
//   //   G_model_setCurrentBattle(battle2);
//   //   G_controller_doBattle(battle2);
//   // }, 2000); // For debugging
// };

const roundInit = (round: Round) => {
  // console.log('Start new round:', round);
  roundSort(round);
};

const roundSort = (round: Round) => {
  round.turnOrder = round.turnOrder.sort((a, b) => {
    return b.cS.spd - a.cS.spd;
  });
};

const roundEnd = (round: Round): Round => {
  return createRound(round.turnOrder); // Change
};

export const battleSimulateBattle = async (battle: Battle) => {
  (window as any).AppInterface.setCurrentBattle(battle);
  (window as any).AppInterface.setInputEnabled(false);

  while (!battleIsComplete(battle)) {
    await battleSimulateNextRound(battle); // do the fight!
  }

  if (battle.completionState === CompletionState.COMPLETION_IN_PROGRESS) {
    if (areAllUnitsDead(battle.allies)) {
      battle.completionState = CompletionState.COMPLETION_FAILURE;
    } else if (areAllUnitsDead(battle.enemies)) {
      battle.completionState = CompletionState.COMPLETION_VICTORY;
    } else {
      battle.completionState = CompletionState.COMPLETION_INCONCLUSIVE;
    }
  }
  (window as any).AppInterface.setCurrentBattle(null);
};

const battleSimulateNextRound = async (battle: Battle) => {
  const round = battleGetCurrentRound(battle);
  roundInit(round);

  // this part is hard-coded.  We'd probably want to generalize printing a unit with a function
  while (!roundIsOver(round)) {
    // console.log('Current Round Index:', round.currentIndex);
    await controller_battleSimulateTurn(battle, round);
    roundIncrementIndex(round);
  }

  const nextRound = roundEnd(round);
  battleAddRound(battle, nextRound);
  battleIncrementIndex(battle);
};

const controller_battleSimulateTurn = async (
  battle: Battle,
  round: Round
): Promise<void> => {
  const actingUnit = roundGetActingUnit(round) as Unit;
  if (!unitLives(actingUnit) || battleIsComplete(battle)) {
    return;
  }
  // Reset stats if necessary, here
  if (actingUnit.cS.def !== actingUnit.bS.def) {
    unitResetDef(actingUnit);
  }
  if (actingUnit.cS.spd === 0) {
    actingUnit.cS.spd = actingUnit.bS.spd;
    return;
  }
  const team = unitGetTeam(battle, actingUnit);
  unitMoveForward(team, actingUnit);
  return new Promise(resolve => {
    setBattlePostActionCb(resolve);
    const actionMenu = battle.actionMenuStack[0];
    if (isAlly(battle, actingUnit)) {
      if (actingUnit.cS.iCnt <= 0) {
        actionMenu.disabledItems.push(2, 4);
      } else {
        actionMenu.disabledItems = actionMenu.disabledItems.filter(
          i => i !== 2 && i !== 4
        );
      }
      // actionMenu.i = -1;
      // G_model_menuSetNextCursorIndex(actionMenu, 1, true);
      // G_model_setBattleInputEnabled(true);
      (window as any).AppInterface.setInputEnabled(true);
    } else {
      setTimeout(() => {
        doAI(battle, round, actingUnit);
      }, 1000);
    }
  });
};

export const roundApplyAction = async (
  action: RoundAction,
  round: Round,
  target: Unit | null,
  item?: Item
) => {
  // G_model_setBattleInputEnabled(false);
  (window as any).AppInterface.setInputEnabled(false);
  const battle = (window as any).AppInterface.currentBattle;
  // const battle = G_model_getCurrentBattle();
  const actingUnit = roundGetActingUnit(round) as Unit;
  unitSetToCenter(actingUnit);
  // Change animations here

  // G_model_actorSetAnimState(actingUnit.actor, G_ANIM_ATTACKING);

  battle.text = actionToString(action);
  await waitMs(1000);
  unitModifySpeed(actingUnit, action);
  switch (action) {
    case RoundAction.ACTION_STRIKE:
      const dmg = G_controller_battleActionStrike(actingUnit, target as Unit);
      battle.text = 'Did ' + -dmg + ' damage.';
      // G_view_playSound('actionStrike');

      // G_model_actorSetAnimState((target as Unit).actor, G_ANIM_STUNNED);
      // await G_utils_waitMs(800);
      // G_model_actorSetAnimState((target as Unit).actor, G_ANIM_DEFAULT);

      // if (!unitLives(target as Unit)) {
      //   const facing = isAlly(battle, target as Unit)
      //     ? G_FACING_UP_RIGHT
      //     : G_FACING_UP_LEFT;
      //   G_model_actorSetFacing((target as Unit).actor, facing);
      // }
      break;
    case RoundAction.ACTION_CHARGE:
      G_controller_battleActionCharge(actingUnit);
      // G_view_playSound('actionCharge');
      break;
    case RoundAction.ACTION_DEFEND:
      G_controller_battleActionDefend(actingUnit);
      // G_view_playSound('actionDefend');
      break;
    case RoundAction.ACTION_HEAL:
      G_controller_battleActionHeal(actingUnit);
      break;
    case RoundAction.ACTION_INTERRUPT:
      G_controller_battleActionInterrupt(actingUnit, target as Unit);
      break;
    case RoundAction.ACTION_FLEE:
      G_controller_battleActionFlee();
      break;
    case RoundAction.ACTION_RENEW:
      battle.text = 'Powers replenished.';
      G_controller_battleActionRenew(actingUnit);
      break;
    case RoundAction.ACTION_USE:
      if (item && item.onUse) {
        item.onUse(item);
      }
      break;
    default:
      console.error('No action:', action, 'exists.');
  }

  await waitMs(1250);
  const team = unitGetTeam(battle, actingUnit);
  unitResetPosition(actingUnit, team);
  // G_model_actorSetAnimState(actingUnit.actor, G_ANIM_DEFAULT);

  battle.text = '';

  await waitMs(500);
  getBattlePostActionCb()(); // resolve is called here
  // NOTE: Refactor this
  if (controller_roundRemoveDeadUnits(round)) {
    unitGainBreakCharge(actingUnit);
  }
};

const G_controller_battleActionStrike = (
  attacker: Unit,
  victim: Unit
): number => {
  const { cS, bS } = victim;
  const { def } = cS;
  const { dmg } = attacker.bS;
  const { cCnt } = attacker.cS;
  const damage = cCnt > 0 ? dmg * (cCnt + 1) : dmg;

  const dmgDone = -Math.floor(Math.max(damage - def, 1));
  attacker.cS.cCnt = 0;
  statsModifyHp(cS, bS, dmgDone);
  console.log(
    `${attacker.name} strikes ${victim.name} for ${-dmgDone} damage! (${
      victim.cS.hp
    } HP remaining)`
  );

  return dmgDone;
};

const G_controller_battleActionCharge = (unit: Unit) => {
  const { cS } = unit;
  cS.cCnt++;
};

const G_controller_battleActionInterrupt = (attacker: Unit, victim: Unit) => {
  attacker.cS.iCnt--;
  victim.cS.spd = 0;
  victim.cS.cCnt = 0;
};

const G_controller_battleActionHeal = (unit: Unit) => {
  const { cS, bS } = unit;
  cS.iCnt--;
  cS.hp = bS.hp;
};

const G_controller_battleActionDefend = (unit: Unit) => {
  const { cS } = unit;
  cS.def *= 1.5;
};

const G_controller_battleActionFlee = () => {
  // const battle = G_model_getCurrentBattle();
  const battle = (window as any).AppInterface.currentBattle;
  battle.completionState = CompletionState.COMPLETION_INCONCLUSIVE;
};

const G_controller_battleActionRenew = (unit: Unit) => {
  unit.cS.iCnt = unit.bS.mag;
};

export const battleSelectItem = async (
  battle: Battle
): Promise<Item | null> => {
  return new Promise(resolve => {
    const indexMap = {};
    const party = battle.party;
    let ctr = 0;
    const itemNames = party.inv
      .filter((item, i) => {
        indexMap[ctr] = i;
        ctr++;
        return !!item.onUse;
      })
      .map(item => item.name);

    const screenSize = getScreenSize();
    const menuWidth = 100;
    const lineHeight = 20;
    const x = screenSize / 2 - menuWidth / 2;
    const y = screenSize - screenSize / 2;
    const itemMenu = createVerticalMenu(
      x,
      y,
      menuWidth,
      itemNames,
      (i: number) => {
        const itemToUse = party.inv[indexMap[i]];
        resolve(itemToUse);
      },
      [],
      true,
      lineHeight
    );
    // itemMenu.i = -1;
    // G_model_menuSetNextCursorIndex(itemMenu, 1);
    battle.actionMenuStack.unshift(itemMenu); // transfers input to the newly-created menu
  });
};

const controller_roundRemoveDeadUnits = (round: Round): boolean => {
  const { turnOrder } = round;
  let unitSlain = false;
  for (let i = 0; i < turnOrder.length; i++) {
    if (!unitLives(turnOrder[i])) {
      turnOrder.splice(i, 1);
      unitSlain = true;
    }
  }
  return unitSlain;
};
