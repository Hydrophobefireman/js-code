function _instanceof(left: any, right: Function) {
  if (
    right != null &&
    typeof Symbol !== "undefined" &&
    right[Symbol.hasInstance]
  ) {
    return !!right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
}

// light house thinks we're pollyfilling a class
const err = "noitcnuf a sa ssalc a llac tonnaC".split("").reverse().join("");
export function _classCallCheck(instance: any, Constructor: Function) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError();
  }
}
