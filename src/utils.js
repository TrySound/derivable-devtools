// @flow

import * as t from "./types.js";
import nanoid from "nanoid";
import NanoEvents from "nanoevents";
import uniq from "lodash/uniq";
import flatMap from "lodash/flatMap";
import flatten from "lodash/flatten";

const not = f => d => !f(d);

const traverse = (nodes, children) =>
  flatMap(nodes, node => [node, ...traverse(children(node), children)]);

export const isAtom = (d: Object) => d._type === "ATOM";

const isDerivation = (d: Object) => d._type === "DERIVATION";

const isReactor = (d: Object) => d._type === "REACTOR";

const isNotReactor = not(isReactor);

const isActiveReactor = (d: Object) => isReactor(d) && d._active;

const getLabel = (d: Object) =>
  typeof d.__devtools_label__ === "string" ? d.__devtools_label__ : "Unnamed";

const getValue = (d: Object) => d._value;

const getChildren = (d: Object) => d._activeChildren;

const getType = (d: Object) => {
  if (isAtom(d)) {
    return "atom";
  }
  if (isDerivation(d)) {
    return "derivation";
  }
  return "";
};

const hasGovernor = d => Boolean(d._governor);

export const customAtom = (_value: any) => {
  const emitter = new NanoEvents();
  let value = _value;

  return {
    set: (d: any) => {
      value = d;
      emitter.emit("set", d);
    },
    get: (): any => value,
    react: (callback: any => void) => {
      callback(value);
      emitter.on("set", callback);
    }
  };
};

export const batchSync = (callback: ($ReadOnlyArray<Object>) => void) => {
  let batchedPromise;
  let all;
  return (item: Object) => {
    if (batchedPromise && all) {
      all.push(item);
    } else {
      all = [item];
      batchedPromise = Promise.resolve().then(() => {
        if (all) {
          callback(all);
        }
        batchedPromise = null;
        all = null;
      });
    }
  };
};

export const hasActiveReactors = (atom: Object) =>
  traverse([atom], getChildren).filter(isActiveReactor);

export const createLayout = (atoms: $ReadOnlyArray<Object>, prevIds: Map<Object, string>) => {
  const ids: Map<Object, string> = new Map();
  const sources = uniq(traverse(atoms, getChildren)).filter(isNotReactor);

  sources.forEach(source => {
    const id = prevIds.get(source) ? prevIds.get(source): nanoid();
    if (typeof id === "string") {
      ids.set(source, id);
    }
  });

  const nodes = sources.map(source => {
    return {
      id: ids.get(source),
      type: getType(source),
      name: getLabel(source),
      value: getValue(source),
      children: getChildren(source)
        .map(d => ids.get(d))
        .filter(Boolean),
      ref: source
    };
  });

  return {
    nodes,
    ids
  };
};
