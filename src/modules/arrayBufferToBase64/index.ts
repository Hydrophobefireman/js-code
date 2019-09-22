import { browserOnlyWarning } from "../warnings.js";
/**
 * ArrayBuffer to base64 implementation using FileReader API
 * 
 * Naturally, Only works in browser environment
 * 
 * @param buffer {ArrayBuffer} ArrayBuffer to convert into base64
 * @returns {string} base64 encoded string
 */
export default function arrayBufferToBase64(
  buffer: ArrayBuffer
): Promise<string> {
  browserOnlyWarning._throw();
  return new Promise((resolve, _) => {
    const blob = new Blob([buffer], {
      type: "application/octet-binary"
    });
    const reader = new FileReader();
    reader.onload = evt => {
      if (evt == null || evt.target == null) return null;
      const dataurl: string = evt.target.result as string;
      resolve(dataurl.substr(dataurl.indexOf(",") + 1));
    };
    reader.readAsDataURL(blob);
  });
}
