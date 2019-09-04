import { _Object } from "../util.js";

export default "fromEntries" in _Object
  ? _Object.fromEntries
  : function Object_fromEntries(entries) {
      const ret = {};
      entries.forEach(k => (ret[k[0]] = k[1]));
      return ret;
    };
