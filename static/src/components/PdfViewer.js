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

import { Document, Page } from 'react-pdf';

import {
  PdfLoader,
  PdfAnnotator,
  Tip,
  Highlight,
  Popup,
  AreaHighlight
} from "react-pdf-annotator";

const resetHash = () => {
  location.hash = "";
};

const url = 'https://arxiv.org/pdf/1802.08228.pdf';

class PdfViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      highlights: []
    }
  }

  render() {
    const { pageNumber, numPages } = this.state;
    
    return (
      <div>
        <h1>PDF Viewer and Editor</h1>
        <PdfLoader url={url} beforeLoad={<h1> Loading Image </h1>}>
            {pdfDocument => (
              <PdfAnnotator
                pdfDocument={pdfDocument}
                enableAreaSelection={event => event.altKey}
                onScrollChange={resetHash}
                scrollRef={scrollTo => {
                  this.scrollViewerTo = scrollTo;

                  this.scrollToHighlightFromHash();
                }}
                url={url}
                onSelectionFinished={(
                  position,
                  content,
                  hideTipAndSelection,
                  transformSelection
                ) => (
                  <Tip
                    onOpen={transformSelection}
                    onConfirm={comment => {
                      this.addHighlight({ content, position, comment });

                      hideTipAndSelection();
                    }}
                  />
                )}
                highlightTransform={(
                  highlight,
                  index,
                  setTip,
                  hideTip,
                  viewportToScaled,
                  screenshot,
                  isScrolledTo
                ) => {
                  const isTextHighlight = !Boolean(
                    highlight.content && highlight.content.image
                  );

                  const component = isTextHighlight ? (
                    <Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}
                    />
                  ) : (
                    <AreaHighlight
                      highlight={highlight}
                      onChange={boundingRect => {
                        this.updateHighlight(
                          highlight.id,
                          { boundingRect: viewportToScaled(boundingRect) },
                          { image: screenshot(boundingRect) }
                        );
                      }}
                    />
                  );

                  return (
                    <Popup
                      popupContent={<HighlightPopup {...highlight} />}
                      onMouseOver={popupContent =>
                        setTip(highlight, highlight => popupContent)
                      }
                      onMouseOut={hideTip}
                      key={index}
                      children={component}
                    />
                  );
                }}
                highlights={this.highlights}
              />
            )}
        </PdfLoader>
      </div>
    )
  }

}

export default PdfViewer;