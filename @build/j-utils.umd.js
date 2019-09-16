(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.jUtils = factory());
}(this, function () {
  function patchGlobalThis() {
    if (typeof globalThis === "object") return globalThis;
    Object.defineProperty(Object.prototype, "___this", {
      get: function get() {
        return this;
      },
      configurable: true
    });
    ___this.globalThis = ___this;
    var r = ___this;
    delete Object.prototype.___this;
    return r;
  }
  patchGlobalThis();

  var _Sym = globalThis.Symbol || {};

  var has = (a, b) => a in b;
  var emptyObj = {};
  var emptyArr$1 = [];
  var isIterable$1 = k => k && !!k[_Sym.iterator];
  var _Object = emptyObj.constructor;
  var hasOwnProp = emptyObj.hasOwnProperty;
  function _generateDocFrag(args) {
    var frag = document.createDocumentFragment();
    args.forEach(arg => frag.appendChild(arg instanceof Node ? arg : document.createTextNode(String(arg))));
    return frag;
  }
  function checkAndPatch(o, prop, opt) {
    if (prop in o) {
      var val = o[prop];
      var patch = opt.patch,
          name = opt.name;

      if (opt.bind) {
        patch[name] = val.bind(opt.bind);
      } else {
        patch[name] = val;
      }

      return true;
    }

    return false;
  }
  var domContext = typeof window !== "undefined" && (window.navigator && !!window.navigator.userAgent || window.document && !!document.createElement);
  var workerContext = typeof self !== "undefined" && !!self.postMessage && typeof importScripts === "function";
  var isBrowser = domContext || workerContext;
  var defer = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

  var util = ({
    patchGlobalThis: patchGlobalThis,
    has: has,
    emptyObj: emptyObj,
    emptyArr: emptyArr$1,
    isIterable: isIterable$1,
    _Object: _Object,
    hasOwnProp: hasOwnProp,
    _generateDocFrag: _generateDocFrag,
    checkAndPatch: checkAndPatch,
    domContext: domContext,
    workerContext: workerContext,
    isBrowser: isBrowser,
    defer: defer
  });

  var browserOnlyWarning = {
    warn(msg) {
      if (!isBrowser) console.warn(msg || "Some functionalities only eork in browsing context. Expect errors.");
    },

    _throw(msg) {
      if (!isBrowser) throw new Error(msg || "A web browser is required for this module to run!");
    }

  };

  async function base64ToArrayBuffer(b64) {
    browserOnlyWarning._throw();

    var data = await fetch("data:," + b64);
    return await data.arrayBuffer();
  }

  var keys = "keys" in _Object ? _Object.keys : function Object_keys(a) {
    var arr = [];

    for (var i in a) {
      hasOwnProp.call(a, i) && arr.push(i);
    }

    return arr;
  };

  function objToCSSString(a) {
    if ("string" == typeof a) return a;
    var b = [];

    for (var c of keys(a)) {
      b.push(c + ":" + a[c]);
    }

    return b.join(";");
  }

  var assign = "assign" in _Object ? _Object.assign : function Object_assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (hasOwnProp.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function CSSStringToObj(css) {
    if ("object" == typeof css) return css;
    var rules = css.split(";");
    return rules.reduce((acc, d) => {
      var ruleAndValue = d.split(":"),
          fObj = {};
      return 1 < ruleAndValue.length ? (fObj[ruleAndValue[0].trim()] = ruleAndValue[1].trim(), assign(acc, filaObj)) : acc;
    }, {});
  }

  function nextEvent(obj, event) {
    return new Promise(res => obj.addEventListener(event, res, {
      once: true
    }));
  }

  function arrayBufferToBase64(buffer) {
    browserOnlyWarning._throw();

    return new Promise((resolve, _) => {
      var blob = new Blob([buffer], {
        type: "application/octet-binary"
      });
      var reader = new FileReader();

      reader.onload = evt => {
        var dataurl = evt.target.result;
        resolve(dataurl.substr(dataurl.indexOf(",") + 1));
      };

      reader.readAsDataURL(blob);
    });
  }

  function retry(fn, max, bind) {
    max = max || 3;
    return async function () {
      var tries = 0;

      while (tries < max) {
        try {
          return await fn.apply(bind, arguments);
        } catch (e) {
          tries++;
        }
      }

      throw new Error("function " + (fn.name || "") + " failed " + max + " times");
    };
  }

  patchGlobalThis();
  function urlencode(a) {
    if (globalThis.URLSearchParams) {
      return new URLSearchParams(a).toString();
    } else {
      return "" + obj.keys(a).map(b => encodeURIComponent(b) + "=" + encodeURIComponent(a[b])).join("&");
    }
  }

  function Element_append(element) {
    browserOnlyWarning._throw();

    var args = emptyArr.slice.call(arguments, 1);

    if ("append" in element) {
      element.append.apply(element, args);
    }

    var frag = _generateDocFrag(args);

    element.appendChild(frag);
  }

  function loadCSS(url) {
    browserOnlyWarning._throw();

    var link = assign(document.createElement("link"), {
      rel: "stylesheet",
      href: url
    });
    return new Promise((res, rej) => {
      link.addEventListener("load", () => res());
      link.addEventListener("error", () => rej());
      Element_append(document.head, link);
    });
  }

  var key = "@@__ScriptsLOADED";
  var global = patchGlobalThis();
  var moduleMap = {};
  global[key] = moduleMap;
  function _import(src, type) {
    browserOnlyWarning._throw("Cannot Import scripts without a browser context");

    if (domContext) {
      var script = assign(document.createElement("script"), {
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
    var evt = "loaded__" + src;
    assign(script, {
      text: "import * as Obj from \"" + src + "\";\n    window[\"" + key + "\"][\"" + src + "\"]=Obj;\n    dispatchEvent(new Event(\"" + evt + "\"))"
    });
    return new Promise((resolve, reject) => {
      var res = () => {
        resolve(global[key][src]);
      };

      window.addEventListener(evt, res, {
        once: true
      });
      document.head.appendChild(script);
    });
  }

  function loadTraditionalScript(script, src) {
    return new Promise((resolve, reject) => {
      assign(script, {
        src
      });

      var res = () => {
        clearListeners();
        resolve(script);
      };

      var rej = () => {
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

  var _global = patchGlobalThis();

  var HAS_MAP = has("Map", _global);
  var HAS_SET = has("Set", _global);
  var HAS_WEAK = has("WeakMap", _global) && has("WeakSet", _global);
  var m = "__@@map";
  var s = "__@@set";

  var _isNaN = k => k !== k;

  var _EqCheck = (x, y) => x === y || _isNaN(x) && _isNaN(y);
  var normalizeNegativeZero = k => k === 0 ? 0 : k;

  var entries, values, keys$1;

  if (typeof Symbol !== "undefined") {
    function mapEntriesIterator(map) {
      var _ = map[m];
      var c = _[Symbol.iterator];
      return c.call(_);
    }

    entries = function entries() {
      return mapEntriesIterator(this);
    };

    function mapKeyValIterator(map, isKey) {
      var _ = map[m];
      var i = 0;
      var len = _.length;
      var kv = isKey ? 0 : 1;
      return {
        [Symbol.toStringTag]: "Map Iterator",
        [Symbol.iterator]: function () {
          return this;
        },
        next: function next() {
          if (i < len) {
            return {
              value: _[i++][kv],
              done: false
            };
          }

          return {
            value: void 0,
            done: true
          };
        }
      };
    }

    values = function values() {
      return mapKeyValIterator(this, false);
    };

    keys$1 = function keys() {
      return mapKeyValIterator(this, true);
    };
  } else {
    entries = keys$1 = values = function values() {
      console.warn("no symbol support");
    };
  }

  var symbolProps = {
    keys: keys$1,
    values,
    entries
  };

  function __i_getMapArr(k) {
    for (var i of this[m]) {
      if (_EqCheck(i[0], k)) return i;
    }

    return null;
  }

  function setPrototypeProps(FakeMap) {
    FakeMap.prototype.set = function set(k, v) {
      var prevArr = __i_getMapArr.call(this, k);

      if (prevArr) {
        prevArr[1] = v;
      } else {
        this[m].push([normalizeNegativeZero(k), v]);
      }

      return this;
    };

    FakeMap.prototype.has = function has(key) {
      return !!__i_getMapArr.call(this, key);
    };

    FakeMap.prototype.delete = function del(k) {
      this[m] = this[m].filter(x => !_EqCheck(x[0], k));
    };

    FakeMap.prototype.get = function get(key) {
      var arr = __i_getMapArr.call(this, key);

      return arr ? arr[1] : undefined;
    };

    FakeMap.prototype.forEach = function forEach(cb, that) {
      for (var arr of this[m]) {
        var a = arr[1],
            b = arr[0],
            c = this;
        that ? cb.call(that, a, b, c) : cb(a, b, c);
      }
    };

    FakeMap.prototype.clear = function clear() {
      return void (this[m].length = 0);
    };

    Object.defineProperty(FakeMap.prototype, "size", {
      enumerable: false,
      configurable: true,
      get: function get() {
        return this[m].length;
      }
    });

    if (typeof Symbol !== "undefined") {
      FakeMap.prototype[Symbol.iterator] = symbolProps.entries;
      FakeMap.prototype[Symbol.toStringTag] = "Map";
    }

    assign(FakeMap.prototype, symbolProps);
  }

  function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return !!right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function generateMap(it) {
    if (it == null) return;
    if (!isIterable$1(it)) throw new Error("value:" + String(it) + " is not iterable");

    for (k of it) {
      if (!k || k.length !== 2) throw new Error("invalid arg");
      this.set(k[0], k[1]);
    }
  }

  function FakeMap(iterable, forceUseCustomImplementation) {
    if (!forceUseCustomImplementation && HAS_MAP) return new Map(iterable);

    _classCallCheck(this, FakeMap);

    this[m] = [];
    generateMap.call(this, iterable);
  }
  setPrototypeProps(FakeMap);

  var entries$1, values$1, keys$2;

  if (typeof Symbol !== "undefined") {

    entries$1 = function entries() {
      return setKeyValIterator(this, true);
    };

    function setKeyValIterator(set, isDup) {
      var _ = set[s];
      var i = 0;
      var len = _.length;
      return {
        [Symbol.toStringTag]: "Set Iterator",
        [Symbol.iterator]: function () {
          return this;
        },
        next: function next() {
          if (i < len) {
            var v = _[i++];
            return {
              value: isDup ? [v, v] : v,
              done: false
            };
          }

          return {
            value: void 0,
            done: true
          };
        }
      };
    }

    values$1 = function values() {
      return setKeyValIterator(this, false);
    };

    keys$2 = function keys() {
      return setKeyValIterator(this, false);
    };
  } else {
    entries$1 = keys$2 = values$1 = function values() {
      console.warn("no symbol support");
    };
  }

  var symbolProps$1 = {
    keys: keys$2,
    values: values$1,
    entries: entries$1
  };

  function setPrototypeProps$1(FakeSet) {
    FakeSet.prototype.add = function set(k) {
      if (!this.has(k)) this[s].push(normalizeNegativeZero(k));
      return this;
    };

    FakeSet.prototype.has = function has(key) {
      for (var i of this[s]) {
        if (_EqCheck(i, key)) return true;
      }

      return false;
    };

    FakeSet.prototype.delete = function del(k) {
      this[s] = this[s].filter(x => !_EqCheck(x, k));
    };

    FakeSet.prototype.forEach = function forEach(cb, that) {
      for (var arr of this[s]) {
        var a = arr,
            c = this;
        that ? cb.call(that, a, a, c) : cb(a, a, c);
      }
    };

    FakeSet.prototype.clear = function clear() {
      return void (this[s].length = 0);
    };

    Object.defineProperty(FakeSet.prototype, "size", {
      enumerable: false,
      configurable: true,
      get: function get() {
        return this[s].length;
      }
    });

    if (typeof Symbol !== "undefined") {
      FakeSet.prototype[Symbol.iterator] = symbolProps$1.values;
      FakeSet.prototype[Symbol.toStringTag] = "Set";
    }

    assign(FakeSet.prototype, symbolProps$1);
  }

  function generateSet(it) {
    if (it == null) return;
    if (!isIterable$1(it)) throw new Error("value:" + String(it) + " is not iterable");

    for (k of it) {
      this.add(k);
    }
  }

  function FakeSet(iterable, forceUseCustomImplementation) {
    if (!forceUseCustomImplementation && HAS_SET) return new Set(iterable);

    _classCallCheck(this, FakeSet);

    this[s] = [];
    generateSet.call(this, iterable);
  }
  setPrototypeProps$1(FakeSet);

  var e = {};
  var gl = patchGlobalThis();
  function _getCryptoOrMathRandom() {
    var hasCrypto = has("crypto", gl);
    var rv;

    if (hasCrypto) {
      rv = gl.crypto.getRandomValues;

      if (rv) {
        rv = rv.bind(crypto);
        return rv(new Uint8Array(10)).join("-");
      }
    }

    return Math.random();
  }
  function initializeInternalKeyProp(obj, key) {
    if (key in obj) return;
    Object.defineProperty(obj, key, {
      value: {},
      enumerable: false
    });
  }
  function _patchObjectSealingMethods(key) {
    function _patch(m) {
      var method = Object[m];
      if (method.__patched === e) return;
      var fn;

      fn = Object[m] = function FakeMethod(obj) {
        initializeInternalKeyProp(obj, key);
        return method(obj);
      };

      fn.__patched = e;
    }

    ["freeze", "seal", "preventExtensions"].forEach(_patch);
  }
  function isObjectOrThrow(i) {
    if (Object(i) !== i) {
      throw new Error("Invalid value");
    }
  }

  var __WEAK__KEY = "@@WeakMap__" + +new Date() + Math.random().toString(16) + "-" + _getCryptoOrMathRandom();

  var patchObjectSealingMethods = _patchObjectSealingMethods.bind(void 0, __WEAK__KEY);

  function generateMap$1(it) {
    if (it == null) return;
    if (!isIterable$1(it)) throw new Error("value:" + String(it) + " is not iterable");

    for (k of it) {
      if (!k || k.length !== 2) throw new Error("invalid arg");
      this.set(k[0], k[1]);
    }
  }

  var weakMapIds = 0;
  function FakeWeakMap(iterable, forceUseCustomImplementation) {
    if (!forceUseCustomImplementation && HAS_WEAK) return new WeakMap(iterable);

    _classCallCheck(this, FakeWeakMap);

    patchObjectSealingMethods();
    this._id = ++weakMapIds;
    generateMap$1.call(this, iterable);
  }

  function _getKeyValArr(key, id) {
    var c = key[__WEAK__KEY];
    return c ? c[id] : void 0;
  }

  function initSafeSetup(key) {
    isObjectOrThrow(key);
    initializeInternalKeyProp(key, __WEAK__KEY);
  }

  FakeWeakMap.prototype = {
    get(key) {
      initSafeSetup(key);

      var val = _getKeyValArr(key, this._id);

      if (val && val[0] === this._id) {
        return val[1];
      }
    },

    has(key) {
      initSafeSetup(key);
      return !!_getKeyValArr(key, this._id);
    },

    set(key, val) {
      initSafeSetup(key);

      var prevArr = _getKeyValArr(key, this._id);

      if (prevArr && prevArr[0] === this._id) {
        prevArr[1] = val;
      } else {
        key[__WEAK__KEY][this._id] = [this._id, val];
      }

      return this;
    },

    delete(key) {
      initSafeSetup(key);

      var prevArr = _getKeyValArr(key, this._id);

      if (!prevArr) return false;
      delete key[__WEAK__KEY][this._id];
      return true;
    }

  };

  function generateSet$1(it) {
    if (it == null) return;
    if (!isIterable(it)) throw new Error("value:" + String(it) + " is not iterable");

    for (k of it) {
      this.__map.set(k, k);
    }
  }

  function FakeWeakSet(iterable, forceUseCustomImplementations) {
    if (!forceUseCustomImplementations && HAS_WEAK) return new WeakSet(iterable);

    _classCallCheck(this, FakeWeakSet);

    this.__map = new FakeWeakMap(null, forceUseCustomImplementations);
    generateSet$1.call(this, iterable);
  }
  FakeWeakSet.prototype = {
    add(k) {
      if (this.__map.has(k)) return;

      this.__map.set(k, k);

      return this;
    },

    has(k) {
      return this.__map.has(k);
    },

    delete(k) {
      return this.__map.delete(k);
    }

  };



  var es6 = ({
    FakeMap: FakeMap,
    FakeSet: FakeSet,
    FakeWeakMap: FakeWeakMap,
    patchObjectSealingMethods: patchObjectSealingMethods,
    FakeWeakSet: FakeWeakSet
  });

  var entries$2 = "entries" in _Object ? _Object.entries : function Object_entries(a) {
    var keys = keys(a);
    var kLen = keys.length;
    var ret = Array(kLen);

    while (kLen--) {
      var p = keys[kLen];
      ret[kLen] = [p, a[p]];
    }

    return ret;
  };

  var values$2 = "values" in _Object ? _Object.values : function Object_values(a) {
    var arr = [];

    for (var i of keys(a)) {
      arr.push(a[i]);
    }

    return arr;
  };

  var fromEntries = "fromEntries" in _Object ? _Object.fromEntries : function Object_fromEntries(entries) {
    var ret = {};
    entries.forEach(k => ret[k[0]] = k[1]);
    return ret;
  };

  var is = "is" in _Object ? _Object.is : function is(x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  };



  var _Object$1 = ({
    Object_assign: assign,
    Object_keys: keys,
    Object_entries: entries$2,
    Object_values: values$2,
    Object_fromEntries: fromEntries,
    Object_is: is
  });

  function Element_after(element) {
    browserOnlyWarning._throw();

    var args = emptyArr.slice.call(arguments, 1);

    if ("after" in element) {
      return element.after.apply(element, args);
    }

    var frag = _generateDocFrag(args);

    element.parentNode.insertBefore(frag, element.nextSibling);
  }

  function Element_prepend(element) {
    browserOnlyWarning._throw();

    var args = emptyArr.slice.call(arguments, 1);

    if ("prepend" in element) {
      return element.prepend.apply(element, args);
    }

    var frag = _generateDocFrag(args);

    element.insertBefore(frag, element.firstChild);
  }



  var Element = ({
    Element_after: Element_after,
    Element_append: Element_append,
    Element_prepend: Element_prepend
  });

  var obj$1 = {
    arrayBufferToBase64,
    base64ToArrayBuffer,
    objToCSSString,
    CSSStringToObj,
    urlencode,
    loadCSS,
    retry,
    nextEvent,
    util,
    _import
  };

  assign(obj$1, _Object$1, Element, es6);

  return obj$1;

}));
//# sourceMappingURL=j-utils.umd.js.map
