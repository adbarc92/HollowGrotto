import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => {
  return {
    startScreen: {
      width: window.innerWidth,
      height: window.innerHeight,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});

interface StartScreenProps {
  setGameStarted: (gamestarted: boolean) => void;
}

// it flickers and bounces around the screen, randomly. Any click on the screen starts the app.

const StartScreenCmpt = (props: StartScreenProps): JSX.Element => {
  const { setGameStarted } = props;
  const classes = useStyles();

  return (
    <div className={classes.startScreen} onClick={() => setGameStarted(true)}>
      Click to start
    </div>
  );
};

export default StartScreenCmpt;
