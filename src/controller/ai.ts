import { Battle, Round, RoundAction } from 'model/Model.Battle';
import { Unit, AI } from 'model/Model.Unit';
import { roundApplyAction } from 'controller/combat';

const G_controller_AIgetWeakestEnemy = (enemies: Unit[]): Unit => {
  let weakest = enemies[0];
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].cS.hp < weakest.cS.hp) {
      weakest = enemies[i];
    }
  }
  return weakest;
};

export const doAI = (battle: Battle, round: Round, actingUnit: Unit): void => {
  const target = G_controller_AIgetWeakestEnemy(battle.allies);
  const { roundIndex, aiSeed } = battle;
  switch (actingUnit.ai) {
    case AI.CHARGER: // Charger
      if (actingUnit.cS.cCnt < actingUnit.cS.iCnt) {
        roundApplyAction(RoundAction.ACTION_CHARGE, round, null);
        // G_model_showChargeStatus(battle, actingUnit);
      } else {
        roundApplyAction(RoundAction.ACTION_STRIKE, round, target);
      }

      break;
    case AI.STRIKER: // Striker
      // AI (the dumb version): select a random target and STRIKE

      roundApplyAction(RoundAction.ACTION_STRIKE, round, target);
      break;
    case AI.BREAKER:
      // console.log('will break on:', aiSeed);
      const action =
        roundIndex % (aiSeed + 2) === 0
          ? RoundAction.ACTION_INTERRUPT
          : RoundAction.ACTION_STRIKE;
      roundApplyAction(action, round, target);
      break;
    case AI.BOSS:
      // Interrupt charge > 3
      let bossTarget = G_controller_AIgetWeakestEnemy(battle.allies);
      let bossAction: RoundAction;
      if (roundIndex % (aiSeed + 2) === 0) {
        if (actingUnit.cS.iCnt < 2) {
          bossAction = RoundAction.ACTION_RENEW;
          roundApplyAction(bossAction, round, null);
        } else {
          bossAction = RoundAction.ACTION_INTERRUPT;
          bossTarget = G_controller_AIgetWeakestEnemy(battle.allies);
          // bossTarget = G_utils_getChargedEnemy(battle, battle.allies);
          roundApplyAction(bossAction, round, bossTarget);
        }
      } else {
        bossAction =
          actingUnit.cS.cCnt < 2
            ? RoundAction.ACTION_CHARGE
            : RoundAction.ACTION_STRIKE;
        roundApplyAction(bossAction, round, bossTarget);
      }
  }
};
