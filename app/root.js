import React from 'react';
import Header from './components/header';
import Player from './page/player';
import {MUSIC_LIST} from './config/config';
import MusicList from './page/musiclist'
import {hashHistory, Router, Route, IndexRoute, Link} from 'react-router'
import Pubsub from 'pubsub-js'


let App = React.createClass({
    getInitialState() {
        return {
            musicList: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0],
            playOrder: 'random',
        }
    },
    playMusic(musicItem) {
        $('#player').jPlayer('setMedia', {
            mp3: musicItem.file,
        }).jPlayer('play');
        this.setState({
            currentMusicItem: musicItem
        });
    },
    findMusicIndex(musicItem) {
        return this.state.musicList.indexOf(musicItem);
    },
    getItemIndex(direction, playOrder) {
        let itemIndex = null,
            index = this.findMusicIndex(this.state.currentMusicItem),
            musicLen = this.state.musicList.length;
        if (direction === 'next') {
            if (playOrder === 'once') {
                itemIndex = index === musicLen - 1 ? index : index + 1;
            } else if (playOrder === 'cycle') {
                itemIndex = (index + 1) % musicLen;
            } else {
                itemIndex = Math.floor(Math.random() * musicLen);
            }
        } else {
            if (playOrder === 'once') {
                itemIndex = index === 0 ? index : index - 1;
            } else if (playOrder === 'cycle') {
                itemIndex = (index + 1) % musicLen;
            } else {
                itemIndex = Math.floor(Math.random() * musicLen);
            }
        }
        return itemIndex;
    },
    playNext(type = 'next') {

        let index = this.findMusicIndex(this.state.currentMusicItem),
            newIndex = this.getItemIndex(type, this.state.playOrder),
            musicLen = this.state.musicList.length,
            musicItem = this.state.musicList[newIndex];
        if (this.state.playOrder === 'once') {
            if ((type === 'next' && index === musicLen - 1) || ((type === 'prev') && index === 0))
                return;
        }

        this.setState({
            currentMusicItem: musicItem
        })
        this.playMusic(musicItem);
    },
    componentDidMount() {
        console.log(this.state.currentMusicItem);
        let musicUrl = this.state.currentMusicItem.file;
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        });
        $('#player').bind($.jPlayer.event.ended, e => {
            this.playNext();
        });
        this.playMusic(this.state.currentMusicItem)
        Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            this.setState({
                musicList: this.state.musicList.filter(item => (
                        item !== musicItem
                    )
                )
            })
        });
        Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem)
        });
        Pubsub.subscribe('PLAY_PREV', () => {
            console.log('PREV')
            this.playNext('prev')
        });
        Pubsub.subscribe('PLAY_NEXT', () => {
            this.playNext('next')
        });
        Pubsub.subscribe('CHANGE_ORDER', () => {
            console.log('subscribe changOrder info...')
            let newMode = '';
            debugger;
            switch (this.state.playOrder) {
                case 'cycle': {
                    newMode = 'random';
                    break;
                }
                    ;
                case 'random': {
                    newMode = 'once';
                    break;
                }
                    ;
                case 'once': {
                    newMode = 'cycle';
                    break;
                }
                    ;
                default : {
                    newMode = 'cycle';
                }
            }
            console.log('newMode:' + newMode);
            this.setState({
                playOrder: newMode,
            });
            return newMode;
        })
    },
    componentWillUnmount() {
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('PLAY_PREV');
        Pubsub.unsubscribe('PLAY_NEXT');
        Pubsub.unsubscribe('CHANGE_ORDER');
        $('#player').unbind($.jPlayer.event.ended);
    },
    render() {
        return (
            <div>
                <Header></Header>
                {React.cloneElement(this.props.children, this.state)}
            </div>
        );
    }
})

let Root = React.createClass({
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Player}></IndexRoute>
                    <Route path="/list" component={MusicList}/>
                </Route>
            </Router>
        )
    }
});

export default Root;
