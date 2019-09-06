import { browserOnlyWarning } from "../warnings.js";
import { _generateDocFrag } from "../util.js";
export default function Element_append(element) {
browserOnlyWarning._throw();
  const args = emptyArr.slice.call(arguments, 1);
  if ("append" in element) {
    element.append.apply(element, args);
  }
  const frag = _generateDocFrag(args);
  element.appendChild(frag);
}
