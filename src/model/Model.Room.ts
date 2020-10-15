import { Character, createCharacterFromTemplate } from 'model/Model.Character';
import { actorSetPosition } from 'model/Model.Actor';

import G_ACTORS_MAP from 'library/actors';

import { createCanvas, drawSprite } from 'utils/Sprites';

export interface Tile {
  id: number;
  size: number; // width/height
  x: number; // position (x,y) in tile index
  y: number;
  px: number; // position (x,y) in pixels
  py: number;
}

export interface Room {
  tiles: Tile[]; // list of tiles in a room
  characters: Character[]; // list of characters in a room
  bgSprite: string; // the background sprite used when a room is rendered
  w: number; // width/height of room (most likely 16)
  h: number;
}

// maps an rgb color to a tile id (taken from scripts/encode-map.js)
const colorsInverted = {
  0: [156, 100, 52], // platform + wall
  1: [171, 82, 54], // wall
  2: [0, 228, 54], // platform
  7: [255, 241, 232], // wall block
  // ... to be added later
  15: [0, 0, 0], // nothing
};
/* eslint-disable */
const colors = {};
for (let i in colorsInverted) {
  colors[colorsInverted[i].join('')] = Number(i);
}
/*eslint-enable*/

export const roomGetSizePx = (room: Room): [number, number] => {
  return [room.w * 16, room.h * 16];
};

export const createRoom = (
  spriteName: string,
  bgSprite: string,
  worldX: number,
  worldY: number
): Room => {
  const tiles: Tile[] = [];
  const characters: Character[] = [];
  const pngSize = 16;
  const [, ctx] = createCanvas(pngSize, pngSize);
  drawSprite(spriteName, 0, 0, ctx, 1);
  const { data } = ctx.getImageData(0, 0, pngSize, pngSize);
  let ctr = 0;
  for (let j = 0; j < data.length; j += 4) {
    const colorKey = `${data[j + 0]}${data[j + 1]}${data[j + 2]}`;
    const ind = colors[colorKey] || 0;
    const tx = ctr % pngSize;
    const ty = Math.floor(ctr / pngSize);

    let ch: Character | null = null;

    const chTemplate = G_ACTORS_MAP[[worldX, worldY, tx, ty].join(',')];
    if (chTemplate) {
      ch = createCharacterFromTemplate(chTemplate);
    }

    if (ch) {
      actorSetPosition(ch.actor, tx * 16, ty * 16 - 16);
      characters.push(ch);
    }

    tiles.push({
      id: ind,
      x: tx,
      y: ty,
      px: tx * 16,
      py: ty * 16,
      size: 16,
    });
    ctr++;
  }

  return {
    tiles,
    characters,
    w: pngSize,
    h: pngSize,
    bgSprite,
  };
};

export const roomRemoveCharacter = (room: Room, ch: Character): void => {
  const ind = room.characters.indexOf(ch);
  if (ind > -1) {
    room.characters.splice(ind, 1);
  }
};
