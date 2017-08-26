import React from 'react'
import './musicitem.less'
import Pubsub from 'pubsub-js'

let MusicItem = React.createClass({
    playMusic(musicItem) {
        Pubsub.publish('PLAY_MUSIC', musicItem);
    },
    deleteMusic(musicItem, e) {
        e.stopPropagation();
        Pubsub.publish('DELETE_MUSIC', musicItem);
    } ,
    render() {
        let musicItem = this.props.musicItem;
        return (
            <li className={`components-listitem row ${this.props.focus? 'focus' : ''}`} onClick={this.playMusic.bind(this, musicItem)}>
                <p><strong>{musicItem.title} - {musicItem.artist}</strong></p>
                <p className="-col-auto delete" onClick={this.deleteMusic.bind(this, musicItem)}></p>
            </li>
        );
    }
});

export default MusicItem;