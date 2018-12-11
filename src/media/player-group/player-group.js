import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Player from '../player/player'
import './player-group.css'

/*
One media: score from 1~5
Two media: which is better
*/

class PlayerGroup extends Component {
    constructor(props) {
        super(props)
        var played = []
        var scoreList = []
        for (var i = 0; i < this.props.mediaList.length; ++i) {
            scoreList.push(0);
            played.push(false);
        }
        this.state = {
            scoreList: scoreList,
            scored: false,
            played: played,
            allPlayed: false
        }
        this.scoresRef = React.createRef()
        this.handleClick = this.handleClick.bind(this)
    }

    onEnd(target) {
        var played = this.state.played
        played[target] = true;
        var allPlayed = true;
        for (var i = 0; i < this.props.mediaList.length; ++i) {
            allPlayed &= played[i];
        }
        this.setState({played: played, allPlayed: allPlayed})
    }

    handleClick(e) {
        const children = this.scoresRef.current.children
        for (var i = 0; i < children.length; ++i) {
            if (children[i].className === "button") {
                const btn = children[i].children[0]
                btn.className = btn.className.substring(0, 3)
            }
        }
        e.currentTarget.className += " active"
        // set score
        var scoreList = this.state.scoreList
        if (this.props.mediaList.length === 1) {
            scoreList[0] = parseInt(e.currentTarget.id)
            this.setState({
                scoreList: scoreList,
                scored: true
            })
        }
        else {
            const idx = parseInt(e.currentTarget.id)-1
            scoreList[0] = 0
            scoreList[1] = 0
            scoreList[idx] = 1
            this.setState({
                scoreList: scoreList,
                scored: true
            })
        }
        if (this.props.onScored !== null) {
            this.props.onScored({
                scoreList: scoreList,
                mediaList: this.props.mediaList
            })
        }
    }

    render() {
        const count = this.props.mediaList.length;
        var i;
        var scoreHint = (this.props.hint === undefined)
            ? (count === 1) ? "Score of Reality" : "Which is better?"
            : this.props.hint;
        var mediaList = []
        for (i = 0; i < count; ++i) {
            mediaList.push(<Player key={i} {...this.props.mediaList[i]} onEnded={this.onEnd.bind(this, i)} />)
        }
        var buttonList = []
        if (count === 1) {
            for (i = 1; i <= 5; ++i) {
                buttonList.push(<div key={i} className="button"><button disabled={!this.state.allPlayed} id={i} className="yes" onClick={this.handleClick}>{i}</button><div className="background"></div></div>)
            }
        }
        else {
            buttonList.push(<div key="1" className="button"><button disabled={!this.state.allPlayed} id="1" className="yes" onClick={this.handleClick}>Left</button><div className="background"></div></div>)
            buttonList.push(<div key="2" className="button"><button disabled={!this.state.allPlayed} id="2" className="non" onClick={this.handleClick}>Right</button><div className="background"></div></div>)
        }
        return (
            <div className="player-group">
                <div className="media-container">
                    {mediaList}
                </div>
                <div className="score-selection">
                    <div className="score-hint">{scoreHint}</div>
                    <div className="score-group" ref={this.scoresRef}>
                        {buttonList}
                    </div>
                </div>
            </div>
        )
    }
}

PlayerGroup.defaultProps = {
    mediaList: [],
    onScored: null
}

PlayerGroup.propTypes = {
    mediaList: PropTypes.array,
    onScored: PropTypes.func
}

export default PlayerGroup
