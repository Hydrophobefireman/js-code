import { browserOnlyWarning } from "../warnings.js";
import { _generateDocFrag, emptyArr, has } from "../util.js";
export default function Element_append(element: Element) {
  browserOnlyWarning._throw();
  if (!element) throw new Error("cannot append elements");
  const args = emptyArr.slice.call(arguments, 1);
  if (has("append", element)) {
    element.append.apply(element, args);
  }
  const frag = _generateDocFrag(args);
  element.appendChild(frag);
}
