// @flow

/*
declare module 'cytoscape' {
  declare class Core {}

  declare class Stylesheet {

  }

  declare class Layout {

  }

  declare type Point = {
    x: number,
    y: number
  };

  declare type CyNode = {
    group?: 'edges',
    data: {
      id: string | number,
      parent?: string | number
    },
    scratch: {
      [string]: string
    },
    position?: Point,
    renderedPosition?: Point,
    selected: boolean,
    selectable: boolean,
    locked: boolean,
    grabbable: boolean,
    classes: string
  };

  declare type CyEdge = {
    group?: 'edges',
    source: string | number,
    target: string | number
  };

  declare type CyOptions = {
    // very commonly used options
    container: ?Element,
    elements: $ReadOnlyArray<CyNode | CyEdge> | Promise<$ReadOnlyArray<CyNode | CyEdge>>,
    style: Stylesheet,
    layout: Layout,

    // initial viewport state
    zoom: number,
    pan: Point,

    // interaction options
    minZoom: number,
    maxZoom: number,
    zoomingEnabled: boolean,
    userZoomingEnabled: boolean,
    panningEnabled: boolean,
    userPanningEnabled: boolean,
    boxSelectionEnabled: boolean,
    selectionType: 'single' | 'additive',
    touchTapThreshold: number,
    desktopTapThreshold: number,
    autolock: boolean,
    autoungrabify: boolean,
    autounselectify: boolean,

    // rendering options
    headless: boolean,
    styleEnabled: boolean,
    hideEdgesOnViewport: boolean,
    hideLabelsOnViewport: boolean,
    textureOnViewport: boolean,
    motionBlur: boolean,
    motionBlurOpacity: number,
    wheelSensitivity: number,
    pixelRatio: number | 'auto'
  };

  declare module.exports: {
    $call: CyOptions => Core
  };
}
*/
