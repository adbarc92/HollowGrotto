// NPM Module Imports
import React, { useEffect } from 'react';
// Custom Component Imports
import BattleCmpt from 'components/Cmpt.Battle';
import StartScreenCmpt from 'components/Cmpt.StartScreen';
// Model Imports
import { Party, createTestParty } from 'model/Model.Party';
import { Battle, createBattle } from 'model/Model.Battle';
import { ENCOUNTER_0, EncounterDef } from 'model/Model.Database'; // temporary
// Controller Imports
// Utils Imports
import { loadImagesAndSprites } from 'utils/Sprites';
// Material-UI Imports
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import createGlobalStyle from 'styled-components';

const GlobalStyle = createGlobalStyle`body {--rowNum: 4;--gridHeight: 400px;}`;

// const GlobalStyle = createGlobalStyle`
// body{
// 	width: 100%;
// }
// `;

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

const App = (): JSX.Element => {
  const [scale, setScale] = React.useState<number>(2);
  const classes = useStyles();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [currentBattle, setCurrentBattle] = React.useState<null | Battle>(null);
  const [gameStarted, setGameStarted] = React.useState(false);

  const AppInterface = {
    setLoading,
    setScale,
    setCurrentBattle,
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
        <GlobalStyle />
        <div className={classes.topContainer}>
          <div className={classes.canvasContainer}>
            {currentBattle ? <BattleCmpt battle={currentBattle} /> : <div />}
          </div>
        </div>
      </div>
    );
  }
};

export default App;
