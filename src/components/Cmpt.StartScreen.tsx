import React from 'react';

interface StartScreenProps {
  setGameStarted: (gamestarted: boolean) => void;
}

// it flickers and bounces around the screen, randomly. Any click on the screen starts the app.

const StartScreenCmpt = (props: StartScreenProps): JSX.Element => {
  const { setGameStarted } = props;

  return <div onClick={() => setGameStarted(true)}>Click to start</div>;
};

export default StartScreenCmpt;
