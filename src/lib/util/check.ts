import { Md5 } from "ts-md5";
import JSBI from "jsbi";

const maxInt = JSBI.BigInt(2 ** 31 -1);
const nextInt = JSBI.add(maxInt, JSBI.BigInt(1));

const millisecond = JSBI.BigInt(1000000);
const second = JSBI.multiply(millisecond, JSBI.BigInt(1000));

export const calcSplay = (checkName: string) => {
  const hash = Md5.hashStr(checkName, true) as Int32Array;
  let result = JSBI.BigInt(0);
  for (let i = 0; i < 2; i++) {
    let n = JSBI.bitwiseAnd(JSBI.BigInt(hash[i]), maxInt);
    if (hash[i] < 0) {
      n = JSBI.add(n, nextInt);
    }
    n = JSBI.leftShift(n, JSBI.BigInt(32 + i));
    result = JSBI.bitwiseOr(result, n);
  }
  return result;
};

export const nextInterval = (interval: number, splay: JSBI, date = new Date()) => {
  const ts = JSBI.multiply(JSBI.BigInt(date.getTime()), millisecond);
  const intervalDur = JSBI.multiply(JSBI.BigInt(interval), second);
  const offset = JSBI.remainder(JSBI.subtract(splay, ts), intervalDur);
  const offsetM = JSBI.divide(offset, millisecond);
  return new Date(date.getTime() + JSBI.toNumber(offsetM));
};
