// @flow

import * as React from "react";
import ResizeObserver from "resize-observer-polyfill";

type Props = {
  className: string,
  render: ({ width: number, height: number }) => React.Node
};

type State = {
  width: ?number,
  height: ?number
};

class ObserveResize extends React.Component<Props, State> {
  state = {
    width: null,
    height: null
  };

  observer: ResizeObserver;

  _resize = ([entry]) => {
    const { width, height } = entry.contentRect;
    this.setState({
      width,
      height
    });
  };

  _ref = element => {
    if (element) {
      this.observer = new ResizeObserver(this._resize);
      this.observer.observe(element);
    } else {
      this.observer.disconnect();
    }
  };

  render() {
    const { width, height } = this.state;
    const { className, render } = this.props;
    return (
      <div className={className} ref={this._ref}>
        {typeof width === "number" &&
          typeof height === "number" &&
          render({ width, height })}
      </div>
    );
  }
}

export default ObserveResize;
