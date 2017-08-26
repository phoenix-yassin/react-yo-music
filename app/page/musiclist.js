import React from 'react';
import MusicItem from '../components/musicitem'

let MusicList = React.createClass({

    render() {
        let listElem = null;
        listElem = this.props.musicList.map(item => {
            return <MusicItem musicItem={item} key={item.id} focus={item=== this.props.currentMusicItem}/>
        })
        return (
            <ul>
                {listElem}
            </ul>
        );
    }
});

export default MusicList;