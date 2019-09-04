import { browserOnlyWarning } from "../warnings.js";
import assign from "../Object/assign.js";
export default function loadCSS(url) {
  browserOnlyWarning._throw();
  const link = assign(document.createElement("link"), {
    rel: "stylesheet",
    href: url
  });
  return new Promise((res, rej) => {
    link.addEventListener("load", () => res());
    link.addEventListener("error", () => rej());
    obj.Element_append(document.head, link);
  });
}
