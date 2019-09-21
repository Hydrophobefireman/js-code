import { browserOnlyWarning } from "../warnings.js";
import assign from "../Object/assign.js";
import append from "../Element/append.js";
export default function loadCSS(url) {
    browserOnlyWarning._throw();
    const link = assign(document.createElement("link"), {
        rel: "stylesheet",
        href: url
    });
    return new Promise((res, rej) => {
        const opt = { once: true };
        link.addEventListener("load", () => res(), opt);
        link.addEventListener("error", () => rej(), opt);
        append(document.head, link);
    });
}
