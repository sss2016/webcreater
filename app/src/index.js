import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
// import Mylayout from './components/layouts/layout'
import DevTools from './components/container/Devtool'
import { Provider } from "react-redux";
import LoginModule from './components/Auth/login'
import reducer from './redux/reducers/index';
import {createStore,compose} from 'redux'
import * as serviceWorker from './serviceWorker';
import { Router, Route, Switch } from 'react-router-dom';
global.msgcache={
    data:[],
    name:'缓存'
}
const enhancer = compose(
    DevTools.instrument()
  );
const store = createStore(reducer,enhancer)
let createHashHistory =require("history").createHashHistory
const hashHistory = new createHashHistory();
render(  
    <Provider store={store}>
        <div>
        <App/>
        <DevTools />
        </div>
    </Provider>
    , document.getElementById('root')

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
