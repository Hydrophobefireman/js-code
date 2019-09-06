export default function nextEvent(obj, event) {
  return new Promise(res => obj.addEventListener(event, res, { once: true }));
}
