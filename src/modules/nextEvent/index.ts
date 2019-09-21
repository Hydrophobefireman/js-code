export default function nextEvent(
  obj: EventTarget,
  event: string
): Promise<any> {
  return new Promise(res => obj.addEventListener(event, res, { once: true }));
}
