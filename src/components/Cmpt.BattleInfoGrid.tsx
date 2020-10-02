import React from 'react';
import { Unit } from 'model/Model.Unit';

import { makeStyles } from '@material-ui/core';

interface BattleInfoProps {
  team: Unit[];
}

const useStyles = makeStyles(() => {
  return {
    gridContainer: {
      display: 'grid',
      gridTemplateRows: 'repeat(var(--rowNum),var(--gridHeight))',
      gridTemplateColumns: 'auto auto auto auto',
    },
    boxHeader0: {
      gridRow: '1/2',
      gridColumn: '1/2',
    },
    boxHeader1: {
      gridRow: '1/2',
      gridColumn: '2/3',
    },
    boxHeader2: {
      gridRow: '1/2',
      gridColumn: '3/4',
    },
    boxHeader3: {
      gridRow: '1/2',
      gridColumn: '4/5',
    },
    boxName0: {
      gridColumn: '1/2',
      gridRow: '2/3',
    },
    boxName1: {
      gridColumn: '1/2',
      gridRow: '3/4',
    },
    boxName2: {
      gridColumn: '1/2',
      gridRow: '4/5',
    },
    boxName3: {
      gridColumn: '1/2',
      gridRow: '5/6',
    },
    boxHp0: {
      gridColumn: '2/3',
      gridRow: '2/3',
    },
    boxHp1: {
      gridColumn: '2/3',
      gridRow: '3/4',
    },
    boxHp2: {
      gridColumn: '2/3',
      gridRow: '4/5',
    },
    boxHp3: {
      gridColumn: '2/3',
      gridRow: '5/6',
    },
    boxCharge0: {
      gridColumn: '3/4',
      gridRow: '2/3',
    },
    boxCharge1: {
      gridColumn: '3/4',
      gridRow: '3/4',
    },
    boxCharge2: {
      gridColumn: '3/4',
      gridRow: '4/5',
    },
    boxCharge3: {
      gridColumn: '3/4',
      gridRow: '5/6',
    },
    boxInt0: {
      gridColumn: '4/5',
      gridRow: '2/3',
    },
    boxInt1: {
      gridColumn: '4/5',
      gridRow: '3/4',
    },
    boxInt2: {
      gridColumn: '4/5',
      gridRow: '4/5',
    },
    boxInt3: {
      gridColumn: '4/5',
      gridRow: '5/6',
    },
  };
});

const BattleInfoGridCmpt = (props: BattleInfoProps): JSX.Element => {
  const { team } = props;
  const classes = useStyles();
  const headers = ['Unit', 'HP', 'Charge', 'Break/Heal'];
  return (
    <div>
      <div className={classes.gridContainer}>
        {headers.map((header, i) => {
          return (
            <div className={classes[`boxHeader${i}`]} key={i}>
              {header}
            </div>
          );
        })}
        {team.map((unit, i) => {
          const { cS, bS, name } = unit;
          return (
            <div key={i}>
              <div className={classes[`boxName${i}`]}>{name}</div>
              <div className={classes[`boxHp${i}`]}>
                {cS.hp}/{bS.hp}
              </div>
              <div className={classes[`boxCharge${i}`]}>{cS.cCnt}</div>
              <div className={classes[`boxInt${i}`]}>{cS.iCnt}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BattleInfoGridCmpt;
