export type Node = {
  id: string,
  children: $ReadOnlyArray<string>,
  type: string,
  name: string,
  value: mixed,
  ref: Object
};

export type Layout = {
  nodes: $ReadOnlyArray<Node>,
  ids: Map<Object, Object>
};
