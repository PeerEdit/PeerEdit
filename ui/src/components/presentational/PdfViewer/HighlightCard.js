import React from 'react';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import HoverCard from './HoverCard';
import HighlightReplyCard from './HighlightReplyCard';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

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

const replyOpenColor="#9da2ad";
const replyOpenHoverColor="#868a93";

const replyColor="#638df2";
const replyHoverColor="#577cd6";

const thumbsUpColor="#a4c639";
const thumbsUpHoverColor="#8AA62F";

const thumbsDownColor="#c91616";
const thumbsDownHoverColor="#910f0f";

class ReplyForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
    this.postReply = props.postReply;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postReply({
      "ts": new Date()
      , "text": this.state.text
    });
    this.setState({
      "text": ""
    })
  }

  render() {
    return (
      <Paper style={{padding: "8px"}}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            fullWidth={true}
            hintText="Type reply here"
            multiLine={true}
            onChange={this.handleChange}
          />
          <FlatButton type="submit" 
                      value="Submit"
                      backgroundColor={replyColor}
                      hoverColor={replyHoverColor} >
            Submit
          </FlatButton>
        </form>
      </Paper>
    );
  }
}

class HighlightCard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      replyExposed: false,
      replyExpanded: false
    }

    this.postReply = props.postReply;
    this.highlight = props.highlight;
    this.updateHash = props.updateHash;
    this.highlight = props.highlight;
  }

  toggleReplyState = () => {
    this.setState((prev, props) => {
      return {
        replyExposed: !prev.replyExposed
      };
    })
  }

  toggleExpandState = () => {
    this.setState((prev, props) => {
      return {
        replyExpanded: !prev.replyExpanded
      };
    })
  }

  render() {
    return (
      <Card onClick={()=>{this.updateHash(this.highlight);}} 
            style={{
              padding: "0px"
            }}
            onExpandChange={(e) => {this.toggleExpandState();}}
            expanded={this.state.replyExpanded} >
        <div className="sidebar__card">
          <CardHeader
            title={<a href="http://www.google.com" target="_blank">Rahul Dhodapkar</a>}
            avatar={defaultAvatar}
            subtitle={new Date().toLocaleDateString("en-US", dateRenderOptions)}
          />
          <div>
            <strong>{this.highlight.comment.text}</strong>
            {this.highlight.content.text ? (
              <blockquote style={{ marginTop: "0.5rem" }}>
                {`${this.highlight.content.text.slice(0, 90).trim()}…`}
              </blockquote>
            ) : null}
            {this.highlight.content.image ? (
              <div
                className="highlight__image"
                style={{ marginTop: "0.5rem" }}
              >
                <img src={this.highlight.content.image} alt={"Screenshot"} />
              </div>
            ) : null}
          </div>
          <CardActions>
            <FlatButton className="replyButton"
                        backgroundColor={ 
                          this.state.replyExposed ? replyOpenColor : replyColor
                        }
                        hoverColor={
                          this.state.replyExposed ? replyOpenHoverColor : replyHoverColor
                        }
                        onClick={(e) => {this.toggleReplyState();}}>
              { this.state.replyExposed ? "Close Reply" : "Reply" }
            </FlatButton>
            <FlatButton className="thumbsUpButton" 
                        onClick={(e) => {window.alert("+");}}
                        backgroundColor={thumbsUpColor}
                        hoverColor={thumbsUpHoverColor}
                        style={{width:"24px"}}
                        icon={<img src={thumbsUpImg} alt="+" />}
            />
            <FlatButton className="thumbsDownButton" 
                        onClick={(e) => {window.alert("-");}}
                        backgroundColor={thumbsDownColor}
                        hoverColor={thumbsDownHoverColor}
                        style={{width:"24px"}}
                        icon={<img src={thumbsDownImg} alt="-" />}
            />
          </CardActions>
          { this.state.replyExposed ? <ReplyForm postReply={(reply) => {
              this.toggleReplyState();
              this.setState({replyExpanded: true});
              this.postReply(reply);
          }} /> : null}
          <div className="highlight__location">
            Page {this.highlight.position.pageNumber}
          </div>
        </div>
        {this.highlight.replies ? 
          (<CardHeader 
            actAsExpander={true}
            showExpandableButton={true}
            subtitle={`${this.highlight.replies.length} replies`}
          />) : null}
        <CardText expandable={true}
                  style={{
          padding: "0px"
          , paddingLeft: "25px"
          ,backgroundColor: "#CCC"
        }}>
          { this.highlight.replies ? this.highlight.replies.map((val, ix) => {
              return (<HighlightReplyCard key={ix} 
                                          text={val.text}
                                          ts={val.ts} />);
            }) : null }
        </CardText>
      </Card>
    )
  }

}


export default HighlightCard;
