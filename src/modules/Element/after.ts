import { browserOnlyWarning } from "../warnings.js";
import { _generateDocFrag, emptyArr, has } from "../util.js";
export default function Element_after(element: Element) {
  if (!element) throw new Error("Cannot add elements to null");
  browserOnlyWarning._throw();
  const args = emptyArr.slice.call(arguments, 1);
  if (has("after", element)) {
    return element.after.apply(element, args);
  }
  const frag = _generateDocFrag(args);
  const parent = element.parentNode;
  if (parent == null) throw new Error("Cannot append elements after orphan");
  parent.insertBefore(frag, element.nextSibling);
}
