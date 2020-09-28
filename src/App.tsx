// NPM Module Imports
import React, { useEffect } from 'react';
// Custom Component Imports
import BattleCmpt from 'components/Cmpt.Battle';
import VerticalMenuCmpt from 'components/Cmpt.VerticalMenu';
// import TurnOrderCmpt from 'components/Cmpt.TurnOrder';
import TurnOrderList from 'components/Cmpt.TurnOrderList';
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
  const [scale, setScale] = React.useState(2);
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [battle, setBattle] = React.useState<null | Battle>(null);
  const [menuIndex, setMenuIndex] = React.useState<null | number>(null);
  const AppInterface = {
    setLoading,
    setScale,
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
      setBattle(battleTemp);
    };

    load();
  }, []);
  (window as any).AppInterface = AppInterface;
  if (loading) {
    return <CircularProgress />;
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
    return (
      <div>
        <div className={classes.topContainer}>
          <div className={classes.canvasContainer}>
            {battle ? <BattleCmpt battle={battle} /> : <div />}
          </div>
          <div>
            {battle ? (
              <TurnOrderList
                battle={battle}
                turnOrder={battleGetCurrentRound(battle).turnOrder}
              />
            ) : (
              <div />
            )}
          </div>
        </div>
        <div className={classes.menuContainer}>
          {battle ? (
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
