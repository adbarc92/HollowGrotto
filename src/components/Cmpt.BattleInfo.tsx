import React from 'react';

import { makeStyles } from '@material-ui/core';
import { Allegiance, Unit } from 'model/Model.Unit';
import { Battle } from 'model/Model.Battle';
import { getScreenSize } from './ReactCanvas';

interface BattleInfoProps {
  team: Unit[];
  allegiance: Allegiance;
}

interface InfoRowCmpt {
  unit: Unit;
  key: number;
}

const useStyles = makeStyles(() => {
  return {
    infoContainer: {
      display: 'flex',
      position: 'absolute',
      flexDirection: 'column',
      borderRadius: '15px',
      backgroundColor: '#C2C3C7',
      borderStyle: 'solid',
      borderColor: 'white',
      WebkitTextStroke: '0.5px black',
      color: 'white',
      padding: '10px',
      fontSize: '12px',
      top: `${getScreenSize() - 95}px`,
      left: `${0 + getScreenSize() / 2}px`,
    },
    rowContainer: {
      display: 'flex',
      flexDirection: 'row',
    },
    rowItem: {
      paddingRight: '10px',
      paddingLeft: '10px',
    },
  };
});

const InfoRowCmpt = (props): JSX.Element => {
  const classes = useStyles();
  const { unit, key } = props;
  const { bS, cS } = unit;
  return (
    <div className={classes.rowContainer} key={key}>
      <div className={classes.rowItem}>{unit.name}</div>
      <div className={classes.rowItem}>
        {cS.hp}/{bS.hp}
      </div>
      <div className={classes.rowItem}>{cS.iCnt}</div>
      <div className={classes.rowItem}>{cS.cCnt}</div>
    </div>
  );
};

const BattleInfoCmpt = (props: BattleInfoProps): JSX.Element => {
  const classes = useStyles();
  const headers = ['Unit', 'HP', 'Charge', 'Break/Heal'];
  const { team, allegiance } = props;
  return (
    <div className={classes.infoContainer} style={{ zIndex: 10 }}>
      <div>
        {headers.map((header, i) => {
          return (
            <span className={classes.rowItem} key={i}>
              {header}
            </span>
          );
        })}
      </div>
      <div>
        {team.map((unit, i) => {
          return <InfoRowCmpt unit={unit} key={i} />;
        })}
      </div>
    </div>
  );
};

export default BattleInfoCmpt;
