import { hasOwnProp, _Object } from "../util.js";
export default "keys" in _Object
  ? _Object.keys
  : function Object_keys(a) {
      const arr = [];
      for (const i in a) hasOwnProp.call(a, i) && arr.push(i);
      return arr;
    };
