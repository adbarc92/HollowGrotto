const G_ACTORS_MAP = {};
const G_initActors = () => {
  G_ACTORS_MAP['1,1,13,15'] = G_CHARACTER_OLD_MAN;
  G_ACTORS_MAP['1,1,11,11'] = G_CHARACTER_STATUE_THINKER;
  G_ACTORS_MAP['1,1,4,9'] = G_CHARACTER_STATUE_RUNNER;
  G_ACTORS_MAP['1,1,5,13'] = G_CHARACTER_STATUE_SPEAKER;
  G_ACTORS_MAP['0,1,9,15'] = G_SIGN_POT_ROOM;
  G_ACTORS_MAP['0,1,7,11'] = G_CHARACTER_PARTY_POT;
  G_ACTORS_MAP['0,1,9,11'] = G_CHARACTER_POT;
  G_ACTORS_MAP['0,1,11,11'] = G_CHARACTER_POT;
  G_ACTORS_MAP['0,1,13,11'] = G_CHARACTER_POT;
  G_ACTORS_MAP['0,1,8,7'] = G_CHARACTER_POT;
  G_ACTORS_MAP['0,1,10,7'] = G_CHARACTER_POT;
  G_ACTORS_MAP['0,1,12,7'] = G_CHARACTER_POT;
  G_ACTORS_MAP['0,1,14,7'] = G_CHARACTER_POT_REAL;
  G_ACTORS_MAP['0,1,7,3'] = G_CHARACTER_POT;
  G_ACTORS_MAP['0,1,9,3'] = G_CHARACTER_POT;
  G_ACTORS_MAP['0,1,11,3'] = G_CHARACTER_POT;
  G_ACTORS_MAP['0,1,13,3'] = G_CHARACTER_POT_FAKE;
  G_ACTORS_MAP['2,2,2,15'] = G_CHARACTER_JIN;
  G_ACTORS_MAP['2,2,2,12'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,2,1,12'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,1,5,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,1,3,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,1,4,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,1,3,13'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,1,9,9'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,1,1,15'] = G_SIGN_SPIKES_ARE_DANGEROUS;
  G_ACTORS_MAP['2,1,8,5'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,1,10,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,0,2,2'] = G_SIGN_POINTLESS_FALL;
  G_ACTORS_MAP['3,0,2,3'] = G_SIGN_POINTY_FALL;
  G_ACTORS_MAP['3,0,4,10'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,0,11,14'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,1,2,7'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,0,1,14'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,1,12,7'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,1,3,14'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,2,1,5'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,1,14,10'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,1,9,12'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,1,6,12'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,2,2,8'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,2,11,6'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,2,11,12'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,0,7,3'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,2,14,12'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,3,3,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,3,14,7'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,0,7,9'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,1,4,5'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,2,4,7'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,2,7,7'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,2,5,7'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,2,5,13'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,3,8,5'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,3,7,5'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,1,7,12'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,1,6,4'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['3,3,8,15'] = G_SIGN_POINTY_FALL_SUCCESS;
  G_ACTORS_MAP['3,3,1,3'] = G_CHARACTER_ITEM_BOMB;
  G_ACTORS_MAP['0,3,3,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,3,3,11'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,3,8,4'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,3,5,3'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,3,11,10'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,3,12,6'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,3,14,12'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,3,7,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,3,1,6'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,0,11,5'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,0,12,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,0,7,5'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,0,6,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,0,3,5'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,0,3,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,0,9,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,0,4,9'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,0,6,9'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,0,8,9'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,0,10,9'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['0,0,12,9'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['1,0,9,14'] = G_CHARACTER_ITEM_STATUE_LEGS;
  G_ACTORS_MAP['1,0,2,15'] = G_SIGN_SHRINE_OF_LEGS;
  G_ACTORS_MAP['1,0,9,8'] = G_CHARACTER_ITEM_BOMB;
  G_ACTORS_MAP['2,0,3,9'] = G_CHARACTER_FAKE_WALL;
  G_ACTORS_MAP['2,0,4,9'] = G_CHARACTER_FAKE_WALL;
  G_ACTORS_MAP['2,0,5,9'] = G_CHARACTER_FAKE_WALL;
  G_ACTORS_MAP['2,0,6,8'] = G_CHARACTER_FAKE_WALL;
  G_ACTORS_MAP['2,0,2,8'] = G_CHARACTER_FAKE_WALL;
  G_ACTORS_MAP['2,0,8,9'] = G_CHARACTER_ITEM_BOMB;
  G_ACTORS_MAP['1,1,8,8'] = G_CHARACTER_ORANGE;
  G_ACTORS_MAP['2,2,2,3'] = G_CHARACTER_ITEM_MARBLE;
  G_ACTORS_MAP['2,2,3,12'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,2,11,3'] = G_CHARACTER_ITEM_BOMB;
  G_ACTORS_MAP['2,3,9,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,3,8,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,3,7,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,3,6,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,3,5,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,3,4,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,3,3,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,3,2,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,3,10,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,3,11,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,3,12,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,3,13,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['2,3,1,15'] = G_CHARACTER_SPIKES;
  G_ACTORS_MAP['1,3,10,10'] = G_SIGN_MONSTER_ROOM;
  G_ACTORS_MAP['2,3,15,12'] = G_CHARACTER_FAKE_WALL;
  G_ACTORS_MAP['3,3,0,12'] = G_CHARACTER_FAKE_WALL;
  G_ACTORS_MAP['2,2,11,7'] = G_ROAMER_ENCOUNTER_2;
  G_ACTORS_MAP['2,2,5,4'] = G_ROAMER_ENCOUNTER_3;
  G_ACTORS_MAP['1,3,2,15'] = G_ROAMER_ENCOUNTER_4;
  G_ACTORS_MAP['1,3,7,15'] = G_ROAMER_ENCOUNTER_5;
  G_ACTORS_MAP['1,3,9,15'] = G_ROAMER_ENCOUNTER_6;
  G_ACTORS_MAP['1,3,11,15'] = G_ROAMER_ENCOUNTER_7;
  G_ACTORS_MAP['2,1,12,7'] = G_ROAMER_ENCOUNTER_1;
  G_ACTORS_MAP['0,0,15,9'] = G_CHARACTER_FAKE_WALL;
  G_ACTORS_MAP['1,0,0,9'] = G_CHARACTER_FAKE_WALL;
  G_ACTORS_MAP['1,3,14,15'] = G_CHARACTER_ITEM_STATUE_MIND;
};

export default G_ACTORS_MAP;
