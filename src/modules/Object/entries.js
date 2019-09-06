import keys from "./keys.js";
import { _Object } from "../util.js";
export default "entries" in _Object
  ? _Object.entries
  : function Object_entries(a) {
      const keys = keys(a);
      let kLen = keys.length;
      const ret = Array(kLen);
      while (kLen--) {
        const p = keys[kLen];
        ret[kLen] = [p, a[p]];
      }
      return ret;
    };
