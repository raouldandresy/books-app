import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom'

// redux
import { Provider } from 'react-redux';
import configureStore from './configureStore';

let myStore = configureStore()

const Root = ({ store }) => (
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/:filter?" component={App} />
      </BrowserRouter>
    </Provider>
  )

ReactDOM.render(
    <Root store={myStore}/>
    , document.getElementById('root'));
registerServiceWorker();
