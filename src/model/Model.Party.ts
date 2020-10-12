import { Character, createCharacterFromTemplate } from 'model/Model.Character';
import { CHARACTER_PROTAG } from 'model/Model.Database';
import { AI, Unit } from 'model/Model.Unit';

export interface Party {
  characters: Character[];
  inv: Item[];
  worldX: 0;
  worldY: 0;
}

export interface Item {
  name: string;
  dsc: string;
  onUse?: (item: Item) => void;
}

export const createParty = (): Party => {
  return {
    characters: [createCharacterFromTemplate(CHARACTER_PROTAG, 'Runner')],
    inv: [] as Item[],
    worldX: 0,
    worldY: 0,
  };
};

export const createTestParty = (): Party => {
  return {
    characters: [
      createCharacterFromTemplate(CHARACTER_PROTAG, 'Runner'),
      createCharacterFromTemplate(CHARACTER_PROTAG, 'Runner'),
      createCharacterFromTemplate(CHARACTER_PROTAG, 'Runner'),
      createCharacterFromTemplate(CHARACTER_PROTAG, 'Runner'),
    ],
    inv: [] as Item[],
    worldX: 0,
    worldY: 0,
  };
};

export const partyAddCharacter = (party: Party, character: Character): void => {
  (character.unit as Unit).ai = AI.PLAYER;
  party.characters.push(character);
};
