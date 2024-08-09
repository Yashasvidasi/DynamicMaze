import _ from "lodash";

export function Paginate(items, pgnum, pgsize) {
  const si = (pgnum - 1) * pgsize;
  return _(items).slice(si).take(pgsize).value();
}
