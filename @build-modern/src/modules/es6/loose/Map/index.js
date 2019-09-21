import { HAS_MAP, m } from "../constants.js";
import setup from "./proto.js";
import { isIterable } from "../../../util.js";
import { _classCallCheck } from "../../../../shared.js";
function generateMap(fm, it) {
    if (it == null)
        return;
    if (!isIterable(it))
        throw new Error("value:" + String(it) + " is not iterable");
    for (const k of it) {
        if (!k || k.length !== 2)
            throw new Error("invalid arg");
        fm.set(k[0], k[1]);
    }
}
const FakeMap = function FakeMap(iterable, forceUseCustomImplementation) {
    if (!forceUseCustomImplementation && HAS_MAP)
        return new Map(iterable);
    _classCallCheck(this, FakeMap);
    this[m] = [];
    generateMap(this, iterable);
    return this;
};
setup(FakeMap);
FakeMap[Symbol.species] = FakeMap;
export default FakeMap;
