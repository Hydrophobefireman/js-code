import { browserOnlyWarning } from "../warnings.js";
import { _generateDocFrag } from "../util.js";
export default function Element_after(element) {
  browserOnlyWarning._throw();
  const args = emptyArr.slice.call(arguments, 1);
  if ("after" in element) {
    return element.after.apply(element, args);
  }
  const frag = _generateDocFrag(args);
  element.parentNode.insertBefore(frag, element.nextSibling);
}
