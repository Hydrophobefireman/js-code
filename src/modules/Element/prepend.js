import { browserOnlyWarning } from "../warnings.js";
import { _generateDocFrag } from "../util.js";
export default function Element_prepend(element) {
  browserOnlyWarning._throw();
  const args = emptyArr.slice.call(arguments, 1);
  if ("prepend" in element) {
    return element.prepend.apply(element, args);
  }
  const frag = _generateDocFrag(args);
  element.insertBefore(frag, element.firstChild);
}
