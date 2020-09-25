import React from 'react';
import { makeStyles } from '@material-ui/core';

interface Commands {
  actions: string[];
}

const useStyles = makeStyles(() => {
  return {
    actionContainer: {
      backgroundColor: 'black',
      color: 'white',
      width: '10%',
      justifyContent: 'center',
    },
  };
});

const ActionMenu = (props: Commands): JSX.Element => {
  const { actions } = props;
  const classes = useStyles();

  return (
    <div className={classes.actionContainer}>
      {actions.map((action, i) => {
        return <div key={i}>{action}</div>;
      })}
    </div>
  );
};

export default ActionMenu;
