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
      align: 'center',
      padding: '10px',
      fontSize: '12px',
      top: `${getScreenSize() - 95}px`,
      left: `${0 + getScreenSize() / 2}px`,
    },
    // rowContainer: {
    //   display: 'flex',
    //   flexDirection: 'row',
    // },
    rowItem: {
      paddingRight: '5px',
      paddingLeft: '5px',
      align: 'center',
    },
  };
});

const BattleInfoCmpt = (props: BattleInfoProps): JSX.Element => {
  const classes = useStyles();
  const headers = ['Unit', 'HP', 'Charge', 'Break/Heal'];
  const { team, allegiance } = props;
  return allegiance === Allegiance.ALLEGIANCE_ALLY ? (
    // <table style={{ zIndex: 10 }}>
    <table className={classes.infoContainer} style={{ zIndex: 10 }}>
      <thead>
        <tr>
          {headers.map((header, i) => {
            return (
              <th className={classes.rowItem} key={i}>
                {/* <th className={classes.rowItem} key={i}> */}
                {header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {team.map((unit, i) => {
          const { name, cS, bS } = unit;
          return (
            <tr key={i}>
              {/* <tr key={i}> */}
              <td className={classes.rowItem}>{name}</td>
              <td className={classes.rowItem}>{`${cS.hp} / ${bS.hp}`}</td>
              <td className={classes.rowItem}>{cS.cCnt}</td>
              <td className={classes.rowItem}>{cS.iCnt}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <table>
      <thead>Enemies</thead>
      <tbody>
        {team.map((unit, i) => {
          return <tr key={i}>{unit.name}</tr>;
        })}
      </tbody>
    </table>
  );
};

export default BattleInfoCmpt;
