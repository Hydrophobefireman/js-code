import {
  isBrowser,
  domContext,
  workerContext,
  patchGlobalThis
} from "../util.js";
import assign from "../Object/assign.js";
const key = "@@__ScriptsLOADED";
interface globalThis {
  [key]?: { [src: string]: any };
}
declare var require: (src: string) => any;
const global = patchGlobalThis() as globalThis;
const moduleMap = {};
global[key] = moduleMap;
export default function _import(
  src: string,
  type: string
): Promise<HTMLScriptElement | any> | void {
  if (!isBrowser && typeof require == "function")
    return Promise.resolve(require(src));
  if (domContext) {
    const script: HTMLScriptElement = assign(document.createElement("script"), {
      type: type || "text/javascript",
      charset: "utf-8"
    });
    if (type === "module") {
      return loadModuleScript(script, src);
    }
    return loadTraditionalScript(script, src);
  } else if (workerContext) {
    return (self as any).importScripts(src);
  }
}
function loadModuleScript(script: HTMLScriptElement, src: string) {
  const sc = global[key];
  if (sc) return Promise.resolve(sc[src]);
  const evt = `loaded__${src}`;
  assign(script, {
    text:
      'import * as Obj from "' +
      src +
      '";window["' +
      key +
      '"]["' +
      src +
      '"]=Obj;dispatchEvent(new Event("' +
      evt +
      '"))'
  });
  return new Promise((resolve, reject) => {
    const res = () => {
      const k = global[key];
      k && resolve(k[src]);
    };
    window.addEventListener(evt, res, { once: true });
    document.head.appendChild(script);
  });
}
function loadTraditionalScript(
  script: HTMLScriptElement,
  src: string
): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    assign(script, { src });
    const res = () => {
      clearListeners();
      resolve(script);
    };
    const rej = () => {
      clearListeners();
      reject(script);
    };
    function clearListeners() {
      script.removeEventListener("load", res);
      script.removeEventListener("error", rej);
    }
    script.addEventListener("load", res);
    script.addEventListener("error", rej);
    document.head.appendChild(script);
  });
}
