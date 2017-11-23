import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'

// redux
import { Provider } from 'react-redux';
import configureStore from './configureStore';

let myStore = configureStore()

const Root = ({ store }) => (
    <Provider store={store}>
      <App />
    </Provider>
  )

ReactDOM.render(
    <Root store={myStore}/>
    , document.getElementById('root'));
registerServiceWorker();

// REACT ROUTER V4 :) PIANGETE https://medium.com/@dkerrious/react-router-v4-1b04ec250c24
