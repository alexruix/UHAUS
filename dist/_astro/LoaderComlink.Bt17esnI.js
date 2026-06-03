import {
  c as s,
  b as n,
  d as c,
  a as i,
  f as o,
  s as r,
  g as a,
} from "./visual-editing-component.BUBjU8Vu.js";
import { r as p } from "./index.Z3ghWE2m.js";
function m() {
  const e = s.c(1);
  let t;
  return (
    e[0] === Symbol.for("react.memo_cache_sentinel")
      ? ((t = []), (e[0] = t))
      : (t = e[0]),
    p.useEffect(l, t),
    null
  );
}
function l() {
  const e = n(
    { name: "loaders", connectTo: "presentation" },
    c().provide({ actors: i() }),
  );
  e.on("loader/perspective", d);
  const t = e.start();
  return (
    o(),
    () => {
      (t(), o(), r(), a());
    }
  );
}
function d(e) {
  (r(e.projectId, e.dataset), a(e.perspective));
}
m.displayName = "LoaderComlink";
export { m as default };
