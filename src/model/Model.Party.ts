import { Character, createCharacterFromTemplate } from 'model/Model.Character';
import { CHARACTER_PROTAG } from 'model/Model.Database';
import { AI, Unit } from 'model/Model.Unit';
import { ItemDef } from 'model/Model.Database';

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

export const partyGetProtag = (party: Party): Character => {
  return party.characters[0];
};

export const partyAddItem = (party: Party, itemTemplate: ItemDef): void => {
  const item = {
    ...itemTemplate,
  };
  party.inv.push(item);
  renderItemsBox(party.inv, true);
};
export const partyRemoveItem = (party: Party, item: Item): void => {
  const i = party.inv.indexOf(item);
  if (i > -1) {
    party.inv.splice(i, 1);
  }
  renderItemsBox(party.inv, true);
};
export const partyGetItem = (party: Party, itemDef: ItemDef): Item | null => {
  for (let i in party.inv) {
    const { name } = party.inv[i];
    if (name === itemDef.name) {
      return party.inv[i];
    }
  }
  return null;
};
