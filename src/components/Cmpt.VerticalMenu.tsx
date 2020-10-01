import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core';

// Should manage its own state--state is not passed in
interface VerticalMenuProps {
  // menu: Menu;
  // menuIndex: null | number;
  // setMenuIndex: (menuIndex: number | null) => void;
  items: string[];
  cb: (i: number) => void;
  cancelCb: () => void;
  disabledItems?: number[];
  backgroundColor?: string;
  defaultIndex?: number;
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
      textShadow: 'black 1px 0 5px',
    },
  };
});

const VerticalMenuCmpt = (props: VerticalMenuProps): JSX.Element => {
  const classes = useStyles();
  const [menuIndex, setMenuIndex] = React.useState<null | number>(null);
  const { items, cb } = props;

  useEffect(() => {
    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.which === 27) {
        props.cancelCb();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    // Return value executes when component unmounts
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [props]);

  return (
    <div className={classes.menuContainer}>
      {items.map((option, i) => {
        return (
          <span
            className={menuIndex === i ? classes.menuItemLit : classes.menuItem}
            key={i}
            onMouseEnter={() => setMenuIndex(i)}
            onMouseLeave={() => setMenuIndex(null)}
            onClick={() => {
              cb(i);
            }} //
          >
            {option}
          </span>
        );
      })}
    </div>
  );
};

export default VerticalMenuCmpt;
