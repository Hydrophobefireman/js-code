import { browserOnlyWarning } from "../warnings.js";
/**
 * base64 string to Array Buffer using Fetch API
 *
 * Only works in Browser environment
 *
 * @param b64 {string} string to get as ArrayBuffer
 */
export default async function base64ToArrayBuffer(
  b64: string
): Promise<ArrayBuffer> {
  browserOnlyWarning._throw();
  const data = await fetch(`data:,${b64}`);
  return await data.arrayBuffer();
}
