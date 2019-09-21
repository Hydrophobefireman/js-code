import { browserOnlyWarning } from "../warnings.js";
import { _generateDocFrag, emptyArr, has } from "../util.js";
export default function Element_prepend(element: Element) {
  browserOnlyWarning._throw();
  if (!element) throw new Error("cannot prepend elements");
  const args = emptyArr.slice.call(arguments, 1);
  if (has("prepend", element)) {
    return element.prepend.apply(element, args);
  }
  const frag = _generateDocFrag(args);
  element.insertBefore(frag, element.firstChild);
}
