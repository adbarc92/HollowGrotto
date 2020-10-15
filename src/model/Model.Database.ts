import { Stats, AI } from 'model/Model.Unit';
import { Character } from 'model/Model.Character';
import { facePlayer } from 'controller/interact';
import {
  playSignCutscene,
  playLinearCutscene,
  playStatueCutscene,
  acquireItem,
} from 'controller/interact';
import {
  Item,
  partyRemoveItem,
  partyGetItem,
  partyAddCharacter,
} from 'model/Model.Party';
import { playSound } from 'utils/sound';
import { startBattle } from 'controller/interact';
import { CompletionState, getCurrentBattle } from 'model/Model.Battle';
import { roomRemoveCharacter } from 'model/Model.Room';
import {
  getCurrentWorld,
  worldGetCurrentRoom,
  worldOnce,
  worldResetProtagToStartingPosition,
} from 'model/Model.World';
import { PlatformAI } from 'model/Model.Actor';

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
  action?: (ch?: Character) => Promise<any>; // platforming: function to run when when a player presses 'x' above this character
  col?: (ch?: Character) => any; // platforming: function to run when the protag collides with this character
}

export interface ItemDef {
  name: string;
  dsc: string;
  onUse?: (item: Item) => void;
}

export interface EncounterDef {
  enemies: CharacterDef[];
  // items gained
}

const SPRITESHEET_TERRAIN = 'terrain';

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

export const G_CHARACTER_STRIKER: CharacterDef = {
  name: '',
  stats: {
    bS: createStats(85, 25, 13, 6, 15),
    ai: AI.PLAYER,
  },
  sprI: 0,
};
export const G_CHARACTER_DEFENDER: CharacterDef = {
  name: '',
  stats: {
    bS: createStats(80, 19, 18, 4, 6),
    ai: AI.PLAYER,
  },
  sprI: 0,
};

export const G_CHARACTER_SLAYER: CharacterDef = {
  name: '',
  stats: {
    bS: createStats(75, 23, 12, 7, 10),
    ai: AI.PLAYER,
  },
  sprI: 0,
};

/* MONSTER DEFINITIONS */

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

const ape: CharacterDef = {
  name: 'Ape',
  stats: {
    bS: createStats(20, 40, 5, 0, 15),
    ai: AI.STRIKER,
  },
  sprI: 6,
};

const breaker: CharacterDef = {
  name: 'Breaker',
  stats: {
    bS: createStats(35, 30, 14, 1, 14),
    ai: AI.BREAKER,
  },
  sprI: 7,
};

const ancientBeing: CharacterDef = {
  name: 'Old Guy',
  stats: {
    bS: createStats(200, 30, 40, 10, 17),
    ai: AI.BOSS,
  },
  sprI: 15,
};

const ancientBeing2 = { ...ancientBeing, name: 'Old Guy (clone)' };

/* ENCOUNTER DEFINITIONS */

export const G_ENCOUNTER_0: EncounterDef = { enemies: [golem, golem, golem] };
export const G_ENCOUNTER_1: EncounterDef = {
  enemies: [fairy, golem, fairy, ape],
};
export const G_ENCOUNTER_2: EncounterDef = {
  enemies: [fairy, golem, fairy, breaker],
};
export const G_ENCOUNTER_3: EncounterDef = { enemies: [ape, ape, fairy] };
export const G_ENCOUNTER_4: EncounterDef = {
  enemies: [ape, fairy, golem, golem],
};
export const G_ENCOUNTER_5: EncounterDef = { enemies: [breaker, ape, golem] };
export const G_ENCOUNTER_6: EncounterDef = { enemies: [breaker, ape, fairy] };
export const G_ENCOUNTER_7: EncounterDef = {
  enemies: [fairy, ape, ape, golem],
};
export const G_ENCOUNTER_FINAL: EncounterDef = {
  enemies: [ancientBeing, ancientBeing2],
};

/* Items */

const G_ITEM_BOMB: ItemDef = {
  name: 'Bomb',
  dsc: 'It destroys all enemies!',
  onUse: async (item: Item) => {
    const battle = getCurrentBattle();
    partyRemoveItem(battle.party, item);
    battle.completionState = CompletionState.COMPLETION_VICTORY;
    playSound('actionStrike');
  },
};
const G_ITEM_STATUE_LEGS: ItemDef = {
  name: "Statue's Legs",
  dsc: 'Good for running.',
};
const G_ITEM_STATUE_VOICE: ItemDef = {
  name: "Statue's Voice",
  dsc: 'For yelling.',
};
const G_ITEM_STATUE_MIND: ItemDef = {
  name: "Statue's Mind",
  dsc: 'Arguably necessary',
};

const G_ITEM_MARBLE: ItemDef = {
  name: 'Radiant Stone',
  dsc: 'Gleaming marble.',
  onUse: () => {},
};

/* NPCs */

export const G_CHARACTER_OLD_MAN: CharacterDef = {
  name: 'Old Man',
  sprI: 15,
  action: async (ch?: Character) => {
    facePlayer(ch);
    const lines = `
'Hello there.'
'You've arrived with your wits about.'
'That's very good. You'll need them.'
'These status are all...'
'...missing something.'
:)
'Perhaps you should find what is not found...'
  `.split('\n');

    await playLinearCutscene(lines);
    hideDialog();
  },
};

export const G_CHARACTER_STATUE_RUNNER: CharacterDef = {
  name: 'Runner Without Legs',
  spr: SPRITESHEET_TERRAIN,
  sprI: 8,
  action: async (ch?: Character) => {
    playStatueCutscene(ch, G_ITEM_STATUE_LEGS, 'The Runner.');
  },
};
export const G_CHARACTER_STATUE_THINKER: CharacterDef = {
  name: 'Thinker Without Mind',
  spr: SPRITESHEET_TERRAIN,
  sprI: 8,
  action: async (ch?: Character) => {
    playStatueCutscene(ch, G_ITEM_STATUE_MIND, 'The Thinker.');
  },
};
export const G_CHARACTER_STATUE_SPEAKER: CharacterDef = {
  name: 'Speaker Without Voice',
  spr: SPRITESHEET_TERRAIN,
  sprI: 8,
  action: async (ch?: Character) => {
    playStatueCutscene(ch, G_ITEM_STATUE_VOICE, 'The Speaker.');
  },
};

export const G_SIGN_POT_ROOM: CharacterDef = {
  name: 'Sign',
  spr: SPRITESHEET_TERRAIN,
  sprI: 5,
  action: () => playSignCutscene('Probably nothing is in these pots.'),
};
export const G_SIGN_SPIKES_ARE_DANGEROUS: CharacterDef = {
  name: 'Sign',
  spr: SPRITESHEET_TERRAIN,
  sprI: 5,
  action: () => playSignCutscene('SPIKES are dangerous.'),
};
export const G_SIGN_POINTLESS_FALL: CharacterDef = {
  name: 'Sign',
  spr: SPRITESHEET_TERRAIN,
  sprI: 5,
  action: () => playSignCutscene('This fall is pointless.'),
};
export const G_SIGN_POINTY_FALL: CharacterDef = {
  name: 'Sign',
  spr: SPRITESHEET_TERRAIN,
  sprI: 5,
  action: () => playSignCutscene('This fall is pointy.'),
};
export const G_SIGN_POINTY_FALL_SUCCESS: CharacterDef = {
  name: 'Sign',
  spr: SPRITESHEET_TERRAIN,
  sprI: 5,
  action: () => playSignCutscene('How do you get up this cliff?'),
};
export const G_SIGN_SHRINE_OF_LEGS: CharacterDef = {
  name: 'Sign',
  spr: SPRITESHEET_TERRAIN,
  sprI: 5,
  action: () => playSignCutscene('The SHRINE of LEGS.'),
};
export const G_SIGN_MONSTER_ROOM: CharacterDef = {
  name: 'Sign',
  spr: SPRITESHEET_TERRAIN,
  sprI: 5,
  action: () => playSignCutscene('Seek. Seek. Lest.'),
};

export const G_CHARACTER_POT: CharacterDef = {
  name: 'Pot',
  spr: SPRITESHEET_TERRAIN,
  sprI: 4,
  action: async () => {
    const lines = `
You check the pot...
There's nothing inside.
  `.split('\n');

    await playLinearCutscene(lines);
    hideDialog();
  },
};

export const G_CHARACTER_POT_FAKE: CharacterDef = {
  name: 'Pot!',
  spr: SPRITESHEET_TERRAIN,
  sprI: 4,
  action: async () => {
    const lines = `
This pot seems different from the others!
You check the pot.
...
There's nothing inside.
  `.split('\n');

    await playLinearCutscene(lines);
    hideDialog();
  },
};

export const G_CHARACTER_PARTY_POT: CharacterDef = {
  name: 'Pot',
  spr: SPRITESHEET_TERRAIN,
  sprI: 4,
  stats: {
    bS: createStats(85, 25, 13, 6, 15),
    ai: AI.PLAYER,
  },
  action: async (ch?: Character) => {
    const lines = `
You check the pot...
There's a man inside.
'Hello! You look very appealing!'
'I'm coming with you!'
The Pot joins your party.
  `.split('\n');

    await playLinearCutscene(lines);
    hideDialog();
    const world = getCurrentWorld();
    const party = world.party;
    const room = worldGetCurrentRoom(world);
    roomRemoveCharacter(room, ch as Character);
    partyAddCharacter(party, ch as Character);
  },
};
export const G_CHARACTER_POT_REAL: CharacterDef = {
  name: 'Pot',
  spr: SPRITESHEET_TERRAIN,
  sprI: 4,
  stats: {
    bS: createStats(85, 25, 13, 6, 15),
    ai: AI.STRIKER,
  },
  action: async (ch?: Character) => {
    const lines = `
You check the pot...
  `.split('\n');
    await playLinearCutscene(lines);
    await acquireItem(G_ITEM_STATUE_VOICE, ch);
    hideDialog();
  },
};

export const G_CHARACTER_JIN: CharacterDef = {
  name: 'Jin',
  sprI: 3,
  stats: {
    bS: createStats(75, 23, 12, 7, 10),
    ai: AI.PLAYER,
  },
  action: async (ch?: Character) => {
    facePlayer(ch);
    let lines = [''];
    if (worldOnce('talked_to_jin')) {
      lines = `
'Hello friend!'
'I have misplaced some treasure.'
'If you bring it to me, I'd accompany you.'
    `.split('\n');
    } else {
      lines = `
'Have you found my treasure yet?'
      `.split('\n');
    }

    await playLinearCutscene(lines);
    hideDialog();
    const world = getCurrentWorld();
    const { party } = world;

    if (partyGetItem(party, G_ITEM_MARBLE)) {
      const lines2 = `
'I'll take that! Let's be on our way!'
      `.split('\n');
      partyRemoveItem(party, G_ITEM_MARBLE);
      partyAddCharacter(party, ch);
      const room = worldGetCurrentRoom(world);
      roomRemoveCharacter(room, ch);
      await playLinearCutscene(lines2);
      hideDialog();
    }
  },
};

export const G_ROAMER_ENCOUNTER_0: CharacterDef = {
  name: '',
  sprI: 5,
  col: async (ch?: Character) => {
    await startBattle(ch, G_ENCOUNTER_7, [G_ITEM_BOMB]);
  },
};

export const G_ROAMER_ENCOUNTER_1: CharacterDef = {
  name: '',
  sprI: 8,
  col: async (ch?: Character) => {
    await startBattle(ch, G_ENCOUNTER_7, [G_ITEM_BOMB]);
  },
  plAi: PlatformAI.LEFT_RIGHT,
};

export const G_ROAMER_ENCOUNTER_2: CharacterDef = {
  name: '',
  sprI: 8,
  col: async (ch?: Character) => {
    await startBattle(ch, G_ENCOUNTER_4, [G_ITEM_BOMB]);
  },
  plAi: PlatformAI.LEFT_RIGHT,
};

export const G_ROAMER_ENCOUNTER_3: CharacterDef = {
  name: '',
  sprI: 8,
  col: async (ch?: Character) => {
    await startBattle(ch, G_ENCOUNTER_2, [G_ITEM_BOMB]);
  },
  plAi: PlatformAI.LEFT_RIGHT,
};

export const G_ROAMER_ENCOUNTER_4: CharacterDef = {
  name: '',
  sprI: 8,
  col: async (ch?: Character) => {
    await startBattle(ch, G_ENCOUNTER_3, [G_ITEM_BOMB]);
  },
  plAi: PlatformAI.LEFT_RIGHT,
};

export const G_ROAMER_ENCOUNTER_5: CharacterDef = {
  name: '',
  sprI: 8,
  col: async (ch?: Character) => {
    await startBattle(ch, G_ENCOUNTER_5, [G_ITEM_BOMB]);
  },
  plAi: PlatformAI.LEFT_RIGHT,
};

export const G_ROAMER_ENCOUNTER_6: CharacterDef = {
  name: '',
  sprI: 8,
  col: async (ch?: Character) => {
    await startBattle(ch, G_ENCOUNTER_6, [G_ITEM_BOMB]);
  },
  plAi: PlatformAI.LEFT_RIGHT,
};

export const G_ROAMER_ENCOUNTER_7: CharacterDef = {
  name: '',
  sprI: 8,
  col: async (ch?: Character) => {
    await startBattle(ch, G_ENCOUNTER_3, [G_ITEM_BOMB]);
  },
  plAi: PlatformAI.LEFT_RIGHT,
};

export const G_CHARACTER_SPIKES: CharacterDef = {
  name: '',
  spr: SPRITESHEET_TERRAIN,
  sprI: 6,
  col: async () => {
    const world = getCurrentWorld();
    world.pause = true;
    playSound('spikes');
    await waitMs(1000);
    world.pause = false;
    worldResetProtagToStartingPosition(getCurrentWorld());
  },
};

export const G_CHARACTER_FAKE_WALL: CharacterDef = {
  name: '',
  spr: SPRITESHEET_TERRAIN,
  sprI: 1,
};

export const G_CHARACTER_ITEM_MARBLE: CharacterDef = {
  name: 'Shining Stone',
  spr: SPRITESHEET_TERRAIN,
  sprI: 11,
  action: (ch?: Character) => acquireItem(G_ITEM_MARBLE, ch),
};

export const G_CHARACTER_ITEM_BOMB: CharacterDef = {
  name: 'Item',
  spr: SPRITESHEET_TERRAIN,
  sprI: 11,
  action: (ch?: Character) => acquireItem(G_ITEM_BOMB, ch),
};

export const G_CHARACTER_ORANGE: CharacterDef = {
  name: 'Orange',
  sprI: 0,
  stats: {
    bS: createStats(5, 23, 12, 7, 10),
    ai: AI.STRIKER,
  },
  action: async (ch?: Character) => {
    facePlayer(ch);
    const lines = `
'I am the strongest man!'
'Fight me and I will join you!'
    `.split('\n');
    const lines2 = `
'Wow, you are tough! Onward, then!'
Orange has joined your party.
    `.split('\n');

    await playLinearCutscene(lines);
    hideDialog();
    const G_ENCOUNTER_8: EncounterDef = { enemies: [G_CHARACTER_ORANGE] };
    const world = getCurrentWorld();
    const battle = await startBattle(ch, G_ENCOUNTER_8);
    if (battle.completionState === CompletionState.COMPLETION_VICTORY) {
      const party = world.party;
      partyAddCharacter(party, ch);
      await playLinearCutscene(lines2);
      hideDialog();
      const unit = ch.unit as Unit;
      statsModifyHp(unit.cS, unit.bS, 99);
    }
  },
};

export const G_CHARACTER_ITEM_STATUE_LEGS: CharacterDef = {
  name: 'Item',
  spr: SPRITESHEET_TERRAIN,
  sprI: 11,
  action: (ch?: Character) => acquireItem(G_ITEM_STATUE_LEGS, ch),
};

export const G_CHARACTER_ITEM_STATUE_MIND: CharacterDef = {
  name: 'Item',
  spr: SPRITESHEET_TERRAIN,
  sprI: 11,
  action: (ch?: Character) => acquireItem(G_ITEM_STATUE_MIND, ch),
};
