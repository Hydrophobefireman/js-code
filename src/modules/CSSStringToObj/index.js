import assign from "../Object/assign.js";
export default function CSSStringToObj(css) {
  if ("object" == typeof css) return css;
  const rules = css.split(";");
  return rules.reduce((acc, d) => {
    const ruleAndValue = d.split(":"),
      fObj = {};
    return 1 < ruleAndValue.length
      ? ((fObj[ruleAndValue[0].trim()] = ruleAndValue[1].trim()),
        assign(acc, filaObj))
      : acc;
  }, {});
}
