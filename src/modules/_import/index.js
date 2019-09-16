import { browserOnlyWarning } from "../warnings.js";
import { domContext, workerContext, patchGlobalThis } from "../util.js";
import assign from "../Object/assign.js";
const key = "@@__ScriptsLOADED";
const global = patchGlobalThis();
const moduleMap = {};
global[key] = moduleMap;
export default function _import(src, type) {
  browserOnlyWarning._throw("Cannot Import scripts without a browser context");
  if (domContext) {
    /**
     * @type {HTMLScriptElement}
     */
    const script = assign(document.createElement("script"), {
      type: type || "text/javascript",
      charset: "utf-8"
    });
    if (type === "module") {
      return loadModuleScript(script, src);
    }
    return loadTraditionalScript(script, src);
  } else if (workerContext) {
    return importScripts(src);
  }
}
function loadModuleScript(script, src) {
  const sc = global[key][src];
  if (sc) return sc;
  const evt = `loaded__${src}`;
  assign(script, {
    text: `import * as Obj from "${src}";
    window["${key}"]["${src}"]=Obj;
    dispatchEvent(new Event("${evt}"))`
  });
  return new Promise((resolve, reject) => {
    const res = () => {
      resolve(global[key][src]);
    };
    window.addEventListener(evt, res, { once: true });
    document.head.appendChild(script);
  });
}
function loadTraditionalScript(script, src) {
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
