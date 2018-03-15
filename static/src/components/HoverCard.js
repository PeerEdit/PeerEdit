// StyledCard.js

import React, { Component } from 'react';
import { Card } from 'material-ui/Card';

class HoverCard extends Component {

  onMouseOver = () => this.setState({ color: "#DDDDDD" });
  onMouseOut = () => this.setState({ color: "#FFFFFF" });

  constructor(props) {
    super(props)

    this.props = props;
    this.state = {
      color: "#FFFFFF"
    };
  }

  render() {
    return (
      <Card 
        {...this.props}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        style={{"backgroundColor": this.state.color}}
      >
        {this.props.children}
      </Card>
    );
  }
}

export default HoverCard;