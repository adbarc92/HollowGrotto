import React from 'react';

import { Unit, Allegiance } from 'model/Model.Unit';
import { Battle, battleGetCurrentRound } from 'model/Model.Battle';

import { isAlly } from 'utils/Utils';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => {
  return {
    list: {
      backgroundColor: '#C2C3C7',
      alignItems: 'center',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      margin: '10px',
      padding: '10px',
      borderRadius: '15px',
      textShadow: 'gray 1px 0 5px',
      WebkitTextStroke: '0.3px black',
    },
    listItemAlly: {
      backgroundColor: 'green',
      padding: '5px',
      borderRadius: '5px',
    },
    listItemEnemy: {
      backgroundColor: 'red',
      padding: '5px',
      borderRadius: '5px',
    },
  };
});

interface TurnListProps {
  battle: Battle;
}

interface TurnListItemProps {
  unit: Unit;
  allegiance: Allegiance;
}

const TurnListItem = (props: TurnListItemProps): JSX.Element => {
  const classes = useStyles();
  const { unit, allegiance } = props;
  const { name } = unit;
  return (
    <span
      className={
        allegiance === Allegiance.ALLEGIANCE_ALLY
          ? classes.listItemAlly
          : classes.listItemEnemy
      }
      // onMouseEnter={() => toggleUnitHighlight(unit)}
      // onMouseLeave={() => toggleUnitHighlight(unit)}
    >
      {name}
    </span>
  );
};

const TurnListCmpt = (props: TurnListProps): JSX.Element => {
  const classes = useStyles();
  const { battle } = props;
  const { turnOrder } = battleGetCurrentRound(battle);
  return (
    <div className={classes.list}>
      {turnOrder.map((unit, i) => {
        return (
          <TurnListItem
            allegiance={
              isAlly(battle, unit)
                ? Allegiance.ALLEGIANCE_ALLY
                : Allegiance.ALLEGIANCE_ENEMY
            }
            key={i}
            unit={unit}
          />
        );
      })}
    </div>
  );
};

export default TurnListCmpt;
