import React from 'react';

import { makeStyles } from '@material-ui/core';

interface VerticalMenuProps {
  options: string[];
  menuIndex: null | number;
  setMenuIndex: (menuIndex: number | null) => void;
}

const useStyles = makeStyles(() => {
  return {
    menuContainer: {
      borderRadius: '15px',
      backgroundColor: '#C2C3C7',
      borderStyle: 'solid',
      borderColor: 'white',
      // borderWidth: '10px',
      display: 'inline-flex',
      flexDirection: 'column',
      color: 'white',
      WebkitTextStroke: '0.5px black',
      fontSize: '20px',
      padding: '10px',
      alignItems: 'center',
      border: '0',
    },
    menuItemLit: {
      color: 'white',
      textShadow: 'blue 1px 0 5px',
    },
    menuItem: {
      color: 'white',
      textShadow: 'gray 1px 0 5px',
    },
  };
});

const VerticalMenuCmpt = (props: VerticalMenuProps): JSX.Element => {
  const classes = useStyles();
  const { options, menuIndex, setMenuIndex } = props;
  return (
    <div className={classes.menuContainer}>
      {options.map((option, i) => {
        return (
          <span
            className={menuIndex === i ? classes.menuItemLit : classes.menuItem}
            key={i}
            onMouseEnter={() => setMenuIndex(i)}
            onMouseLeave={() => setMenuIndex(null)}
          >
            {option}
          </span>
        );
      })}
    </div>
  );
};

export default VerticalMenuCmpt;
