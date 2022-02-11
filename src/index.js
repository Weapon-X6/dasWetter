//import * as React from 'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux';
import { Provider } from 'react-redux';

import App from './App.js';

import mainReducer from './reducers';

let store = createStore(mainReducer);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);