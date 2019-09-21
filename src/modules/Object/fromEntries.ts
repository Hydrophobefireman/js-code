import { _Object } from "../util.js";

export default "fromEntries" in _Object
  ? _Object.fromEntries
  : (function Object_fromEntries(entries: import("./ot").default) {
      const ret: import("./ot").default = {};
      entries.forEach((k: Array<any>) => (ret[k[0]] = k[1]));
      return ret;
    } as ObjectConstructor["fromEntries"]);
