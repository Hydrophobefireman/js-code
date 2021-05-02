function t(){if("object"==typeof globalThis)return globalThis;Object.defineProperty(Object.prototype,"___this",{get:function(){return this},configurable:!0}),___this.globalThis=___this;const t=___this;return delete Object.prototype.___this,t}const e=t(),n=e.Symbol||{},r=(t,e)=>t in e,o={},i=[],s=t=>t&&!!t[n.iterator],c=o.constructor,u=o.hasOwnProperty;function a(t){const e=document.createDocumentFragment();return t.forEach(t=>e.appendChild(t instanceof Node?t:document.createTextNode(String(t)))),e}const l="undefined"!=typeof window&&(window.navigator&&!!window.navigator.userAgent||window.document&&!!document.createElement),f="undefined"!=typeof self&&!!self.postMessage&&"function"==typeof e.importScripts,h=l||f,p={warn(t){if(!h)return console.warn(t||"Some functionality may only work in a browser. Expect errors")},_throw(t){if(!h)throw new Error(t||"A web browser is required for this module to run!")}};function d(t){return p._throw(),fetch("data:;base64,"+t).then(t=>t.arrayBuffer())}function y(t,e){return new Promise(n=>t.addEventListener(e,n,{once:!0}))}function _(t){return p._throw(),new Promise((e,n)=>{const r=new Blob([t],{type:"application/octet-binary"}),o=new FileReader;o.onload=t=>{if(o.onload=null,null==t||null==t.target)return null;const n=t.target.result;e(n.substr(n.indexOf(",")+1))},o.readAsDataURL(r)})}function m(t){return new Promise(e=>setTimeout(e,t))}function b(t,e=3,n,r){return async function(){let o=0;for(;o<e;)try{return await Promise.resolve(t.apply(r,[].slice.call(arguments)))}catch(t){o++,n&&await m(n)}throw new Error("function "+(t.name||"")+" failed "+e+" times")}}var w="keys"in c?c.keys:function(t){const e=[];for(const n in t)u.call(t,n)&&e.push(n);return e};function g(t){return globalThis.URLSearchParams?new URLSearchParams(t).toString():""+w(t).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])}).join("&")}t();var v="assign"in c?c.assign:function(t){for(let e=1;e<arguments.length;e++){const n=arguments[e];console.log(n);for(const e in n)u.call(n,e)&&(t[e]=n[e])}return t};function S(t){if(p._throw(),!t)throw new Error("cannot append elements");const e=i.slice.call(arguments,1);r("append",t)&&t.append.apply(t,e);const n=a(e);t.appendChild(n)}function E(t){p._throw();const e=v(document.createElement("link"),{rel:"stylesheet",href:t});return new Promise((t,n)=>{const r={once:!0};e.addEventListener("load",()=>t(),r),e.addEventListener("error",()=>n(),r),S(document.head,e)})}let j=t();const O=r("Map",j),k=r("Set",j),P=r("WeakMap",j)&&r("WeakSet",j),T="__@@map",I="__@@set",M=t=>t!=t,x=(t,e)=>t===e||M(t)&&M(e),A=t=>0===t?0:t;let B,C,R;if("undefined"!=typeof Symbol){function W(t,e){const n=t[T];let r=0;const o=n.length,i=e?0:1;return{[Symbol.iterator]:function(){return this},next:function(){return r<o?{value:n[r++][i],done:!1}:{value:void 0,done:!0}}}}B=function(){return this[T][Symbol.iterator]()},C=function(){return W(this,!1)},R=function(){return W(this,!0)}}else B=R=C=function(){console.warn("no symbol support")};var z={keys:R,values:C,entries:B};function L(t,e){const n=t[T],r=n.length;for(let t=0;t<r;t++){const r=n[t];if(x(r[0],e))return r}return null}function U(t,e){if(n=t,!(null!=(r=e)&&"undefined"!=typeof Symbol&&r[Symbol.hasInstance]?r[Symbol.hasInstance](n):n instanceof r))throw new TypeError;var n,r}const D=function t(e,n){return U(this,t),!n&&O?new Map(e):(this[T]=[],function(t,e){if(null==e)return;if(!s(e))throw new Error("value:"+String(e)+" is not iterable");const n=e.length;for(let r=0;r<n;r++){const n=e[r];if(!n||2!==n.length)throw new Error("invalid arg");t.set(n[0],n[1])}}(this,e),this)};let N,F,q;if(function(t){t.prototype.set=function(t,e){const n=L(this,t);return n?n[1]=e:this[T].push([A(t),e]),this},t.prototype.has=function(t){return!!L(this,t)},t.prototype.delete=function(t){let e=!1;return this[T]=this[T].filter(n=>{const r=!x(n[0],t);return r||(e=!0),r}),e},t.prototype.get=function(t){const e=L(this,t);return e?e[1]:void 0},t.prototype.forEach=function(t,e){const n=this[T],r=n.length;for(let o=0;o<r;o++){const r=n[o],i=r[1],s=r[0],c=this;e?t.call(e,i,s,c):t(i,s,c)}},t.prototype.clear=function(){this[T].length=0},Object.defineProperty(t.prototype,"size",{enumerable:!1,configurable:!0,get:function(){return this[T].length}}),"undefined"!=typeof Symbol&&(t.prototype[Symbol.iterator]=z.entries,t.prototype[Symbol.toStringTag]="Map"),v(t.prototype,z)}(D),D[Symbol.species]=D,"undefined"!=typeof Symbol){function V(t,e){const n=t[I];let r=0;const o=n.length;return{[Symbol.iterator]:function(){return this},next:function(){if(r<o){const t=n[r++];return{value:e?[t,t]:t,done:!1}}return{value:void 0,done:!0}}}}N=function(){return V(this,!0)},F=function(){return V(this,!1)},q=function(){return V(this,!1)}}else N=q=F=function(){console.warn("no symbol support")};var G={keys:q,values:F,entries:N};const H=function t(e,n){if(U(this,t),!n&&k)return new Set(e);this[I]=[],function(t,e){if(null==e)return;if(!s(e))throw new Error("value:"+String(e)+" is not iterable");const n=e.length;for(let r=0;r<n;r++)t.add(e[r])}(this,e)};!function(t){t.prototype.add=function(t){return this.has(t)||this[I].push(A(t)),this},t.prototype.has=function(t){const e=this[I],n=e.length;for(let r=0;r<n;r++)if(x(e[r],t))return!0;return!1},t.prototype.delete=function(t){let e=!1;return this[I]=this[I].filter(n=>{const r=!x(n,t);return r||(e=!0),r}),e},t.prototype.forEach=function(t,e){const n=this[I],r=n.length;for(let o=0;o<r;o++){const r=n[o],i=this;e?t.call(e,r,r,i):t(r,r,i)}},t.prototype.clear=function(){this[I].length=0},Object.defineProperty(t.prototype,"size",{enumerable:!1,configurable:!0,get:function(){return this[I].length}}),"undefined"!=typeof Symbol&&(t.prototype[Symbol.iterator]=G.values,t.prototype[Symbol.toStringTag]="Set"),v(t.prototype,G)}(H),H[Symbol.species]=H;const J={},K=t();function Q(t,e){e in t||Object.defineProperty(t,e,{value:{},enumerable:!1})}const X=["get","Own","PropertyDescriptors"].join(""),Y=["get","Own","PropertyNames"].join(""),Z="@@WeakMap__"+ +new Date+Math.random().toString(16)+"-"+function(){let t;return r("crypto",K)&&(t=K.crypto.getRandomValues,t)?(t=t.bind(crypto),t(new Uint8Array(10)).join("-")):String(Math.random())}(),$=function(t){["freeze","seal","preventExtensions"].forEach(e=>function(e){const n=Object[e];if(n.__patched===J)return;let r;r=Object[e]=function(e){return Q(e,t),n(e)},r.__patched=J}(e))}.bind(void 0,Z),tt=function(t){if(r(X,Object)){const e=Object[X];Object[X]=function(n){const r=e(n),o={};return w(r).forEach(e=>{e!==t&&(o[e]=r[e])}),o}}if(r(Y,Object)){const e=Object[Y];Object[Y]=function(n){return e(n).filter(e=>e!==t)}}}.bind(void 0,Z);let et=0;const nt=function t(e,n){if(!n&&P)return new WeakMap(e);U(this,t),$(),tt(),this._id=++et,function(t,e){if(null==e)return;if(!s(e))throw new Error("value:"+String(e)+" is not iterable");const n=e.length;for(let r=0;r<n;r++){const n=e[r];if(!n||2!==n.length)throw new Error("invalid arg");t.set(n[0],n[1])}}(this,e)};function rt(t,e){const n=t[Z];return n?n[e]:void 0}function ot(t){!function(t){if(Object(t)!==t)throw new Error("Invalid value")}(t),Q(t,Z)}nt[Symbol.species]=nt,nt.prototype={[Symbol.toStringTag]:"WeakMap",_id:0,delete(t){return ot(t),!!rt(t,this._id)&&(delete t[Z][this._id],!0)},set(t,e){ot(t);const n=rt(t,this._id);return n&&n[0]===this._id?n[1]=e:t[Z][this._id]=[this._id,e],this},has(t){return ot(t),!!rt(t,this._id)},get(t){ot(t);const e=rt(t,this._id);if(e&&e[0]===this._id)return e[1]}};const it=function t(e,n){if(U(this,t),!n&&P)return new WeakSet(e);this.__map=new nt(null,n),function(t,e){if(null==e||!t.__map)return;if(!s(e))throw new Error("value:"+String(e)+" is not iterable");const n=e.length;for(let r=0;r<n;r++){const n=e[r];t.__map.set(n,n)}}(this,e)};it[Symbol.species]=it,it.prototype={[Symbol.toStringTag]:"WeakSet",add(t){if(!this.__map)throw new Error("Invalid Initialization");return this.__map.has(t)||this.__map.set(t,t),this},has(t){if(!this.__map)throw new Error("Invalid Initialization");return this.__map.has(t)},delete(t){if(!this.__map)throw new Error("Invalid Initialization");return this.__map.delete(t)}};var st="entries"in c?c.entries:function(t){const e=w(t);let n=e.length;const r=Array(n);for(;n--;){const o=e[n];r[n]=[o,t[o]]}return r},ct="values"in c?c.values:function(t){const e=[];return w(t).forEach(n=>e.push(t[n])),e},ut="fromEntries"in c?c.fromEntries:function(t){const e={};return t.forEach(t=>e[t[0]]=t[1]),e},at="is"in c?c.is:function(t,e){return t===e?0!==t||1/t==1/e:t!=t&&e!=e};function lt(t){if(!t)throw new Error("Cannot add elements to null");p._throw();const e=i.slice.call(arguments,1);if(r("after",t))return t.after.apply(t,e);const n=a(e),o=t.parentNode;if(null==o)throw new Error("Cannot append elements after orphan");o.insertBefore(n,t.nextSibling)}function ft(t){if(p._throw(),!t)throw new Error("cannot prepend elements");const e=i.slice.call(arguments,1);if(r("prepend",t))return t.prepend.apply(t,e);const n=a(e);t.insertBefore(n,t.firstChild)}function ht(t){const e=t.length,n=Array(e);for(let r=0;r<e;r++)n[r]=t[r];return n}class pt{constructor(t,e,n){this._batch=e,this.reusable=n,this._buffer=[t],this._value=null}_commitBuffers(){let t;const e=this.reusable?ht(this._buffer):this._buffer;for(;t=e.shift();)this._value=t(this._value)}through(t){return this._buffer.push(t),this}get(t){return this._value=t,this._batch||this._commitBuffers(),this}value(){return this._batch&&this._commitBuffers(),this._value}}class dt extends pt{constructor(t,e){super(t,!0,e),this.reusable=e,this._buffer=[t]}async _commitBuffers(){let t;const e=this.reusable?ht(this._buffer):this._buffer;for(;t=e.shift();)this._value=await t(this._value)}async value(){return await this._commitBuffers(),this._value}}const yt={isAsync:!1,resolver:t=>String(t[0])};function _t(t,e){const n=(e=e||{}).resolver||yt.resolver,r=new D,o=e.isAsync||yt.isAsync;function i(){const e=[].slice.call(arguments),i=n(e),s=r.get(i);if(s)return s;const c=t.apply(null,e);return o?c.then(t=>(r.set(i,t),t)):(r.set(i,c),c)}return i._Map=r,i}function mt(t,e){let n;return function(){const r=this;clearTimeout(n),n=setTimeout(()=>e.apply(r,arguments),t||400)}}export{dt as AsyncPipe,lt as Element_after,S as Element_append,ft as Element_prepend,D as FakeMap,H as FakeSet,nt as FakeWeakMap,it as FakeWeakSet,v as Object_assign,st as Object_entries,ut as Object_fromEntries,at as Object_is,w as Object_keys,ct as Object_values,pt as Pipe,_ as arrayBufferToBase64,d as base64ToArrayBuffer,_t as cache,mt as debounce,E as loadCSS,y as nextEvent,t as patchGlobalThis,$ as patchObjectSealingMethods,tt as patchPropertyDescriptorMethods,b as retry,g as urlencode};
//# sourceMappingURL=j-utils.modern.js.map
