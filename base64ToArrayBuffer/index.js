import { browserOnlyWarning } from "../warnings.js";
export default async function base64ToArrayBuffer(b64) {
	browserOnlyWarning._throw();
  const data = await fetch(`data:,${b64}`);
  return await data.arrayBuffer();
}
