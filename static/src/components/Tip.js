// @flow

import React, { Component } from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import "../types/annotator-types.js"

type State = {
  compact: boolean,
  text: string,
  emoji: string
};

type Props = {
  onConfirm: (comment: { text: string, emoji: string }) => void,
  onOpen: () => void,
  onUpdate?: () => void
};

class Tip extends Component<Props, State> {
  state = {
    compact: true,
    text: "",
    emoji: ""
  };

  state: State;
  props: Props;

  // for TipContainer
  componentDidUpdate(nextProps: Props, nextState: State) {
    const { onUpdate } = this.props;

    if (onUpdate && this.state.compact !== nextState.compact) {
      onUpdate();
    }
  }

  render() {
    const { onConfirm, onOpen } = this.props;
    const { compact, text, emoji } = this.state;

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="Tip">
          {compact ? (
            <div
              className="Tip__compact"
              onClick={() => {
                onOpen();
                this.setState({ compact: false });
              }}
            >
              Add highlight
            </div>
          ) : (
            <form
              className="Tip__card"
              onSubmit={event => {
                event.preventDefault();
                onConfirm({ text, emoji });
              }}
            >
              <div>
                {/* TODO: determine whether to use controlled or uncontrolled component here */}
                <TextField
                  fullWidth={true}
                  hintText="Your comment"
                  defaultValue={text}
                  multiLine={true}
                  onChange={event => this.setState({ text: event.target.value })}
                  ref={node => {
                    if (node) {
                      node.focus();
                    }
                  }}
                />
                <div>
                  {["😱", "😍", "🔥"].map(_emoji => (
                    <label key={_emoji}>
                      <input
                        checked={emoji === _emoji}
                        type="radio"
                        name="emoji"
                        value={_emoji}
                        onChange={event =>
                          this.setState({ emoji: event.target.value })
                        }
                      />
                      {_emoji}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <RaisedButton primary={true} type="submit" value="Save">
                  Submit
                </RaisedButton>
              </div>
            </form>
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Tip;