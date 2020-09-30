import { Stats, AI } from 'model/Model.Unit';
import { Character } from 'model/Model.Character';

export interface StatsDef {
  bS: Stats;
  ai: AI;
}

export interface CharacterDef {
  name: string;
  sprI: number; // sprite index on the spritesheet to use for this character
  stats?: StatsDef;
  spr?: string; // defaults to 'actors'
  label?: string; // platforming: text that appears when moving atop this character
  action?: (ch?: Character) => any; // platforming: function to run when when a player presses 'x' above this character
  col?: (ch?: Character) => any; // platforming: function to run when the protag collides with this character
}

export interface EncounterDef {
  enemies: CharacterDef[];
  // items gained
}

// NOTE: Where should this go?
const createStats = (
  hp: number,
  dmg: number,
  def: number,
  mag: number,
  spd: number
): Stats => {
  return { hp, dmg, def, mag, spd, iCnt: mag, cCnt: 0 };
};

export const CHARACTER_PROTAG: CharacterDef = {
  name: '',
  stats: {
    bS: createStats(90, 25, 16, 5, 20),
    ai: AI.PLAYER,
  },
  sprI: 0,
};

const golem: CharacterDef = {
  name: 'Golem',
  stats: {
    bS: createStats(35, 22, 40, 0, 5),
    ai: AI.STRIKER,
  },
  sprI: 8,
};

const fairy: CharacterDef = {
  name: 'Fairy',
  stats: {
    bS: createStats(30, 23, 9, 2, 15),
    ai: AI.CHARGER,
  },
  sprI: 4,
};

export const ENCOUNTER_0: EncounterDef = {
  enemies: [golem, golem, fairy, fairy],
};
