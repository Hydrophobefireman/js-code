import { patchGlobalThis } from "../util.js";
import keys from "../Object/keys.js";
patchGlobalThis();
export default function urlencode(a) {
  if (globalThis.URLSearchParams) {
    return new URLSearchParams(a).toString();
  } else {
    return `${obj
      .keys(a)
      .map(b => `${encodeURIComponent(b)}=${encodeURIComponent(a[b])}`)
      .join("&")}`;
  }
}
