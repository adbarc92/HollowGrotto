import { Unit } from '../components/UnitDetails';

export const createUnit = (
  name: string,
  hp: number,
  maxHP: number,
  chargeCnt: number,
  breakCnt: number
): Unit => {
  return {
    name,
    hp,
    maxHP,
    chargeCnt,
    breakCnt,
  };
};
