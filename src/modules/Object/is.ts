import { _Object } from "../util.js";
export default "is" in _Object
  ? _Object.is
  : (function is(x: any, y: any): boolean {
      if (x === y) {
        return x !== 0 || 1 / x === 1 / y;
      } else {
        return x !== x && y !== y;
      }
    } as ObjectConstructor["is"]);
