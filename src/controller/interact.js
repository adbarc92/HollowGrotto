import {
  getCurrentWorld,
  worldGetState,
  worldSetState,
  worldGetCurrentRoom,
} from 'model/Model.World';
import { playSound } from 'utils/sound';
import {
  actorSetFacing,
  Facing,
  actorSetPosition,
  actorGetPosition,
  actorSetVelocity,
} from 'model/Model.Actor';
import { partyGetProtag, partyAddItem } from 'model/Model.Party';
import { waitMs } from 'utils/Utils';
import { partyGetItem, partyRemoveItem } from 'model/Model.Party';
import { CompletionState, createBattle } from 'model/Model.Battle';
import { doBattle } from 'controller/combat';
import {
  G_ITEM_STATUE_LEGS,
  G_ITEM_STATUE_VOICE,
  G_ITEM_STATUE_MIND,
  G_ENCOUNTER_FINAL,
} from 'model/Model.Database';
import { roomRemoveCharacter } from 'model/Model.Room';

export const facePlayer = (character: Character): void => {
  const world = getCurrentWorld();
  const protag = partyGetProtag(world.party);
  const protagActor = protag.actor;
  const characterActor = character.actor;
  if (protagActor.x < characterActor.x) {
    actorSetFacing(characterActor, Facing.G_FACING_LEFT);
  } else {
    actorSetFacing(characterActor, Facing.G_FACING_RIGHT);
  }
};

const SIGN = (text: string) => [`SIGN: "${text}"`];

const ACQUIRE_ITEM = (text: string, text2: string) => [
  `You got: ${text}`,
  text2,
];

export const playSignCutscene = async (text: string) => {
  const lines = SIGN(text);
  await playLinearCutscene(lines);
  hideDialog();
};

export const playLinearCutscene = async (
  lines: string[],
  openSound?: string
) => {
  playSound(openSound || 'menuConfirm');
  showDialog('', true);
  const world = getCurrentWorld();
  world.pause = true;
  await waitMs(250);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      await showDialog(line);
    }
  }
  playSound('menuCancel');
  world.pause = false;
};

export const playStatueCutscene = async (
  statueCh: Character,
  itemDef: ItemDef,
  plaqueText: string
) => {
  let lines = [''];
  const defaultText = 'This statue is missing a something...';

  const world = getCurrentWorld();
  const party = world.party;
  const item = partyGetItem(party, itemDef);
  const stateKey = itemDef.name + '_fixed';

  if (worldGetState(stateKey)) {
    lines = ['You have fixed this statue.'];
  } else if (item) {
    await playLinearCutscene(
      `
You place the '${item.name}' inside the statue.
...
It awakens.
`.split('\n')
    );
    partyRemoveItem(party, item);
    await waitMs(150);
    playSound('item');
    statueCh.actor.spriteIndex = 12;
    await waitMs(2000);
    lines = ['You have fixed the statue!'];
    worldSetState(stateKey, true);
  } else {
    lines = `
A plaque says: "${plaqueText}"
${defaultText}
`.split('\n');
  }

  await playLinearCutscene(lines);
  hideDialog();
  const fixed = '_fixed';
  if (
    worldGetState(`${G_ITEM_STATUE_LEGS.name}${fixed}`) &&
    worldGetState(`${G_ITEM_STATUE_VOICE.name}${fixed}`) &&
    worldGetState(`${G_ITEM_STATUE_MIND.name}${fixed}`)
  ) {
    const lines = `
'Mwahaha'
'You've done it!'
'Now I shall rule over this world!'`.split('\n');
    await playLinearCutscene(lines);
    hideDialog();
    const battle = createBattle(party, G_ENCOUNTER_FINAL);
    await doBattle(battle);
    console.log('COMPLETED THAT FUCKING BATTLE', battle.completionState);
    if (battle.completionState === CompletionState.COMPLETION_VICTORY) {
      await playLinearCutscene(['Y THO']);
      hideDialog();
      window.location.reload();
    } else {
      await playLinearCutscene(['Game Over']);
      window.location.reload();
    }
    return;
  }
};

export const acquireItem = async (
  itemTemplate: ItemDef,
  character?: Character
) => {
  const world = getCurrentWorld();
  const { name, dsc } = itemTemplate;
  const lines = ACQUIRE_ITEM(name, dsc);

  world.pause = true;

  await playLinearCutscene(lines, 'item');
  hideDialog();

  const room = worldGetCurrentRoom(world);
  if (character) {
    roomRemoveCharacter(room, character);
  }

  partyAddItem(world.party, itemTemplate);
};

export const startBattle = async (
  roamer: Character,
  encounter: EncounterDef,
  items?: ItemDef[]
): Battle => {
  const world = getCurrentWorld();
  world.pause = true;
  const party = world.party;
  const protag = partyGetProtag(world.party);
  const [x, y] = actorGetPosition(protag.actor);
  const battle = createBattle(party, encounter);
  await doBattle(battle);
  const room = worldGetCurrentRoom(world);
  roomRemoveCharacter(room, roamer);
  actorSetPosition(protag.actor, x, y);
  actorSetVelocity(protag.actor, 0, 0);
  if (battle.completionState === CompletionState.COMPLETION_VICTORY) {
    if (items) {
      for (let i in items) {
        await acquireItem(items[i]);
      }
    }
  } else if (
    battle.completionState === CompletionState.COMPLETION_INCONCLUSIVE
  ) {
    for (let i = 0; i < party.characters.length; i++) {
      const unit = party.characters[i].unit;
      unit.cS.spd -= 3;
    }
  } else {
    await playLinearCutscene(['Game Over']);
    window.location.reload();
  }
  world.pause = false;
  return battle;
};
