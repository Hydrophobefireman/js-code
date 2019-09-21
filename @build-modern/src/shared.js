function _instanceof(left, right) {
    if (right != null &&
        typeof Symbol !== "undefined" &&
        right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    }
    else {
        return left instanceof right;
    }
}
export function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
