import { HAS_MAP, m } from "../constants.js";
import setup from "./proto.js";
import { isIterable } from "../../../util.js";
import { _classCallCheck } from "../../../../shared.js";
function generateMap(fm, it) {
    if (it == null)
        return;
    if (!isIterable(it))
        throw new Error("value:" + String(it) + " is not iterable");
    const len = it.length;
    for (let i = 0; i < len; i++) {
        const k = it[i];
        if (!k || k.length !== 2)
            throw new Error("invalid arg");
        fm.set(k[0], k[1]);
    }
}
/**
 * Map implementation
 *
 * This Implementation uses One single array to store keys and values in their own arrays
 * Key index - 0
 * Value index - 1
 *
 * we could have used 2 separate Arrays for storing keys and values in matching indices
 * @TODO do a benchmark
 */
const FakeMap = function FakeMap(iterable, forceUseCustomImplementation) {
    _classCallCheck(this, FakeMap);
    if (!forceUseCustomImplementation && HAS_MAP)
        return new Map(iterable);
    this[m] = [];
    generateMap(this, iterable);
    return this;
};
setup(FakeMap);
FakeMap[Symbol.species] = FakeMap;
export default FakeMap;
