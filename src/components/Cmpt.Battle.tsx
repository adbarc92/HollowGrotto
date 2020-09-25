import React from 'react';
import { Stage, Layer, Group } from 'react-konva';
import UnitCmpt from 'components/Cmpt.Unit';
import { Battle } from 'model/Model.Battle';
import BattleBackground from 'components/Cmpt.BattleBackground';

interface BattleProps {
  battle: Battle;
}

const BattleCmpt = (props: BattleProps): JSX.Element => {
  const { allies, enemies } = props.battle;
  return (
    <Stage width={512} height={512}>
      <Layer imageSmoothingEnabled={false}>
        <BattleBackground width={512} height={512} />
      </Layer>
      <Layer imageSmoothingEnabled={false}>
        <Group>
          {allies.map((unit, i) => {
            return <UnitCmpt key={i} unit={unit} />;
          })}
        </Group>
        <Group>
          {enemies.map((unit, i) => {
            return <UnitCmpt key={i} unit={unit} />;
          })}
        </Group>
      </Layer>
    </Stage>
  );
};

export default BattleCmpt;
