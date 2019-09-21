import keys from "./keys.js";
import { _Object } from "../util.js";
export default "values" in _Object
  ? _Object.values
  : (function Object_values(a: import("./ot").default) {
      const arr = [];
      for (const i of keys(a)) arr.push(a[i]);
      return arr;
    } as ObjectConstructor["values"]);
