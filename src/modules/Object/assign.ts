import { _Object, hasOwnProp } from "../util.js";
export default "assign" in _Object
  ? _Object.assign
  : (function Object_assign(target: import("./ot").default) {
      for (let i = 1; i < arguments.length; i++) {
        const source = arguments[i];
        console.log(source);
        for (const key in source) {
          if (hasOwnProp.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    } as ObjectConstructor["assign"]);
