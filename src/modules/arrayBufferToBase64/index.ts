import { browserOnlyWarning } from "../warnings.js";
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
