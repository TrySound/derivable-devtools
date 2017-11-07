// @flow

import React from "react";
import cytoscape from "cytoscape";
import nanoid from "nanoid";
import flatMap from "lodash/flatMap";
import GraphControls from "./GraphControls.js";
import * as t from "./types.js";

type Props = {
  width: number,
  height: number,
  nodes: $ReadOnlyArray<t.Node>,
  selected: ?string,
  onSelect: ({ id: ?string }) => void
};

type State = {
  layout: string
};

const formatValue = value => {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number") {
    return String(value);
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (Array.isArray(value)) {
    return `Array(${value.length})`;
  }
  if (value === null) {
    return "null";
  }
  if (value === undefined) {
    return "undefined";
  }
  return `Object(${Object.keys(value).length})`;
};

const findEdges = nodes =>
  flatMap(nodes, node =>
    node.children.map(child => ({
      data: {
        id: nanoid(),
        target: child,
        source: node.id
      }
    }))
  );

const getElements = props => ({
  nodes: props.nodes.map(d => ({
    data: Object.assign({}, d, {
      label: d.name + "\n" + formatValue(d.value)
    }),
    selected: props.selected === d.id
  })),
  edges: findEdges(props.nodes)
});

class Graph extends React.Component<Props, State> {
  cy: ?Object;

  state = {
    layout: "circle"
  };

  _ref = container => {
    if (container) {
      const cy = (this.cy = cytoscape({
        container,

        wheelSensitivity: 0.5,

        layout: {
          name: "circle"
        },

        style: [
          {
            selector: "node",
            style: {
              label: "data(label)",
              shape: "roundrectangle",
              width: "label",
              height: "label",
              "font-size": 12,
              "text-wrap": "wrap",
              "text-valign": "center",
              "text-halign": "center",
              "text-outline-width": "2px",
              "text-outline-color": "#555",
              "background-color": "#555",
              "border-width": 2,
              "border-color": "#eee",
              color: "#fff"
            }
          },

          {
            selector: "node[type='atom']",
            style: {
              padding: 8,
              "background-color": "#e5d030",
              "text-outline-color": "#e5d030"
            }
          },

          {
            selector: "node[type='derivation']",
            style: {
              padding: 8,
              "background-color": "#30c030",
              "text-outline-color": "#30c030"
            }
          },

          {
            selector: "node:active",
            style: {
              "overlay-color": "black",
              "overlay-padding": 0,
              "overlay-opacity": 0.1
            }
          },

          {
            selector: "node:selected",
            style: {
              "border-color": "#000"
            }
          },

          {
            selector: "edge",
            style: {
              "curve-style": "bezier",
              width: 3,
              "target-arrow-shape": "triangle",
              "line-color": "#ccc",
              "target-arrow-color": "#999"
            }
          }
        ],

        elements: getElements(this.props)
      }));

      cy.fit();

      cy.on("tap", event => {
        this.props.onSelect({
          id:
            event.target !== cy && event.target.nodes().isNode()
              ? event.target.id()
              : null
        });
      });
    } else {
      if (this.cy) {
        this.cy.destroy();
        this.cy = null;
      }
    }
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { cy } = this;
    if (cy) {
      if (prevProps.nodes !== this.props.nodes) {
        cy.json({
          elements: getElements(this.props)
        });
      }
      if (
        prevProps.width !== this.props.width ||
        prevProps.height !== this.props.height
      ) {
        cy.resize();
      }
      if (prevState.layout !== this.state.layout) {
        cy
          .layout({
            name: this.state.layout
          })
          .run();
      }
    }
  }

  render() {
    const { width, height } = this.props;
    return [
      <div
        key="viewport"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width,
          height,
          overflow: "hidden"
        }}
        ref={this._ref}
      />,
      <GraphControls
        key="controls"
        onFit={() => {
          this.cy && this.cy.fit();
        }}
        onChangeLayout={layout => {
          this.setState({ layout });
        }}
      />
    ];
  }
}

export default Graph;
