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
  var isIterable$1 = k => k && !!k[_Sym.iterator];
  var _Object = emptyObj.constructor;
  var hasOwnProp = emptyObj.hasOwnProperty;
  function _generateDocFrag(args) {
    var frag = document.createDocumentFragment();
    args.forEach(arg => frag.appendChild(arg instanceof Node ? arg : document.createTextNode(String(arg))));
    return frag;
  }
  var isBrowser = typeof window !== "undefined" && (window.navigator && !!window.navigator.userAgent || window.document && !!document.createElement);
  var defer = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

  var browserOnlyWarning = {
    warn(msg) {
      if (!isBrowser) console.warn(msg || "Some functionalities only eork in browsing context. Expect errors.");
    },

    _throw(msg) {
      throw new Error(msg || "A web browser is required for this module to run!");
    }

  };

  async function base64ToArrayBuffer(b64) {
    browserOnlyWarning._throw();

    var data = await fetch("data:," + b64);
    return await data.arrayBuffer();
  }

  var Object_keys = "keys" in _Object ? _Object.keys : function Object_keys(a) {
    var arr = [];

    for (var i in a) {
      hasOwnProp.call(a, i) && arr.push(i);
    }

    return arr;
  };

  function objToCSSString(a) {
    if ("string" == typeof a) return a;
    var b = [];

    for (var c of Object_keys(a)) {
      b.push(c + ":" + a[c]);
    }

    return b.join(";");
  }

  var Object_assign = "assign" in _Object ? _Object.assign : function Object_assign(target) {
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
      return 1 < ruleAndValue.length ? (fObj[ruleAndValue[0].trim()] = ruleAndValue[1].trim(), Object_assign(acc, filaObj)) : acc;
    }, {});
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

  var entries, values, keys;

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

    keys = function keys() {
      return mapKeyValIterator(this, true);
    };
  } else {
    entries = keys = values = function values() {
      console.warn("no symbol support");
    };
  }

  var symbolProps = {
    keys,
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

    Object_assign(FakeMap.prototype, symbolProps);
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

  var entries$1, values$1, keys$1;

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

    keys$1 = function keys() {
      return setKeyValIterator(this, false);
    };
  } else {
    entries$1 = keys$1 = values$1 = function values() {
      console.warn("no symbol support");
    };
  }

  var symbolProps$1 = {
    keys: keys$1,
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

    Object_assign(FakeSet.prototype, symbolProps$1);
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
  function patchObjectSealingMethods(key) {
    function _patch(m) {
      var method = Object[m];

      Object[m] = function FakeMethod(obj) {
        initializeInternalKeyProp(obj, key);
        return method(obj);
      };
    }

    ["freeze", "seal", "preventExtensions"].forEach(_patch);
  }
  function isObjectOrThrow(i) {
    if (Object(i) !== i) {
      throw new Error("Invalid value");
    }
  }

  var __WEAK__KEY = "@@WeakMap__" + +new Date() + Math.random().toString(16) + "-" + _getCryptoOrMathRandom();

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

    patchObjectSealingMethods(__WEAK__KEY);
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

  var Object_entries = "entries" in _Object ? _Object.entries : function Object_entries(a) {
    var keys = keys(a);
    var kLen = keys.length;
    var ret = Array(kLen);

    while (kLen--) {
      var p = keys[kLen];
      ret[kLen] = [p, a[p]];
    }

    return ret;
  };

  var Object_values = "values" in _Object ? _Object.values : function Object_values(a) {
    var arr = [];

    for (var i of Object_keys(a)) {
      arr.push(a[i]);
    }

    return arr;
  };

  var Object_fromEntries = "fromEntries" in _Object ? _Object.fromEntries : function Object_fromEntries(entries) {
    var ret = {};
    entries.forEach(k => ret[k[0]] = k[1]);
    return ret;
  };

  var Object_is = "is" in _Object ? _Object.is : function is(x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  };

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

  function Element_after(element) {
    browserOnlyWarning._throw();

    var args = emptyArr.slice.call(arguments, 1);

    if ("after" in element) {
      return element.after.apply(element, args);
    }

    var frag = _generateDocFrag(args);

    element.parentNode.insertBefore(frag, element.nextSibling);
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

  function Element_prepend(element) {
    browserOnlyWarning._throw();

    var args = emptyArr.slice.call(arguments, 1);

    if ("prepend" in element) {
      return element.prepend.apply(element, args);
    }

    var frag = _generateDocFrag(args);

    element.insertBefore(frag, element.firstChild);
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

  function loadCSS(url) {
    browserOnlyWarning._throw();

    var link = Object_assign(document.createElement("link"), {
      rel: "stylesheet",
      href: url
    });
    return new Promise((res, rej) => {
      link.addEventListener("load", () => res());
      link.addEventListener("error", () => rej());
      Element_append(document.head, link);
    });
  }

  var obj$1 = {
    arrayBufferToBase64,
    base64ToArrayBuffer,
    objToCSSString,
    Object_is,
    CSSStringToObj,
    urlencode,
    Object_keys,
    Object_values,
    Object_entries,
    Object_fromEntries,
    Object_assign,
    Element_append,
    Element_prepend,
    Element_after,
    loadCSS,
    retry,
    nextEvent,
    compatMap: FakeMap,
    compatSet: FakeSet,
    compatWeakMap: FakeWeakMap,
    compatWeakSet: FakeWeakSet
  };

  return obj$1;

}));
//# sourceMappingURL=j-utils.umd.js.map
