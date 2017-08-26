import React from 'react';
import { render } from 'react-dom';
import Root from './root';

import { AppContainer } from 'react-hot-loader'

render(
    <AppContainer>
        <Root></Root>
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./root', function(){
        const NewHello = require('./root').default;
        render(
            <AppContainer>
                <NewHello/>
            </AppContainer>,
            document.getElementById('root')
        )
    });
}