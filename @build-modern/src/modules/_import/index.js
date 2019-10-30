import { isBrowser, domContext, workerContext, patchGlobalThis } from "../util.js";
import assign from "../Object/assign.js";
const key = "@@__ScriptsLOADED";
const global = patchGlobalThis();
const moduleMap = {};
global[key] = moduleMap;
export default function _import(src, type) {
    if (!isBrowser && typeof require == "function")
        return Promise.resolve(require(src));
    if (domContext) {
        const script = assign(document.createElement("script"), {
            type: type || "text/javascript",
            charset: "utf-8"
        });
        if (type === "module") {
            return loadModuleScript(script, src);
        }
        return loadTraditionalScript(script, src);
    }
    else if (workerContext) {
        return self.importScripts(src);
    }
}
function loadModuleScript(script, src) {
    const sc = global[key];
    if (sc)
        return Promise.resolve(sc[src]);
    const evt = `loaded__${src}`;
    assign(script, {
        text: 'import * as Obj from "' +
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
