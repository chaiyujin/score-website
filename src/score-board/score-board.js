import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerGroup from '../media/player-group/player-group'
import './score-board.css'
import './table.css'


class ScoreBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIdx: 0,
            scoreList: [],
            info: {
                name: '',
                birthMonth: '',
                birthYear: '',
                gender: ''
            }
        }
        this.slidesRef = React.createRef()
        this.tableRef = React.createRef()
    }

    handleScored(idx, scoreInfo) {
        const children = this.slidesRef.current.children;
        var scores = this.state.scoreList;
        scores[idx] = scoreInfo;
        this.setState({
            scoreList: scores,
            currentIdx: (idx + 1 >= children.length) ? children.length - 1 : idx + 1
        })
        // if (idx + 1 >= children.length) {
        //     if (this.props.onFinished !== null) {
        //         this.props.onFinished(scores)
        //     }
        // }
    }

    handleChange(key, event) {
        var info = this.state.info
        info[key] = event.target.value;
        this.setState({info: info})
    }

    submit(event) {
        event.preventDefault();
        if (this.props.onFinished !== null) {
            this.props.onFinished({
                information: this.state.info,
                scoreList: this.state.scoreList
            })
        }
    }

    table() {
        var years = []
        for (var y = 2018; y >= 1900; y--) {
            years.push(<option key={y}>{y}</option>)
        }
        return (
        <div className="board">
        <div className="container">
            <form ref={this.tableRef} onSubmit={this.submit.bind(this)}>
                <div className="row">
                    <h4>Information</h4>
                    <div className="input-group input-group-icon">
                        <input type="text" placeholder="Name"
                               value={this.state.info.name}
                               onChange={this.handleChange.bind(this, "name")} />
                        <div className="input-icon"><i className="fa fa-user"></i></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-half">
                        <h4>Date of Birth</h4>
                        <div className="input-group">
                            <select value={this.state.info.birthMonth}
                                    onChange={this.handleChange.bind(this, "birthMonth")}>
                                <option></option>
                                <option> 1 </option> <option> 2 </option>
                                <option> 3 </option> <option> 4 </option>
                                <option> 5 </option> <option> 7 </option> 
                                <option> 7 </option> <option> 8 </option> 
                                <option> 9 </option> <option>10 </option> 
                                <option>11 </option> <option>12 </option> 
                            </select>
                            <select value={this.state.info.birthYear}
                                    onChange={this.handleChange.bind(this, "birthYear")}>
                                <option></option>
                                {years}
                            </select>
                        </div>
                    </div>
                    <div className="col-half">
                        <h4>Gender</h4>
                        <div className="input-group">
                            <input type="radio" name="gender" value="male" id="gender-male"
                                   onClick={this.handleChange.bind(this, "gender", {target: {value: "male"}})}/>
                            <label htmlFor="gender-male">Male</label>
                            <input type="radio" name="gender" value="female" id="gender-female"
                                   onClick={this.handleChange.bind(this, "gender", {target: {value: "female"}})}/>
                            <label htmlFor="gender-female">Female</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <input type="submit" value="submit (directly)" />
                </div>
            </form>
        </div>
        </div>
        )
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
                        {mediaList}
                        <div className={(this.state.currentIdx===totalCount)?"each-slide" : "each-slide hide"}>
                            {this.table()}
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
