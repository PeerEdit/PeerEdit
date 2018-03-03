import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/auth';
import { Card, CardActions, CardMedia, CardHeader } from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          text : '',
          authorType : '',
          authorImage : '',
          messageTime : ''
        }
        this.authorTypes = {
          'sender'   : 'sender',
          'receiver' : 'receiver'
        };   
        const chipStyle = {
          margin  : 4,
          float : 'right'
        };
    }

    componentWillReceiveProps(newProps) {
      this.state.text = newProps.text;
      this.state.authorType = newProps.authorType;
      this.state.authorImage = newProps.authorImage;
      this.state.messageTime = newProps.messageTime;
    }

    render() {
        var messageComponent, authorTypeStyle, messageStyle;
        if(this.state.authorType === this.authorTypes.sender ) {
          authorTypeStyle = {
            float : 'right'
          }
          messageStyle = {
            float : 'right',
            margin : 10
          }
          return (
            <CardText>
              <span style={messageStyle}>{this.state.messageTime}</span>
              <Chip style={authorTypeStyle} >
                <Avatar src={this.state.authorImage} />
                <div>{this.state.text}</div>
              </Chip>              
            </CardText> 
          );
        } else {
          authorTypeStyle = {
            float : 'left'
          }
          messageStyle = {
            float : 'left',
            margin : 10
          }
          return (
            <CardText>
              <Chip style={authorTypeStyle} >
                <Avatar src={this.state.authorImage} />
                <div>{this.state.text}</div>
              </Chip>            
              <span style={messageStyle}>{this.state.messageTime}</span>
            </CardText>
            
          );
        }
        
    }
}

const paperStyle = {
    width: 600,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

const textFieldStyle = {
  paddingLeft: 16, 
  paddingRight: 16
};

class ChatView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            messages: [
                {text: "Hi", authorType:"receiver", messageTime:"08:40"},
                {text: "How are you", authorType:"receiver", messageTime:"08:41"},
                {text: "I am doing good", authorType:"sender", messageTime:"08:42"},
                {text: "How about you ?", authorType:"sender", messageTime:"08:43"},
            ]
        };

        this.updateMessages = this.updateMessages.bind(this);
    }

    updateMessages(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        let newmsg = data.get("message");
        console.log(newmsg);
        this.setState( function(state, props){
            console.log(state)
            console.log(state.messages)
            state.messages.push({ text: newmsg, authorType: "sender", messageTime: "10:23" })
            return {
                messages: state.messages
            }
        });
    }

    render() {
        return (
          <Paper style={paperStyle} zDepth={1} >
            <Card>
              <CardHeader
                title="James Anderson"
                subtitle="Online"
              />
              {this.state.messages.map((m) => {
                    return (<div key={m.text}><Message text={m.text} authorType={m.authorType} messageTime={m.messageTime} /><br/></div>);
              })}

            </Card>
            <form onSubmit={this.updateMessages}>
                <TextField name="message" hintText="Type a Message" fullWidth={true} inputStyle={textFieldStyle} 
                hintStyle={textFieldStyle} />
            </form>
          </Paper>
        );
    }
}

export default ChatView;