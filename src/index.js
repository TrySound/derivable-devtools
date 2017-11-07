// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import DevTools from './DevTools.js';

const container = document.createElement("div");

if (document.body) {
  document.body.appendChild(container);
}

ReactDOM.render(<DevTools  />, container);
