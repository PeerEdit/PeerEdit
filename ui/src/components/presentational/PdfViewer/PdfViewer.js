import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/resource';

import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import SplitPane from 'react-split-pane';

import Fuse from 'fuse.js';

import { Document, Page } from 'react-pdf';

import HighlightCard from './HighlightCard';

import Tip from './Tip';

import PdfLoader from './PdfLoader';
import PdfAnnotator from './PdfAnnotator';
import Highlight from './Highlight';
import Popup from './Popup';
import AreaHighlight from './AreaHighlight';

import './styles/MainPdfViewerPane.css'
import './styles/Spinner.css'

const getNextId = () => String(Math.random()).slice(2);
const parseIdFromHash = () => location.hash.slice("#highlight-".length);
const resetHash = () => { location.hash = ""; };

function Spinner(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <div className="sk-fading-circle">
        <div className="sk-circle1 sk-circle" />
        <div className="sk-circle2 sk-circle" />
        <div className="sk-circle3 sk-circle" />
        <div className="sk-circle4 sk-circle" />
        <div className="sk-circle5 sk-circle" />
        <div className="sk-circle6 sk-circle" />
        <div className="sk-circle7 sk-circle" />
        <div className="sk-circle8 sk-circle" />
        <div className="sk-circle9 sk-circle" />
        <div className="sk-circle10 sk-circle" />
        <div className="sk-circle11 sk-circle" />
        <div className="sk-circle12 sk-circle" />
      </div>
    </div>
  );
}

class AnnotationSearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearSearchBar = this.clearSearchBar.bind(this);
    this.searchHighlights = props.searchHighlights;
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.searchHighlights( event.target.value );
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  clearSearchBar(event) {
    this.setState({value: ""});
    this.searchHighlights( "" );
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search Annotations:
            <input type="text" name="search" value={this.state.value} onChange={this.handleChange} />
          </label>
        </form>
        <FlatButton label="clear" onClick={this.clearSearchBar} />
      </div>
    )
  }
}

const updateHash = highlight => {
  location.hash = `highlight-${highlight.id}`;
};

// functional popup component
const HighlightPopup = ({ comment }) =>
  comment.text ? (
    <div className="Highlight__popup">
      {comment.text}
    </div>
  ) : null;

const showAllHighlightsFilter = (highlights: Array<Object>) => {
  return highlights;
};

const showNoHighlightsFilter = (highlights: Array<Object>) => {
  return [];
};

function Sidebar(props) {
  let highlights = props.highlights;
  let resetHighlights = props.resetHighlights;
  let searchHighlights = props.searchHighlights;
  let postReplyGenerator = props.postReplyGenerator;

  return (
    <div className="sidebar" style={{ 
      overflowY: "scroll"
    }}>
      <div className="description" style={{ padding: "1rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>PeerEdit</h2>
        <p>
          <small>
            To create area highlight hold ⌥ Option key (Alt), then click and
            drag.
          </small>
        </p>
        <AnnotationSearchBar searchHighlights={searchHighlights} />
      </div>

      <ul className="sidebar__highlights">
        {highlights.sort((a, b) => a.position.boundingRect.y1 > b.position.boundingRect.y1)
                   .map((highlight, index) => (
          <li key={highlight.id} className="sidebar__highlight">
            <HighlightCard highlight={highlight} 
                           updateHash={updateHash}
                           postReply={postReplyGenerator(highlight)} />
          </li>
        ))}
      </ul>
      {highlights.length > 0 ? (
        <div style={{ padding: "1rem" }}>
          <a href="#" onClick={resetHighlights}>
            Reset highlights
          </a>
        </div>
      ) : null}
    </div>
  );
}

const fuseOptions = {
  keys: ['comment.text'],
  id: 'id'
};

type Props = {};
type State = {
  highlights: Array<T_Highlight>,
  highlightsFilter: (i: Array<T_Highlight>) => Array<T_Highlight>,
  fuseInterface: T_Fuse<T_Highlight>
};

class PdfViewer extends React.Component<Props, State> {

  state:State;

  constructor(props) {
    super(props)
    this.state = {
      highlights: [],
      highlightsFilter: showAllHighlightsFilter,
      fuseInterface: new Fuse([], fuseOptions)
    };

    this.searchHighlights = this.searchHighlights.bind(this);
    this.resetHighlights = this.resetHighlights.bind(this);
    this.scrollViewerTo = this.scrollViewerTo.bind(this);
    this.scrollToHighlightFromHash = this.scrollToHighlightFromHash.bind(this);
    this.postReplyGenerator = this.postReplyGenerator.bind(this);
  }

  resetHighlights() {
    this.setState((prevState, props) => {
      return {
        highlights: [],
        highlightsFilter: showAllHighlightsFilter,
        fuseInterface: new Fuse([], fuseOptions)
      }
    });
  };

  scrollViewerTo(highlight: any){};

  scrollToHighlightFromHash() {
    const highlight = this.getHighlightById(parseIdFromHash());

    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };

  componentDidMount() {
    window.addEventListener(
      "hashchange",
      this.scrollToHighlightFromHash,
      false
    );
  }

  getHighlightById(id: string) {
    const { highlights } = this.state;

    return highlights.find(highlight => highlight.id === id);
  }

  addHighlight(highlight: T_NewHighlight) {
    const { highlights } = this.state;

    console.log("Saving highlight", highlight);

    this.setState((prevState, props) => {
      let nxtHighlights = [{ ...highlight, id: getNextId() }, ...highlights]
      return {
        highlights: nxtHighlights,
        fuseInterface: new Fuse(nxtHighlights, fuseOptions)
      }
    });
  }

  postReplyGenerator(highlight: T_Highlight) {
    return (reply) => {
      console.log(`writing reply for ${highlight}`);
      this.setState( (prevState, props) => {
        let nxtHighlights = prevState.highlights.map((h) => {
          if (h.id == highlight.id) {
            if ('replies' in h) {
              h.replies.push(reply);
            }
            else{
              h.replies = [reply];
            }
          }
          return h
        });
        return { highlights: nxtHighlights };
      })
    };
  };

  updateHighlight(highlightId: string, position: Object, content: Object) {
    console.log("Updating highlight", highlightId, position, content);

    this.setState( (prevState, props) => {
      let nxtHighlights = this.state.highlights.map(h => {
        return h.id === highlightId
          ? {
              ...h,
              position: { ...h.position, ...position },
              content: { ...h.content, ...content }
            }
          : h;
        })

      return {
        fuseInterface: new Fuse(nxtHighlights, fuseOptions),
        highlights: nxtHighlights
      }
    });
  }

  searchHighlights(s: string) {
    console.log("Exec search", s);
    if (s === '') {
      this.setState({highlightsFilter: showAllHighlightsFilter});
      return;
    }

    let ids = this.state.fuseInterface.search(s)
    this.setState({highlightsFilter: (highlights) => {
      return highlights.filter( (highlight) => { return ids.includes(highlight.id); });
    }})
  }

  render() {
    const { pageNumber, numPages } = this.state;
    
    return (
      <SplitPane allowResize={true}
                 split="vertical"
                 minSize={350}
                 defaultSize={350}
                 primary="first"
                 style={{ height: "100vh", overflow: "auto"}}
                 resizerStyle={{ "background": "#000", "padding": "2px", "cursor": "col-resize"}}>
        <Sidebar
          highlights={ this.state.highlightsFilter(this.state.highlights) }
          resetHighlights={ this.resetHighlights }
          searchHighlights={ this.searchHighlights }
          postReplyGenerator={ this.postReplyGenerator }
        />
        <div
          style={{
            height: "100vh",
            overflowY: "scroll",
            position: "relative",
            backgroundColor: "grey"
          }}
        >
          { this.props.resource
            ? <PdfLoader url={`/api/proxy_resource_request?file=${this.props.resource.links[0].url}`} beforeLoad={<Spinner />}>
                {pdfDocument => (
                  <PdfAnnotator
                    pdfDocument={pdfDocument}
                    enableAreaSelection={event => event.altKey}
                    onScrollChange={resetHash}
                    scrollRef={scrollTo => {
                      this.scrollViewerTo = scrollTo;

                      this.scrollToHighlightFromHash();
                    }}
                    url={`/api/proxy_resource_request?file=${this.props.resource.links[0].url}`}
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
                    highlights={ this.state.highlightsFilter(this.state.highlights) }
                  />
                )}
            </PdfLoader>
            : <Spinner />}
        </div>
      </SplitPane>
    )
  }

}

export { PdfViewer };