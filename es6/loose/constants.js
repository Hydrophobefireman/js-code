import { patchGlobalThis as patch,has } from "../../util.js";
patch();
export const HAS_MAP =  has("Map",globalThis);
export const HAS_SET = has("Set",globalThis);
export const m = "__@@map";
export const s = "__@@set";