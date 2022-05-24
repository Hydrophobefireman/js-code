export function blobToArrayBuffer(blob: Blob) {
  if (blob.arrayBuffer) {
    return blob.arrayBuffer();
  } else {
    return new Promise<ArrayBuffer>((resolve) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result as ArrayBuffer);
      };
      fileReader.readAsArrayBuffer(blob);
    });
  }
}
