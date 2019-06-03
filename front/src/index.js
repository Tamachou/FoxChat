import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';

import { Route, BrowserRouter as Router } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import register from './components/register';
import login from './components/login';
import send from './components/send';
import home from './components/receive'

let token = localStorage.getItem('loggedin');

const Routing = (
    <Router>
        <div>
            <Route path="/" exact component={token ? home : login} />
            <Route path="/register/" component={token ? home : register} />
            <Route path="/send/" component={token ? send : login} />
        </div>
    </Router>
)

ReactDOM.render(Routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
