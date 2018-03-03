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

class PdfViewer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <h1>PDF Viewer and Editor</h1>
    )
  }

}

export default PdfViewer;