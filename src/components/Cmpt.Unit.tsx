import React from 'react';
import { Sprite } from 'react-konva';
import { Unit } from 'model/Model.Unit';
import {
  actorGetCurrentSpriteAndOffset,
  actorHasMultiSprite,
} from 'model/Model.Actor';
import { getSprite } from 'utils/Sprites';

interface UnitProps {
  unit: Unit;
}

// Visually representation of a unit
const UnitCmpt = (props: UnitProps): JSX.Element => {
  const { unit } = props;
  const { actor } = unit;
  const { x, y } = actor;
  const [spriteName, offsetX, offsetY] = actorGetCurrentSpriteAndOffset(actor);
  const sprite = getSprite(spriteName);
  const [img, spriteX, spriteY, w, h] = sprite;
  const animations = actorHasMultiSprite(actor)
    ? {
        default: [spriteX, spriteY, w, h],
        jumping: [
          spriteX,
          spriteY,
          w,
          h,
          spriteX + 32,
          spriteY,
          w,
          h,
          spriteX + 32,
          spriteY,
          w,
          h,
          spriteX,
          spriteY,
          w,
          h,
        ],
        walking: [
          spriteX,
          spriteY,
          w,
          h,
          spriteX + 16,
          spriteY,
          w,
          h,
          spriteX + 16,
          spriteY,
          w,
          h,
          spriteX,
          spriteY,
          w,
          h,
        ],
      }
    : {
        default: [spriteX, spriteY, w, h],
      };
  const scale = {
    x: (window as any).AppInterface.scale,
    y: (window as any).AppInterface.scale,
  };
  return (
    <Sprite
      x={x + offsetX}
      y={y + offsetY}
      image={img as HTMLImageElement}
      animation={'default'}
      animations={animations}
      frameRate={0}
      frameIndex={0}
      scale={scale}
    />
  );
};

export default UnitCmpt;
