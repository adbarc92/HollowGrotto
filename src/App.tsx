import React, { useEffect } from 'react';
import { Stage, Layer, Sprite } from 'react-konva';
import Header from 'defunct/Header';
import ReactCanvas from 'components/ReactCanvas';
import { Party, createTestParty, partyAddCharacter } from 'model/Model.Party';
import { loadImagesAndSprites, getSprite } from 'utils/Sprites';
import UnitCmpt from 'components/Cmpt.Unit';
import BattleCmpt from 'components/Cmpt.Battle';
import { ENCOUNTER_0, EncounterDef } from 'model/Model.Database'; // temporary
import { Battle, createBattle } from 'model/Model.Battle';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => {
  return {
    canvasContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});

// import UnitDetails, { Unit } from './components/UnitDetails';
// import ActionMenu from './components/ActionMenu';

const App = (): JSX.Element => {
  const [scale, setScale] = React.useState(2);
  const classes = useStyles();
  const [loading, setLoading] = React.useState(true);
  const [battle, setBattle] = React.useState<null | Battle>(null);
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
    return <div>Loading</div>;
  } else {
    const sprite = getSprite('actors_0');
    const [img, x, y, w, h] = sprite;
    const animations = {
      default: [x, y, w, h],
    };
    return (
      <div className={classes.canvasContainer}>
        {battle ? <BattleCmpt battle={battle} /> : <div />}
      </div>
    );
  }
};

export default App;
