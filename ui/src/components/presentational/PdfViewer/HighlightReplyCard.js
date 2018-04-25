import React from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';

import thumbsUpImg from './images/thumbs-up.png';
import thumbsDownImg from './images/thumbs-down.png';
import defaultAvatar from './images/default-avatar-256.png';

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
          avatar={defaultAvatar}
          subtitle={new Date(this.ts).toLocaleDateString("en-US", dateRenderOptions)}
        />
        <CardText>
          {this.text}
        </CardText>
      </Card>
    );
  }
}

export default HighlightReplyCard;