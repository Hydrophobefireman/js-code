import { HAS_MAP, m } from "../constants.js";
import setup from "./proto.js";
import { isIterable } from "../../../util.js";
function generateMap  (it) {
    if(it==null) return
    if (!isIterable(it))
      throw new Error("value:" + String(it) + " is not iterable");
    const _m = this[m];
    for (k of it) {
      if (!k || k.length !== 2) throw new Error("invalid arg");
        this.set(k[0], k[1]);
    }
};
export default function compatMap(iterable) {
  if (HAS_MAP) return new Map(iterable);
  this[m] = [];
  generateMap.call(this,iterable);
}
setup(compatMap);
