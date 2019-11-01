export default function retry<T>(fn: (...a: any[]) => T, max?: number, waitInMS?: number, bind?: any): () => Promise<T>;
