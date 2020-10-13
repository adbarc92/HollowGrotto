import React from 'react';

import { Stage, Sprite } from 'react-konva';
import { Room, Tile } from 'model/Model.Room';
import { getSprite } from 'utils/Sprites';

interface RoomProps {
  room: Room;
}

interface TileProps {
  tile: Tile;
}

const TileCmpt = (props: TileProps): JSX.Element => {
  const { tile } = props;
  const { id, x, y } = tile;
  const spriteName = `map_${id}`;
  return (
    <Sprite
      x={x}
      y={y}
      image={getSprite(spriteName)[0] as HTMLImageElement}
      animation={'default'}
      animations={Array(4).fill(0)}
      frameRate={0}
      frameIndex={0}
      scale={{ x: 1, y: 1 }}
    />
  );
};

const RoomCmpt = (props: RoomProps): JSX.Element => {
  const { room } = props;
  return (
    <div>
      <Stage>
        {room.tiles.map((tile, i) => {
          return <TileCmpt key={i} tile={tile} />;
        })}
      </Stage>
    </div>
  );
};

export default RoomCmpt;
