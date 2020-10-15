// NPM Module Imports
import React, { useEffect } from 'react';
// Custom Component Imports
import BattleCmpt from 'components/Cmpt.Battle';
import StartScreenCmpt from 'components/Cmpt.StartScreen';
import RoomCmpt from 'components/Cmpt.Room';
// Model Imports
import { Party, createTestParty } from 'model/Model.Party';
import { Battle, createBattle } from 'model/Model.Battle';
// import { Room } from 'model/Model.Room';
import { G_ENCOUNTER_1, EncounterDef } from 'model/Model.Database'; // temporary
import { World, createWorld, worldGetCurrentRoom } from 'model/Model.World';
// Controller Imports
// Utils Imports
import { loadImagesAndSprites } from 'utils/Sprites';
import { loadSounds } from 'utils/sound';
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
    topContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  };
});

export const CANVAS_HEIGHT = 512;
export const CANVAS_WIDTH = 512;

export const getScreenSize = (): number => {
  return CANVAS_HEIGHT;
};

const App = (): JSX.Element => {
  const [scale, setScale] = React.useState<number>(2);
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [currentBattle, setCurrentBattle] = React.useState<null | Battle>(null);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [world, setWorld] = React.useState<World | null>(null);
  // const [room, setRoom] = React.useState<Room | null>(null);

  const AppInterface = {
    setLoading,
    setScale,
    setCurrentBattle,
    currentBattle,
    scale,
    world,
    // room,
  };

  // Create Teams
  const party: Party = createTestParty();
  const enemies: EncounterDef = G_ENCOUNTER_1;

  useEffect(() => {
    const load = async () => {
      await loadImagesAndSprites();
      setLoading(false);
      loadSounds();
      setWorld(createWorld());
      // const battleTemp = createBattle(party, enemies);
      // setCurrentBattle(battleTemp);
    };
    if (!isLoaded) {
      load();
      setIsLoaded(true);
    }
  }, [isLoaded, enemies, party, currentBattle]);

  (window as any).AppInterface = AppInterface;

  if (loading) {
    return <CircularProgress />;
  } else if (!gameStarted) {
    return <StartScreenCmpt setGameStarted={setGameStarted} />;
  } else {
    // Should return a battle component with currentBattle, which includes a battle display, turn order display, and vertical menu component
    return (
      <div>
        <div className={classes.topContainer}>
          <div className={classes.canvasContainer}>
            {currentBattle ? (
              <BattleCmpt battle={currentBattle} />
            ) : (
              <RoomCmpt room={worldGetCurrentRoom(world as World)} />
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default App;
