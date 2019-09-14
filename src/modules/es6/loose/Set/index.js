import { HAS_SET, s } from "../constants.js";
import setup from "./proto.js";
import { isIterable } from "../../../util.js";
import { _classCallCheck } from "../../../../shared.js";
function generateSet(it) {
  if (it == null) return;
  if (!isIterable(it))
    throw new Error("value:" + String(it) + " is not iterable");
  for (k of it) {
    this.add(k);
  }
}
export default function FakeSet(iterable, forceUseCustomImplementation) {
  if (!forceUseCustomImplementation && HAS_SET) return new Set(iterable);
  _classCallCheck(this, FakeSet);
  this[s] = [];
  generateSet.call(this, iterable);
}
setup(FakeSet);
