export default function retry<T>(fn: (...a: any[]) => T, max: number, bind: any): () => Promise<T>;
