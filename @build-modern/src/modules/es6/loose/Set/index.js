import { HAS_SET, s } from "../constants.js";
import setup from "./proto.js";
import { isIterable } from "../../../util.js";
import { _classCallCheck } from "../../../../shared.js";
function generateSet(fs, it) {
    if (it == null)
        return;
    if (!isIterable(it))
        throw new Error("value:" + String(it) + " is not iterable");
    const len = it.length;
    for (let i = 0; i < len; i++) {
        const k = it[i];
        fs.add(k);
    }
}
const FakeSet = function FakeSet(iterable, forceUseCustomImplementation) {
    _classCallCheck(this, FakeSet);
    if (!forceUseCustomImplementation && HAS_SET)
        return new Set(iterable);
    this[s] = [];
    generateSet(this, iterable);
};
setup(FakeSet);
FakeSet[Symbol.species] = FakeSet;
export default FakeSet;
