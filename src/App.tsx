// NPM Module Imports
import React, { useEffect } from 'react';
// Custom Component Imports
import BattleCmpt from 'components/Cmpt.Battle';
import VerticalMenuCmpt from 'components/Cmpt.VerticalMenu';
// import TurnOrderCmpt from 'components/Cmpt.TurnOrder';
import TurnOrderList from 'components/Cmpt.TurnOrderList';
import StartScreenCmpt from 'components/Cmpt.StartScreen';
// JS13k Imports
import { Party, createTestParty } from 'model/Model.Party';
import { loadImagesAndSprites } from 'utils/Sprites';
import {
  Battle,
  createBattle,
  battleGetCurrentRound,
} from 'model/Model.Battle';
import { ENCOUNTER_0, EncounterDef } from 'model/Model.Database'; // temporary
// Material-UI Imports
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => {
  return {
    canvasContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px',
    },
    menuContainer: {
      display: 'flex',
      flexDirection: 'row',
      // alignItems: 'center',
      justifyContent: 'center',
    },
    topContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  };
});

const App = (): JSX.Element => {
  const [scale, setScale] = React.useState<number>(2);
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [currentBattle, setCurrentBattle] = React.useState<null | Battle>(null);
  const [inputEnabled, setInputEnabled] = React.useState<boolean>(true);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [menuIndex, setMenuIndex] = React.useState<null | number>(null);

  const AppInterface = {
    setLoading,
    setScale,
    setCurrentBattle,
    setInputEnabled,
    currentBattle,
    scale,
  };
  // Create Teams
  const party: Party = createTestParty();
  const enemies: EncounterDef = ENCOUNTER_0;

  useEffect(() => {
    const load = async () => {
      await loadImagesAndSprites();
      setLoading(false);
      const battleTemp = createBattle(party, enemies);
      setCurrentBattle(battleTemp);
      // display click to start
    };

    load();
  }, []);
  (window as any).AppInterface = AppInterface;

  if (loading) {
    return <CircularProgress />;
  } else if (!gameStarted) {
    return <StartScreenCmpt setGameStarted={setGameStarted} />;
  } else {
    const options = [
      'Strike',
      'Charge',
      'Break',
      'Defend',
      'Heal',
      'Item',
      'Flee',
    ];
    // Should return a battle component with currentBattle, which includes a battle display, turn order display, and vertical menu component
    return (
      <div>
        <div className={classes.topContainer}>
          <div className={classes.canvasContainer}>
            {currentBattle ? <BattleCmpt battle={currentBattle} /> : <div />}
          </div>
          <div>
            {currentBattle ? (
              <TurnOrderList
                battle={currentBattle}
                turnOrder={battleGetCurrentRound(currentBattle).turnOrder}
              />
            ) : (
              <div />
            )}
          </div>
        </div>
        <div className={classes.menuContainer}>
          {currentBattle && inputEnabled ? (
            <VerticalMenuCmpt
              setMenuIndex={setMenuIndex}
              menuIndex={menuIndex}
              options={options}
            />
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
};

export default App;
