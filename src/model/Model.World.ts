import { Party, createParty, partyGetProtag } from 'model/Model.Party';
import { actorSetPosition } from 'model/Model.Actor';
import { Room, createRoom, roomGetSizePx } from 'model/Model.Room';
import { to1d } from 'utils/Utils';

export interface World {
  rooms: Room[];
  party: Party;
  roomI: number;
  lastX: number;
  lastY: number;
  pause: boolean;
  state: Object;
}

let model_world: World | null = null;

const START_ROOM_X = 1;
const START_ROOM_Y = 1;

const BG_SPRITE_CAVE_WALL = 'terrain_9';
const BG_SPRITE_MANMADE_WALL = 'terrain_10';

export const mapIndexToBgSprite = {
  0: BG_SPRITE_CAVE_WALL,
  1: BG_SPRITE_MANMADE_WALL,
  2: BG_SPRITE_MANMADE_WALL,
  3: BG_SPRITE_CAVE_WALL,
  4: BG_SPRITE_MANMADE_WALL,
  5: BG_SPRITE_CAVE_WALL,
  6: BG_SPRITE_CAVE_WALL,
  7: BG_SPRITE_CAVE_WALL,
  8: BG_SPRITE_CAVE_WALL,
  9: BG_SPRITE_CAVE_WALL,
  10: BG_SPRITE_CAVE_WALL,
  11: BG_SPRITE_CAVE_WALL,
  12: BG_SPRITE_CAVE_WALL,
  13: BG_SPRITE_CAVE_WALL,
  14: BG_SPRITE_CAVE_WALL,
  15: BG_SPRITE_CAVE_WALL,
};

export const createWorld = (): World => {
  const party = createParty();
  const protag = partyGetProtag(party);
  const actor = protag.actor;
  actorSetPosition(actor, 128, 180);
  const world: World = {
    rooms: [],
    party,
    lastX: 128,
    lastY: 180,
    roomI: to1d(START_ROOM_X, START_ROOM_Y, 4),
    pause: false,
    state: {}, // trigger state
  };
  for (let i = 0; i < 16; i++) {
    world.rooms.push(
      createRoom('map_' + i, mapIndexToBgSprite[i], i % 4, Math.floor(i / 4))
    );
  }
  return world;
};

const setCurrentWorld = (world: World) => {
  model_world = world;
};

const getCurrentWorld = (): World => {
  return model_world as World;
};

const worldSetCurrentRoom = (world: World, x: number, y: number) => {
  world.roomI = y * 4 + x;
};

export const worldGetCurrentRoom = (world: World): Room => {
  return world.rooms[world.roomI];
};

const worldSetCurrentRoomToAdjacentRoom = (
  offsetX: number,
  offsetY: number,
  world: World
) => {
  const worldY = Math.floor(world.roomI / 4);
  const worldX = world.roomI % 4;
  const nextWorldX = (worldX + offsetX + 4) % 4;
  const nextWorldY = (worldY + offsetY + 4) % 4;
  worldSetCurrentRoom(world, nextWorldX, nextWorldY);
  const room = worldGetCurrentRoom(world);
  const party = world.party;
  const protag = partyGetProtag(party);
  const actor = protag.actor;
  const [roomWidth, roomHeight] = roomGetSizePx(room);
  let newX = 0;
  let newY = 0;
  if (offsetX > 0) {
    newX = 0;
    newY = actor.y;
  }
  if (offsetX < 0) {
    newX = roomWidth - 16;
    newY = actor.y;
  }
  if (offsetY > 0) {
    newX = actor.x;
    newY = 0;
  }
  if (offsetY < 0) {
    newX = actor.x;
    newY = roomHeight - 16;
  }
  actorSetPosition(actor, newX, newY);
  world.lastX = newX;
  world.lastY = newY;
};
