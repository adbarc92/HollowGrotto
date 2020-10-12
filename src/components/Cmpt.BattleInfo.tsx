import React from 'react';

import { Allegiance, Unit } from 'model/Model.Unit';
import { getScreenSize } from './ReactCanvas';

import { makeStyles } from '@material-ui/core';

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
      borderRadius: '15px', // common to theme
      backgroundColor: '#C2C3C7', // common to theme, needs fixing
      borderStyle: 'solid', // common to theme
      borderColor: 'white', // common to theme
      WebkitTextStroke: '0.5px black', // common to theme
      color: 'white', // common to theme
      textAlign: 'center', // common to theme
      fontSize: '12px', // common to theme
      borderSpacing: '2px', // common to theme
      position: 'absolute', // unique
      bottom: '0px', // unique
      left: '0px', // unique
    },
    tableContainer: {
      tableLayout: 'fixed',
    },
    tableHeadContainer: {
      display: 'table',
      position: 'fixed',
    },
    rowItem: {
      textAlign: 'center',
    },
  };
});

const BattleInfoCmpt = (props: BattleInfoProps): JSX.Element => {
  const classes = useStyles();
  const headers = ['UnitName', 'HP', 'Charge', 'Break/Heal'];
  const { team, allegiance } = props;
  return allegiance === Allegiance.ALLEGIANCE_ALLY ? (
    <div className={classes.infoContainer}>
      <table id="infoTable" style={{ zIndex: 10 }}>
        <tbody>
          <tr>
            {headers.map((header, i) => {
              return (
                <th className={classes.rowItem} key={i}>
                  {header}
                </th>
              );
            })}
          </tr>
          {team.map((unit, i) => {
            const { name, cS, bS } = unit;
            return (
              <tr key={i}>
                <td className={classes.rowItem}>{name}</td>
                <td className={classes.rowItem}>{`${cS.hp} / ${bS.hp}`}</td>
                <td className={classes.rowItem}>{cS.cCnt}</td>
                <td className={classes.rowItem}>{cS.iCnt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
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
