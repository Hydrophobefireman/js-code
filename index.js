import base64ToArrayBuffer from "./src/modules/base64ToArrayBuffer/index.js";
import objToCSSString from "./src/modules/objToCSSString/index.js";
import CSSStringToObj from "./src/modules/CSSStringToObj/index.js";
import {
  FakeMap,
  FakeSet,
  FakeWeakMap,
  FakeWeakSet
} from "./src/modules/es6/loose/index.js";
import {
  Object_keys,
  Object_values,
  Object_entries,
  Object_fromEntries,
  Object_assign,
  Object_is
} from "./src/modules/Object/index.js";
import nextEvent from "./src/modules/nextEvent/index.js";
import arrayBufferToBase64 from "./src/modules/arrayBufferToBase64/index.js";
import {
  Element_append,
  Element_prepend,
  Element_after
} from "./src/modules/Element/index.js";
import retry from "./src/modules/retry/index.js";
import urlencode from "./src/modules/urlencode/index.js";
import loadCSS from "./src/modules/loadCSS/index.js";
const obj = {
  arrayBufferToBase64,
  base64ToArrayBuffer,
  objToCSSString,
  Object_is,
  CSSStringToObj,
  urlencode,
  Object_keys,
  Object_values,
  Object_entries,
  Object_fromEntries,
  Object_assign,
  Element_append,
  Element_prepend,
  Element_after,
  loadCSS,
  retry,
  nextEvent,
  compatMap: FakeMap,
  compatSet: FakeSet,
  compatWeakMap: FakeWeakMap,
  compatWeakSet: FakeWeakSet};

export default obj;
