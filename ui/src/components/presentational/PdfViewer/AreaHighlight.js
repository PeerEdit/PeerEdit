// @flow

import React, { Component } from "react";

// $FlowFixMe
import Rnd from "react-rnd";

import "./styles/AreaHighlight.css";

import type { T_ViewportHighlight, T_LTWH } from "./types/types";

type Props = {
  highlight: T_ViewportHighlight,
  onChange: (rect: T_LTWH) => void
};

class AreaHighlight extends Component<Props> {
  render() {
    const { highlight, onChange, ...otherProps } = this.props;

    return (
      <Rnd
        className="AreaHighlight"
        disableDragging={true}
        default={{
          x: highlight.viewerData.position.boundingRect.left,
          y: highlight.viewerData.position.boundingRect.top,
          width: highlight.viewerData.position.boundingRect.width,
          height: highlight.viewerData.position.boundingRect.height
        }}
        onClick={event => {
          event.stopPropagation();
          event.preventDefault();
        }}
        {...otherProps}
      />
    );
  }
}

export default AreaHighlight;
