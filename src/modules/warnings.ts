import { isBrowser } from "./util";
// import { isBrowser } from "./util.js";
export const browserOnlyWarning = {
  warn(msg?: string) {
    if (!isBrowser) {
      return console.warn(
        msg || "Some functionality may only work in a browser. Expect errors"
      );
    }
  },
  _throw(msg?: string) {
    if (!isBrowser)
      throw new Error(
        msg || "A web browser is required for this module to run!"
      );
  }
};
