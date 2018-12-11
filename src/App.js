import React, { Component } from 'react';
import ScoreBoard from './score-board/score-board'
import './App.css';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = { finished: false }
        this.rootRef = React.createRef()
    }

    handleClick() {
        const children = this.rootRef.current.children;
        for (var i = 0; i < children.length; ++i) {
            if (children[i].className === "media-container") {
                console.log(children[i].className)
            }
        }
    }

    handleScoreList(scoreList) {
        console.log("Finish!")
        for (var i = 0; i < scoreList.length; ++i) {
            console.log(scoreList[i])
        }
        this.setState({finished: true})
    }

    render() {
        var mediaList = [
            [ {type:'video', once:true,  hint: 'Score of Reality'} ],
            [ {type:'audio', once:false, hint: 'Score of Reality'} ]
        ]
        return (
            <div ref={this.rootRef} className="App">
                <div hidden={this.state.finished}>
                    <ScoreBoard mediaList={mediaList}
                                onFinished={this.handleScoreList.bind(this)} />
                </div>
                <div hidden={!this.state.finished}>
                    <div className="App-header">Thanks for your support!</div>
                </div>
            </div>
        );
    }
}

export default App;
