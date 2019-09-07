import { patchGlobalThis as patch,has } from "../../util.js";
patch();
export const HAS_MAP =  has("Map",globalThis);
export const HAS_SET = has("Set",globalThis);
export const m = "__@@map";
export const s = "__@@set";
const _isNaN = Number.isNaN || globalThis.isNaN || ((k)=>k!==k)
export const _EqCheck = (x, y) => x === y || (_isNaN(x) && _isNaN(y));
export const normalizeNegativeZero=k=>k===0?0:k