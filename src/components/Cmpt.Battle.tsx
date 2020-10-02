// Module Imports
import React, { useEffect } from 'react';
import { Stage, Layer, Group } from 'react-konva';
// Custom Component Imports
import UnitCmpt from 'components/Cmpt.Unit';
import BattleBg from 'components/Cmpt.BattleBg';
import TurnOrderListCmpt from 'components/Cmpt.TurnOrderList';
import VerticalMenuCmpt from 'components/Cmpt.VerticalMenu';
import BattleInfoCmpt from 'components/Cmpt.BattleInfo';
// Model Imports
import {
  Battle,
  G_BATTLE_MENU_LABELS,
  battleGetCurrentRound,
  RoundAction,
} from 'model/Model.Battle';
// import { Unit } from 'model/Model.Unit';
import { roundApplyAction, doBattle } from 'controller/combat';
// Misc
import { makeStyles } from '@material-ui/core';
import { Allegiance } from 'model/Model.Unit';

// Represents which menu is currently displayed
export enum PlayerInputState {
  SelectingAction,
  SelectingTarget,
  SelectingItem,
  InputDisabled,
}

interface BattleProps {
  battle: Battle;
}

const useStyles = makeStyles(() => {
  return {
    menuContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    battleContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    infoContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
  };
});

const BattleCmpt = (props: BattleProps): JSX.Element => {
  const classes = useStyles();
  //
  const [playerInputState, setPlayerInputState] = React.useState(
    PlayerInputState.SelectingAction
  );
  const [battleOngoing, setBattleOngoing] = React.useState(false);
  const [selectedAction, setSelectedAction] = React.useState<RoundAction>(
    RoundAction.ACTION_STRIKE
  );
  // const [target, setTarget] = React.useState<Unit | null>(null);
  // const [menuIndex, setMenuIndex] = React.useState<null | number>(null);
  const { battle } = props;
  const { allies, enemies } = battle;

  const setPlayerReady = () => {
    setPlayerInputState(PlayerInputState.SelectingAction);
  };

  const setPlayerDisabled = () => {
    setPlayerInputState(PlayerInputState.InputDisabled);
  };

  const BattleInterface = {
    setPlayerReady,
    setPlayerDisabled,
  };

  useEffect(() => {
    if (!battleOngoing) {
      doBattle(battle);
      setBattleOngoing(true);
    }
  }, [battle, battleOngoing]);

  (window as any).BattleInterface = BattleInterface;

  return (
    <div className={classes.battleContainer}>
      <div>
        <Stage width={512} height={512}>
          <Layer imageSmoothingEnabled={false}>
            <BattleBg width={512} height={512} />
          </Layer>
          <Layer imageSmoothingEnabled={false}>
            <Group>
              {allies.map((unit, i) => {
                return <UnitCmpt key={i} unit={unit} />;
              })}
            </Group>
            <Group>
              {enemies.map((unit, i) => {
                return <UnitCmpt key={i} unit={unit} />;
              })}
            </Group>
          </Layer>
        </Stage>
      </div>
      <div className={classes.infoContainer}>
        <div>
          <TurnOrderListCmpt battle={battle} />
        </div>
        <div className={classes.menuContainer}>
          {playerInputState === PlayerInputState.SelectingAction ? (
            <VerticalMenuCmpt
              items={G_BATTLE_MENU_LABELS}
              cb={i => {
                const round = battleGetCurrentRound(battle);

                setSelectedAction(i);

                switch (i) {
                  case RoundAction.ACTION_STRIKE: {
                    setPlayerInputState(PlayerInputState.SelectingTarget);
                    // const target: Unit | null = await selectTarget(battle);
                    // const target =
                    // if (target) {
                    // roundApplyAction(RoundAction.ACTION_STRIKE, round, target);
                    // }
                    break;
                  }
                  case RoundAction.ACTION_CHARGE:
                    roundApplyAction(RoundAction.ACTION_CHARGE, round, null);
                    break;
                  case RoundAction.ACTION_DEFEND:
                    roundApplyAction(RoundAction.ACTION_DEFEND, round, null);
                    break;
                  case RoundAction.ACTION_HEAL:
                    roundApplyAction(RoundAction.ACTION_HEAL, round, null);
                    break;
                  case RoundAction.ACTION_USE: {
                    setPlayerInputState(PlayerInputState.SelectingTarget);
                    // const item = await battleSelectItem(battle);
                    // if (item) {
                    //   roundApplyAction(RoundAction.ACTION_USE, round, null, item);
                    // }
                    // // battle.actionMenuStack.shift();
                    // setPlayerInputState(PlayerInputState.InputDisabled);
                    break;
                  }
                  case RoundAction.ACTION_INTERRUPT: {
                    setPlayerInputState(PlayerInputState.SelectingTarget);
                    // const target: Unit | null = await selectTarget(battle);
                    // if (!target) {
                    //   roundApplyAction(RoundAction.ACTION_INTERRUPT, round, target);
                    // }
                    break;
                  }
                  case RoundAction.ACTION_FLEE: {
                    roundApplyAction(RoundAction.ACTION_FLEE, round, null);
                    break;
                  }
                  default:
                    console.error('Action', i, 'Is not implemented yet.');
                }
              }}
              cancelCb={function () {
                setPlayerInputState(PlayerInputState.SelectingTarget);
              }}
            />
          ) : null}
          {playerInputState === PlayerInputState.SelectingTarget ? (
            <VerticalMenuCmpt
              items={battle.enemies.map(unit => {
                return unit.name;
              })}
              cb={i => {
                const round = battleGetCurrentRound(battle);
                const target = battle.enemies[i];
                setPlayerInputState(PlayerInputState.InputDisabled);
                roundApplyAction(selectedAction, round, target);
              }}
              cancelCb={() =>
                setPlayerInputState(PlayerInputState.SelectingAction)
              }
            />
          ) : null}
        </div>
      </div>
      <BattleInfoCmpt team={allies} allegiance={Allegiance.ALLEGIANCE_ALLY} />
    </div>
  );
};

export default BattleCmpt;
