"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const warnings_js_1 = require("../warnings.js");
const util_js_1 = require("../util.js");
const assign_js_1 = require("../Object/assign.js");
const key = "@@__ScriptsLOADED";
const global = util_js_1.patchGlobalThis();
const moduleMap = {};
global[key] = moduleMap;
function _import(src, type) {
    warnings_js_1.browserOnlyWarning._throw("Cannot Import scripts without a browser context");
    if (util_js_1.domContext) {
        const script = assign_js_1.default(document.createElement("script"), {
            type: type || "text/javascript",
            charset: "utf-8"
        });
        if (type === "module") {
            return loadModuleScript(script, src);
        }
        return loadTraditionalScript(script, src);
    }
    else if (util_js_1.workerContext) {
        return self.importScripts(src);
    }
}
exports.default = _import;
function loadModuleScript(script, src) {
    const sc = global[key];
    if (sc)
        return Promise.resolve(sc[src]);
    const evt = `loaded__${src}`;
    assign_js_1.default(script, {
        text: `import * as Obj from "${src}";
    window["${key}"]["${src}"]=Obj;
    dispatchEvent(new Event("${evt}"))`
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
        assign_js_1.default(script, { src });
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
