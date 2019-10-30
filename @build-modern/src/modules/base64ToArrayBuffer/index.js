import { browserOnlyWarning } from "../warnings.js";
/**
 * base64 string to Array Buffer using Fetch API
 *
 * Only works in Browser environment
 *
 * @param b64 {string} string to get as ArrayBuffer
 */
export default function base64ToArrayBuffer(b64) {
    browserOnlyWarning._throw();
    const data = fetch("data:," + b64);
    return data.then(x => x.arrayBuffer());
}
