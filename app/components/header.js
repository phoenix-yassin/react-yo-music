import React from 'react';
import './header.less';

let Header = React.createClass({
    render() {
        return (
            <div className="components-header row">
                <img src="/static/images/logo.png" width="40" className="-col-auto" alt=""/>
                <h1 className="caption">React yo music</h1>
            </div>
        );
    }
});

export default Header;