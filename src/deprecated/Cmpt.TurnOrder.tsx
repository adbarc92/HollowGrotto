import React from 'react';
import { Round } from 'model/Model.Battle';
import { Unit } from 'model/Model.Unit';
import UnitCmpt from 'components/Cmpt.Unit';

interface TurnOrderProps {
  round: Round;
}

interface TurnRectProps {
  unit: Unit;
  height: number;
  width: number;
  color: string;
}

const TurnRect = (props: TurnRectProps): JSX.Element => {
  const { unit, height, width, color } = props;
  return (
    <div style={{ height, width, backgroundColor: color }}>
      <UnitCmpt unit={unit}></UnitCmpt>
    </div>
  );
};

const TurnOrderCmpt = (props: TurnOrderProps): JSX.Element => {
  const { round } = props;
  const height = 40,
    width = 30;
  return (
    <div>
      {round.turnOrder.map((unit, i) => {
        return (
          <TurnRect
            unit={unit}
            height={height}
            width={width}
            color={'white'}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default TurnOrderCmpt;
