import React from 'react';
import { loadImages } from '../utils/LoadImage';
import ImageContainer from './ImageContainer';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => {
  return {
    header: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
    },
  };
});

const Header = (): JSX.Element => {
  const [customHeaderReady, setCustomHeaderReady] = React.useState(false);

  const classes = useStyles();

  return (
    <div>
      {true ? (
        <div className={classes.header}>
          <div>
            <ImageContainer src={`Runner1.png`} width={16} height={16} />
          </div>

          <h1>Hollow Grotto</h1>
          <div>
            <ImageContainer src={'Runner2.png'} width={16} height={16} />
          </div>
        </div>
      ) : (
        <img src={'logo.png'} alt={'logo'} />
      )}
    </div>
  );
};

export default Header;
