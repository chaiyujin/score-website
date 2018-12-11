import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerGroup from '../media/player-group/player-group'
import Table from './table'
import './score-board.css'


class ScoreBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIdx: 0,
            scoreList: []
        }
        this.slidesRef = React.createRef()
    }

    handleScored(idx, score) {
        const children = this.slidesRef.current.children;
        var scores = this.state.scoreList;
        scores[idx] = score;
        this.setState({
            scoreList: scores,
            currentIdx: (idx + 1 >= children.length) ? children.length - 1 : idx + 1
        })
        console.log(idx, score)
        // animation
        if (idx + 1 < children.length) {
        }
        else {
            if (this.props.onFinished !== null) {
                this.props.onFinished(scores)
            }
        }
    }

    render() {
        var totalCount = this.props.mediaList.length;
        var mediaList = []
        for (var i = 0; i < totalCount; ++i) {
            mediaList.push(
                <div key={i} className={(this.state.currentIdx===i)?"each-slide" : "each-slide hide"}>
                    <PlayerGroup onScored={this.handleScored.bind(this, i)}
                                 mediaList={this.props.mediaList[i]} />
                </div>
            )
        }
        return (
            <div className="score-board">
                <div className="counter">{this.state.currentIdx}/{totalCount} Clips</div>
                <div className="main">
                    <div className="slides" ref={this.slidesRef}>
                        {/* {mediaList}  */}
                        {/*<div className={(this.state.currentIdx===totalCount)?"each-slide" : "each-slide hide"}>
                            Submit
                        </div>*/}
                        <div>
                            <Table />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ScoreBoard.defaultProps = {
    mediaList: [],
    onFinished: null
}

ScoreBoard.propTypes = {
    mediaList: PropTypes.array,
    onFinished: PropTypes.func
}

export default ScoreBoard;
