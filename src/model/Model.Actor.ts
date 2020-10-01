import { SpriteModification } from 'utils/Sprites';
import { alternate } from 'utils/Utils';

export enum Facing {
  FACING_LEFT,
  FACING_RIGHT,
  FACING_UP_RIGHT,
  FACING_UP_LEFT,
}

export enum AnimState {
  ANIM_DEFAULT,
  ANIM_WALKING,
  ANIM_JUMPING,
  ANIM_ATTACKING,
  ANIM_STUNNED,
}

export interface Actor {
  sprite: string;
  spriteIndex: number;
  facing: Facing;
  anim: AnimState;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const createActor = (spriteIndex: number): Actor => {
  return {
    sprite: 'actors',
    spriteIndex,
    facing: Facing.FACING_LEFT,
    anim: AnimState.ANIM_DEFAULT,
    x: 0,
    y: 0,
    w: 16, // should be configurable
    h: 16, // ^
  };
};

export const actorGetCurrentSpriteAndOffset = (
  actor: Actor,
  isPaused?: boolean
): [string, number, number] => {
  const { facing, sprite, spriteIndex, anim } = actor;
  let spriteIndexOffset = anim;
  const hasMultiSprite = spriteIndex < 3;
  let yOff = 0;
  if (!isPaused) {
    if (anim === AnimState.ANIM_WALKING) {
      // alternate between two frames (anim = 1 and anim = 0) every 100 ms
      spriteIndexOffset = (spriteIndexOffset - alternate(1, 100)) as AnimState;
    } else if (anim === AnimState.ANIM_ATTACKING) {
      if (hasMultiSprite) {
        spriteIndexOffset = (2 - alternate(1, 250)) as AnimState;
      } else {
        spriteIndexOffset = 0;
        yOff = 2 * alternate(1, 100);
      }
    } else if (anim === AnimState.ANIM_STUNNED) {
      if (hasMultiSprite) {
        spriteIndexOffset = 2;
      } else {
        spriteIndexOffset = 0;
      }
    }
  }
  let mod = '';
  switch (facing) {
    case 0:
      mod = SpriteModification.SPRITE_MOD_FLIPPED;
      break;
    // case 1 is no modification
    case 2: // up
      mod = SpriteModification.SPRITE_MOD_ROT270;
      break;
    case 3:
      mod = SpriteModification.SPRITE_MOD_FLROT90;
      break;
    default:
      break;
  }
  return [sprite + `_${spriteIndex + spriteIndexOffset + mod}`, 0, yOff];
};

export const actorSetFacing = (actor: Actor, facing: Facing): void => {
  actor.facing = facing;
};

export const actorSetPosition = (actor: Actor, x: number, y: number): void => {
  actor.x = x;
  actor.y = y;
};

export const actorGetPosition = (actor: Actor): [number, number] => {
  return [actor.x, actor.y];
};
