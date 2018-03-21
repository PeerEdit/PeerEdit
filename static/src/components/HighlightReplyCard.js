import React from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';

const dateRenderOptions = {
  year: 'numeric'
  ,month: 'numeric'
  ,day: 'numeric'
  ,hour: 'numeric'
  ,minute: 'numeric'
};

const thumbsUpColor="#a4c639";
const thumbsUpHoverColor="#8AA62F";

const thumbsDownColor="#c91616";
const thumbsDownHoverColor="#910f0f";

class HighlightReplyCard extends React.Component {
  constructor(props) {
    super(props);

    this.ts = props.ts;
    this.text = props.text;
  }

  render() {
    return (
      <Card>
        <CardHeader
          title="Rahul Dhodapkar"
          avatar="../../images/default-avatar-256.png"
          subtitle={this.ts.toLocaleDateString("en-US", dateRenderOptions)}
        />
        <CardText>
          {this.text}
        </CardText>
        <CardActions>
          <FlatButton className="thumbsUpButton" 
                      onClick={(e) => {window.alert("+");}}
                      backgroundColor={thumbsUpColor}
                      hoverColor={thumbsUpHoverColor}
                      style={{width:"24px"}}
                      icon={<img src='../../images/thumbs-up.png' alt="+" />}
          />
          <FlatButton className="thumbsDownButton" 
                      onClick={(e) => {window.alert("-");}}
                      backgroundColor={thumbsDownColor}
                      hoverColor={thumbsDownHoverColor}
                      style={{width:"24px"}}
                      icon={<img src='../../images/thumbs-down.png' alt="-" />}
          />
        </CardActions>
      </Card>
    );
  }
}

export default HighlightReplyCard;