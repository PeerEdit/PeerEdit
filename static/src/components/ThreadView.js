import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/auth';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {GridList, GridTile} from 'material-ui/GridList';

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

class ThreadDiv extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card id={this.props.id}
                  containerStyle={{ margin: 10}}>
                <CardHeader
                    title={this.props.title}
                    subtitle={this.props.date}
                />
            <CardText>
                {this.props.desc}
            </CardText>
            <CardActions>
                <FlatButton label="Chat" />
            </CardActions>
            </Card>
        );
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class Threads extends React.Component { // eslint-disable-line react/prefer-stateless-function
    
    constructor(props) {
        super(props);

        this.generateMockData = this.generateMockData.bind(this);
    }

    generateMockData() {
        return [{
            id: 1,
            title: "Help out with some bioinformatics",
            desc: "I need a little bit of help with working through some of these bioinformatics questions, are there any people out there who can help?",
            date: "11/9/18"
        },
        {
            id: 2,
            title: "Want to understand bitcoin better",
            desc: "Let's talk about some specifics on how miners get paid.",
            date: "15/5/23"
        }];
    }

    render() {
        return (
            <div className="col-md-8">
                <h1>Threads</h1>
                <hr />
                {this.generateMockData().map( (d) => {
                    return (<ThreadDiv title={d.title}
                               desc={d.desc}
                               id={d.id}
                               date={d.date}
                               key={d.id} />)
                })}
            </div>
        );
    }
}

export default Threads;
