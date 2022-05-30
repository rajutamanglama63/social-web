import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Provider as AlertProvider, transitions, positions} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import store from './redux/store';
import App from './App';

// optional configuration
const option = {
  position : positions.BOTTOM_CENTER,
  timeout : 5000,
  transition : transitions.SCALE,
  offset : '30px'
}

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <AlertProvider template={AlertTemplate} {...option}>
          <App />
        </AlertProvider>
      </Router>
    </Provider>,
  document.getElementById('root')
);

