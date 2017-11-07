// @flow

import * as React from "react";
import styled from "styled-components";
import JsonView from "react-json-view";

import ObserveResize from "./ObserveResize.js";
import Graph from "./Graph.js";
import * as utils from "./utils.js";

type State = {
  selected: ?string,
  nodes: Object[],
  hidden: boolean
};

const reactors = utils.customAtom([]);

window.__DERIVABLE_DEVTOOLS_HOOK__ = utils.batchSyncArrays(captured => {
  reactors.set(utils.findReactors([...reactors.get(), ...captured]));
});

const Toggle = styled(props => (
  <svg viewBox="0 0 14 16" className={props.className} onClick={props.onClick}>
    <path d="M14 8.77v-1.6l-1.94-.64-.45-1.09.88-1.84-1.13-1.13-1.81.91-1.09-.45-.69-1.92h-1.6l-.63 1.94-1.11.45-1.84-.88-1.13 1.13.91 1.81-.45 1.09L0 7.23v1.59l1.94.64.45 1.09-.88 1.84 1.13 1.13 1.81-.91 1.09.45.69 1.92h1.59l.63-1.94 1.11-.45 1.84.88 1.13-1.13-.92-1.81.47-1.09L14 8.75v.02zM7 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
  </svg>
))`
  position: absolute;
  top: 20px;
  right: 0;
  width: 20px;
  height: 30px;
  fill: #666;

  &:hover {
    fill: #000;
  }
`;

const Container = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  bottom: 50px;
  left: 50%;
  background: #eee;
  display: flex;
  flex-flow: column;
  font-family: sans-serif;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  overflow: hidden;
  transform: translate(${props => (props.hidden ? "100%" : 0)});
`;

const Panel = styled.div`
  flex: 1;
  min-width: 240px;
  padding: 10px;
  position: relative;
  background: rgb(36, 36, 36);
`;

const Layout = styled(ObserveResize)`
  flex: 4;
  position: relative;
`;

const HelpMessage = styled.div`
  padding: 8px;
  color: #fff;
  font-size: 12px;
  text-align: center;
`;

class DevTools extends React.Component<{}, State> {
  state = {
    hidden: false,
    selected: null,
    nodes: []
  };

  ids: Map<Object, string> = new Map();

  componentDidMount() {
    reactors.react(items => {
      const { nodes, ids } = utils.createLayout(items, this.ids);
      this.ids = ids;
      this.setState({
        nodes
      });
    });
  }

  render() {
    const { selected, nodes, hidden } = this.state;
    const selectedNode = nodes.find(d => d.id === selected);
    return [
      <Toggle key="btn" onClick={() => this.setState(prev => ({ hidden: !prev.hidden}))} />,
      <Container key="app" hidden={hidden}>
        <Layout
          render={({ width, height }) => (
            <Graph
              width={width}
              height={height}
              nodes={nodes}
              selected={selected}
              onSelect={({ id }) => this.setState({ selected: id })}
            />
          )}
        />
        <Panel>
          {/*
                Warning when more then one derivable instance was installed
                Pass events to hook like init, startCapturing, stopCapturing
                Also in init event check api version and also warn on mismatch
          */}
          {selectedNode && (
            <JsonView
              src={{ type: selectedNode.type, value: selectedNode.value }}
              name={selectedNode.name}
              displayDataTypes={false}
              indentWidth={2}
              theme="twilight"
              onSelect={() => {}}
              onEdit={
                selectedNode.type === "atom"
                  ? d => selectedNode.ref.set(d.updated_src.value)
                  : false
              }
            />
          )}
          {!selectedNode && (
            <HelpMessage>Click on graph node to see value</HelpMessage>
          )}
        </Panel>
      </Container>
    ];
  }
}

export default DevTools;
