// @flow

/*
declare module "d3-force" {
  declare export type Node = {
    index?: number,
    x?: number,
    y?: number,
    vx?: number,
    vy?: number,
    fx?: number,
    fy?: number
  };

  declare export type Link = {
    index?: number,
    source: string | number | Node,
    target: string | number | Node
  };

  declare type Accessor = (Node) => number;

  declare type Value = number | Accessor;

  declare type LinkAccessor = (Link) => number;

  declare type LinkValue = number | LinkAccessor;

  declare type Simulation = {
    restart(): Simulation,
    stop(): Simulation,
    tick(): Simulation,
    nodes(): Node[],
    nodes(nodes: Node[]): Simulation,
    alpha(): number,
    alpha(alpha: number): Simulation,
    alphaMin(): number,
    alphaMin(alphaMin: number): Simulation,
    alphaDecay(): number,
    alphaDecay(alphaDecay: number): Simulation,
    alphaTarget(): number,
    alphaTarget(alphaTarget: number): Simulation,
    velocityDecay(): number,
    velocityDecay(velocityDecay: number): Simulation,
    force(name: string): mixed,
    force(name: string, mixed): Simulation,
    find(x: number, y: number, radius?: number): ?Node,
    on(typenames: "tick" | "end"): () => void,
    on(typenames: "tick" | "end", listener: () => void): Simulation
  };

  declare export function forceSimulation(nodes?: Node[]): Simulation;

  declare type CenterForce = {
    x(): number,
    x(x: number): CenterForce,
    y(): number,
    y(y: number): CenterForce
  };

  declare export function forceCenter(x?: number, y?: number): CenterForce;

  declare type CollideForce = {
    radius(): Accessor,
    radius(radius: Value): CollideForce,
    strength(): Accessor,
    strength(strength: Value): CollideForce,
    iterations(): number,
    iterations(iterations: number): CollideForce
  };

  declare export function forceCollide(radius?: Value): CollideForce;

  declare type LinkForce = {
    links(): Link[],
    links(Link[]): LinkForce,
    id(): Node => string | number,
    id((Node) => string | number): LinkForce,
    distance(): LinkAccessor,
    distance(distance: LinkValue): LinkForce,
    strength(): LinkAccessor,
    strength(strength: LinkValue): LinkForce,
    iterations(): number,
    iterations(iterations: number): LinkForce
  };

  declare export function forceLink(): LinkForce;

  declare type ManyBodyForce = {
    strength(): Accessor,
    strength(strength: Value): ManyBodyForce,
    theta(): number,
    theta(theta: number): RadialForce,
    distanceMin(): number,
    distanceMin(distanceMin: number): RadialForce,
    distanceMax(): number,
    distanceMax(distanceMax: number): RadialForce
  };

  declare export function forceManyBody(): ManyBodyForce;

  declare type XForce = {
    strength(): Accessor,
    strength(strength: Value): XForce,
    x(): Accessor,
    x(x: Value): XForce
  };

  declare export function forceX(x: Value): XForce;

  declare type YForce = {
    strength(): Accessor,
    strength(strength: Value): YForce,
    y(): Accessor,
    y(y: Value): YForce
  };

  declare export function forceY(y: Value): YForce;

  declare type RadialForce = {
    strength(): Accessor,
    strength(strength: Value): RadialForce,
    radius(): Accessor,
    radius(radius: Value): RadialForce,
    x(): number,
    x(x: number): RadialForce,
    y(): number,
    y(y: number): RadialForce
  };

  declare export function forceRadial(
    radius: Value,
    x?: number,
    y?: number
  ): RadialForce;
}
*/
