import { isBrowser } from "./util.js";
export const browserOnlyWarning = {
  warn(msg) {
    if (!isBrowser)
      console.warn(
        msg ||
          "Some functionalities only eork in browsing context. Expect errors."
      );
  },
  _throw(msg) {
    throw new Error(msg || "A web browser is required for this module to run!");
  }
};
