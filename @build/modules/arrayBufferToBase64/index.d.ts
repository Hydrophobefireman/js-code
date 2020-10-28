/**
 * ArrayBuffer to base64 implementation using FileReader API
 *
 * Naturally, Only works in browser environment
 *
 * @param buffer {ArrayBuffer} ArrayBuffer to convert into base64
 * @returns {string} base64 encoded string
 */
export default function arrayBufferToBase64(buffer: ArrayBuffer): Promise<string>;
