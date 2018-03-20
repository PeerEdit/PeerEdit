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
  }

  render() {
    return (
      <Card>
        <CardHeader
          title="Rahul Dhodapkar"
          avatar="../../images/default-avatar-256.png"
          subtitle={new Date().toLocaleDateString("en-US", dateRenderOptions)}
        />
        <CardText>
          This is another comment card
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