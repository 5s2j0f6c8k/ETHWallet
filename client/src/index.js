import registerServiceWorker from './registerServiceWorker';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import '../node_modules/onsenui/css/onsenui.css';
import '../node_modules/onsenui/css/onsen-css-components.css';

import ons from 'onsenui';

import {
  Page,
  Tabbar,
  Tab,
  Navigator
} from 'react-onsenui';


import Login from './components/Login';

class App extends Component {
  renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;

    return React.createElement(route.comp, route.props);
  }

  render() {
    return (
      <Navigator
        initialRoute={{comp: Login}}
        renderPage={this.renderPage}
      />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
