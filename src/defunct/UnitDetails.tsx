import React from 'react';
import { makeStyles } from '@material-ui/core';

export interface Unit {
  name: string;
  hp: number;
  maxHP: number;
  chargeCnt: number;
  breakCnt: number;
}

interface UnitDetailsProps {
  units: Unit[];
}

const useStyles = makeStyles(() => {
  return {
    infoBox: {
      backgroundColor: 'black',
      borderColor: 'white',
      borderWidth: '2px',
    },
    gridHeader: {
      gridArea: 'header',
      color: 'white',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    grid: {
      backgroundColor: 'black',
      borderColor: 'white',
      borderWidth: '10px',
      width: '30%',
      padding: '20px',
      border: 'solid',
    },
    gridRow: {
      color: 'white',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    gridItem: {
      color: 'white',
    },
  };
});

const UnitDetails = (props: UnitDetailsProps): JSX.Element => {
  const { units } = props;
  const classes = useStyles();
  return (
    <div className={classes.grid}>
      <div className={classes.gridHeader}>
        <div>Unit</div>
        <div>HP</div>
        <div>Max HP</div>
        <div>Charge</div>
        <div>Break/Heal</div>
      </div>
      {units.map(
        (unit: Unit, i): JSX.Element => {
          return (
            <div className={classes.gridRow} key={`row_${i}`}>
              <div className={classes.gridItem} key={`row_${i}_name`}>
                {unit.name}
              </div>
              <div className={classes.gridItem} key={`row_${i}_hp`}>
                {unit.hp}
              </div>
              <div className={classes.gridItem} key={`row_${i}_maxHP`}>
                {unit.maxHP}
              </div>
              <div className={classes.gridItem} key={`row_${i}_charge`}>
                {unit.chargeCnt}
              </div>
              <div className={classes.gridItem} key={`row_${i}_break`}>
                {unit.breakCnt}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default UnitDetails;
