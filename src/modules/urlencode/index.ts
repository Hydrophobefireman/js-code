import { patchGlobalThis } from "../util.js";
import keys from "../Object/keys.js";
patchGlobalThis();
export default function urlencode(a: { [k: string]: string }): string {
  if (globalThis.URLSearchParams) {
    return new URLSearchParams(a).toString();
  } else {
    return `${keys(a)
      .map(
        (b: string) => `${encodeURIComponent(b)}=${encodeURIComponent(a[b])}`
      )
      .join("&")}`;
  }
}
