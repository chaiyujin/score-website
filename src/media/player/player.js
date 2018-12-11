import React, { Component } from 'react';
import playbutton from './play.svg';
import stopbutton from './stop.svg';
import './player.css'

class Player extends Component {
    constructor(props) {
        super(props)
        if (props.type !== 'audio' && props.type !== 'video')
            alert("Type is not 'audio' or 'video'")
        this.state = { isStop: true, played: false }
        this.refMedia = React.createRef();
        this.onEnd = this.onEnd.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    onEnd() {
        this.setState({isStop: true});
        if (this.props.onEnded !== null) {
            this.props.onEnded()
        }
    }

    handleClick() {
        if (this.props.once && this.state.played) {
            return
        }
        if (this.state.isStop) {
            this.refMedia.current.currentTime = 0
            this.refMedia.current.play()
            this.setState({
                played: true,
                isStop: false
            })
        } else {
            this.refMedia.current.pause()
            this.setState({
                isStop: true
            })
        }
    }

    render() {
        var tips = (this.props.once) ? "This " + this.props.type + " can only be played once!" : "";
        var mediaContent = (this.props.type === "audio")
            ?   <div className="card">
                    <audio ref={this.refMedia} onEnded={this.onEnd} src="./assets/audio/test.wav">the audio</audio>
                    <div>{this.props.transcript}</div>
                </div>
            : <video ref={this.refMedia} onEnded={this.onEnd} src="./assets/video/test.mp4">the video</video>;
        var btnImg = (this.state.isStop) ? this.props.playButton : this.props.stopButton;
        var btnBkg = (this.state.isStop) ? "background" : "background playing"
        return (
            <div className="media-canvas">
                <div className="tips">
                    {tips}
                </div>
                <div className="content-area">
                    {mediaContent}
                </div>
                <div className="primary-button-group">
                    <div className="primary-button">
                        <button disabled={(this.props.once && this.state.played)} onClick={this.handleClick}>
                            { (this.props.once && this.state.played) ? null: <img src={btnImg} alt="controller-button" /> }
                        </button>
                        <div className={btnBkg}></div>
                    </div>
                </div>
            </div>
        )
    }
}

Player.defaultProps = {
    playButton: playbutton,
    stopButton: stopbutton,
    once: false,
    type: "audio",
    src: "",
    transcript: "Please set transcript for audio.",
    onEnded: null
}

export default Player;
