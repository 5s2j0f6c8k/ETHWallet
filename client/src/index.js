import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/onsenui/css/onsenui.css';
import '../node_modules/onsenui/css/onsen-css-components.css';
import Ons from 'onsenui'
import Login from './login/Login'


ReactDOM.render(<Login />, document.getElementById('root'));
registerServiceWorker();
